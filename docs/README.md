# Documentação do Clarus CSS

Referência completa de uso do framework — para a visão geral do projeto
(por que existe, instalação rápida), veja o [README raiz](../README.md).

## Primeiros passos

- [Instalação](getting-started/installation.md) — npm, CDN, fontes,
  distribuições disponíveis, import via Sass.
- [Formas de uso](getting-started/usage.md) — convenção de nomenclatura,
  auto-init, API JS comum, eventos.

Antes de escolher um componente, consulte a [política de estabilidade e
roadmap](reference/stability.md). O núcleo essencial é o caminho recomendado;
os componentes avançados permanecem disponíveis, mas não são pré-requisito.

## Guias

- [Theming](guides/theming.md) — as 3 camadas de tokens, customização
  global e via Sass.
- [Dark mode](guides/dark-mode.md) — ativação, como funciona, toggle.
- [Layout avançado](guides/layout-advanced.md) — Stack, Cluster, Sidebar,
  utilitários sticky e de container query (`@container`).
- [Acessibilidade](guides/accessibility.md) — padrões compartilhados de
  foco, teclado, ARIA e contraste.
- [Migração para v1.0.0](guides/migration-v1.md) — renomeação da API
  pública (`cl-`/`u-`/`is-`), codemod.
- [Migração de outro framework](guides/migration-external.md) — tabela de
  equivalência de classes/componentes pra quem vem de outro framework CSS.
- [Ícones](guides/icons.md) — pacote opcional `clarus-icons` (Lucide),
  classe utilitária `.cl-icon`, uso via SVG puro ou módulo JS.
- [Utilitários de impressão](guides/print.md) — `.u-print-hide`/`.u-print-only`
  e variações de `display` restritas a `@media print`.
- [Gráficos](guides/charts.md) — tokens `--cl-chart-*` agnósticos de
  biblioteca (Chart.js, ECharts, Recharts…).

## Componentes

### Núcleo essencial

Layout · [Button](components/button.md) · [Card](components/card.md) ·
[Alert](components/alert.md) · [Badge](components/badge.md) ·
[Table](components/table.md) · [Input](components/input.md) ·
[Select customizado](components/select.md) · [Checkbox](components/checkbox.md) ·
[Radio](components/radio.md) · [Switch](components/switch.md) ·
[Navbar](components/navbar.md) · [Dropdown](components/dropdown.md) ·
[Tabs](components/tabs.md) · [Accordion](components/accordion.md) ·
[Modal](components/modal.md) · [Toast](components/toast.md) ·
[Pagination](components/pagination.md) · [Breadcrumb](components/breadcrumb.md)

### Formulários e extensões

[Input](components/input.md) · [Input Group](components/input-group.md) ·
[Select customizado](components/select.md) · [Combobox](components/combobox.md) ·
[Datepicker / Timepicker](components/datepicker.md) ·
[Checkbox](components/checkbox.md) ·
[Radio](components/radio.md) · [Switch](components/switch.md) ·
[Range/Slider](components/range.md) ·
[File Upload](components/file-upload.md) ·
[Upload avançado](components/file-upload-advanced.md)

### Conteúdo e feedback

[Button](components/button.md) · [Card](components/card.md) ·
[Badge](components/badge.md) · [Tag](components/tag.md) ·
[Alert](components/alert.md) · [Table](components/table.md) ·
[DataTable](components/datatable.md) ·
[Divider](components/divider.md) · [Empty State](components/empty-state.md) ·
[Tile](components/tile.md) · [Skeleton](components/skeleton.md)

### Navegação e overlays

[Navbar](components/navbar.md) · [Tabs](components/tabs.md) ·
[Dropdown](components/dropdown.md) · [Nested Menu](components/nested-menu.md) ·
[Tree View](components/tree-view.md) ·
[Pagination](components/pagination.md) · [Breadcrumb](components/breadcrumb.md) ·
[Accordion](components/accordion.md) · [Collapse](components/collapse.md) ·
[Stepper](components/stepper.md)

Alert Dialog · Offcanvas · Tooltip · Popover · Collapse · Stepper · Nested Menu ·
Tree View · Notification Center · Spinner & Progress

### Componentes avançados

[Combobox](components/combobox.md) · [Datepicker / Timepicker](components/datepicker.md) ·
[DataTable](components/datatable.md) · [Command Palette](components/command-palette.md) ·
[Carousel](components/carousel.md) · [Upload avançado](components/file-upload-advanced.md) ·
[Rating](components/rating.md) · [Segmented Control](components/segmented-control.md) ·
[Timeline](components/timeline.md)

Cada componente tem um exemplo funcional dedicado (claro + escuro) em
[`mockup/`](../mockup) — a forma mais rápida de ver o framework em ação.
Para uma visão geral compacta de todos os componentes numa página só, veja
[`mockup/kitchen-sink.html`](../mockup/kitchen-sink.html) (smoke test visual
rápido, não substitui os mockups individuais).

## Ecossistema

Pacotes opcionais, publicados separadamente do core:

- [`clarus-icons`](../packages/clarus-icons/README.md) — ícones SVG
  (Lucide), tree-shakeable, zero dependências em runtime.
- [`clarus-cli`](../packages/clarus-cli/README.md) — CLI (`build`/`theme`/
  `analyze`) para projetos consumidores.
- [`clarus-react`](../packages/clarus-react/README.md) — wrapper React
  fino (Modal/Dropdown/Tabs), delega pro JS vanilla existente.

[Showcase de produção](showcase.md) — 🚧 em construção, aguardando casos
de uso reais.

## Templates prontos

4 templates completos (HTML + CSS/JS já publicados) para copiar como
ponto de partida — não substituem os mockups individuais, são páginas
reais montadas com os componentes existentes:

[`mockup/templates/dashboard.html`](../mockup/templates/dashboard.html) ·
[`mockup/templates/auth.html`](../mockup/templates/auth.html) ·
[`mockup/templates/landing.html`](../mockup/templates/landing.html) ·
[`mockup/templates/admin.html`](../mockup/templates/admin.html)

## Comparação com outros frameworks

[Clarus vs Bootstrap vs Tailwind CSS](comparison.md) — filosofia, tamanho
de bundle, dependências e tema escuro, com dados públicos e
reproduzíveis (sem benchmarks de performance ao vivo, marcados como
pendente de metodologia).

## Referência

- [Design tokens](reference/design-tokens.md) — lista completa de tokens
  CSS e variáveis Sass.
- [Arquitetura SCSS](reference/scss-architecture.md) — organização dos
  módulos, cascade layers, pipeline de build.
- [Suporte a navegadores](reference/browser-support.md) — alvo,
  fallbacks, `.browserslistrc`.
- [Relatório de contraste](reference/contrast-report.md) — auditoria WCAG
  dos tokens de cor.
- [Matriz de acessibilidade](reference/accessibility-matrix.md) — teclado,
  ARIA e gestão de foco por componente.
- [Baseline de tamanho](reference/size-baseline.json) — medição gzip das
  distribuições, com budgets no CI.
- [Definições do projeto](reference/definitions.md) — decisões de
  arquitetura e escopo.
- [Estabilidade e roadmap](reference/stability.md) — o que é essencial,
  estendido ou avançado.

## Contribuindo

[Guia de contribuição](contributing/contributing.md) — setup local,
convenções de código, semver/depreciação, checklist de PR.
