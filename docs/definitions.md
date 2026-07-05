# Clarus CSS — Definições Iniciais do Projeto

## 1. Visão Geral

Clarus CSS é um framework CSS open source, de uso recorrente nos projetos pessoais e profissionais do autor, com distribuição pública como produto para qualquer desenvolvedor que precise construir interfaces web com HTML, CSS e JavaScript de forma direta, consistente e reutilizável.

O projeto será publicado no GitHub sob o repositório `clarus-css` e terá distribuição oficial via npm desde o início. A licença adotada é MIT, mantendo o framework permissivo, simples de reutilizar e adequado para uso pessoal, comercial e comunitário.

## 2. Objetivo Estratégico

O objetivo do Clarus CSS é oferecer uma base visual moderna, minimalista e produtiva para criação de páginas, sistemas e componentes de interface sem exigir dependências externas ou integração obrigatória com frameworks JavaScript.

O projeto deve equilibrar três finalidades:

- Servir como biblioteca padrão para projetos recorrentes do autor.
- Funcionar como produto público open source, consultável e reutilizável por terceiros.
- Demonstrar maturidade técnica, organização de engenharia e clareza de documentação.

## 3. Público-Alvo

O público-alvo principal inclui o próprio autor e qualquer tipo de desenvolvedor que queira usar classes prontas, componentes visuais consistentes e padrões de layout convencionais e familiares.

O framework deve ser acessível para desenvolvedores iniciantes, mas suficientemente organizado para ser adotado por profissionais experientes em projetos reais.

## 4. Posicionamento do Produto

O Clarus CSS pende mais para o lado dos componentes prontos do que para o de frameworks puramente utilitários. A proposta é entregar componentes prontos, classes auxiliares e uma estrutura previsível para acelerar a construção de interfaces.

A identidade visual deve seguir uma linha minimalista e moderna, com foco em clareza, legibilidade, baixo ruído visual e adaptação a diferentes tipos de aplicação.

## 5. Filosofia de Design

A filosofia oficial do projeto é híbrida.

Isso significa que o framework deve combinar:

- Componentes prontos para uso, como botões, formulários, cards, menus, modais, alertas, tabelas e navegação.
- Classes utilitárias para espaçamento, alinhamento, display, visibilidade, grid, tipografia, cores e estados visuais.
- Padrões consistentes de nomenclatura para reduzir colisões, facilitar leitura do HTML e manter previsibilidade entre componentes.

Essa decisão é firme e deve orientar toda a arquitetura do projeto.

## 6. Stack Tecnológica

O projeto deve priorizar HTML, CSS e JavaScript nativo.

A stack definida é:

- CSS como base do framework.
- SCSS/Sass para organização modular, variáveis, mixins e funções.
- CSS Custom Properties para permitir customização em tempo de uso sem recompilação obrigatória.
- PostCSS para pós-processamento e compatibilidade entre navegadores.
- JavaScript nativo para componentes interativos.
- Empacotamento leve para distribuição em formatos compatíveis com uso moderno e inclusão direta em páginas HTML.

O Clarus CSS deve ter dependência externa zero em tempo de execução. Não deve depender de React, Vue, Angular, jQuery ou qualquer biblioteca JavaScript de terceiros para funcionar.

## 7. Arquitetura de Interface

O framework deve priorizar uso direto em HTML, CSS e JavaScript, sem exigir build complexo para o usuário final.

As classes e componentes devem ser pensados para:

- Uso direto em arquivos HTML.
- Integração simples com qualquer back-end ou front-end.
- Compatibilidade futura com projetos que usem React, Vue, Angular ou outras stacks, sem tornar essas stacks obrigatórias.

## 8. Sistema de Layout

O sistema de layout será baseado em Flexbox.

O grid deve seguir uma abordagem convencional de 12 colunas, com breakpoints
(`scss/settings/_breakpoints.scss`) calibrados pelas larguras lógicas de tela
mais comuns do mercado atual, não por números arbitrários:

- `sm` (640px) — tablets pequenos/phablets
- `md` (768px) — tablet retrato
- `lg` (1024px) — tablet paisagem / iPad
- `xl` (1280px) — laptop comum
- `xxl` (1536px) — laptop/desktop com escala (Mac/Windows)
- `xxxl` (1920px) — monitor externo Full HD sem escala

O objetivo é reduzir a curva de aprendizado para quem já usou um framework CSS de componentes, mantendo liberdade para adaptar detalhes internos à identidade do Clarus CSS.

## 9. Escopo Inicial de Componentes

A primeira versão publicável deve mirar um escopo completo, com componentes suficientes para permitir o uso real do framework em projetos práticos.

O escopo inicial inclui:

- Layout e containers.
- Grid baseado em Flexbox.
- Utilitários de espaçamento, display, alinhamento, visibilidade e tipografia.
- Formulários e campos de entrada (incluindo validação visual, select customizado e upload de arquivo estilizado).
- Botões.
- Cards.
- Alertas.
- Badges.
- Tabelas.
- Navbar.
- Dropdown.
- Modal.
- Accordion.
- Tabs.
- Tooltips.
- Toasts.
- Paginação.
- Breadcrumbs.

Todos os grupos acima estão implementados e compõem a versão inicial do produto — detalhes de cada um na seção 21.

## 10. Temas e Customização

O Clarus CSS deve oferecer suporte nativo a dark mode desde a primeira versão.

A paleta de cores oficial é a "Indigo autoral" (`primary #4F46E5`,
`success #1BC559`, `warning #F0B40E`, `danger #DC263E`, `info #8BA2C4`,
com escala neutra própria de 9 degraus), definida na seção 18.1. A
arquitetura já está preparada para temas claros e escuros por meio de CSS
Custom Properties.

A customização deve permitir que usuários alterem cores, espaçamentos, tipografia e estados visuais sem reescrever o framework inteiro.

## 11. Tipografia

A família tipográfica oficial é a Plus Jakarta Sans (heading e body),
definida na seção 18.2, escolhida por boa legibilidade, aparência moderna e
compatibilidade com interfaces web de uso geral. Os arquivos da fonte são
distribuídos self-hosted junto ao próprio pacote (sem dependência de
serviços externos como fonts.googleapis.com em tempo de execução), alinhado
à stack definida na seção 6.

## 12. Documentação

A documentação inicial será mantida em Markdown no GitHub.

Não haverá, no primeiro momento, um site separado de documentação. A prioridade é manter a documentação simples, versionada junto ao código e acessível diretamente pelo repositório.

Os documentos devem explicar:

- Instalação via npm.
- Uso direto via arquivo compilado.
- Estrutura de classes.
- Sistema de grid.
- Componentes disponíveis.
- Customização por variáveis.
- Modo escuro.
- Convenções de contribuição.

## 13. Distribuição

O Clarus CSS será publicado no npm desde o início.

A distribuição deve contemplar:

- Pacote npm oficial.
- Arquivos compilados em `dist`.
- Versão minificada para produção.
- CSS principal.
- JavaScript nativo para componentes interativos.
- Possibilidade de uso via CDN por meio de serviços como jsDelivr e unpkg após publicação no npm.

## 14. Licenciamento

O projeto será licenciado sob MIT.

Essa licença confirma a intenção de permitir uso amplo, modificação, cópia, redistribuição e uso comercial, preservando apenas os requisitos básicos de atribuição e inclusão do aviso de licença.

## 15. Estrutura Inicial do Repositório

A estrutura-alvo do repositório deve evoluir para algo próximo de:

```text
clarus-css/
├── assets/
├── docs/
├── dist/
├── js/
├── mockup/
├── scss/
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── package.json
└── README.md
```

A estrutura atual pode ser ajustada progressivamente, mas deve convergir para separar fonte, distribuição, documentação e exemplos.

## 16. Boas Práticas de Engenharia

O projeto deve adotar práticas que transmitam seriedade técnica desde o início:

- Versionamento semântico.
- Histórico de mudanças em `CHANGELOG.md`.
- Orientações de contribuição em `CONTRIBUTING.md`.
- Scripts de build e minificação.
- Organização modular por componente.
- Convenção consistente de nomenclatura de classes.
- GitHub Actions para lint, build e validações básicas.
- Publicação controlada por release.

## 17. Decisões Firmes

As seguintes decisões estão definidas:

- Nome do produto: Clarus.
- Nome do projeto/repositório: `clarus-css`.
- Modelo de design: híbrido.
- Referência: convenções amplamente adotadas em frameworks CSS de componentes.
- Stack prioritária: HTML, CSS e JavaScript nativo.
- Dependências externas em tempo de execução: zero.
- Sistema de layout: Flexbox.
- Breakpoints: valores convencionais amplamente adotados.
- Identidade visual: minimalista e moderna.
- Paleta de cores: "Indigo autoral", definida na seção 18.1.
- Tipografia: Plus Jakarta Sans, self-hosted, definida na seção 18.2.
- Dark mode: nativo desde a primeira versão.
- Documentação inicial: Markdown no GitHub.
- Distribuição: npm desde o início.
- Licença: MIT.
- Tom do projeto: técnico, estratégico e com posicionamento de produto.
- Convenção de nomenclatura de classes: definida na seção 19.
- API JavaScript dos componentes interativos: definida na seção 20.
- Catálogo e arquitetura dos componentes: detalhado na seção 21.
- Testes automatizados (funcionais e visuais): detalhados na seção 22.

## 18. Paleta de Cores e Tipografia

As duas pendências desta seção (antes "a definir posteriormente") foram decididas.

### 18.1 Paleta de cores oficial

Opção "Indigo autoral": paleta própria, escolhida por dar ao Clarus uma
identidade cromática distinta dos azuis e paletas genéricas mais comuns em
frameworks de UI (uma paleta de placeholder chegou a ser usada em
`scss/settings/_colors.scss` durante o desenvolvimento inicial), reforçando o
posicionamento de identidade visual própria (seção 4).

- Cores de estado:
  - `primary`: `#4F46E5`
  - `success`: `#1BC559`
  - `warning`: `#F0B40E`
  - `danger`: `#DC263E`
  - `info`: `#8BA2C4`
- `info` passa a ser uma cor distinta de `primary`, corrigindo a duplicidade
  que existia antes desta implementação (`$color-primary` e `$color-info`
  com o mesmo valor).
- Escala neutra com 9 degraus cheios (100 a 900, sem lacunas), já
  implementada em `scss/settings/_colors.scss`: `#F8FAFC`, `#F1F5F9`,
  `#E2E8F0`, `#CBD5E1`, `#94A3B8`, `#64748B`, `#475569`, `#334155`,
  `#1E293B`.
- Variantes de `primary`/`success`/`warning`/`danger`/`info` para o dark
  mode já implementadas em `scss/themes/_dark.scss` (token
  `--clarus-color-#{nome}`, recalculado via `color.mix()` com um peso por
  cor no mapa `$dark-color-weights`); `alert-*-bg`/`-text` continuam
  recalculados à parte para o tema escuro.

### 18.2 Família tipográfica final

Plus Jakarta Sans para heading e body (família única), mantendo Source Code
Pro no monoespaçado (`$font-family-mono`, sem alteração).

- Os arquivos da fonte (`.woff2`, licença OFL) já são self-hosted, distribuídos
  junto ao pacote em `assets/fonts/plus-jakarta-sans/` (incluindo o
  `OFL.txt` da fonte, requisito da licença), com `@font-face` declarado em
  `scss/base/_typography.scss` no lugar do antigo `@import
  url("https://fonts.googleapis.com/...")` — cumprindo a meta de
  "dependência externa zero em tempo de execução" (seção 6) para a fonte
  principal. O monoespaçado (Source Code Pro) permanece via `@import` do
  Google Fonts, sem alteração, conforme decidido acima.

## 19. Convenção de Nomenclatura de Classes

- Sem prefixo global: as classes são "nuas" (`.btn`, `.card`, `.container`),
  sem prefixo `clarus-`.
- Variantes de cor/estilo por sufixo direto: `.btn-primary`, `.alert-danger`,
  `.badge-success`, seguindo os nomes já usados em `$theme-colors`
  (`scss/settings/_colors.scss`).
- Tamanhos por sufixo `-sm`/`-lg` consistente em todos os componentes que
  tiverem variação de tamanho (botões, badges, cards, inputs), generalizando
  o padrão já usado em `.form-control-sm`/`.form-control-lg`.
- Estados controlados por JavaScript usam classes `is-*` (`.is-open`,
  `.is-active`, `.is-expanded`), nunca atributos `data-state` customizados.
- Utilitários mantêm abreviações curtas (`.d-flex`, `.mt-3`,
  `.gx-2`, `.p-2`), como já implementado em `scss/utilities/`.
- Responsividade em utilitários e grid segue sempre o formato fixo
  `{propriedade}-{breakpoint}-{valor}` (ex.: `.col-md-6`, `.d-md-none`,
  `.mt-lg-3`).

## 20. API JavaScript dos Componentes Interativos

- Inicialização sempre automática via atributo HTML (ex.:
  `data-clarus="modal" data-target="#meuModal"`), sem exigir `new` manual
  para o uso básico — alinhado com "uso direto em HTML sem build" (seção 7).
- Toda instância criada automaticamente continua acessível para controle
  programático via método estático de recuperação (ex.:
  `Clarus.Modal.getInstance(el)`), permitindo chamar seus métodos sem
  precisar instanciar manualmente.
- Namespace global único: `window.Clarus`, com cada componente como
  propriedade (`Clarus.Modal`, `Clarus.Tooltip`, `Clarus.Dropdown`, etc.),
  em vez de globais separados.
- API de instância padronizada para todo componente interativo: `.show()`,
  `.hide()`, `.toggle()`, `.dispose()`.
- Comunicação com a aplicação via eventos DOM customizados (ex.:
  `clarus:modal:shown`, `clarus:tab:changed`), disparados com
  `CustomEvent` nativo — sem exigir callbacks de construtor.
- Acessibilidade (ARIA, foco, teclado) é requisito obrigatório da API desde
  a v0.1 para todo componente interativo, não um extra a ser adicionado
  depois.
- Além do bundle único (`dist/js/clarus.js`), haverá import granular por
  componente (ex.: `import { Modal } from "clarus-css/js/modal"`), para uso
  com bundlers.

## 21. Componentes do Framework

Esta seção documenta, por grupo de componente, as classes CSS, tokens e
módulos JavaScript entregues pelo framework — a referência funcional
completa da versão atual. Todo componente/grupo tem um mockup dedicado em
`mockup/` (HTML puro consumindo os arquivos gerados em `dist/css/`/
`dist/js/`), usado tanto como exemplo de uso quanto como fixture dos testes
visuais (seção 22).

### Botões

Variantes sólidas e outline por cor de estado
(`.btn-primary/success/warning/danger/info`, `.btn-outline-*`), tamanhos
(`.btn-sm`/`.btn-lg`) e estados de hover/active/focus/disabled. A função
`color-contrast()` (`scss/tools/_mixins.scss`) garante contraste WCAG AA em
cada variante — reaproveitada por cards, alertas, modal e navbar.

Mockup: `mockup/buttons.html`.

### Badges e Alertas

Badges sólidos com tamanhos (`.badge-sm`/`.badge-lg`), reaproveitados por
cards, navbar e tabelas. Alertas com fundo tintado por estado (`.alert-*`),
via tokens `--clarus-alert-*-bg`/`-text` com suporte a dark mode, usando as
funções `tint-color()`/`shade-color()` (`scss/tools/_mixins.scss`). Os dois
componentes compartilham o mesmo padrão de variante de cor de estado
(success/warning/danger/info), também usado por tabelas.

Mockup: `mockup/badges-alerts.html`.

### Cards

Combina botões, badges e tipografia base num contêiner:
`.card-header`/`.card-body`/`.card-footer`, `.card-title`/`.card-subtitle`/
`.card-text`, tamanhos (`.card-sm`/`.card-lg`). O `.card-header` suporta a
variante título + botão de fechar (`.btn-close`, reaproveitável em
modal/toast). Utilitários de sombra (`.shadow-sm`/`.shadow`/`.shadow-lg`,
`scss/utilities/_shadow.scss`) dão elevação ao card. `.card-clickable` +
`.stretched-link` tornam o card inteiro clicável/focável sem aninhar
elementos interativos; `.card-horizontal` muda o eixo para linha, ajustando
raio/borda do header/footer para a lateral.

Mockup: `mockup/cards.html`.

### Tabelas e Navbar

Tabelas: `.table-striped`/`.table-hover`/`.table-bordered`/
`.table-borderless`/`.table-sm`/`.table-responsive` e variantes de cor de
estado, reaproveitando os tokens `--clarus-alert-*` de Badges e Alertas.

Navbar (versão estática, sem dropdown/collapse próprio — a combinação com
Dropdown é feita compondo os dois componentes): `.navbar-brand`/
`.navbar-nav`/`.nav-link`, com estados `.active`/`.disabled`, reaproveitando
botões e badges para o conteúdo interno.

Mockup: `mockup/tables-navbar.html`.

### Paginação e Breadcrumbs

Paginação: `.page-link` com estados `.active`/`.disabled`, reaproveitando
`color-contrast()` (mesma função dos botões) para garantir contraste.
Breadcrumbs: `.breadcrumb-item` com separador via `::before` e estado
`.active`. Ambos são auxiliares de navegação, sem JavaScript.

Mockup: `mockup/pagination-breadcrumbs.html`.

### Formulários Avançados

Estados de validação: `.form-control.is-valid`/`.is-invalid` (borda e anel
de foco em `--clarus-color-success`/`-danger`, reaproveitando as cores de
estado de alertas/badges), com `.valid-feedback`/`.invalid-feedback`
exibidos via seletor de irmão adjacente, sem JavaScript.

Upload de arquivo estilizado: `.file-upload`/`.file-input`/`.file-label` —
o input nativo é ocultado por `clip-path` (mantendo foco e navegação por
teclado), com rótulo estilizado via `<label for>`, tamanhos
(`.file-label-sm`/`-lg`) e estado desabilitado. Todo o grupo é 100% CSS, sem
dependência de JavaScript.

Mockup: `mockup/forms-advanced.html`.

### Infraestrutura JS Compartilhada

Módulos internos em `js/core/` (ES modules, sem dependências externas)
usados por todos os componentes interativos, sem componente visual próprio:

- `positioning.js` — `computePosition()`/`applyPosition()`, com flip
  automático para o lado oposto e clamp dentro da viewport. Usado por
  Dropdown, Tooltip e, indiretamente via composição, Select customizado.
- `overlay.js` — `lockScroll()`/`unlockScroll()` com compensação de
  scrollbar e contagem de referências para overlays aninhados, além de
  `onClickOutside()`. Usado por Modal e Dropdown.
- `focus.js` — `createFocusTrap()` com ciclo Tab/Shift+Tab e
  `onEscapeKey()`. Usado por Modal e Dropdown.
- `transition.js` — `collapse()`/`expand()`, animando `height` via
  `transitionend` e respeitando `prefers-reduced-motion`. Usado por
  Accordion, Tabs e Toast.
- `register.js` — `autoInit()`/`createInstanceRegistry()`, padrão comum de
  inicialização automática (`data-clarus="..."`) e registro de instância
  (`getInstance()`) usado por todo componente interativo.

Reexportado como `Clarus.core` pelo bundle único (`js/clarus.js` →
`dist/js/clarus.js`) e também importável de forma granular
(`clarus-css/js/core/positioning`, etc.), alinhado com a API JavaScript
definida na seção 20.

Mockup: `mockup/js-foundation.html` (harness de posicionamento, foco e
transição, sem componente visual final).

### Dropdown e Tooltip

`.dropdown-toggle`/`.dropdown-menu`/`.dropdown-item`/`.dropdown-divider`/
`.dropdown-header` (`scss/components/_dropdown.scss`). `.tooltip`/
`.tooltip-inner`/`.tooltip-arrow` com 4 posicionamentos
(`scss/components/_tooltips.scss`), usando os tokens
`--clarus-tooltip-bg`/`-text` (invertidos no dark mode).

`js/dropdown.js` e `js/tooltip.js` seguem a API da seção 20: auto-init via
`data-clarus="dropdown"`/`"tooltip"`, `Clarus.Dropdown`/`Clarus.Tooltip` com
`getInstance()`, `.show()`/`.hide()`/`.toggle()`/`.dispose()`, eventos
`clarus:dropdown:shown`/`-hidden` e `clarus:tooltip:shown`/`-hidden`.
Dropdown navega entre itens com ArrowUp/ArrowDown e fecha ao clicar em um
item, fora do menu ou com Escape (foco retorna ao toggle). Tooltip
mostra/esconde por hover/foco/blur e Escape, com `aria-describedby` ligando
o elemento de referência ao tooltip.

`computePosition()` (`js/core/positioning.js`) suporta a opção `align`
(`"start"`/`"center"`/`"end"`) para o eixo cruzado, além do `placement`. O
Dropdown usa `data-align` no toggle (padrão `"start"`, alinhamento à esquerda)
com offset de 4px em relação ao toggle; `.dropdown-menu` tem
`position: absolute` explícito no CSS base, evitando que o menu seja medido
como bloco normal antes do JS aplicar a posição (o que quebraria o cálculo
de alinhamento `start`/`end`).

Mockup: `mockup/dropdown-tooltip.html`.

### Modal e Select Customizado

Modal: `.modal`/`.modal-dialog`/`.modal-content`/`.modal-header`/
`.modal-title`/`.modal-body`/`.modal-footer` (`scss/components/_modal.scss`),
com tamanhos `.modal-sm`/`.modal-lg` no `.modal-dialog`. `js/modal.js`
(`Clarus.Modal`) reaproveita a infraestrutura JS compartilhada:
`lockScroll()` enquanto aberto, `createFocusTrap()` no `.modal-dialog`,
`onEscapeKey()` e `onClickOutside()` para fechar (foco retorna ao gatilho);
dismiss via qualquer elemento com `data-dismiss="modal"`;
`data-backdrop="static"` no `.modal` desativa fechar por Escape/clique fora.

Select customizado: `js/select.js` (`Clarus.Select`) gera a marcação
(`.form-select` + `.dropdown-menu`/`.dropdown-item` por `<option>`) a partir
de um `<select>` nativo (`data-clarus="select"`, oculto mas mantido em
sincronia para submissão de formulário) e **compõe uma instância de
Dropdown por cima** — reaproveitando 100% do posicionamento, navegação por
setas e fechamento do Dropdown, em vez de duplicar essa lógica. A seleção
atualiza o `<select>` nativo e dispara `change` nativo (compatibilidade com
listeners externos), além de `clarus:select:changed`. ARIA usa
`role="listbox"`/`"option"`/`aria-selected` (semântica mais correta para
este caso, em vez de `"menu"`/`"menuitem"` herdado do Dropdown). Tamanhos
via `data-size="sm"/"lg"` no `<select>` (`.form-select-sm`/`-lg`,
`scss/forms/_forms.scss`).

Mockup: `mockup/modal-select.html`.

### Accordion, Tabs e Toast

Os três reaproveitam a infraestrutura de transição/collapse
(`js/core/transition.js`).

**Accordion** (`.accordion`/`.accordion-item`/`.accordion-header`/
`.accordion-button`/`.accordion-collapse`/`.accordion-body`,
`scss/components/_accordion.scss`): `js/accordion.js` usa `collapse()`/
`expand()` de `Clarus.core` para animar a altura de cada painel; só um
painel aberto por vez por padrão (`data-multiple="true"` permite vários
simultâneos).

**Tabs** (`.tabs`/`.tab-content`/`.tab-pane`, `scss/components/_tabs.scss`,
reaproveitando `.nav-link` da Navbar com um indicador de sublinhado escopado
a `.tabs`): `js/tabs.js` alterna `.active` no link e no painel
correspondente, com navegação por ArrowLeft/ArrowRight/Home/End entre as
abas habilitadas (`role="tablist"`/`"tab"`/`"tabpanel"`, `aria-selected`,
`tabindex` roving), disparando `clarus:tab:changed`.

**Toast** (`.toast-container`/`.toast`/`.toast-header`/`.toast-body`,
variantes de cor de estado via `.toast-#{nome}`,
`scss/components/_toasts.scss`): `js/toast.js` usa `expand()`/`collapse()`
para mostrar/esconder, com timer de auto-dismiss configurável (`data-delay`,
`data-autohide="false"` para desativar) e dismiss via
`data-dismiss="toast"`. Instâncias são criadas no auto-init mas só ficam
visíveis quando `.show()` é chamado (tipicamente após alguma ação), via
`Clarus.Toast.getInstance(el).show()`.

Mockup: `mockup/accordion-tabs-toast.html`.

### Spinner e Progress

Indicadores de carregamento e progresso, 100% CSS (sem JavaScript). Spinner
giratório `.spinner` (anel com um lado transparente, animação contínua
`clarus-spin`), com tamanhos (`.spinner-sm`/`.spinner-lg`) e variantes de cor
de estado (`.spinner-#{nome}`) via os tokens `--clarus-color-*`; a cor herda
de `currentColor`, permitindo colorir também com utilitários de texto.

Barra de progresso `.progress`/`.progress-bar`
(`scss/components/_spinner.scss`): a largura do preenchimento é controlada por
`--clarus-progress-value` (0–100) ou por `style="width"`, com transição suave.
Tamanhos (`.progress-sm`/`.progress-lg`), variantes de cor de estado
(`.progress-bar-#{nome}`, reaproveitando `color-contrast()` como botões/badges)
e faixas diagonais opcionais (`.progress-bar-striped`, animáveis com
`.progress-bar-animated`). Toda animação respeita `prefers-reduced-motion`
(spinner desacelera, listras param). ARIA fica a cargo do consumidor
(`role="status"` no spinner, `role="progressbar"` + `aria-valuenow` na barra).

Mockup: `mockup/spinner-progress.html`.

### Carousel

Carrossel de slides (`.carousel`/`.carousel-inner`/`.carousel-item`,
`scss/components/_carousel.scss`). O layout padrão é "slide": `.carousel-inner`
é uma trilha flex e `js/carousel.js` a desloca por `translateX(-index*100%)`;
o recorte (`overflow: hidden`) fica no `.carousel` (elemento parado), não na
trilha, senão a área de recorte se moveria junto e cortaria os slides
seguintes. A variante `.carousel-fade` empilha os slides e anima a opacidade.
Controles `.carousel-control-prev`/`-next` (setas) e `.carousel-indicators`
(dots) são opcionais — o JS liga cada um ao slide correspondente; o
modificador opcional `.carousel-hover-controls` esconde as setas até o
hover/foco (`:focus-within`) do carrossel.

`js/carousel.js` (`Clarus.Carousel`) segue a API da seção 20: auto-init via
`data-clarus="carousel"`, `Clarus.Carousel.getInstance()`, métodos
`.next()`/`.prev()`/`.goTo(i)`/`.pause()`/`.dispose()`, evento
`clarus:carousel:slid` (`detail: { from, to }`). Navegação por teclado
(ArrowLeft/Right, Home/End quando o carrossel tem foco), swipe por
pointer events (limiar de 40px) e autoplay opcional (`data-autoplay="true"`,
intervalo por `data-interval`, em ms) que pausa no hover/foco. `role="group"`
+ `aria-roledescription="carousel"`, `aria-hidden` por slide, `aria-current`
nos indicadores; `aria-live` fica `off` no autoplay e `polite` sem ele. As
transições respeitam `prefers-reduced-motion`.

Mockup: `mockup/carousel.html`.

### Stepper

Stepper/Wizard (`.stepper`/`.stepper-header`/`.step`, `scss/components/_stepper.scss`).
Cada `.step` tem um `.step-indicator` (círculo com número, ou um "check" em SVG
quando concluído) e um `.step-label`; a variante `.stepper-vertical` empilha os
passos com `.step-content` (label + `.step-description`). Estados por passo:
padrão (pendente), `.step-active`, `.step-completed` e `.step-error`. O conector
entre passos é desenhado via `::after` e fica na cor primária depois de um passo
concluído (indica progresso) — a regra usa `:not(:last-child)` para casar a
especificidade da regra base do conector. Opcionalmente há painéis de conteúdo
(`.step-panel`, só o ativo visível) e ações de navegação (`.stepper-actions` com
botões `[data-stepper="prev"]`/`[data-stepper="next"]`).

`js/stepper.js` (`Clarus.Stepper`) segue a API da seção 20: auto-init via
`data-clarus="stepper"`, `getInstance()`, métodos `.next()`/`.prev()`/`.goTo(i)`/
`.setError(i, bool)`/`.complete()`/`.dispose()`. Antes de cada troca dispara o
evento **cancelável** `clarus:stepper:beforechange` (`detail: { from, to }`) —
prevenir com `preventDefault()` bloqueia o avanço (hook de validação por passo);
depois de trocar dispara `clarus:stepper:changed`, e ao concluir o último passo,
`clarus:stepper:completed`. Por padrão é linear (`data-linear`, padrão `true`):
o cabeçalho só navega para passos já concluídos; `data-linear="false"` libera
pular para qualquer passo. Acessibilidade: `aria-current="step"` no passo ativo,
passos clicáveis navegáveis por teclado (Enter/Espaço).

Mockup: `mockup/stepper.html`.

### Offcanvas

Painel deslizante (`.offcanvas`, `scss/components/_offcanvas.scss`), com o
mesmo mecanismo de overlay do Modal (bloqueio de scroll, focus trap,
fechamento por Escape/clique fora), aplicado de forma independente (não
compõe `js/modal.js` — segue o padrão já usado por Accordion/Tabs/Toast, cada
um reaproveitando os módulos de `js/core/` por si). Modificadores de posição
obrigatórios `.offcanvas-start`/`-end`/`-top`/`-bottom` definem o eixo de
tamanho (largura para start/end, altura para top/bottom) e a direção inicial
do `transform`; `.offcanvas-header`/`-title`/`-body`/`-footer` seguem o mesmo
padrão do Modal (reaproveitando `.btn-close`). O `.offcanvas-backdrop` é criado
dinamicamente pelo JS (não fica fixo ao painel, como no Modal, porque o painel
não cobre a tela inteira).

`js/offcanvas.js` (`Clarus.Offcanvas`) segue a API da seção 20: auto-init via
`data-clarus="offcanvas"`, `data-target` no gatilho, `getInstance()`,
`.show()`/`.hide()`/`.toggle()`/`.dispose()`, eventos
`clarus:offcanvas:shown`/`-hidden`. `data-dismiss="offcanvas"` fecha a partir
de qualquer elemento interno; `data-backdrop="static"` desativa Escape e
clique fora (dismiss continua funcionando); `data-backdrop="false"` remove o
elemento visual de backdrop mas mantém Escape e clique fora ativos (via
`onClickOutside` no próprio painel, ignorando cliques no gatilho). Uma
particularidade de implementação: como `visibility: hidden` mantém
`offsetParent` não nulo (diferente de `display: none`), o elemento só fica de
fato focável depois que o navegador processa a transição de visibilidade —
por isso a ativação do focus trap é adiada por um duplo
`requestAnimationFrame` (mesma técnica já usada por `collapse()`/`expand()`
em `js/core/transition.js`).

Mockup: `mockup/offcanvas-popover.html`.

### Popover

Painel flutuante com conteúdo rico (`.popover`/`.popover-header`/`-body`/
`-footer`, `scss/components/_popover.scss`), posicionado com a mesma técnica
do Tooltip (`.popover-arrow`, quadrado rotacionado 45°) mas com aparência de
card de superfície (`--clarus-color-surface`/`-border`, `--clarus-shadow-md`)
em vez do chip escuro do tooltip, já que pode conter elementos interativos.
`role="dialog"` (não `"tooltip"`, que por spec ARIA não pode conter conteúdo
interativo) com `aria-modal="false"` — é um overlay leve, sem focus trap e sem
bloqueio de scroll (diferente de Modal/Offcanvas).

`js/popover.js` (`Clarus.Popover`) é independente (não compõe `Tooltip` nem
`Dropdown`), reaproveitando apenas `positioning.js`
(`computePosition`/`applyPosition`, como Dropdown/Tooltip) e
`onClickOutside`/`onEscapeKey`. Segue a API da seção 20
(`data-clarus="popover"`, `data-target` no gatilho, `getInstance()`,
`.show()`/`.hide()`/`.toggle()`/`.dispose()`, eventos
`clarus:popover:shown`/`-hidden`). `data-trigger` controla o disparo:
`"click"` (padrão, com `onClickOutside` ignorando o gatilho e Escape
devolvendo o foco), `"hover"` (mouseenter/mouseleave no gatilho **e** no
próprio popover, com um pequeno delay de saída para permitir mover o mouse
para dentro do conteúdo), `"focus"` (usa `focusout`/`relatedTarget` em vez de
`blur`, pela mesma razão do hover) ou `"manual"` (instância criada via
auto-init, sem nenhum listener automático — só API programática, no espírito
do Toast). `data-dismiss="popover"` fecha a partir de qualquer elemento
interno; `data-placement`/`data-align` controlam o posicionamento.

Mockup: `mockup/offcanvas-popover.html`.

### Segmented Control

Grupo de botões com estado selecionado (`.segmented-control`/`.segmented-item`/
`.segmented-label`, `scss/components/_segmented-control.scss`), 100% CSS.
Modo exclusivo: `<input type="radio">` (mesmo `name` em todos os itens do
grupo). Modo inclusivo: `<input type="checkbox">`, cada item
seleciona/deseleciona de forma independente. O `<input>` fica visualmente
oculto (mesma técnica de `.file-input`, `scss/forms/_forms.scss`) e o
`<label>` irmão recebe o estilo — o item selecionado reaproveita
`color-contrast()` (mesma função de botões/badges/pagination) para garantir
contraste. Tamanhos `.segmented-control-sm`/`-lg`.

Mockup: `mockup/segmented-control.html`.

### Skeletons

Placeholder de carregamento (`.skeleton`, `scss/components/_skeleton.scss`),
100% CSS. Variantes `.skeleton-text`/`-circle`/`-rect`; tamanho/forma
controlados por largura/altura inline ou pelo elemento host. Animação padrão
"pulse" (oscila a opacidade); variante `.skeleton-wave` substitui por um
brilho que varre da esquerda pra direita via pseudo-elemento. Ambas
desativadas em `prefers-reduced-motion: reduce`.

Mockup: `mockup/skeletons.html`.

### Timeline

Linha do tempo (`.timeline`/`.timeline-item`/`.timeline-marker`/
`.timeline-content`, `scss/components/_timeline.scss`), 100% CSS, vertical por
padrão (`.timeline-horizontal` inverte o eixo). Estados por item: padrão
(pendente), `.timeline-active`, `.timeline-completed` (marcador com "check",
mesmo ícone do Stepper) e `.timeline-failed`, reaproveitando os tokens de cor
de estado (`--clarus-color-primary/success/danger`). O conector entre
marcadores fica na cor de sucesso depois de um item concluído, mesma lógica
de progresso do Stepper (`scss/components/_stepper.scss`).

Mockup: `mockup/timeline.html`.

### Collapse (standalone)

Extrai o padrão `collapse()`/`expand()` de `js/core/transition.js` — já usado
internamente pelo Accordion — para uma seção expansível independente, sem
precisar de um accordion completo. `.collapse` (`scss/components/_collapse.scss`)
só define o `overflow: hidden` exigido pela animação de `height`. `js/collapse.js`
(`Clarus.Collapse`) segue a API da seção 20: auto-init via
`data-clarus="collapse"` no gatilho com `data-target`, `getInstance()`,
`.show()`/`.hide()`/`.toggle()`/`.dispose()`, eventos
`clarus:collapse:shown`/`-hidden`, `aria-expanded`/`aria-controls` geridos
automaticamente. Estado inicial aberto via `aria-expanded="true"` no gatilho.

Mockup: `mockup/collapse.html`.

### Breadcrumb Avançado

Estende `.breadcrumb`/`.breadcrumb-item` (Fase 5, `scss/components/_breadcrumbs.scss`)
com truncamento e colapso automático em telas pequenas, via `js/breadcrumb.js`
(`Clarus.Breadcrumb`, auto-init com `data-clarus="breadcrumb"` na lista,
`data-max-items` configurável). Cada label ganha `.breadcrumb-item-truncate`
(reticências por CSS); labels que realmente transbordam (medido só depois de
`document.fonts.ready`, por causa da tipografia self-hosted da seção 18.2)
ganham um `Tooltip` (`js/tooltip.js`) com o texto completo. Abaixo do
breakpoint `sm` (640px), se a lista tiver mais itens que `data-max-items`,
os níveis intermediários são substituídos por um único item `.breadcrumb-more`
("…") que **compõe um `Dropdown`** (`js/dropdown.js`, mesmo padrão de
composição do Select customizado da Fase 9) com os links ocultos — mantém
sempre o primeiro e o último nível visíveis.

Mockup: `mockup/pagination-breadcrumbs.html` (exemplo avançado adicionado ao
mockup já existente da Fase 5).

### Input Group

Funde `.form-control` (ou `.form-select`/`.btn`) com "addons" de texto/ícone
de prefixo/sufixo (`.input-group`/`.input-group-text`,
`scss/forms/_forms.scss`), 100% CSS. A altura do addon acompanha a do
controle via `align-items: stretch` (sem precisar fixar `height`); as bordas
adjacentes são fundidas (sem dupla borda) e só as pontas do grupo mantêm o
radius. Tamanhos `.input-group-sm`/`-lg`.

Mockup: `mockup/input-group.html`.

### Alert Dialog / Confirm

Variante do Modal (`scss/components/_alert-dialog.scss`, estende
`.modal`/`.modal-dialog`/`.modal-content`/`.modal-footer` sem duplicar
layout) para confirmação, 100% programática — ao contrário dos demais
componentes (auto-init declarativo via `data-clarus`), é montada na hora por
`Clarus.confirm(options)` (`js/confirm.js`), sem precisar de marcação
pré-declarada na página. Internamente reaproveita `js/modal.js` (foco,
teclado, overlay) com um gatilho sintético. Retorna uma `Promise<boolean>`:
`true` se o botão de confirmação for clicado, `false` se cancelado ou
fechado por Escape/clique fora. Opções: `title`, `message`, `confirmText`,
`cancelText`, `variant` (cor de estado do ícone circular e do botão de
confirmação, reaproveitando `color-contrast()`). O foco volta para o
elemento que estava focado antes da chamada (o botão que abriu o diálogo).

Mockup: `mockup/alert-dialog.html`.

### Divider

Linha divisória (`scss/components/_divider.scss`), 100% CSS.
`<hr class="divider">` para o traço simples; `<div class="divider">` (não
pode ser `<hr>`, que não aceita filhos) com `.divider-label` para texto
centralizado, flanqueado por duas linhas via pseudo-elementos.

Mockup: `mockup/divider.html`.

### Empty State

Bloco padrão para listas/telas vazias (`.empty-state`,
`scss/components/_empty-state.scss`), 100% CSS: `.empty-state-icon` (slot
vazio para o consumidor colocar seu próprio SVG/emoji/ilustração),
`.empty-state-title`, `.empty-state-text` e ação opcional reaproveitando os
botões existentes.

Mockup: `mockup/empty-state.html`.

### Rating / Stars

Avaliação por estrelas (`.rating`/`.rating-star`, `scss/components/_rating.scss`),
100% CSS — mesma técnica de input oculto + label irmão do Segmented Control
(seção anterior): um `<input type="radio">` por estrela, exclusivo dentro do
grupo. A marcação usa os pares input+label em ordem decrescente de valor
(5, 4, 3...) com `.rating` em `row-reverse` — o truque clássico de CSS para
destacar "a estrela clicada e todas à esquerda dela" usando só o combinador
de irmãos gerais (`~`). Tamanhos `.rating-sm`/`-lg`.

Mockup: `mockup/rating.html`.

## 22. Testes Automatizados

- **Teste funcional de JavaScript:** Vitest com `jsdom` (`vitest.config.mjs`,
  `tests/unit/`), cobrindo estado, atributos ARIA e eventos disparados por
  cada componente interativo e pelos módulos de `js/core/` (posicionamento,
  overlay, foco, transição). Executado via `npm test`.
- **Teste visual (regressão de CSS):** Playwright (`playwright.config.mjs`,
  `tests/visual/`), com screenshots de baseline por mockup e testes de
  interação (abrir/fechar dropdown, modal, accordion, tabs, toast — foco,
  Escape, clique fora, navegação por teclado). Executado via
  `npm run test:visual`; as baselines são geradas por plataforma (sufixo
  `-win32`/`-linux` no nome do arquivo), com as baselines Linux geradas em
  um container Docker (`mcr.microsoft.com/playwright`) para bater com o
  ambiente do CI (`ubuntu-latest`).
- Os arquivos em `mockup/*.html` são as fixtures oficiais dos testes
  visuais — cada componente/grupo implementado tem um mockup dedicado,
  mantido atualizado.
- Testes (funcionais e visuais) rodam automaticamente no GitHub Actions a
  cada push/PR (`.github/workflows/ci.yml`), além do lint e build.
