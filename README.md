<div align="center">

# Clarus CSS

**Um framework CSS híbrido — componentes prontos e classes utilitárias atômicas na mesma folha de estilo, com zero dependências em tempo de execução.**

[![npm version](https://img.shields.io/npm/v/clarus-css.svg)](https://www.npmjs.com/package/clarus-css)
[![npm license](https://img.shields.io/npm/l/clarus-css.svg)](LICENSE)
[![CI](https://github.com/jorgewreis/clarus-css/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/jorgewreis/clarus-css/actions/workflows/ci.yml)
[![bundle size](https://img.shields.io/bundlephobia/minzip/clarus-css.svg)](https://bundlephobia.com/package/clarus-css)

[Instalação](#instalação) ·
[Por que Clarus CSS](#por-que-clarus-css) ·
[Componentes](#componentes) ·
[Documentação](#documentação)

</div>

---

Clarus CSS é um framework CSS open source construído com HTML, CSS e
JavaScript nativo. Nasceu do uso recorrente do autor em projetos pessoais e
profissionais, e é distribuído publicamente como produto para qualquer
desenvolvedor que precise construir interfaces consistentes sem carregar
React, Vue, Angular, jQuery ou qualquer outra dependência de runtime.

> **Status:** `0.4.0`. Base completa (layout, grid, utilitários, formulários com
> validação visual, select customizado e upload de arquivo) mais um catálogo de
> componentes em expansão — dos elementos de conteúdo e navegação aos
> interativos (modal, dropdown, tabs, carousel, stepper e mais), todos com dark
> mode nativo e uma API JavaScript consistente. O catálogo atual está em
> [Componentes](#componentes); o histórico por versão, no
> [`CHANGELOG.md`](CHANGELOG.md).

Este README é a **visão geral** do projeto. Para aprender a usar cada recurso em
detalhe, com exemplos completos, consulte a **[documentação completa](docs/README.md)**.

## Por que Clarus CSS

A maioria dos frameworks CSS obriga você a escolher um lado: componentes
prontos e opinativos **ou** utilitários atômicos e flexíveis. O Clarus CSS
assume os dois de propósito — é essa a filosofia híbrida que orienta toda a
arquitetura do projeto.

| | |
| --- | --- |
| **Híbrido por design** | Componentes prontos (`.cl-btn`, `.cl-card`, `.cl-modal`) e utilitários atômicos (`.u-d-flex`, `.u-mt-3`, `.u-gx-2`) convivem na mesma folha de estilo, com uma convenção de nomes (`cl-`/`u-`/`is-`) que evita colisão entre os dois mundos. |
| **Zero dependências** | Nenhuma dependência de runtime — nem framework JS, nem CDN externo para fontes. HTML, CSS e JavaScript nativo, prontos para colar direto em qualquer página. |
| **Dark mode nativo** | Suporte a tema escuro desde a v0.1, via CSS Custom Properties e um único atributo (`data-theme="dark"`) — sem plugin, sem JS extra. |
| **Acessibilidade não é opcional** | ARIA, foco e navegação por teclado são parte da API de todo componente interativo desde o início, não um retrofit. |
| **Curva de aprendizado familiar** | Nomenclatura de classes e grid seguem convenções amplamente adotadas — quem já usou um framework CSS de componentes se sente em casa em minutos. |
| **Customização sem fork** | Toda a identidade visual (cores, espaçamento, tipografia, raios, sombras) é exposta via CSS Custom Properties — sobrescreva sem recompilar. |

## Instalação

Via npm:

```bash
npm install clarus-css
```

Ou direto via CDN (jsDelivr/unpkg), sem instalar nada:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/clarus-css/dist/css/clarus.css">
<script src="https://cdn.jsdelivr.net/npm/clarus-css/dist/js/clarus.js"></script>
```

O CSS também é distribuído em arquivos separados (`layout.css`, `forms.css`,
`components.css`, `helpers.css`), e o ponto de entrada Sass está disponível para
compilar com suas próprias variáveis. Detalhes em
[Instalação](docs/getting-started/installation.md) e
[Formas de uso](docs/getting-started/usage.md).

As fontes self-hosted (Plus Jakarta Sans e Source Code Pro) são distribuídas à
parte em `fonts.css`. Inclua-o **antes** do CSS principal para usá-las; sem ele,
a tipografia cai no `sans-serif`/`monospace` do sistema:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/clarus-css/dist/css/fonts.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/clarus-css/dist/css/clarus.css">
```

## Início rápido

Um componente interativo se inicializa sozinho via `data-cl` — basta incluir
o CSS e o JS e escrever o HTML:

```html
<link rel="stylesheet" href="node_modules/clarus-css/dist/css/clarus.min.css">

<button type="button" class="cl-btn cl-btn-primary" data-cl="modal" data-cl-target="#meuModal">
  Abrir modal
</button>

<div class="cl-modal" id="meuModal">
  <div class="cl-modal-dialog">
    <div class="cl-modal-content">
      <div class="cl-modal-header">
        <h3 class="cl-modal-title">Título</h3>
        <button type="button" class="cl-btn-close" data-cl-dismiss="modal" aria-label="Fechar"></button>
      </div>
      <div class="cl-modal-body">Conteúdo do modal.</div>
    </div>
  </div>
</div>

<script src="node_modules/clarus-css/dist/js/clarus.min.js"></script>
```

Todo componente interativo compartilha a mesma API (`.show()`, `.hide()`,
`.toggle()`, `.dispose()`, `getInstance()` e eventos DOM `cl:*`). Os
conceitos gerais estão em
[Formas de uso](docs/getting-started/usage.md#api-comum-aos-componentes-interativos).

## Componentes

- **Layout:** containers, grid Flexbox (`.cl-row`/`.cl-col-*`).
- **Formulários:** controles, select customizado, checkbox/radio/switch,
  upload de arquivo (com drag-and-drop), input group.
- **Conteúdo:** botões, cards, alertas, badges/tags, tabelas, tiles, divider,
  empty state, skeleton.
- **Navegação:** navbar, dropdown, nested menu, tabs, paginação, breadcrumbs,
  accordion, collapse, stepper.
- **Overlay:** modal, alert dialog, offcanvas, tooltip, popover.
- **Feedback:** toast, notification center, spinner, progress bar.
- **Interação avançada:** carousel, rating, segmented control, timeline.

Cada componente tem um exemplo funcional dedicado (claro + escuro) em
[`mockup/`](mockup) — a forma mais rápida de ver o framework em ação sem
escrever nenhum código. O passo a passo de uso de cada um está na
[documentação de componentes](docs/README.md#componentes).

## Customização e dark mode

Todos os tokens visuais são expostos como CSS Custom Properties (prefixo
`--cl-`). Para customizar, redefina a variável no seu próprio CSS — sem
fork, sem recompilar:

```css
:root {
  --cl-color-primary: #6d28d9;
  --cl-radius-md: 10px;
}
```

O dark mode é ativado por um único atributo (`<html data-theme="dark">`), sem
JavaScript obrigatório. Detalhes em [Theming](docs/guides/theming.md)
e [Dark mode](docs/guides/dark-mode.md).

## Documentação

- [`docs/README.md`](docs/README.md) — **documentação completa**: guias de
  uso, um arquivo por componente (anatomia, variações, estados, A11y, API JS,
  tokens, exemplo) e referência técnica.
- [`docs/reference/definitions.md`](docs/reference/definitions.md) — decisões de arquitetura e o
  catálogo técnico de cada componente (classes, tokens, módulos JS).
- [`docs/reference/scss-architecture.md`](docs/reference/scss-architecture.md) — arquitetura dos
  módulos SCSS e do pipeline de build.
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — como rodar o projeto localmente e
  convenções de contribuição.
- [`CHANGELOG.md`](CHANGELOG.md) — histórico de mudanças, seguindo
  [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e
  [Semantic Versioning](https://semver.org/lang/pt-BR/).

## Licença

Distribuído sob a licença [MIT](LICENSE) — uso livre em projetos pessoais,
comerciais e comunitários.
