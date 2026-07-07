# Arquitetura SCSS do Clarus CSS

## Objetivo

A arquitetura SCSS do Clarus CSS organiza o framework em módulos pequenos, previsíveis e alinhados a uma abordagem híbrida: componentes prontos, utilitários reutilizáveis e tokens customizáveis por CSS Custom Properties.

O repositório é um monorepo (npm workspaces). O código-fonte SCSS vive em
`packages/*/scss/`; `scss/` (raiz do repo) contém apenas os pontos de entrada
de build (`scss/clarus.scss` e `scss/entries/`), que combinam os pacotes.

`scss/clarus.scss` é o ponto de entrada oficial do bundle completo:

```text
scss/clarus.scss
```

## Estrutura

```text
packages/
├── clarus-core/scss/
│   ├── settings/
│   ├── tools/
│   ├── tokens/
│   ├── base/
│   ├── layout/
│   └── themes/
├── clarus-components/scss/
│   ├── components/
│   └── forms/
├── clarus-utilities/scss/
│   └── utilities/
├── clarus-fonts/scss/
└── clarus-js/js/
scss/
├── clarus.scss      # bundle completo (dist/css/clarus.css)
└── entries/         # pontos de entrada auxiliares por distribuição
```

Cada pacote expõe seu próprio `scss/` como raiz de resolução (`scssLoadPaths`
em `scripts/build.mjs`), então `@use "settings"`/`@use "tokens"`/etc. resolve
sem caminhos relativos `../../` entre pacotes.

## Cascade layers (`@layer`)

Todo CSS emitido pelo framework é organizado em cascade layers, na ordem
declarada uma única vez em `packages/clarus-core/scss/tokens/_root.scss`:

```scss
@layer reset, tokens, base, layout, components, utilities, overrides;
```

- **reset** — normalização mínima (`base/_reset.scss`).
- **tokens** — CSS Custom Properties em `:root` e overrides de tema
  (`tokens/_root.scss`, `themes/_dark.scss`).
- **base** — estilos globais de elementos (`base/_typography.scss`).
- **layout** — grid/containers (`layout/`).
- **components** — todo componente pronto, incluindo `forms/`.
- **utilities** — classes utilitárias (`.u-*`).
- **overrides** — reservada, sem regras do próprio framework; existe para que
  consumidores possam sobrescrever qualquer camada anterior sem precisar de
  `!important` ou seletores mais específicos.

Cada parcial que gera CSS envolve seu próprio conteúdo na camada
correspondente (ex.: `_buttons.scss` inteiro dentro de `@layer components { }`).
Parciais que só declaram variáveis/mixins Sass (`settings/`, `tools/`) **não**
são envolvidos em `@layer` — eles não emitem CSS.

Como a ordem de precedência vem da ordem das camadas (não da ordem de
`@use` no arquivo), um componente sempre perde para uma utility (`.u-*`)
mesmo que o componente seja `@use`'d depois — é o comportamento desejado.

## Camadas de conteúdo

### settings

Define valores Sass usados em tempo de compilação: breakpoints, larguras de
containers, escala de espaçamento, cores primitivas, tipografia, raios de
borda. Esses arquivos não geram CSS diretamente e não entram em `@layer`.

### tools

Define mixins e funções Sass reutilizáveis (`media-breakpoint-up`,
`focus-ring`, `truncate`, `color-contrast`, etc.). Também não geram CSS.

### tokens

Gera CSS Custom Properties públicas em `:root` (camada `tokens`), permitindo
customização em CSS sem recompilar o framework. Nomes seguem o prefixo
`--cl-*`, em 3 camadas:

1. **Primitivo** (`settings/_colors.scss`, `settings/_spacing.scss`, etc.) —
   valores Sass em tempo de compilação (`$color-blue-500`, `$radius-md`), não
   emitidos diretamente como CSS.
2. **Semântico** (`tokens/_root.scss` para as cores/raio/sombra "cruas" —
   `--cl-color-primary`, `--cl-radius-md` — e `tokens/_semantic.scss` para
   aliases nomeados por papel — `--cl-color-bg-surface`,
   `--cl-color-text-primary`, `--cl-color-border-default`). Todo token
   semântico é um `var()` de um token primitivo; nunca redeclara um valor.
3. **Componente** (`--cl-btn-bg`, `--cl-btn-color`, `--cl-btn-border-color`
   em `_buttons.scss`) — cada componente declara suas próprias custom
   properties, com fallback para um token semântico/primitivo, e usa só essas
   nas propriedades CSS reais. Isso permite sobrescrever a aparência de uma
   instância específica (`.minha-classe { --cl-btn-bg: ...; }`) sem
   `!important`. `_buttons.scss` é a referência do padrão — componentes mais
   antigos ainda consomem tokens semânticos/primitivos diretamente e devem
   migrar para o próprio padrão à medida que forem alterados.

Primitivos de cor são gerados em OKLCH (`color.to-space(#hex, oklch)` a
partir do hex histórico — ver comentário em `settings/_colors.scss`), com
fallback sRGB automático: cada token de cor é declarado duas vezes em
`tokens/_root.scss`/`themes/_dark.scss` — incondicionalmente com
`rgb-fallback()` (gamut-mapeado), depois de novo dentro de
`@supports (color: oklch(0% 0 0))` com o valor OKLCH nativo. Navegadores sem
suporte a `oklch()` ignoram o bloco `@supports` inteiro e ficam só com o
fallback. `tint-color()`/`shade-color()`/`color.mix()` usados para derivar
tons (`--cl-alert-*-bg`, tema escuro) misturam com `$method: oklch` — rode
`npm run contrast` (ver `docs/reference/contrast-report.md`) depois de mudar
qualquer peso de mistura.

### base

Estilos globais mínimos de elementos (`body`, tipografia base). Camada
`base` — deve permanecer pequena para evitar efeitos colaterais.

### layout

Base estrutural do framework: containers, rows, colunas, grid baseado em
Flexbox. Camada `layout`.

O gutter do grid (`.cl-row`/`.cl-col-*`) é implementado via padding + margin
negativo controlados pelas CSS Custom Properties `--cl-gutter-x`/`--cl-gutter-y`
(não via `gap` do flexbox), porque `gap` não é descontado da largura em
porcentagem das colunas numeradas (`.cl-col-6`, `.cl-col-md-4`), o que causaria
estouro de linha. As classes `.u-g-*`/`.u-gx-*`/`.u-gy-*` (em `utilities/_spacing.scss`)
controlam essas variáveis e só têm efeito dentro de uma `.cl-row`. Para `gap`
literal em qualquer container flex/grid fora do sistema de colunas, use
`.u-gap-*`/`.u-gap-x-*`/`.u-gap-y-*`.

### forms

Agrupa estilos de formulários (linhas/colunas, labels, textos auxiliares,
inputs, tamanhos de campo, estados de foco/desabilitado/leitura). Empacotado
com `clarus-components`, camada `components`.

### components

Agrupa componentes prontos — um parcial `_nome.scss` por componente em
`packages/clarus-components/scss/components/`, registrado em `_index.scss`.
Camada `components`. Lista completa: ver o diretório do pacote (a lista muda
com frequência conforme novos componentes entram).

### utilities

Classes utilitárias reutilizáveis (`.u-*`): display, flex, spacing,
shadow, typography, visibility. Camada `utilities` — sempre a última camada
com regras do próprio framework, garantindo que uma utility sempre vença um
componente. Utilitários devem ser previsíveis, pequenos e combináveis.

### themes

Variações globais de tema. O primeiro tema obrigatório é o dark mode via:

```html
<html data-theme="dark">
```

Camada `tokens` (só redefine `--cl-*`; não define novas regras de layout).

## Convenções

- Usar arquivos parciais com prefixo `_`.
- Usar `@use` e `@forward`, evitando `@import` para módulos internos.
- `@use`/`@forward` sempre no topo do arquivo, antes de qualquer `@layer`.
- Manter `scss/clarus.scss` como único ponto de entrada público para o bundle completo.
- Classes de componente: `.cl-*`; utilitários: `.u-*`; estados controlados por
  JS: `.is-*`; tokens CSS: `--cl-*`; atributos de auto-init: `data-cl`/
  `data-cl-target`/`data-cl-dismiss`; eventos DOM customizados: `cl:*`.
- Evitar estilos globais agressivos.
- Preferir CSS Custom Properties para valores que usuários podem sobrescrever.
- Preferir variáveis Sass para valores usados em geração de classes.

## Pipeline de Build

O build (`npm run build`, `scripts/build.mjs`) compila SCSS para CSS via Dart
Sass, aplica PostCSS com Autoprefixer (alvo em `.browserslistrc` — ver
`docs/reference/browser-support.md`) e gera versões minificadas com source
maps em `dist/css/`.

Para preservar a distribuição em arquivos separados (`layout.css`, `forms.css`,
`components.css`, `helpers.css`), existem pontos de entrada auxiliares em
`scss/entries/`, cada um combinando `tokens` + `base` + `themes` com o módulo
correspondente, garantindo que qualquer um dos arquivos possa ser usado de
forma isolada (com variáveis, reset e dark mode funcionando). Esses arquivos
são exclusivos do processo de build e não substituem `scss/clarus.scss` como
entrada pública para quem deseja o bundle completo.

`scss/clarus.scss` também é compilado diretamente para `dist/css/clarus.css`
(+ `.min.css`), como opção de import único para quem não precisa da distribuição
granular. É esse bundle que o campo `style` do `package.json` aponta por padrão.

Os nomes em `scss/entries/` usam o sufixo `-entry` (ex: `layout-entry.scss`)
para evitar colisão com os módulos de mesmo nome (`@use "layout"` dentro de
`scss/layout.scss` causaria um loop de importação).

Cada entry independente declara a ordem de `@layer` no início do seu CSS
compilado (herdada de `tokens/_root.scss`, sempre o primeiro `@use`), então
qualquer arquivo de `dist/css/` funciona isolado, com a cascata correta,
mesmo carregado sozinho numa página.

## Regra de Evolução

Novos componentes devem seguir este fluxo:

1. Criar `packages/clarus-components/scss/components/_nome-do-componente.scss`,
   com o conteúdo CSS envolvido em `@layer components { }` (`@use` fica fora,
   antes da camada).
2. Adicionar o arquivo em `packages/clarus-components/scss/components/_index.scss`.
3. Documentar a API de classes em Markdown.
4. Adicionar exemplo em `mockup/` quando fizer sentido.
