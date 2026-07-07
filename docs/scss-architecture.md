# Arquitetura SCSS do Clarus CSS

## Objetivo

A arquitetura SCSS do Clarus CSS organiza o framework em módulos pequenos, previsíveis e alinhados a uma abordagem híbrida: componentes prontos, utilitários reutilizáveis e tokens customizáveis por CSS Custom Properties.

O arquivo de entrada oficial é:

```text
scss/clarus.scss
```

Esse arquivo deve reunir os módulos na ordem correta de geração do CSS final.

## Estrutura

```text
scss/
├── clarus.scss
├── settings/
├── tools/
├── tokens/
├── base/
├── layout/
├── forms/
├── components/
├── utilities/
└── themes/
```

## Camadas

### settings

Define valores Sass usados em tempo de compilação:

- Breakpoints.
- Larguras de containers.
- Escala de espaçamento.
- Cores base.
- Tipografia.
- Raios de borda.

Esses arquivos não devem gerar CSS diretamente.

### tools

Define mixins e funções Sass reutilizáveis.

Exemplos:

- `media-breakpoint-up`
- `focus-ring`
- `truncate`

Esses arquivos também não devem gerar CSS diretamente.

### tokens

Gera CSS Custom Properties públicas em `:root`.

Essa camada permite customização em CSS sem recompilar o framework.

### base

Define estilos globais mínimos:

- `box-sizing`
- `body`
- tipografia base
- fontes externas

Essa camada deve permanecer pequena para evitar efeitos colaterais.

### layout

Define a base estrutural do framework:

- Containers.
- Rows.
- Colunas.
- Grid baseado em Flexbox.
- Breakpoints convencionais, amplamente adotados.

O gutter do grid (`.cl-row`/`.cl-col-*`) é implementado via padding + margin negativo
controlados pelas CSS Custom Properties `--cl-gutter-x`/`--cl-gutter-y`
(não via `gap` do flexbox), porque `gap` não é descontado da largura em
porcentagem das colunas numeradas (`.cl-col-6`, `.cl-col-md-4`), o que causaria
estouro de linha. As classes `.u-g-*`/`.u-gx-*`/`.u-gy-*` (em `utilities/_spacing.scss`)
controlam essas variáveis e só têm efeito dentro de uma `.cl-row`. Para `gap`
literal em qualquer container flex/grid fora do sistema de colunas, use
`.u-gap-*`/`.u-gap-x-*`/`.u-gap-y-*`.

### forms

Agrupa estilos de formulários:

- Linhas e colunas de formulário.
- Labels.
- Textos auxiliares.
- Inputs.
- Tamanhos de campo.
- Estados de foco, desabilitado e leitura.

### components

Agrupa componentes prontos.

Cada componente deve ter seu próprio arquivo parcial:

- Buttons.
- Cards.
- Alerts.
- Badges.
- Tables.
- Navbar.
- Dropdown.
- Modal.
- Accordion.
- Tabs.
- Tooltips.
- Toasts.
- Pagination.
- Breadcrumbs.
- Spinner / Progress.
- Carousel.
- Stepper.

Novos componentes entram como um parcial `_nome.scss` registrado em
`scss/components/_index.scss` (ver "Regra de Evolução" abaixo).

### utilities

Agrupa classes utilitárias reutilizáveis:

- Display.
- Flex alignment.
- Spacing.
- Visibility.

Utilitários devem ser previsíveis, pequenos e combináveis.

### themes

Agrupa temas e variações globais.

O primeiro tema obrigatório é o dark mode via:

```html
<html data-theme="dark">
```

## Convenções

- Usar arquivos parciais com prefixo `_`.
- Usar `@use` e `@forward`, evitando `@import` para módulos internos.
- Manter `scss/clarus.scss` como único ponto de entrada público para o bundle completo.
- Evitar estilos globais agressivos.
- Preferir CSS Custom Properties para valores que usuários podem sobrescrever.
- Preferir variáveis Sass para valores usados em geração de classes.

## Pipeline de Build

O build (`npm run build`) compila SCSS para CSS via Dart Sass, aplica PostCSS
com Autoprefixer e gera versões minificadas com source maps em `dist/css/`.

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

## Regra de Evolução

Novos componentes devem seguir este fluxo:

1. Criar `scss/components/_nome-do-componente.scss`.
2. Adicionar o arquivo em `scss/components/_index.scss`.
3. Documentar a API de classes em Markdown.
4. Adicionar exemplo em `mockup/` quando fizer sentido.
