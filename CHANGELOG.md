# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere a [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Added

- Definições iniciais do projeto (`docs/definitions.md`) e arquitetura SCSS
  (`docs/scss-architecture.md`).
- Estrutura modular `scss/` (settings, tools, tokens, base, layout, forms,
  components, utilities, themes).
- Pipeline de build: Sass + PostCSS (Autoprefixer) + esbuild, gerando `dist/css`
  (`layout`, `forms`, `components`, `helpers`, `clarus`) e `dist/js/clarus.js`,
  cada um em versão expandida e minificada com source maps.
- Lint de SCSS via stylelint.
- CI no GitHub Actions (lint + build).
- Utilitários de tipografia (`text-*`, `fw-*`, `fs-*`, `font-*`) em
  `scss/utilities/_typography.scss`.
- Estado `:read-only` em `.form-control`.
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
