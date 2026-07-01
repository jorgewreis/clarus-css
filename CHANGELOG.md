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
