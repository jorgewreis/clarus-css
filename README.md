# Clarus CSS

Framework CSS open source, minimalista e moderno, para construir interfaces com
HTML, CSS e JavaScript nativo — sem dependências externas em tempo de execução.

Combina componentes prontos (no estilo Bootstrap) com classes utilitárias,
grid baseado em Flexbox e customização via CSS Custom Properties.

> **Status:** versão inicial (`0.1.0`) em desenvolvimento ativo. O grid, os
> utilitários e os formulários já têm estilos funcionais; a maioria dos
> componentes (`buttons`, `cards`, `modal`, etc.) ainda está em estágio de
> esqueleto básico e será expandida nas próximas versões. Veja
> [`docs/definitions.md`](docs/definitions.md) para o roadmap completo.

## Instalação

Via npm:

```bash
npm install clarus-css
```

Depois de publicado, também estará disponível via CDN (jsDelivr/unpkg), usando
o próprio nome do pacote:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/clarus-css/dist/css/clarus.css">
```

## Uso

### Via bundle completo

```html
<link rel="stylesheet" href="node_modules/clarus-css/dist/css/clarus.min.css">
<script src="node_modules/clarus-css/dist/js/clarus.min.js"></script>
```

Ou, com um bundler (Webpack, Vite, Parcel, etc.):

```js
import "clarus-css";
```

### Via arquivos separados

Para incluir só o que for necessário:

```html
<link rel="stylesheet" href="node_modules/clarus-css/dist/css/layout.css">
<link rel="stylesheet" href="node_modules/clarus-css/dist/css/forms.css">
<link rel="stylesheet" href="node_modules/clarus-css/dist/css/components.css">
<link rel="stylesheet" href="node_modules/clarus-css/dist/css/helpers.css">
```

Cada arquivo é independente (inclui variáveis, reset e dark mode), então dá
pra combinar apenas os que fizerem sentido para o seu projeto.

### Via SCSS

```scss
@use "clarus-css/scss" as clarus;
```

## Estrutura de classes

A convenção de nomes segue de perto o Bootstrap, para reduzir a curva de
aprendizado:

- Layout: `.container`, `.container-fluid`, `.row`, `.col`, `.col-{breakpoint}`.
- Formulários: `.form-row`, `.form-col`, `.form-label`, `.form-control`, `.form-text`.
- Componentes: `.btn`, `.card`, `.alert`, `.badge`, `.navbar`, `.modal`, etc.
- Utilitários: `.d-*` (display), `.m-*`/`.p-*` (espaçamento), `.g-*` (gap),
  `.justify-content-*`/`.align-items-*` (flex), `.visible`/`.invisible`,
  `.text-*`/`.fw-*`/`.fs-*`/`.font-*` (tipografia).

## Sistema de grid

Grid baseado em Flexbox, com breakpoints equivalentes ao Bootstrap:

- `sm` — 576px
- `md` — 768px
- `lg` — 992px
- `xl` — 1200px
- `xxl` — 1400px

## Componentes disponíveis

Layout e containers, grid, formulários, botões, cards, alertas, badges,
tabelas, navbar, dropdown, modal, accordion, tabs, tooltips, toasts,
paginação e breadcrumbs. O escopo completo está descrito em
[`docs/definitions.md`](docs/definitions.md#9-escopo-inicial-de-componentes).

## Customização por variáveis

Todos os tokens visuais são expostos como CSS Custom Properties (prefixo
`--clarus-`) em `:root`, definidas em `scss/tokens/_root.scss`. Para
sobrescrever, basta redefinir a variável no seu próprio CSS:

```css
:root {
  --clarus-color-primary: #6d28d9;
  --clarus-radius-md: 10px;
}
```

## Modo escuro

Dark mode nativo, ativado por atributo no elemento raiz:

```html
<html data-theme="dark">
```

## Documentação

- [`docs/definitions.md`](docs/definitions.md) — visão geral, decisões de
  produto e roadmap.
- [`docs/scss-architecture.md`](docs/scss-architecture.md) — arquitetura dos
  módulos SCSS e do pipeline de build.
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — como rodar o projeto localmente e
  convenções de contribuição.
- [`CHANGELOG.md`](CHANGELOG.md) — histórico de mudanças.

## Licença

[MIT](LICENSE)
