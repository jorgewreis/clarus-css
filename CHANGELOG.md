# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere a [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Added

- Etapa 6 do roadmap de paridade (`docs/gap-analysis-componentes.md`),
  primeira etapa pós Top-10:
  - Input Group (`scss/forms/_forms.scss`): `.input-group`/`.input-group-text`,
    100% CSS. Funde `.form-control`/`.form-select`/`.btn` com addons de
    prefixo/sufixo, bordas adjacentes sem duplicação e altura do addon
    acompanhando o controle via `align-items: stretch`. Tamanhos
    `.input-group-sm`/`-lg`. Mockup `mockup/input-group.html`.
  - Alert Dialog / Confirm (`scss/components/_alert-dialog.scss`,
    `js/confirm.js`): variante do Modal para confirmação, montada
    dinamicamente (sem HTML pré-declarado) por `Clarus.confirm(options)`,
    reaproveitando `js/modal.js` (foco/teclado/overlay). Retorna uma
    `Promise<boolean>` (`true` ao confirmar, `false` ao cancelar/Escape/
    clique fora), com o foco voltando ao elemento que chamou. Opções
    `title`/`message`/`confirmText`/`cancelText`/`variant`. Mockup
    `mockup/alert-dialog.html`.
  - Testes unitários (Vitest) para `confirm()` (`tests/unit/confirm.test.js`).
- Etapa 5 do roadmap de paridade (`docs/gap-analysis-componentes.md`), que
  fecha o Top-10 de gaps frente aos frameworks líderes:
  - Componente Segmented Control (`scss/components/_segmented-control.scss`):
    `.segmented-control`/`.segmented-item`/`.segmented-label`, 100% CSS.
    Modo exclusivo (`<input type="radio">`) ou inclusivo (`<input
    type="checkbox">`), input oculto pela mesma técnica de `.file-input`
    (`scss/forms/_forms.scss`), reaproveitando `color-contrast()` no item
    selecionado. Tamanhos `.segmented-control-sm`/`-lg`. Mockup
    `mockup/segmented-control.html`.
  - Componente Skeletons (`scss/components/_skeleton.scss`): `.skeleton` base
    e variantes `.skeleton-text`/`-circle`/`-rect`, 100% CSS. Animação
    "pulse" por padrão; `.skeleton-wave` varre um brilho via
    pseudo-elemento. Ambas desativadas em `prefers-reduced-motion: reduce`.
    Mockup `mockup/skeletons.html`.
  - Componente Timeline (`scss/components/_timeline.scss`): `.timeline`/
    `.timeline-item`/`.timeline-marker`, 100% CSS, vertical por padrão
    (`.timeline-horizontal` inverte o eixo). Estados padrão (pendente)/
    `.timeline-active`/`.timeline-completed`/`.timeline-failed`
    reaproveitando os tokens de cor de estado; conector de progresso na
    mesma lógica do Stepper. Mockup `mockup/timeline.html`.
  - Collapse standalone (`scss/components/_collapse.scss`, `js/collapse.js`):
    extrai `collapse()`/`expand()` de `js/core/transition.js` (já usado pelo
    Accordion) para uma seção expansível independente. `Clarus.Collapse`
    segue a API da seção 20 (`data-clarus="collapse"`, `data-target`,
    `getInstance()`, `.show()`/`.hide()`/`.toggle()`/`.dispose()`, eventos
    `clarus:collapse:shown`/`-hidden`). Mockup `mockup/collapse.html`.
  - Breadcrumb avançado (`scss/components/_breadcrumbs.scss`,
    `js/breadcrumb.js`): truncamento por CSS com tooltip (`js/tooltip.js`)
    só quando o texto transborda (medido após `document.fonts.ready`); abaixo
    do breakpoint `sm` (640px), colapsa os níveis intermediários num item
    "…" que compõe um `Dropdown` (`js/dropdown.js`), mantendo sempre o
    primeiro e o último nível visíveis. `data-max-items` configurável.
    Mockup `mockup/pagination-breadcrumbs.html` (exemplo avançado).
- Testes unitários (Vitest) para Collapse e Breadcrumb
  (`tests/unit/collapse.test.js`, `tests/unit/breadcrumb.test.js`).

### Changed

- Paleta de cores evoluída para escalas completas 100-900 por matiz
  (yellow/green/blue/gray/red/purple) com papéis semânticos por cor de
  estado (`color`/`-hover`/`-active`/`-disabled`/`bg`/`bg-2`/`text`/`text-2`/
  `border`) em `scss/settings/_colors.scss`, incluindo uma nova cor
  `secondary`; `scss/tokens/_root.scss` e `scss/themes/_dark.scss`
  (variantes de dark mode por peso de tint) acompanham a nova estrutura.
- Fonte monoespaçada Source Code Pro passa a ser self-hosted
  (`assets/fonts/source-code-pro/`, licença OFL), removendo o último
  `@import` externo de Google Fonts em `scss/base/_typography.scss` —
  completa a meta de dependência externa zero em tempo de execução (seção 6
  de `docs/definitions.md`) também para a fonte mono, no mesmo padrão já
  usado pela Plus Jakarta Sans.

- Componente Stepper/Wizard (`scss/components/_stepper.scss`, `js/stepper.js`):
  `.stepper`/`.stepper-header`/`.step` com `.step-indicator` (número, ou "check"
  em SVG quando concluído) e `.step-label`; estados `.step-active`/
  `.step-completed`/`.step-error`; conector de progresso na cor primária após um
  passo concluído; variante `.stepper-vertical` (com `.step-content` +
  `.step-description`); painéis opcionais `.step-panel` e ações `.stepper-actions`
  com `[data-stepper="prev"]`/`[data-stepper="next"]`. `Clarus.Stepper` com
  `.next()`/`.prev()`/`.goTo()`/`.setError()`/`.complete()`/`.dispose()`; evento
  **cancelável** `clarus:stepper:beforechange` (hook de validação por passo),
  `clarus:stepper:changed` e `clarus:stepper:completed`. Linear por padrão
  (`data-linear`), `aria-current="step"` e navegação por teclado. Mockup
  `mockup/stepper.html`. Terceiro item (Etapa 3) do roadmap de paridade.
- Breakpoint adicional `xxxl` (1920px, `scss/settings/_breakpoints.scss`),
  para monitores externos Full HD sem escala — gera automaticamente
  `.col-xxxl-*`, `.container-xxxl` e todos os utilitários responsivos
  `-xxxl` (spacing, gap, flex, display) via os mesmos loops que já geram os
  demais breakpoints.
- Componente Offcanvas (`scss/components/_offcanvas.scss`, `js/offcanvas.js`):
  painel deslizante com posições `.offcanvas-start`/`-end`/`-top`/`-bottom`,
  mesmo mecanismo de overlay do Modal (bloqueio de scroll, focus trap,
  Escape/clique fora), aplicado de forma independente (sem compor
  `js/modal.js`). Backdrop criado dinamicamente pelo JS;
  `data-backdrop="static"` desativa Escape/clique fora, `data-backdrop="false"`
  remove o backdrop visual mantendo Escape/clique fora ativos. `Clarus.Offcanvas`
  com `getInstance()`/`.show()`/`.hide()`/`.toggle()`/`.dispose()`, eventos
  `clarus:offcanvas:shown`/`-hidden`, `data-dismiss="offcanvas"`. Mockup
  `mockup/offcanvas-popover.html`. Primeiro item (Etapa 4) do roadmap de
  paridade.
- Componente Popover (`scss/components/_popover.scss`, `js/popover.js`):
  painel flutuante com conteúdo rico (`.popover-header`/`-body`/`-footer`),
  posicionado via `computePosition()`/`applyPosition()` (como Dropdown/Tooltip),
  `role="dialog"` + `aria-modal="false"` (não é modal — sem focus trap, sem
  bloqueio de scroll). `data-trigger` controla o disparo: `"click"` (padrão),
  `"hover"` (com tolerância para mover o mouse ao conteúdo), `"focus"` (via
  `focusout`/`relatedTarget`) ou `"manual"` (sem listeners automáticos).
  `Clarus.Popover` com `getInstance()`/`.show()`/`.hide()`/`.toggle()`/
  `.dispose()`, eventos `clarus:popover:shown`/`-hidden`, `data-dismiss="popover"`.
  Mockup `mockup/offcanvas-popover.html`. Segundo item (Etapa 4) do roadmap de
  paridade.

### Changed

- Escala de breakpoints (`scss/settings/_breakpoints.scss`) recalibrada para
  as larguras lógicas de tela mais comuns do mercado atual:
  `sm` 576px→640px (tablets pequenos/phablets), `lg` 992px→1024px (tablet
  paisagem/iPad), `xl` 1200px→1280px (laptop comum), `xxl` 1400px→1536px
  (laptop/desktop com escala, ex.: Mac/Windows a 125%). `md` (768px)
  permanece igual. `$container-max-widths` ajustado na mesma proporção
  (600/720/960/1200/1440px). Os nomes de classe não mudam
  (`.col-md-6`, `.d-lg-none`, etc. continuam os mesmos) — só os valores em
  px por trás de cada breakpoint, o que pode alterar sutilmente o layout
  visual de projetos existentes nos pontos de corte afetados.

## [0.3.0] - 2026-07-04

### Added

- Componente Spinner e Progress (`scss/components/_spinner.scss`, 100% CSS):
  spinner giratório `.spinner` (animação `clarus-spin`) com tamanhos
  (`.spinner-sm`/`.spinner-lg`) e variantes de cor de estado
  (`.spinner-#{nome}`); barra de progresso `.progress`/`.progress-bar` com
  largura por `--clarus-progress-value` (0–100), tamanhos
  (`.progress-sm`/`.progress-lg`), variantes de cor
  (`.progress-bar-#{nome}`, via `color-contrast()`) e faixas opcionais
  (`.progress-bar-striped`/`.progress-bar-animated`). Toda animação respeita
  `prefers-reduced-motion`. Mockup `mockup/spinner-progress.html`. Primeiro
  item da Etapa 1 do roadmap de paridade.
- Componente Carousel (`scss/components/_carousel.scss`, `js/carousel.js`):
  carrossel de slides com layout "slide" (trilha flex deslocada por
  `translateX`) e variante `.carousel-fade` (opacidade); setas
  (`.carousel-control-prev`/`-next`) e indicadores (`.carousel-indicators`)
  opcionais, com modificador opcional `.carousel-hover-controls` (setas só no
  hover/foco). `Clarus.Carousel` com `.next()`/`.prev()`/`.goTo()`/`.pause()`/
  `.dispose()`, evento `clarus:carousel:slid`, navegação por teclado
  (setas/Home/End), swipe por pointer events e autoplay opcional
  (`data-autoplay`/`data-interval`, válido para slide e fade) que pausa no
  hover/foco. ARIA completo (`role="group"`, `aria-roledescription`,
  `aria-current` nos indicadores) e respeito a `prefers-reduced-motion`. O
  recorte fica no `.carousel` (elemento parado) e não na trilha, para não
  cortar os slides seguintes ao deslocar. Mockup `mockup/carousel.html`.
  Segundo item (Etapa 2) do roadmap de paridade.
- Testes de regressão visual com Playwright integrados ao CI, com baselines por
  plataforma (`-win32`/`-linux`, estas geradas em container Docker para bater
  com o ambiente do CI).

## [0.2.0] - 2026-07-04

### Added

- Suíte de testes automatizados: testes funcionais de JavaScript com Vitest +
  jsdom (`tests/unit/`, cobrindo estado, ARIA e eventos de cada componente
  interativo e dos módulos de `js/core/`) e testes visuais com Playwright
  (`tests/visual/`, screenshots de baseline por mockup e testes de interação).
  Ambos rodam automaticamente no GitHub Actions a cada push/PR, além do lint e
  do build.

## [0.1.2] - 2026-07-04

### Added

- Componente Botões (`scss/components/_buttons.scss`): variantes sólidas e
  outline por cor de estado (`.btn-primary/success/warning/danger/info`,
  `.btn-outline-*`), tamanhos (`.btn-sm`/`.btn-lg`) e estados de
  hover/active/focus/disabled.
- Função `color-contrast()` (`scss/tools/_mixins.scss`), que escolhe texto
  branco ou preto por cor de fundo com base no contraste WCAG (mínimo 4.5:1).
- Componente Badges (`scss/components/_badges.scss`): variantes sólidas por
  cor de estado (`.badge-primary/success/warning/danger/info`) e tamanhos
  (`.badge-sm`/`.badge-lg`).
- Componente Alertas (`scss/components/_alerts.scss`): variantes tintadas
  por cor de estado (`.alert-primary/success/warning/danger/info`), com
  tokens `--clarus-alert-*-bg`/`-text` (`scss/tokens/_root.scss`,
  sobrescritos no dark mode em `scss/themes/_dark.scss`).
- Funções `tint-color()`/`shade-color()` (`scss/tools/_mixins.scss`), para
  gerar variações claras/escuras de uma cor base.
- Componente Cards (`scss/components/_cards.scss`): `.card-header`,
  `.card-body`, `.card-footer`, `.card-title`, `.card-subtitle`,
  `.card-text` e tamanhos (`.card-sm`/`.card-lg`).
- Utilitários de sombra (`.shadow-sm`/`.shadow`/`.shadow-lg`) em
  `scss/utilities/_shadow.scss`, com tokens `--clarus-shadow-*`
  (`scss/tokens/_root.scss`) e override para dark mode.
- Componente `.btn-close` (`scss/components/_buttons.scss`), reaproveitável
  em cards, e futuramente em modal/toast.
- `.card-header` agora suporta título + botão de fechar alinhados nas
  pontas (layout flex com `justify-content: space-between`).
- `.card-clickable` + `.stretched-link`: torna o card inteiro clicável e
  focável via um único link, sem aninhar elementos interativos.
- `.card-horizontal`: inverte o eixo do card para linha, com raio e borda
  do header/footer ajustados para a lateral.
- Componente Tabelas (`scss/components/_tables.scss`): `.table-striped`,
  `.table-hover`, `.table-bordered`, `.table-borderless`, `.table-sm`,
  `.table-responsive` e variantes de cor de estado
  (`.table-primary/success/warning/danger/info`), reaproveitando os
  tokens `--clarus-alert-*-bg`/`-text` da Fase 2.
- Componente Navbar (`scss/components/_navbar.scss`): `.navbar-brand`,
  `.navbar-nav`, `.nav-link` (com estados `.active`/`.disabled`), versão
  estática (sem dropdown/collapse).
- Componente Paginação (`scss/components/_pagination.scss`): `.page-link`,
  estados `.active`/`.disabled`, reaproveitando `color-contrast()` da
  Fase 1.
- Componente Breadcrumbs (`scss/components/_breadcrumbs.scss`):
  `.breadcrumb-item`, separador via `::before`, estado `.active`.
- Infraestrutura JS compartilhada (`js/core/`), pré-requisito dos
  componentes interativos das próximas fases, sem dependências externas:
  `positioning.js` (`computePosition()`/`applyPosition()`, com flip
  automático e clamp na viewport); `overlay.js` (`lockScroll()`/
  `unlockScroll()` com compensação de scrollbar e contagem de referências,
  `onClickOutside()`); `focus.js` (`createFocusTrap()` com ciclo
  Tab/Shift+Tab, `onEscapeKey()`); `transition.js` (`collapse()`/
  `expand()` animando `height`, respeitando `prefers-reduced-motion`).
  Reexportado como `Clarus.core` pelo bundle único e importável de forma
  granular (`clarus-css/js/core/*`).
- Componente Dropdown (`scss/components/_dropdown.scss`, `js/dropdown.js`):
  `.dropdown-toggle`/`.dropdown-menu`/`.dropdown-item`/`.dropdown-divider`/
  `.dropdown-header`; posicionamento via `Clarus.core` com flip automático e
  alinhamento configurável (`data-align="start"`/`"center"`/`"end"`, padrão
  `"start"`), navegação por ArrowUp/ArrowDown, fecha com clique fora/em um
  item/Escape (foco retorna ao toggle). Primeiro componente a seguir a API
  JS da seção 20: auto-init via `data-clarus="dropdown"`, `Clarus.Dropdown`
  com `getInstance()`/`.show()`/`.hide()`/`.toggle()`/`.dispose()`, eventos
  `clarus:dropdown:shown`/`-hidden`.
- `computePosition()` (`js/core/positioning.js`) ganhou a opção `align`
  para o eixo cruzado (usada pelo Dropdown acima), além do `placement`
  já existente.
- Componente Tooltip (`scss/components/_tooltips.scss`, `js/tooltip.js`):
  `.tooltip`/`.tooltip-inner`/`.tooltip-arrow` com 4 posicionamentos
  (top/bottom/left/right) e novos tokens `--clarus-tooltip-bg`/`-text`
  (invertidos no dark mode); show/hide por hover/foco/blur e Escape,
  `aria-describedby` ligando referência e tooltip; mesma API JS do
  Dropdown (`Clarus.Tooltip`, `data-clarus="tooltip"`, eventos
  `clarus:tooltip:shown`/`-hidden`).
- `js/core/register.js` (`autoInit()`/`createInstanceRegistry()`):
  generaliza o padrão de auto-inicialização via `data-clarus` e registro de
  instância (`getInstance()`) para os próximos componentes interativos.
- Componente Modal (`scss/components/_modal.scss`, `js/modal.js`):
  `.modal`/`.modal-dialog`/`.modal-content`/`.modal-header`/`.modal-title`/
  `.modal-body`/`.modal-footer`, tamanhos `.modal-sm`/`.modal-lg`. Reaproveita
  a infraestrutura da Fase 7: `lockScroll()` enquanto aberto,
  `createFocusTrap()`, fecha com Escape/clique fora (foco volta ao
  gatilho) ou `data-dismiss="modal"`; `data-backdrop="static"` desativa
  fechar por Escape/clique fora. Segue a mesma API JS de Dropdown/Tooltip
  (`Clarus.Modal`, `data-clarus="modal"`, eventos
  `clarus:modal:shown`/`-hidden`).
- Select customizado (`js/select.js`, `Clarus.Select`): gera a marcação
  (`.form-select` + `.dropdown-menu`/`.dropdown-item` por `<option>`) a
  partir de um `<select>` nativo (`data-clarus="select"`, oculto mas
  sincronizado para submissão de formulário) e compõe uma instância de
  `Dropdown` por cima, reaproveitando posicionamento/navegação/fechamento
  da Fase 8 em vez de duplicar essa lógica; dispara `change` nativo e
  `clarus:select:changed` ao selecionar. Novo `.form-select`/
  `.form-select-sm`/`-lg` em `scss/forms/_forms.scss`.
- Componente Accordion (`scss/components/_accordion.scss`, `js/accordion.js`):
  `.accordion`/`.accordion-item`/`.accordion-header`/`.accordion-button`/
  `.accordion-collapse`/`.accordion-body`. Reaproveita `collapse()`/
  `expand()` de `Clarus.core` (Fase 7) para animar a altura de cada painel;
  só um painel aberto por vez por padrão (`data-multiple="true"` permite
  vários); segue a API JS da seção 20 (`Clarus.Accordion`,
  `data-clarus="accordion"`, eventos `clarus:accordion:shown`/`-hidden`).
- Componente Tabs (`scss/components/_tabs.scss`, `js/tabs.js`):
  `.tabs`/`.tab-content`/`.tab-pane`, reaproveitando `.nav-link` (Navbar,
  Fase 4) com indicador de sublinhado escopado a `.tabs`. Navegação por
  ArrowLeft/ArrowRight/Home/End (`role="tablist"`/`"tab"`/`"tabpanel"`,
  `aria-selected`, `tabindex` roving), disparando `clarus:tab:changed`
  (`Clarus.Tabs`, `data-clarus="tabs"`).
- Componente Toast (`scss/components/_toasts.scss`, `js/toast.js`):
  `.toast-container`/`.toast`/`.toast-header`/`.toast-body`, variantes de
  cor de estado (`.toast-#{nome}`, reaproveitando os tokens
  `--clarus-alert-*-bg`/`-text` da Fase 2). Reaproveita `expand()`/
  `collapse()` de `Clarus.core` para mostrar/esconder, com timer de
  auto-dismiss configurável (`data-delay`, `data-autohide="false"` para
  desativar) e dismiss via `data-dismiss="toast"`; segue a API JS da seção
  20 (`Clarus.Toast`, `data-clarus="toast"`, eventos
  `clarus:toast:shown`/`-hidden`).
- Formulários avançados (`scss/forms/_forms.scss`): estados de validação
  `.form-control.is-valid`/`.is-invalid` (borda e anel de foco em
  `--clarus-color-success`/`-danger`) com `.valid-feedback`/
  `.invalid-feedback` (exibidos via seletor de irmão adjacente, sem
  JavaScript); upload de arquivo estilizado `.file-upload`/`.file-input`/
  `.file-label` (input nativo ocultado via `clip-path`, mantendo foco e
  navegação por teclado), com tamanhos (`.file-label-sm`/`-lg`) e estado
  desabilitado.
- Paleta de cores oficial "Indigo autoral" (`docs/definitions.md`, seção
  18.1) em `scss/settings/_colors.scss`: `primary #4F46E5`, `success
  #1BC559`, `warning #F0B40E`, `danger #DC263E`, `info #8BA2C4`; escala
  neutra completada para 9 degraus cheios (`$color-gray-100` a
  `$color-gray-900`).
- Variantes de `primary`/`success`/`warning`/`danger`/`info` para o dark
  mode (`scss/themes/_dark.scss`, token `--clarus-color-#{nome}`, via
  `color.mix()` com peso por cor em `$dark-color-weights`).
- Tipografia principal Plus Jakarta Sans self-hosted (`docs/definitions.md`,
  seção 18.2): arquivos `.woff2` (licença OFL) em
  `assets/fonts/plus-jakarta-sans/`, com `@font-face` em
  `scss/base/_typography.scss` no lugar do `@import` do Google Fonts,
  cumprindo a meta de dependência externa zero em tempo de execução para a
  fonte principal (Source Code Pro, no monoespaçado, mantida via Google
  Fonts).

### Fixed

- Duplicidade entre `$color-primary` e `$color-info` (mesmo valor de azul)
  em `scss/settings/_colors.scss`, corrigida pela nova paleta "Indigo
  autoral".
- `.dropdown-menu` sem `position: absolute` no CSS base (só era aplicado
  via JS no `show()`): a medição de largura acontecia com o menu ainda como
  bloco normal (ocupando a largura inteira do `body`), quebrando o cálculo
  de alinhamento `start`/`end`. Corrigido em
  `scss/components/_dropdown.scss`.
- Texto solto (`<h2>`/`<p>` sem cor própria) invisível no painel escuro de
  vários mockups (`badges-alerts.html`, `buttons.html`, `forms-advanced.html`,
  `dropdown-tooltip.html`): `[data-theme="dark"].theme-panel` só definia
  `background-color`, nunca `color` — o texto herdava o valor já resolvido
  de `color` do `body` (calculado no tema claro), que não é reavaliado só
  por redefinir a custom property num elemento descendente.
- Tooltip/Dropdown não invertiam para o tema escuro quando o elemento de
  referência estava dentro de um wrapper com `data-theme="dark"` (em vez de
  no `<html>`): como `js/tooltip.js`/`js/dropdown.js` reanexam o elemento
  flutuante a `document.body`, ele saía do escopo do wrapper e sempre usava
  os tokens do tema claro. Agora ambos copiam o `data-theme` do ancestral
  mais próximo do elemento de referência/toggle para o elemento flutuante a
  cada `show()`.
- `.btn-close` (`scss/components/_buttons.scss`): o "×" (glifo `\00d7`)
  centralizado por flexbox não ficava opticamente centrado no botão, por
  depender da métrica vertical do glifo na fonte. Substituído por duas
  barras via `::before`/`::after`, giradas ±45° e centralizadas por
  `transform: translate(-50%, -50%)` a partir do centro absoluto do
  botão — centralização exata, independente de fonte.

## [0.1.1] - 2026-07-01

### Added

- Definições iniciais do projeto (`docs/definitions.md`) e arquitetura SCSS
  (`docs/scss-architecture.md`).
- Estrutura modular `scss/` (settings, tools, tokens, base, layout, forms,
  components, utilities, themes).
- Sistema de layout: containers, grid de 12 colunas baseado em Flexbox
  (`.row`/`.col-*`) e utilitários responsivos por breakpoint.
- Pipeline de build: Sass + PostCSS (Autoprefixer) + esbuild, gerando `dist/css`
  (`layout`, `forms`, `components`, `helpers`, `clarus`) e `dist/js/clarus.js`,
  cada um em versão expandida e minificada com source maps.
- Lint de SCSS via stylelint.
- CI no GitHub Actions (lint + build).
- Utilitários de tipografia (`text-*`, `fw-*`, `fs-*`, `font-*`) em
  `scss/utilities/_typography.scss`.
- Estado `:read-only` em `.form-control`.

[Unreleased]: https://github.com/jorgewreis/clarus-css/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/jorgewreis/clarus-css/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/jorgewreis/clarus-css/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/jorgewreis/clarus-css/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/jorgewreis/clarus-css/releases/tag/v0.1.1
