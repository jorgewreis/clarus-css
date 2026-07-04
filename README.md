<div align="center">

# Clarus CSS

**Um framework CSS híbrido — componentes prontos no estilo Bootstrap, classes utilitárias no estilo Tailwind, zero dependências em tempo de execução.**

[![npm version](https://img.shields.io/npm/v/clarus-css.svg)](https://www.npmjs.com/package/clarus-css)
[![npm license](https://img.shields.io/npm/l/clarus-css.svg)](LICENSE)
[![CI](https://github.com/jorgewreis/clarus-css/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/jorgewreis/clarus-css/actions/workflows/ci.yml)
[![bundle size](https://img.shields.io/bundlephobia/minzip/clarus-css.svg)](https://bundlephobia.com/package/clarus-css)

[Instalação](#instalação) ·
[Por que Clarus CSS](#por-que-clarus-css) ·
[Uso](#uso) ·
[Componentes](#componentes-disponíveis) ·
[JavaScript](#componentes-interativos-javascript) ·
[Customização](#customização-por-variáveis) ·
[Documentação](#documentação)

</div>

---

Clarus CSS é um framework CSS open source construído com HTML, CSS e
JavaScript nativo. Nasceu do uso recorrente do autor em projetos pessoais e
profissionais, e é distribuído publicamente como produto para qualquer
desenvolvedor que precise construir interfaces consistentes sem carregar
React, Vue, Angular, jQuery ou qualquer outra dependência de runtime.

> **Status:** escopo inicial completo (`0.1.x`). Layout, grid, utilitários,
> formulários (com validação visual, select customizado e upload de
> arquivo) e todos os 17 componentes previstos para a primeira versão —
> botões, cards, alertas, badges, tabelas, navbar, dropdown, modal,
> accordion, tabs, tooltips, toasts, paginação e breadcrumbs — estão
> implementados, com dark mode nativo e uma API JavaScript consistente
> entre os componentes interativos. Veja
> [`docs/definitions.md`](docs/definitions.md) para o histórico de decisões
> e o detalhamento técnico de cada componente.

## Por que Clarus CSS

A maioria dos frameworks CSS obriga você a escolher um lado: componentes
prontos e opinativos (Bootstrap) **ou** utilitários atômicos e flexíveis
(Tailwind). O Clarus CSS assume os dois de propósito — é essa a filosofia
híbrida que orienta toda a arquitetura do projeto.

| | |
| --- | --- |
| **Híbrido por design** | Componentes prontos (`.btn`, `.card`, `.modal`) e utilitários atômicos (`.d-flex`, `.mt-3`, `.gx-2`) convivem na mesma folha de estilo, com uma convenção de nomes que evita colisão entre os dois mundos. |
| **Zero dependências** | Nenhuma dependência de runtime — nem framework JS, nem CDN externo para fontes. HTML, CSS e JavaScript nativo, prontos para colar direto em qualquer página. |
| **Dark mode nativo** | Suporte a tema escuro desde a v0.1, via CSS Custom Properties e um único atributo (`data-theme="dark"`) — sem plugin, sem JS extra. |
| **Acessibilidade não é opcional** | ARIA, foco e navegação por teclado são parte da API de todo componente interativo desde o início, não um retrofit. |
| **Curva de aprendizado familiar** | Nomenclatura de classes e grid próximos ao Bootstrap — quem já conhece Bootstrap se sente em casa em minutos. |
| **Customização sem fork** | Toda a identidade visual (cores, espaçamento, tipografia, raios, sombras) é exposta via CSS Custom Properties — sobrescreva sem recompilar. |

## Instalação

Via npm:

```bash
npm install clarus-css
```

Ou direto via CDN (jsDelivr/unpkg), sem precisar instalar nada:

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

Compile do zero com suas próprias variáveis Sass, aproveitando a arquitetura
modular descrita em
[`docs/scss-architecture.md`](docs/scss-architecture.md).

## Estrutura de classes

A convenção de nomes segue de perto o Bootstrap, para reduzir a curva de
aprendizado — e é consistente o suficiente para você prever o nome de uma
classe antes de precisar consultar a documentação:

| Categoria | Exemplos |
| --- | --- |
| Layout | `.container`, `.container-fluid`, `.row`, `.col`, `.col-{breakpoint}-{n}` |
| Formulários | `.form-row`, `.form-label`, `.form-control`, `.form-select`, `.is-valid`/`.is-invalid` |
| Componentes | `.btn`, `.card`, `.alert`, `.badge`, `.navbar`, `.modal`, `.dropdown`, `.accordion` |
| Variantes de cor | sufixo direto: `.btn-primary`, `.alert-danger`, `.badge-success` |
| Tamanhos | sufixo `-sm`/`-lg`: `.btn-sm`, `.card-lg`, `.form-control-sm` |
| Utilitários | `.d-*` (display), `.m-*`/`.p-*` (espaçamento), `.g-*` (gap), `.text-*`/`.fw-*`/`.fs-*` (tipografia) |
| Responsivo | `{propriedade}-{breakpoint}-{valor}`: `.col-md-6`, `.d-md-none`, `.mt-lg-3` |

## Sistema de grid

Grid baseado em Flexbox, com breakpoints equivalentes ao Bootstrap:

| Breakpoint | Largura mínima |
| --- | --- |
| `sm` | 576px |
| `md` | 768px |
| `lg` | 992px |
| `xl` | 1200px |
| `xxl` | 1400px |

## Componentes disponíveis

- **Layout:** containers, grid Flexbox (`.row`/`.col-*`).
- **Formulários:** controles, tamanhos, validação visual, select customizado, upload de arquivo estilizado.
- **Conteúdo:** botões, cards (incluindo variante clicável e horizontal), alertas, badges, tabelas.
- **Navegação:** navbar, dropdown, tabs, paginação, breadcrumbs.
- **Overlay:** modal, tooltip, toast, accordion.

Cada componente tem um exemplo funcional dedicado (claro + escuro) em
[`mockup/`](mockup) — a forma mais rápida de ver o framework em ação sem
escrever nenhum código. O escopo completo, com a ordem de implementação e o
racional de cada decisão, está em
[`docs/definitions.md`](docs/definitions.md#9-escopo-inicial-de-componentes).

## Componentes interativos (JavaScript)

Dropdown, Tooltip, Modal, Select customizado, Accordion, Tabs e Toast
compartilham uma única API, pensada para funcionar direto no HTML — sem
exigir `new` manual, sem exigir build:

```html
<button type="button" class="btn btn-primary" data-clarus="modal" data-target="#meuModal">
  Abrir modal
</button>

<div class="modal" id="meuModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">Título</h3>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Fechar"></button>
      </div>
      <div class="modal-body">Conteúdo do modal.</div>
    </div>
  </div>
</div>
```

Basta incluir `dist/js/clarus.js` (ou `clarus.min.js`) — a inicialização é
automática via `data-clarus="<componente>"`. Cada instância continua
acessível para controle programático, sem precisar reinstanciar:

```js
const modalEl = document.getElementById("meuModal");
Clarus.Modal.getInstance(modalEl).show();
```

Toda a família de componentes interativos segue a mesma API de instância —
`.show()`, `.hide()`, `.toggle()`, `.dispose()` — e comunica estado via
eventos DOM nativos (`clarus:modal:shown`, `clarus:tab:changed`, etc.), sem
exigir callbacks de construtor. Também dá pra importar cada componente
individualmente para uso com bundlers, sem carregar o bundle inteiro:

```js
import { Modal } from "clarus-css/js/modal";
```

Foco, teclado (Tab/Shift+Tab, setas, Escape) e atributos ARIA fazem parte da
API desde a primeira versão de cada componente — não é um extra adicionado
depois. Detalhes de cada componente (atributos, eventos, exemplos completos)
estão nos arquivos [`mockup/*.html`](mockup) e no histórico de decisões em
[`docs/definitions.md`](docs/definitions.md#20-api-javascript-dos-componentes-interativos).

## Customização por variáveis

Todos os tokens visuais são expostos como CSS Custom Properties (prefixo
`--clarus-`) em `:root`, definidas em `scss/tokens/_root.scss`. Para
sobrescrever, basta redefinir a variável no seu próprio CSS — sem fork, sem
recompilar o Sass:

```css
:root {
  --clarus-color-primary: #6d28d9;
  --clarus-radius-md: 10px;
  --clarus-font-sans: "Inter", sans-serif;
}
```

Isso cobre cores de estado, tipografia, raios de borda, sombras e os tokens
específicos de cada componente (ex.: `--clarus-tooltip-bg`,
`--clarus-alert-success-bg`) — a lista completa está em
`scss/tokens/_root.scss` e `scss/themes/_dark.scss`.

## Modo escuro

Dark mode nativo, ativado por um único atributo no elemento raiz — sem
biblioteca extra, sem flash de conteúdo sem estilo:

```html
<html data-theme="dark">
```

Todos os componentes, incluindo os que usam JavaScript para se posicionar
fora do fluxo normal do documento (dropdown, tooltip), respeitam o tema
herdado do elemento de referência mais próximo.

## Documentação

- [`docs/definitions.md`](docs/definitions.md) — visão geral do produto,
  decisões de arquitetura e o catálogo completo de componentes.
- [`docs/scss-architecture.md`](docs/scss-architecture.md) — arquitetura
  dos módulos SCSS e do pipeline de build.
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — como rodar o projeto localmente e
  convenções de contribuição.
- [`CHANGELOG.md`](CHANGELOG.md) — histórico de mudanças, seguindo
  [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e
  [Semantic Versioning](https://semver.org/lang/pt-BR/).

## Licença

Distribuído sob a licença [MIT](LICENSE) — uso livre em projetos pessoais,
comerciais e comunitários.
