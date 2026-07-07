# Documentação do Clarus CSS

Referência completa de uso do framework — para a visão geral do projeto
(por que existe, instalação rápida), veja o [README raiz](../README.md).

## Primeiros passos

- [Instalação](getting-started/installation.md) — npm, CDN, fontes,
  distribuições disponíveis, import via Sass.
- [Formas de uso](getting-started/usage.md) — convenção de nomenclatura,
  auto-init, API JS comum, eventos.

## Guias

- [Theming](guides/theming.md) — as 3 camadas de tokens, customização
  global e via Sass.
- [Dark mode](guides/dark-mode.md) — ativação, como funciona, toggle.
- [Acessibilidade](guides/accessibility.md) — padrões compartilhados de
  foco, teclado, ARIA e contraste.
- [Migração para v1.0.0](guides/migration-v1.md) — renomeação da API
  pública (`cl-`/`u-`/`is-`), codemod.

## Componentes

### Formulários

[Input](components/input.md) · [Input Group](components/input-group.md) ·
[Select customizado](components/select.md) · [Checkbox](components/checkbox.md) ·
[Radio](components/radio.md) · [Switch](components/switch.md) ·
[File Upload](components/file-upload.md)

### Conteúdo

[Button](components/button.md) · [Card](components/card.md) ·
[Badge](components/badge.md) · [Tag](components/tag.md) ·
[Alert](components/alert.md) · [Table](components/table.md) ·
[Divider](components/divider.md) · [Empty State](components/empty-state.md) ·
[Tile](components/tile.md) · [Skeleton](components/skeleton.md)

### Navegação

[Navbar](components/navbar.md) · [Tabs](components/tabs.md) ·
[Dropdown](components/dropdown.md) · [Nested Menu](components/nested-menu.md) ·
[Pagination](components/pagination.md) · [Breadcrumb](components/breadcrumb.md) ·
[Accordion](components/accordion.md) · [Collapse](components/collapse.md) ·
[Stepper](components/stepper.md)

### Overlay

[Modal](components/modal.md) · [Alert Dialog](components/alert-dialog.md) ·
[Offcanvas](components/offcanvas.md) · [Tooltip](components/tooltip.md) ·
[Popover](components/popover.md)

### Feedback

[Toast](components/toast.md) · [Notification Center](components/notification-center.md) ·
[Spinner & Progress](components/progress.md)

### Interação avançada

[Carousel](components/carousel.md) · [Rating](components/rating.md) ·
[Segmented Control](components/segmented-control.md) ·
[Timeline](components/timeline.md)

Cada componente tem um exemplo funcional dedicado (claro + escuro) em
[`mockup/`](../mockup) — a forma mais rápida de ver o framework em ação.

## Referência

- [Design tokens](reference/design-tokens.md) — lista completa de tokens
  CSS e variáveis Sass.
- [Arquitetura SCSS](reference/scss-architecture.md) — organização dos
  módulos, cascade layers, pipeline de build.
- [Suporte a navegadores](reference/browser-support.md) — alvo,
  fallbacks, `.browserslistrc`.
- [Relatório de contraste](reference/contrast-report.md) — auditoria WCAG
  dos tokens de cor.
- [Definições do projeto](reference/definitions.md) — decisões de
  arquitetura e escopo.

## Contribuindo

[Guia de contribuição](contributing/contributing.md) — setup local,
convenções de código, semver/depreciação, checklist de PR.
