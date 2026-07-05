# Guia Completo do Clarus CSS

Este guia é um manual de referência para quem nunca usou o Clarus CSS — ou nunca
usou um framework CSS híbrido (componentes prontos + utilitários atômicos) como
este. Ele parte do zero: instalação, depois os blocos mais simples (layout,
grid, utilitários), passando por formulários e componentes visuais, até chegar
aos componentes interativos que dependem de JavaScript e à customização por
temas. A ideia é que você consiga ler de cima para baixo e sair sabendo montar
uma interface inteira, ou usar o índice abaixo para pular direto ao que precisa.

Todo exemplo aqui é HTML puro, pensado para funcionar direto no navegador
depois de importar o CSS (e o JS, quando o componente exigir) — não há build
obrigatório para usar o framework no seu projeto.

## Índice

1. [O que é o Clarus CSS](#1-o-que-é-o-clarus-css)
2. [Instalação e formas de uso](#2-instalação-e-formas-de-uso)
3. [Convenção de nomenclatura de classes](#3-convenção-de-nomenclatura-de-classes)
4. [Containers](#4-containers)
5. [Grid (sistema de linhas e colunas)](#5-grid-sistema-de-linhas-e-colunas)
6. [Utilitários de espaçamento e gap](#6-utilitários-de-espaçamento-e-gap)
7. [Utilitários de display e flexbox](#7-utilitários-de-display-e-flexbox)
8. [Utilitários de tipografia, sombra e visibilidade](#8-utilitários-de-tipografia-sombra-e-visibilidade)
9. [Formulários](#9-formulários)
10. [Botões](#10-botões)
11. [Badges](#11-badges)
12. [Alertas](#12-alertas)
13. [Cards](#13-cards)
14. [Tabelas](#14-tabelas)
15. [Navbar](#15-navbar)
16. [Breadcrumbs](#16-breadcrumbs)
17. [Paginação](#17-paginação)
18. [Spinner e Progress](#18-spinner-e-progress)
19. [Componentes interativos: conceitos gerais da API JavaScript](#19-componentes-interativos-conceitos-gerais-da-api-javascript)
20. [Dropdown](#20-dropdown)
21. [Tooltip](#21-tooltip)
22. [Modal](#22-modal)
23. [Select customizado](#23-select-customizado)
24. [Accordion](#24-accordion)
25. [Tabs](#25-tabs)
26. [Toast](#26-toast)
27. [Carousel](#27-carousel)
28. [Customização por CSS Custom Properties (tokens)](#28-customização-por-css-custom-properties-tokens)
29. [Dark mode](#29-dark-mode)
30. [Onde ver mais exemplos e como contribuir](#30-onde-ver-mais-exemplos-e-como-contribuir)

---

## 1. O que é o Clarus CSS

Clarus CSS é um framework CSS open source, híbrido por design: ele entrega
componentes prontos no estilo Bootstrap (`.btn`, `.card`, `.modal`) **e**
classes utilitárias atômicas no estilo Tailwind (`.d-flex`, `.mt-3`, `.gx-2`)
na mesma folha de estilo, com uma convenção de nomes pensada para que as duas
abordagens não colidam entre si. Ele é construído com HTML, CSS/SCSS e
JavaScript nativo, sem nenhuma dependência de runtime — não carrega React,
Vue, Angular, jQuery nem qualquer outra biblioteca para funcionar, e nem
mesmo a tipografia depende de um serviço externo em produção (a fonte
principal, Plus Jakarta Sans, é distribuída junto ao pacote). Se você já
conhece Bootstrap, a curva de aprendizado é curta: a nomenclatura de classes é
propositalmente próxima, para que você consiga adivinhar o nome de uma classe
antes de precisar consultar a documentação.

Três ideias resumem o projeto e valem a pena ter em mente enquanto lê o resto
deste guia:

- **Tudo é customizável por CSS Custom Properties.** Toda a identidade visual
  (cores, tipografia, raios, sombras, tokens específicos de cada componente)
  é exposta como variáveis com prefixo `--clarus-`, definidas em `:root`.
  Você sobrescreve o valor no seu próprio CSS — sem fork do projeto e sem
  precisar recompilar Sass.
- **Dark mode é nativo, não um plugin.** Basta um atributo
  (`data-theme="dark"`) em qualquer elemento ancestral para que todos os
  componentes descendentes troquem de tema, incluindo os que se posicionam
  fora do fluxo normal do documento via JavaScript (dropdown, tooltip).
- **Acessibilidade não é um extra.** Todo componente interativo já nasce com
  atributos ARIA corretos, gerenciamento de foco e navegação por teclado
  (Tab/Shift+Tab, setas, Escape) — não é algo que foi "adicionado depois".

## 2. Instalação e formas de uso

### Via npm

```bash
npm install clarus-css
```

### Via CDN (sem instalar nada)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/clarus-css/dist/css/clarus.css">
```

### Bundle completo (CSS + JS)

A forma mais simples de começar — um único arquivo CSS e um único arquivo JS
cobrindo todo o framework:

```html
<link rel="stylesheet" href="node_modules/clarus-css/dist/css/clarus.min.css">
<script src="node_modules/clarus-css/dist/js/clarus.min.js"></script>
```

Ou, usando um bundler (Webpack, Vite, Parcel, etc.):

```js
import "clarus-css";
```

### Arquivos separados (só o que for necessário)

O CSS é distribuído também em quatro arquivos independentes, cada um já
incluindo variáveis (tokens), reset e suporte a dark mode — ou seja, dá para
usar apenas um deles sem quebrar nada:

```html
<link rel="stylesheet" href="node_modules/clarus-css/dist/css/layout.css">
<link rel="stylesheet" href="node_modules/clarus-css/dist/css/forms.css">
<link rel="stylesheet" href="node_modules/clarus-css/dist/css/components.css">
<link rel="stylesheet" href="node_modules/clarus-css/dist/css/helpers.css">
```

| Arquivo | Conteúdo |
| --- | --- |
| `layout.css` | Containers e grid (seções 4 e 5) |
| `forms.css` | Formulários (seção 9) |
| `components.css` | Botões, cards, alertas, badges, tabelas, navbar, dropdown, modal, accordion, tabs, tooltips, toasts, paginação, breadcrumbs, spinner/progress, carousel |
| `helpers.css` | Todos os utilitários (seções 6, 7 e 8) |

Use isso quando quiser reduzir o peso do CSS carregado — por exemplo, uma
página que só usa grid e utilitários não precisa importar `components.css`.

### Via SCSS (compilar do zero com suas variáveis)

Para quem quer customizar em tempo de compilação (não só via CSS Custom
Properties), o ponto de entrada Sass está disponível:

```scss
@use "clarus-css/scss" as clarus;
```

A arquitetura modular por trás disso (`settings`, `tools`, `tokens`, `base`,
`layout`, `forms`, `components`, `utilities`, `themes`) está detalhada em
`docs/scss-architecture.md`, para quem for além do uso básico.

### Componentes interativos importados individualmente

Se você usa um bundler e quer importar só o JavaScript de um componente
específico (em vez do bundle inteiro), cada um é exportável separadamente:

```js
import { Modal } from "clarus-css/js/modal";
```

## 3. Convenção de nomenclatura de classes

Antes de entrar nos componentes, vale internalizar o padrão de nomes — ele se
repete em praticamente tudo que vem a seguir:

| Categoria | Padrão | Exemplos |
| --- | --- | --- |
| Sem prefixo global | classes "nuas", como no Bootstrap | `.btn`, `.card`, `.container` |
| Variantes de cor/estado | sufixo direto com o nome da cor | `.btn-primary`, `.alert-danger`, `.badge-success` |
| Tamanhos | sufixo `-sm`/`-lg` | `.btn-sm`, `.card-lg`, `.form-control-sm` |
| Estados via JavaScript | classes `is-*`, nunca atributos `data-state` customizados | `.is-valid`, `.is-invalid` |
| Utilitários | abreviações curtas | `.d-flex`, `.mt-3`, `.gx-2`, `.p-2` |
| Responsivo (utilitários/grid) | `{propriedade}-{breakpoint}-{valor}` | `.col-md-6`, `.mt-lg-3`, `.align-items-md-center` |

As cinco cores de estado usadas em praticamente todo componente são:
`primary`, `success`, `warning`, `danger` e `info`. Sempre que você vir
`#{nome}` neste guia, é uma dessas cinco.

Os breakpoints (usados no grid e nos utilitários responsivos) são:

| Breakpoint | Largura mínima |
| --- | --- |
| `sm` | 576px |
| `md` | 768px |
| `lg` | 992px |
| `xl` | 1200px |
| `xxl` | 1400px |

`xs` (0px) também existe como breakpoint base, mas não tem infixo — ou seja,
uma classe sem breakpoint (`.col-6`) já é o comportamento "mobile-first", e os
breakpoints maiores sobrescrevem via `min-width`.

## 4. Containers

O container é o ponto de partida de qualquer página: ele centraliza o
conteúdo horizontalmente e aplica uma largura máxima responsiva, para que o
layout não fique esticado demais em telas grandes. Existem duas famílias:
`.container` (com largura máxima que muda por breakpoint) e
`.container-fluid` (sempre 100% da largura disponível, sem limite).

```html
<div class="container">
  <!-- conteúdo centralizado, com largura máxima por breakpoint -->
</div>

<div class="container-fluid">
  <!-- conteúdo ocupando 100% da largura, sem limite -->
</div>
```

### Variações

- `.container` — muda de largura máxima automaticamente conforme o
  breakpoint atual (ver tabela abaixo).
- `.container-{breakpoint}` (`.container-sm`, `.container-md`, `.container-lg`,
  `.container-xl`, `.container-xxl`) — fica fluido (100%) até o breakpoint
  indicado, e só então passa a ter largura máxima. Use quando quiser que o
  container seja fluido em telas pequenas/médias e só limite a largura a
  partir de um ponto específico.
- `.container-fluid` — sempre 100% da largura, em qualquer tamanho de tela.

Larguras máximas aplicadas em cada breakpoint (as mesmas para `.container` e
para `.container-{breakpoint}` a partir do breakpoint correspondente):

| Breakpoint | Largura máxima |
| --- | --- |
| `sm` | 540px |
| `md` | 720px |
| `lg` | 960px |
| `xl` | 1140px |
| `xxl` | 1320px |

## 5. Grid (sistema de linhas e colunas)

O grid do Clarus CSS é baseado em Flexbox, com 12 colunas e breakpoints
equivalentes ao Bootstrap — se você já montou uma página com `.row`/`.col-*`
em outro framework, o comportamento aqui é o mesmo. A estrutura básica é
sempre a mesma: uma `.row` (linha flex) contendo uma ou mais `.col-*`
(colunas), cuja largura é uma fração de 12.

```html
<div class="container">
  <div class="row">
    <div class="col-md-8">col-md-8</div>
    <div class="col-md-4">col-md-4</div>
  </div>
</div>
```

### Variações de coluna

- `.col-{n}` (`n` de 1 a 12) — largura fixa como porcentagem de `n/12`,
  aplicada a partir do breakpoint `xs` (ou seja, vale para qualquer tamanho de
  tela, a menos que seja sobrescrita por um breakpoint maior).
- `.col-{breakpoint}-{n}` (ex.: `.col-md-6`, `.col-lg-4`) — mesma ideia, mas
  só entra em vigor a partir do breakpoint indicado. Combine várias classes na
  mesma coluna para um layout responsivo (`.col-12 .col-md-6 .col-lg-4`: uma
  coluna cheia no mobile, metade da largura em telas médias, um terço em telas
  grandes).
- `.col` / `.col-{breakpoint}` (sem número) — coluna de largura automática,
  que divide o espaço restante igualmente com as demais colunas "automáticas"
  da mesma linha.
- `.col-{breakpoint}-auto` — a coluna assume apenas a largura do seu próprio
  conteúdo, sem crescer.

```html
<!-- Três colunas de largura automática e igual -->
<div class="row">
  <div class="col">col 1</div>
  <div class="col">col 2</div>
  <div class="col">col 3</div>
</div>
```

### Gutter (espaçamento entre colunas)

O espaçamento entre colunas (gutter) não usa `gap` do Flexbox — é
implementado via padding nas colunas + margin negativa na `.row`, controlado
pelas variáveis `--clarus-gutter-x`/`--clarus-gutter-y`. Isso é proposital:
`gap` não é descontado da largura em porcentagem das colunas numeradas, o que
faria uma linha com `.col-6 .col-6` estourar e quebrar para a linha seguinte.

Para controlar o gutter, use as classes utilitárias (detalhadas na seção 6),
que só têm efeito dentro de uma `.row`:

```html
<div class="row g-3">
  <!-- gutter horizontal E vertical de 1rem (nível 3 da escala de espaçamento) -->
  <div class="col-6">...</div>
  <div class="col-6">...</div>
</div>

<div class="row gx-2 gy-4">
  <!-- gutter horizontal de 0.5rem, gutter vertical de 1.5rem -->
</div>
```

### `.row-fluid` / `.col-fluid`

Modificadores que forçam `width: 100%` na linha ou na coluna — úteis quando
você precisa que uma `.row`/`.col` específica ignore o comportamento padrão de
`.container` e ocupe toda a largura disponível do seu elemento pai.

```html
<div class="row row-fluid">
  <div class="col col-fluid">Ocupa 100% da largura</div>
</div>
```

> **Nota:** o grid atual não gera classes com o breakpoint `xs` explícito
> (não existe `.col-xs-6`) — para o comportamento "sem breakpoint", use
> `.col-6` diretamente, que já é a base mobile-first.

## 6. Utilitários de espaçonamento e gap

Utilitários existem para evitar CSS customizado repetitivo — em vez de
escrever uma regra `margin-top: 1rem` toda vez que precisar desse espaçamento,
você aplica a classe equivalente direto no HTML. A escala de espaçamento é a
mesma para todos os utilitários de margin/padding/gap:

| Nível | Valor |
| --- | --- |
| `0` | `0` |
| `1` | `0.25rem` |
| `2` | `0.5rem` |
| `3` | `1rem` |
| `4` | `1.5rem` |
| `5` | `3rem` |

### Margin e padding

Padrão: `{propriedade}{lado}-{breakpoint}-{nível}`, em que `{breakpoint}` é
opcional (omitido = vale para todos os tamanhos de tela).

| Classe | Propriedade CSS |
| --- | --- |
| `.m-{n}` | `margin` (todos os lados) |
| `.mt-{n}` | `margin-top` |
| `.mr-{n}` | `margin-right` |
| `.mb-{n}` | `margin-bottom` |
| `.ml-{n}` | `margin-left` |
| `.mx-{n}` | `margin-right` + `margin-left` |
| `.my-{n}` | `margin-top` + `margin-bottom` |
| `.p-{n}` | `padding` (todos os lados) |
| `.pt-{n}` / `.pr-{n}` / `.pb-{n}` / `.pl-{n}` | padding em cada lado |
| `.px-{n}` | `padding-right` + `padding-left` |
| `.py-{n}` | `padding-top` + `padding-bottom` |

Todas aceitam infixo de breakpoint (`.mt-md-3`, `.px-lg-4`) e também a
variante `-auto` para margin (`.mx-auto` para centralizar horizontalmente,
`.m-auto`, `.mt-auto`, etc.) — não existe `.p-auto` (padding não aceita
`auto`).

```html
<div class="mt-3 mb-2 px-4">Espaçamento aplicado direto no HTML</div>
<div class="mx-auto" style="width: 200px;">Centralizado horizontalmente</div>
```

### Gap do grid vs. gap literal

Essa é uma distinção importante para não se confundir:

- **`.g-{n}` / `.gx-{n}` / `.gy-{n}`** — controlam as variáveis
  `--clarus-gutter-x`/`-y` do sistema de grid (seção 5). **Só têm efeito
  dentro de uma `.row`.** `.g-*` ajusta os dois eixos de uma vez; `.gx-*` só o
  horizontal; `.gy-*` só o vertical.
- **`.gap-{n}` / `.gap-x-{n}` / `.gap-y-{n}`** — aplicam a propriedade `gap`
  (ou `column-gap`/`row-gap`) diretamente, em **qualquer** container flex ou
  grid, fora do sistema de colunas numeradas. Use essa família quando quiser
  espaçamento entre itens de um `.d-flex` qualquer, não vinculado a `.row`.

```html
<!-- Gutter do grid -->
<div class="row gx-2">
  <div class="col-6">...</div>
  <div class="col-6">...</div>
</div>

<!-- Gap literal, fora do grid -->
<div class="d-flex gap-2">
  <button class="btn">A</button>
  <button class="btn">B</button>
</div>
```

Todas as variantes de gap também aceitam infixo de breakpoint
(`.gap-md-3`, `.gx-lg-4`).

## 7. Utilitários de display e flexbox

### Display

```html
<div class="d-none">Nunca visível</div>
<div class="d-block">display: block</div>
<span class="d-inline-block">display: inline-block</span>
<div class="d-flex">display: flex</div>
```

Classes disponíveis: `.d-none`, `.d-block`, `.d-inline`, `.d-inline-block`,
`.d-flex`. Diferente de margin/padding/gap, o display **não** tem variantes
responsivas por breakpoint no momento (não existe `.d-md-none`) — se você
precisar esconder um elemento só a partir de um breakpoint, hoje isso exige
uma media query própria no seu CSS.

### Alinhamento flex (`align-items`, `justify-content`, `align-self`)

Aplicáveis a qualquer container com `display: flex` (incluindo `.row`, que já
é flex por padrão, ou qualquer `.d-flex`):

| Classe | Propriedade / valor |
| --- | --- |
| `.align-items-start` / `-center` / `-end` | `align-items: flex-start / center / flex-end` |
| `.justify-content-start` / `-center` / `-end` | `justify-content: flex-start / center / flex-end` |
| `.justify-content-around` / `-between` | `justify-content: space-around / space-between` |
| `.align-self-start` / `-center` / `-end` | `align-self: flex-start / center / flex-end` |

Todas aceitam infixo de breakpoint: `.justify-content-md-between`,
`.align-items-lg-center`.

```html
<div class="d-flex justify-content-between align-items-center">
  <span>Esquerda</span>
  <span>Direita</span>
</div>
```

## 8. Utilitários de tipografia, sombra e visibilidade

### Tipografia

```html
<p class="text-center fw-medium fs-lg">Centralizado, peso medium, fonte grande</p>
<p class="text-uppercase fs-sm">texto em uppercase, fonte pequena</p>
<p class="text-truncate" style="max-width: 200px;">Texto longo o suficiente para ser cortado com reticências</p>
<code class="font-mono">console.log("fonte monoespaçada")</code>
```

| Classe | Efeito |
| --- | --- |
| `.text-start` / `.text-center` / `.text-end` | alinhamento horizontal do texto |
| `.text-lowercase` / `.text-uppercase` / `.text-capitalize` | transformação de caixa |
| `.text-truncate` | corta com reticências em uma linha (exige `max-width` ou um contêiner com largura limitada) |
| `.fw-regular` / `.fw-medium` | peso da fonte (400 / 500) |
| `.fs-xs` / `.fs-sm` / `.fs-md` / `.fs-lg` | escala de tamanho de fonte do framework |
| `.font-sans` / `.font-mono` | força a família tipográfica (sans-serif ou monoespaçada) |

### Sombra

Três níveis de elevação, usados sobretudo em cards, mas aplicáveis a qualquer
elemento:

```html
<div class="card shadow-sm">sombra leve</div>
<div class="card shadow">sombra média</div>
<div class="card shadow-lg">sombra pronunciada</div>
```

### Visibilidade

`.visible` / `.invisible` alternam `visibility: visible`/`hidden` — diferente
de `.d-none`, um elemento `.invisible` continua ocupando espaço no layout,
só fica invisível.

```html
<div class="invisible">Ocupa espaço, mas não aparece</div>
```

## 9. Formulários

Formulários no Clarus CSS combinam um sistema de layout próprio
(`.form-row`/`.form-col`) com os controles em si (`.form-control`,
`.form-select`), estados de validação e dois componentes 100% CSS: upload de
arquivo estilizado e (mais adiante, já dependente de JS) o select
customizado.

### Estrutura de layout

```html
<div class="form-row gap-x-2">
  <div class="form-col">
    <label for="nome" class="form-label form-size-md">Nome completo</label>
    <input type="text" class="form-control form-size-xxl" id="nome" placeholder="Digite seu nome">
    <span class="form-text form-size-xxl">Texto de apoio, opcional.</span>
  </div>
</div>
```

- `.form-row` — linha flex com quebra automática (`flex-wrap: wrap`),
  contêiner de um ou mais `.form-col`.
- `.form-col` — coluna flex (label + controle + texto de apoio empilhados
  verticalmente).
- `.form-label` — rótulo do campo, cor "muted" e texto truncado se for maior
  que a largura disponível.
- `.form-text` — texto de apoio abaixo do campo (ajuda contextual, não é
  mensagem de validação).

### `.form-control` (inputs de texto)

```html
<input type="text" class="form-control" placeholder="Padrão">
<input type="text" class="form-control form-control-sm" placeholder="Pequeno">
<input type="text" class="form-control form-control-lg" placeholder="Grande">
<input type="text" class="form-control" disabled placeholder="Desabilitado">
<input type="text" class="form-control" readonly value="Somente leitura">
```

Tamanhos disponíveis: `.form-control-sm` (30px de altura) e `.form-control-lg`
(46px) — sem sufixo é o tamanho padrão (38px). Estados `:disabled` e
`:read-only` já vêm estilizados automaticamente, sem precisar de classe
adicional.

### Largura do campo (`.form-size-*`)

Como os controles não têm largura definida por padrão dentro de `.form-col`,
use as classes de largura fixa para dar consistência visual a um formulário:

| Classe | Largura |
| --- | --- |
| `.form-size-sm` | 120px |
| `.form-size-md` | 180px |
| `.form-size-lg` | 240px |
| `.form-size-xl` | 300px |
| `.form-size-xxl` | 360px |

### Validação visual (`.is-valid` / `.is-invalid`)

Sem exigir JavaScript: adicione a classe de estado no `.form-control` e um
`<span>`/elemento de feedback logo em seguida (irmão adjacente no HTML) — ele
só aparece quando o input tem a classe de estado correspondente.

```html
<input type="email" class="form-control is-valid" value="voce@exemplo.com">
<span class="valid-feedback">E-mail válido.</span>

<input type="email" class="form-control is-invalid" value="invalido">
<span class="invalid-feedback">Informe um e-mail válido.</span>
```

Por trás dos panos, `.valid-feedback`/`.invalid-feedback` ficam com
`display: none` até que o elemento imediatamente anterior tenha
`.is-valid`/`.is-invalid` (seletor de irmão adjacente `~`) — por isso a ordem
no HTML importa: o feedback precisa vir logo depois do input.

### `.form-select` (visual do select — ver também a versão com JS na seção 23)

O CSS de `.form-select` estiliza qualquer elemento como uma "caixa de seleção"
(com seta própria via `::after`), nos mesmos tamanhos e estados de
`.form-control`:

```html
<select class="form-select">
  <option>Opção 1</option>
  <option>Opção 2</option>
</select>
```

`.form-select-sm` / `.form-select-lg` seguem a mesma lógica de
`.form-control-sm`/`-lg`. Note que isso por si só é apenas visual — o
componente JavaScript que constrói o dropdown customizado por cima de um
`<select>` nativo está na seção 23.

### Upload de arquivo estilizado

Um `<input type="file">` nativo é visualmente feio e difícil de customizar
entre navegadores — por isso o Clarus CSS esconde o input real (mantendo foco
e navegação por teclado via `clip-path`, não `display: none`) e estiliza um
`<label for="...">` associado a ele, 100% em CSS:

```html
<div class="file-upload">
  <input type="file" class="file-input" id="arquivo1">
  <label for="arquivo1" class="file-label">Escolher arquivo</label>
</div>
```

Tamanhos: `.file-label-sm` / `.file-label-lg` (mesma lógica de sufixo dos
outros componentes). Estado desabilitado: adicione `disabled` no
`<input>` — o `<label>` reage automaticamente via seletor `:disabled + label`.

```html
<div class="file-upload">
  <input type="file" class="file-input" id="arquivo2" disabled>
  <label for="arquivo2" class="file-label file-label-sm">Desabilitado</label>
</div>
```

## 10. Botões

O botão é provavelmente o componente mais usado do framework, e serve de base
visual (contraste de cor, tamanhos) para vários outros — badges, alertas e
cards reaproveitam a mesma lógica de cor por trás de `.btn`. A cor de texto de
cada variante sólida é calculada automaticamente para garantir contraste WCAG
AA (função `color-contrast()`), então você nunca precisa se preocupar em
escolher manualmente entre texto branco ou preto sobre uma cor de fundo.

```html
<button type="button" class="btn">Padrão</button>
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-outline-primary">Outline Primary</button>
```

### Variações

- **Cor sólida:** `.btn-primary`, `.btn-success`, `.btn-warning`,
  `.btn-danger`, `.btn-info` — fundo colorido, texto com contraste garantido.
- **Cor outline:** `.btn-outline-primary`, `.btn-outline-success`,
  `.btn-outline-warning`, `.btn-outline-danger`, `.btn-outline-info` — borda e
  texto coloridos, fundo transparente; no hover/active o fundo passa a ser
  sólido (mesmo efeito da variante cheia).
- **Tamanho:** `.btn-sm` (30px de altura), `.btn-lg` (46px) — sem sufixo é o
  padrão (38px).
- **Estado desabilitado:** atributo `disabled` no `<button>` ou classe
  `.disabled` em qualquer elemento (útil quando o botão é um `<a>`, que não
  aceita o atributo `disabled` nativamente).

```html
<button type="button" class="btn btn-danger btn-sm">Excluir</button>
<button type="button" class="btn btn-outline-success btn-lg">Aprovar</button>
<button type="button" class="btn btn-primary" disabled>Desabilitado</button>
<a href="#" class="btn disabled">Link desabilitado</a>
```

### `.btn-close`

Um botão de fechar (X) desenhado só com `::before`/`::after` — sem ícone
externo, sem SVG. Reaproveitado por cards, modal e toast como o botão
padrão de dispensar/fechar:

```html
<button type="button" class="btn-close" aria-label="Fechar"></button>
```

## 11. Badges

Badges são pequenos rótulos de destaque — para contagens, status ou tags —
usados sozinhos ou embutidos em cards, navbar e tabelas. Compartilham a mesma
paleta de cor de estado dos botões e alertas.

```html
<span class="badge">Padrão</span>
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success badge-sm">Small</span>
<span class="badge badge-danger badge-lg">Large</span>
```

Variações: `.badge-{primary|success|warning|danger|info}` para cor, e
`.badge-sm`/`.badge-lg` para tamanho (sem sufixo é o padrão).

## 12. Alertas

Alertas comunicam uma mensagem de estado (sucesso, erro, aviso, informação)
com destaque visual — fundo tintado, texto com cor de contraste garantida e
uma barra lateral colorida à esquerda. As cores de fundo/texto de cada
variante já têm ajuste automático para dark mode.

```html
<div class="alert">Alerta neutro, sem cor de estado.</div>
<div class="alert alert-success">Operação concluída com sucesso.</div>
<div class="alert alert-danger">Ocorreu um erro ao processar a solicitação.</div>
<div class="alert alert-warning">Atenção: essa ação não pode ser desfeita.</div>
<div class="alert alert-info">Informação adicional sobre o processo.</div>
```

Variações: `.alert-{primary|success|warning|danger|info}` — sem uma dessas
classes, o alerta usa cores neutras (borda e texto padrão). Não há
tamanhos (`-sm`/`-lg`) para alertas.

## 13. Cards

O card é um contêiner de conteúdo genérico — a peça que mais combina outros
componentes (botões, badges, tipografia) dentro de si. Ele é composto por até
três seções empilhadas (`.card-header`, `.card-body`, `.card-footer`), todas
opcionais, dentro de um `.card`.

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Título do card</h3>
    <button type="button" class="btn-close" aria-label="Fechar"></button>
  </div>
  <div class="card-body">
    <h4 class="card-title">Subtítulo interno</h4>
    <p class="card-subtitle">Um complemento do título.</p>
    <p class="card-text">Corpo de texto do card.</p>
    <button type="button" class="btn btn-primary">Ação</button>
  </div>
  <div class="card-footer">
    <span class="badge badge-success">Ativo</span>
  </div>
</div>
```

### Elementos internos

- `.card-title` — título em destaque (maior peso/tamanho de fonte).
- `.card-subtitle` — texto secundário, cor "muted", abaixo do título.
- `.card-text` — parágrafo de corpo; o último `.card-text` de um card não tem
  margem inferior, para não sobrar espaço morto antes do fim do `.card-body`.
- `.card-header` com `.card-title` — quando o header tem um título e um botão
  de fechar (`.btn-close`) lado a lado, o layout já vem com
  `justify-content: space-between` pronto.

### Tamanhos

`.card-sm` e `.card-lg` ajustam o padding interno de header/body/footer (5px e
15px, respectivamente, contra 10px do padrão) — não mudam a largura do card,
apenas a densidade do conteúdo.

```html
<div class="card card-sm">...</div>
<div class="card card-lg">...</div>
```

### `.card-horizontal`

Muda o eixo principal do card de coluna para linha — útil para cards do tipo
"imagem à esquerda, texto à direita". Os raios de borda de header/footer se
ajustam automaticamente para a lateral em vez do topo/base.

```html
<div class="card card-horizontal">
  <div class="card-header">Lateral</div>
  <div class="card-body">Conteúdo ao lado.</div>
</div>
```

### `.card-clickable` + `.stretched-link`

Torna o card inteiro clicável e focável sem precisar aninhar um `<a>` ao redor
de todo o conteúdo (o que quebraria a semântica se houver outros elementos
interativos dentro do card). Coloque `.stretched-link` no link/elemento que
deve capturar o clique — ele se expande via `::after` para cobrir todo o
card.

```html
<div class="card card-clickable shadow-sm">
  <div class="card-body">
    <h4 class="card-title">
      <a href="/detalhes" class="stretched-link">Ver detalhes</a>
    </h4>
    <p class="card-text">O card inteiro é clicável, não só o link.</p>
  </div>
</div>
```

O hover/focus de `.card-clickable` usa `:focus-within`, então o destaque
visual (borda + sombra) aparece tanto ao passar o mouse quanto ao navegar por
teclado até o link interno.

## 14. Tabelas

Tabelas seguem a marcação HTML nativa (`<table>`, `<thead>`, `<tbody>`), com
classes modificadoras aplicadas no próprio `<table>` para ligar/desligar
comportamentos visuais.

```html
<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Nome</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ana</td>
      <td>Ativo</td>
    </tr>
    <tr>
      <td>Bruno</td>
      <td>Inativo</td>
    </tr>
  </tbody>
</table>
```

### Variações

- `.table-striped` — linhas ímpares do corpo com fundo levemente diferente
  (zebra).
- `.table-hover` — destaca a linha sob o cursor do mouse.
- `.table-bordered` — bordas em todas as células (não só embaixo).
- `.table-borderless` — remove todas as bordas internas.
- `.table-sm` — reduz o padding das células (mais compacta).
- `.table-{primary|success|warning|danger|info}` — tinge o fundo/texto da
  tabela inteira com uma cor de estado (reaproveita os mesmos tokens dos
  alertas).
- `.table-responsive` — aplique num `<div>` **envolvendo** a `<table>` (não na
  própria tabela) para permitir rolagem horizontal em telas estreitas:

```html
<div class="table-responsive">
  <table class="table">...</table>
</div>
```

## 15. Navbar

Barra de navegação horizontal estática — marca (logo/nome do produto) de um
lado, links de navegação do outro. Esta é a versão "crua" do componente: não
inclui um collapse/hambúrguer próprio para mobile nem um dropdown embutido;
para um menu suspenso dentro da navbar, combine-a com o componente Dropdown
(seção 20).

```html
<nav class="navbar">
  <a href="#" class="navbar-brand">Minha Marca</a>
  <ul class="navbar-nav">
    <li><a href="#" class="nav-link active">Início</a></li>
    <li><a href="#" class="nav-link">Produtos</a></li>
    <li><a href="#" class="nav-link disabled">Em breve</a></li>
  </ul>
</nav>
```

### Elementos

- `.navbar` — contêiner flex com `justify-content: space-between`, quebra de
  linha automática se não houver espaço.
- `.navbar-brand` — nome/logo, com destaque tipográfico.
- `.navbar-nav` — lista (`<ul>`) de itens de navegação, sem marcadores.
- `.nav-link` — cada link individual; aceita `.active` (destaque de cor
  primária) e `.disabled` (cor "muted", não clicável). Esta mesma classe
  `.nav-link` é reaproveitada pelo componente Tabs (seção 25).

## 16. Breadcrumbs

Trilha de navegação hierárquica ("você está aqui"), sem JavaScript — o
separador entre itens é desenhado via `::before` no CSS, então não precisa
inserir manualmente uma barra `/` entre eles no HTML.

```html
<nav>
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Início</a></li>
    <li class="breadcrumb-item"><a href="#">Categoria</a></li>
    <li class="breadcrumb-item active">Página atual</li>
  </ol>
</nav>
```

`.breadcrumb-item.active` marca o item atual (sem link, cor de texto normal
em vez de "muted"); os demais itens normalmente contêm um `<a>` interno.

## 17. Paginação

Navegação entre páginas de uma listagem — também sem JavaScript, a lógica de
qual página está ativa/desabilitada fica a cargo da sua aplicação (você
adiciona/remove as classes `.active`/`.disabled` conforme o estado atual).

```html
<ul class="pagination">
  <li class="page-item disabled"><a href="#" class="page-link">Anterior</a></li>
  <li class="page-item"><a href="#" class="page-link">1</a></li>
  <li class="page-item active"><a href="#" class="page-link">2</a></li>
  <li class="page-item"><a href="#" class="page-link">3</a></li>
  <li class="page-item"><a href="#" class="page-link">Próxima</a></li>
</ul>
```

`.page-item.active .page-link` fica com fundo/borda na cor primária;
`.page-item.disabled .page-link` fica com opacidade reduzida e
`pointer-events: none` (não clicável).

## 18. Spinner e Progress

Indicadores de carregamento e progresso — assim como breadcrumbs e
paginação, são 100% CSS, sem dependência de JavaScript. A cor de ambos herda
de `currentColor`/tokens de cor, então dá para colori-los tanto com as
variantes de estado próprias quanto com utilitários de texto genéricos.

### Spinner

```html
<div class="spinner" role="status"></div>
<div class="spinner spinner-sm spinner-primary" role="status"></div>
<div class="spinner spinner-lg spinner-danger" role="status"></div>
```

Um anel giratório contínuo (um dos lados é transparente, criando o efeito de
rotação). Tamanhos: `.spinner-sm` / `.spinner-lg` (sem sufixo = tamanho
padrão, 24px). Cor: `.spinner-{primary|success|warning|danger|info}`. A
animação desacelera automaticamente quando o usuário tem
`prefers-reduced-motion` ativado no sistema — você não precisa tratar isso
manualmente. O atributo `role="status"` fica a cargo de quem consome o
componente (não é adicionado automaticamente pelo CSS).

### Progress

```html
<div class="progress">
  <div class="progress-bar" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
</div>

<div class="progress progress-lg">
  <div class="progress-bar progress-bar-success progress-bar-striped progress-bar-animated"
       style="--clarus-progress-value: 80" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
</div>
```

A largura do preenchimento pode ser definida de duas formas equivalentes:
`style="width: 60%"` diretamente, ou pela variável
`--clarus-progress-value` (um número de 0 a 100, sem `%`) — use a que for mais
conveniente na sua aplicação (a variável é útil quando você já manipula
estado via JS e prefere não montar a string `"NN%"` manualmente).

- Tamanho: `.progress-sm` / `.progress-lg` no contêiner `.progress` (sem
  sufixo = 8px de altura).
- Cor do preenchimento: `.progress-bar-{primary|success|warning|danger|info}`
  no `.progress-bar` (sem uma dessas, usa `primary` como padrão).
- `.progress-bar-striped` — adiciona faixas diagonais.
- `.progress-bar-animated` — anima as faixas (só tem efeito combinado com
  `.progress-bar-striped`); a animação para automaticamente com
  `prefers-reduced-motion`.
- Assim como o spinner, `role="progressbar"` + `aria-valuenow`/`-min`/`-max`
  ficam a cargo de quem usa o componente.

## 19. Componentes interativos: conceitos gerais da API JavaScript

A partir daqui, os componentes exigem o arquivo JavaScript do framework
(`dist/js/clarus.js` ou `clarus.min.js`) além do CSS. Antes de ver cada um
individualmente, vale entender a API comum a todos eles — ela é sempre a
mesma, o que significa que aprender um componente já ensina 80% do
funcionamento dos outros.

### Inicialização automática via `data-clarus`

Nenhum componente interativo exige `new` manual para o uso básico. Basta
adicionar `data-clarus="<nome-do-componente>"` no elemento raiz do componente
(o gatilho, no caso de dropdown/modal/tooltip; o próprio contêiner, no caso de
accordion/tabs/toast/carousel) e incluir o script — a inicialização acontece
sozinha quando o DOM carrega:

```html
<button type="button" class="btn btn-primary" data-clarus="modal" data-target="#meuModal">
  Abrir modal
</button>

<script src="dist/js/clarus.js"></script>
```

### Recuperando a instância para controle programático

Toda instância criada automaticamente continua acessível via um método
estático `getInstance()` no namespace global `window.Clarus` — você não
precisa (nem deve) criar uma segunda instância manualmente:

```js
const modalEl = document.getElementById("meuModal");
Clarus.Modal.getInstance(modalEl).show();
```

### Métodos de instância padronizados

Todo componente interativo expõe os mesmos quatro métodos:

| Método | Efeito |
| --- | --- |
| `.show()` | Abre/exibe o componente |
| `.hide()` | Fecha/esconde o componente |
| `.toggle()` | Alterna entre aberto e fechado |
| `.dispose()` | Remove listeners e desfaz o estado da instância |

(Accordion, Tabs e Toast têm pequenas variações desse padrão — descritas nas
seções correspondentes — porque fazem sentido operar sobre "qual item" em vez
de um binário aberto/fechado único.)

### Eventos DOM customizados

Cada ação relevante dispara um `CustomEvent` nativo, com bubble habilitado,
no formato `clarus:<componente>:<evento>` — não é necessário passar callbacks
no construtor, basta escutar o evento como qualquer outro evento DOM:

```js
document.getElementById("meuModal").addEventListener("clarus:modal:shown", () => {
  console.log("modal foi aberto");
});
```

### Namespace único e import granular

Tudo fica dentro de `window.Clarus` (`Clarus.Modal`, `Clarus.Dropdown`,
`Clarus.core`, etc.) quando você usa o bundle único. Para quem usa um
bundler e quer importar só um componente:

```js
import { Modal } from "clarus-css/js/modal";
```

### Acessibilidade por padrão

Foco, teclado (Tab/Shift+Tab dentro de overlays, setas para navegação em
menus/abas, Escape para fechar) e atributos ARIA (`aria-expanded`,
`aria-haspopup`, `role`, etc.) já vêm implementados em cada componente — você
não precisa adicionar manualmente, mas pode inspecionar o HTML gerado se
quiser confirmar o comportamento.

## 20. Dropdown

Um menu suspenso ligado a um elemento gatilho (normalmente um botão),
posicionado automaticamente em relação a ele — inclusive com "flip" para o
lado oposto se não houver espaço suficiente na viewport, e clamp para não
vazar da tela.

```html
<div class="dropdown">
  <button type="button" class="btn btn-primary dropdown-toggle" data-clarus="dropdown" data-target="#meuMenu">
    Opções
  </button>
  <div class="dropdown-menu" id="meuMenu">
    <span class="dropdown-header">Conta</span>
    <a href="#" class="dropdown-item">Perfil</a>
    <a href="#" class="dropdown-item">Configurações</a>
    <div class="dropdown-divider"></div>
    <a href="#" class="dropdown-item disabled">Item desabilitado</a>
    <button type="button" class="dropdown-item">Sair</button>
  </div>
</div>
```

### Elementos CSS

- `.dropdown` — contêiner relativo, só para posicionar o toggle.
- `.dropdown-toggle` — classe opcional no gatilho, adiciona a seta (`::after`)
  indicando que é expansível.
- `.dropdown-menu` — o menu em si; ganha `.show` via JS quando aberto.
- `.dropdown-item` — cada item clicável (pode ser `<a>` ou `<button>`); aceita
  `.active` (item selecionado) e `.disabled` (não interativo, ignorado na
  navegação por teclado).
- `.dropdown-divider` — linha separadora horizontal.
- `.dropdown-header` — rótulo de agrupamento, não clicável.

### Atributos de dados (configuração)

| Atributo | Onde | Valores | Efeito |
| --- | --- | --- | --- |
| `data-clarus="dropdown"` | no gatilho | — | ativa a auto-inicialização |
| `data-target` | no gatilho | seletor CSS (`#id`) | aponta para o `.dropdown-menu` a ser controlado |
| `data-placement` | no gatilho | `top` \| `bottom` (padrão) \| `left` \| `right` | lado preferido para abrir o menu |
| `data-align` | no gatilho | `start` (padrão) \| `center` \| `end` | alinhamento no eixo cruzado — `start` alinha a borda esquerda do menu com a do botão, `end` alinha as bordas direitas |

```html
<!-- Alinhado pela direita, abrindo para cima -->
<button class="btn dropdown-toggle" data-clarus="dropdown" data-target="#menu2"
        data-placement="top" data-align="end">
  Opções
</button>
<div class="dropdown-menu" id="menu2">
  <a href="#" class="dropdown-item">Item 1</a>
</div>
```

### Comportamento (sem configuração adicional)

Navegação com `ArrowUp`/`ArrowDown` entre os itens habilitados; fecha ao
clicar em um item, clicar fora do menu, ou pressionar `Escape` (o foco volta
para o botão gatilho nos três casos).

### API JavaScript

```js
const toggleEl = document.querySelector('[data-target="#meuMenu"]');
const dropdown = Clarus.Dropdown.getInstance(toggleEl);

dropdown.show();
dropdown.hide();
dropdown.toggle();
```

Eventos: `clarus:dropdown:shown`, `clarus:dropdown:hidden` (disparados no
elemento gatilho, com bubble).

## 21. Tooltip

Uma dica textual que aparece ao passar o mouse ou focar (por teclado) um
elemento de referência. O texto vem do próprio HTML (atributo `title` ou
`data-title`), não é preciso criar o elemento do tooltip manualmente — o
componente o gera e o remove do fluxo do documento sozinho.

```html
<button type="button" class="btn" data-clarus="tooltip" data-placement="top" title="Isso é uma dica">
  Passe o mouse aqui
</button>
```

### Atributos de dados

| Atributo | Valores | Efeito |
| --- | --- | --- |
| `data-clarus="tooltip"` | — | ativa a auto-inicialização |
| `title` ou `data-title` | texto livre | conteúdo do tooltip (o `title` nativo é removido do DOM após a inicialização, para não duplicar com o tooltip visual do navegador) |
| `data-placement` | `top` (padrão) \| `bottom` \| `left` \| `right` | lado em que o tooltip aparece em relação ao elemento de referência |

```html
<button data-clarus="tooltip" data-placement="right" title="À direita do botão">Right</button>
<button data-clarus="tooltip" data-placement="bottom" title="Embaixo do botão">Bottom</button>
```

### Comportamento

Mostra/esconde em `mouseenter`/`mouseleave` e `focus`/`blur`, e também some ao
pressionar `Escape`. `aria-describedby` liga o elemento de referência ao
tooltip, para leitores de tela.

### API JavaScript

```js
const el = document.querySelector("[data-clarus='tooltip']");
Clarus.Tooltip.getInstance(el).show();
Clarus.Tooltip.getInstance(el).hide();
```

Eventos: `clarus:tooltip:shown`, `clarus:tooltip:hidden` (no elemento de
referência).

## 22. Modal

Uma caixa de diálogo sobreposta ao conteúdo da página, com bloqueio de scroll
do body enquanto aberta, armadilha de foco (focus trap) dentro do modal, e
fechamento por Escape/clique fora — a menos que configurado como estático.

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
      <div class="modal-body">
        <p>Conteúdo do modal.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal">Confirmar</button>
      </div>
    </div>
  </div>
</div>
```

### Elementos CSS

`.modal` (overlay + backdrop escurecido) → `.modal-dialog` (controla a
largura) → `.modal-content` (caixa visual) → `.modal-header` /
`.modal-body` / `.modal-footer` (as três seções, todas opcionais).

### Tamanhos

Aplicados em `.modal-dialog`, não em `.modal`:

```html
<div class="modal-dialog modal-sm">...</div> <!-- 320px -->
<div class="modal-dialog">...</div>          <!-- 480px, padrão -->
<div class="modal-dialog modal-lg">...</div> <!-- 720px -->
```

### Atributos de dados

| Atributo | Onde | Valores | Efeito |
| --- | --- | --- | --- |
| `data-clarus="modal"` | no gatilho | — | ativa a auto-inicialização |
| `data-target` | no gatilho | seletor CSS (`#id`) | aponta para o `.modal` a ser aberto |
| `data-dismiss="modal"` | em qualquer elemento dentro do modal | — | fecha o modal ao clicar (botão de fechar, cancelar, etc.) |
| `data-backdrop` | no `.modal` | `static` | desativa fechamento por Escape e por clique fora — só fecha via `data-dismiss` |

```html
<div class="modal" id="modalEstatico" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        Este modal só fecha pelo botão — Escape e clique fora estão desativados.
      </div>
    </div>
  </div>
</div>
```

### API JavaScript

```js
const modalEl = document.getElementById("meuModal");
const modal = Clarus.Modal.getInstance(modalEl);

modal.show();
modal.hide();
modal.toggle();
```

Eventos: `clarus:modal:shown`, `clarus:modal:hidden` (no elemento gatilho). O
foco retorna automaticamente ao gatilho quando o modal fecha.

## 23. Select customizado

Substitui a aparência nativa (e inconsistente entre navegadores) de um
`<select>` por um menu estilizado como `.form-select` + `.dropdown-menu`,
reaproveitando 100% da lógica de posicionamento, navegação por setas e
fechamento do componente Dropdown (seção 20) — em vez de duplicar essa lógica
em um componente à parte. O `<select>` nativo original continua no DOM (só
fica visualmente oculto), então formulários HTML tradicionais (submit nativo,
`FormData`, validação nativa) continuam funcionando sem alteração.

```html
<select id="estado" data-clarus="select">
  <option>Selecione um estado</option>
  <option>São Paulo</option>
  <option>Rio de Janeiro</option>
  <option disabled>Minas Gerais (indisponível)</option>
  <option>Bahia</option>
</select>
```

### Atributos de dados

| Atributo | Valores | Efeito |
| --- | --- | --- |
| `data-clarus="select"` | — | ativa a auto-inicialização (o `<select>` precisa ser um elemento `<select>` nativo) |
| `data-size` | `sm` \| `lg` | aplica `.form-select-sm`/`.form-select-lg` no toggle gerado |
| `disabled` | atributo nativo do `<select>` | desabilita o toggle gerado |

```html
<select data-clarus="select" data-size="sm">
  <option>Pequeno</option>
  <option>Médio</option>
</select>

<select data-clarus="select" disabled>
  <option>Indisponível</option>
</select>
```

### Comportamento

Ao clicar em um item, o `<select>` nativo tem seu `selectedIndex` atualizado
e dispara um evento `change` nativo (para compatibilidade com qualquer
listener já existente no seu código), além do evento próprio do Clarus.
Semântica ARIA usa `role="listbox"`/`role="option"`/`aria-selected` (mais
correto para este caso do que o `role="menu"` herdado do Dropdown por baixo).

### API JavaScript

```js
const selectEl = document.getElementById("estado");
const select = Clarus.Select.getInstance(selectEl);

select.show();
select.hide();
select.toggle();
```

Evento: `clarus:select:changed`, disparado no `<select>` nativo, com
`event.detail.value` contendo o valor selecionado.

```js
document.getElementById("estado").addEventListener("clarus:select:changed", (event) => {
  console.log(event.detail.value);
});
```

## 24. Accordion

Uma lista de painéis expansíveis, dos quais normalmente só um fica aberto por
vez (como um FAQ) — mas isso é configurável. A altura de cada painel é
animada via JavaScript (`collapse()`/`expand()`), respeitando
`prefers-reduced-motion`.

```html
<div class="accordion" data-clarus="accordion" id="meuAccordion">
  <div class="accordion-item">
    <h3 class="accordion-header">
      <button type="button" class="accordion-button" aria-expanded="true">Pergunta 1</button>
    </h3>
    <div class="accordion-collapse">
      <div class="accordion-body">Resposta da pergunta 1.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h3 class="accordion-header">
      <button type="button" class="accordion-button" aria-expanded="false">Pergunta 2</button>
    </h3>
    <div class="accordion-collapse">
      <div class="accordion-body">Resposta da pergunta 2.</div>
    </div>
  </div>
</div>
```

### Estrutura

`.accordion` (contêiner) → `.accordion-item` (cada painel, com borda própria)
→ `.accordion-header` (envolve o botão, normalmente um `<h3>` por semântica)
→ `.accordion-button` (o gatilho clicável) → `.accordion-collapse`
(contêiner que anima a altura) → `.accordion-body` (o conteúdo em si).

O estado inicial de cada painel é definido por `aria-expanded="true"/"false"`
no `.accordion-button` **no HTML** — o JavaScript lê esse atributo na
inicialização para decidir quais painéis começam abertos.

### Atributos de dados

| Atributo | Onde | Valores | Efeito |
| --- | --- | --- | --- |
| `data-clarus="accordion"` | no contêiner `.accordion` | — | ativa a auto-inicialização |
| `data-multiple` | no contêiner `.accordion` | `"true"` | permite múltiplos painéis abertos ao mesmo tempo (padrão: só um por vez) |

```html
<div class="accordion" data-clarus="accordion" data-multiple="true">
  <!-- vários .accordion-item podem ficar abertos simultaneamente -->
</div>
```

### API JavaScript

```js
const accordionEl = document.getElementById("meuAccordion");
Clarus.Accordion.getInstance(accordionEl);
```

Eventos: `clarus:accordion:shown`, `clarus:accordion:hidden`, disparados no
`.accordion-button` correspondente ao painel que mudou de estado.

## 25. Tabs

Abas para alternar entre painéis de conteúdo, sem recarregar a página. A
marcação dos links reaproveita `.nav-link` (a mesma classe usada na navbar) —
o que muda é o contêiner (`.tabs` em vez de `.navbar-nav`) e o atributo
`data-target` ligando cada aba ao seu painel de conteúdo.

```html
<div class="tabs" data-clarus="tabs" id="minhasTabs">
  <a href="#" class="nav-link active" data-target="#painel-perfil">Perfil</a>
  <a href="#" class="nav-link" data-target="#painel-seguranca">Segurança</a>
  <a href="#" class="nav-link disabled" data-target="#painel-notificacoes">Notificações</a>
</div>
<div class="tab-content">
  <div class="tab-pane active" id="painel-perfil">Conteúdo da aba Perfil.</div>
  <div class="tab-pane" id="painel-seguranca">Conteúdo da aba Segurança.</div>
  <div class="tab-pane" id="painel-notificacoes">Conteúdo da aba Notificações.</div>
</div>
```

### Estrutura e atributos

- `.tabs` com `data-clarus="tabs"` — contêiner das abas (vira
  `role="tablist"`).
- Cada `.nav-link` — a aba clicável; usa `data-target` (seletor CSS) para
  apontar para o painel correspondente. `.active` marca a aba/painel inicial;
  `.disabled` marca uma aba não navegável (ignorada tanto no clique quanto na
  navegação por teclado).
- `.tab-content` > `.tab-pane` — os painéis de conteúdo; só o `.tab-pane` com
  `.active` fica visível.

### Comportamento

Clique alterna `.active` na aba e no painel correspondente. Navegação por
teclado quando uma aba está focada: `ArrowRight`/`ArrowLeft` movem para a
próxima/anterior aba habilitada (com roving `tabindex`, ciclando do fim para o
início e vice-versa), `Home`/`End` vão direto para a primeira/última aba
habilitada.

### API JavaScript

```js
const tablistEl = document.getElementById("minhasTabs");
const tabs = Clarus.Tabs.getInstance(tablistEl);

tabs.show(document.querySelector('[data-target="#painel-seguranca"]'));
```

Evento: `clarus:tab:changed`, disparado na aba que se tornou ativa, com
`event.detail.target` contendo o seletor do painel correspondente.

## 26. Toast

Uma notificação temporária (tipo "snackbar"), normalmente empilhada em um
canto da tela via `.toast-container`. Diferente dos demais componentes,
instâncias de Toast **não aparecem automaticamente** ao carregar a página —
mesmo com `data-clarus="toast"`, o elemento só fica visível quando `.show()`
é chamado explicitamente (tipicamente após alguma ação do usuário, como
salvar um formulário).

```html
<div class="toast-container">
  <div class="toast toast-success" data-clarus="toast" id="meuToast" data-delay="4000">
    <div class="toast-header">
      <span>Sucesso</span>
      <button type="button" class="btn-close" data-dismiss="toast" aria-label="Fechar"></button>
    </div>
    <div class="toast-body">Operação concluída com sucesso.</div>
  </div>
</div>

<button type="button" class="btn btn-primary" id="disparar-toast">Salvar</button>

<script>
  document.getElementById("disparar-toast").addEventListener("click", () => {
    Clarus.Toast.getInstance(document.getElementById("meuToast")).show();
  });
</script>
```

### Atributos de dados

| Atributo | Valores | Efeito |
| --- | --- | --- |
| `data-clarus="toast"` | — | ativa a auto-inicialização (a instância é criada, mas o toast fica escondido até `.show()`) |
| `data-delay` | número (ms) | tempo até o auto-dismiss, padrão `4000` |
| `data-autohide` | `"false"` | desativa o fechamento automático (o toast só fecha via `.hide()` ou `data-dismiss`) |

### Variantes de cor

`.toast-{primary|success|warning|danger|info}` tingem o `.toast-header` com a
cor de estado correspondente (mesmos tokens dos alertas).

```html
<div class="toast toast-danger" data-clarus="toast" data-autohide="false">
  <div class="toast-header">
    <span>Erro</span>
    <button type="button" class="btn-close" data-dismiss="toast" aria-label="Fechar"></button>
  </div>
  <div class="toast-body">Este toast não fecha sozinho — precisa ser dispensado manualmente.</div>
</div>
```

### API JavaScript

```js
const toastEl = document.getElementById("meuToast");
const toast = Clarus.Toast.getInstance(toastEl);

toast.show();
toast.hide();
toast.toggle();
```

Eventos: `clarus:toast:shown`, `clarus:toast:hidden`.

## 27. Carousel

Um carrossel de slides, com dois layouts (deslizamento horizontal ou fade),
setas, indicadores, navegação por teclado, swipe por toque/ponteiro e
autoplay opcional — o componente mais completo do framework em termos de
interação.

```html
<div class="carousel" data-clarus="carousel" id="meuCarousel">
  <div class="carousel-inner">
    <div class="carousel-item active"><img src="slide1.jpg" alt="Slide 1"></div>
    <div class="carousel-item"><img src="slide2.jpg" alt="Slide 2"></div>
    <div class="carousel-item"><img src="slide3.jpg" alt="Slide 3"></div>
  </div>
  <button class="carousel-control-prev" type="button" aria-label="Anterior"></button>
  <button class="carousel-control-next" type="button" aria-label="Próximo"></button>
  <ol class="carousel-indicators">
    <li><button type="button" aria-label="Ir para o slide 1"></button></li>
    <li><button type="button" aria-label="Ir para o slide 2"></button></li>
    <li><button type="button" aria-label="Ir para o slide 3"></button></li>
  </ol>
</div>
```

### Estrutura

`.carousel` (contêiner, recorta o overflow) → `.carousel-inner` (trilha,
desloca via `translateX`) → `.carousel-item` (cada slide; exatamente um deve
ter `.active` no HTML inicial). Setas (`.carousel-control-prev`/`-next`) e
indicadores (`.carousel-indicators`, uma lista de `<button>`) são **opcionais**
— inclua só os que fizerem sentido para o seu caso de uso.

### Variantes de layout

```html
<div class="carousel carousel-fade" data-clarus="carousel">
  <!-- slides empilhados, alternando opacidade em vez de deslizar -->
</div>
```

- Sem modificador (padrão) — os slides deslizam horizontalmente.
- `.carousel-fade` — os slides ficam empilhados no mesmo lugar, alternando
  por opacidade.
- `.carousel-hover-controls` — as setas ficam ocultas até o hover do mouse ou
  foco por teclado (`:focus-within`) dentro do carrossel; use quando quiser
  uma interface mais limpa sem as setas sempre visíveis.

### Atributos de dados

| Atributo | Valores | Efeito |
| --- | --- | --- |
| `data-clarus="carousel"` | — | ativa a auto-inicialização |
| `data-autoplay` | `"true"` | avança os slides automaticamente |
| `data-interval` | número (ms) | intervalo entre slides no autoplay, padrão `5000` |

```html
<div class="carousel carousel-hover-controls" data-clarus="carousel"
     data-autoplay="true" data-interval="3000">
  <!-- avança sozinho a cada 3s; pausa no hover/foco -->
</div>
```

### Comportamento

Teclado: `ArrowLeft`/`ArrowRight` (slide anterior/próximo), `Home`/`End`
(primeiro/último slide) — funciona quando o carrossel (ou algo dentro dele)
está focado. Swipe: arraste horizontal de pelo menos 40px via pointer events
(funciona tanto com toque quanto com mouse). Autoplay pausa automaticamente
no hover e no foco, retomando quando o mouse sai ou o foco se move para fora.

### API JavaScript

```js
const carouselEl = document.getElementById("meuCarousel");
const carousel = Clarus.Carousel.getInstance(carouselEl);

carousel.next();
carousel.prev();
carousel.goTo(2);   // vai direto para o slide de índice 2 (0-based)
carousel.pause();   // pausa o autoplay, se ativo
carousel.dispose();
```

Evento: `clarus:carousel:slid`, disparado a cada troca de slide, com
`event.detail` contendo `{ from, to }` (índices do slide anterior e do novo).

## 28. Customização por CSS Custom Properties (tokens)

Toda a identidade visual do framework é exposta como variáveis CSS com
prefixo `--clarus-`, definidas em `:root`. Para customizar, basta redefinir a
variável em qualquer CSS carregado depois do Clarus CSS — sem fork do
projeto, sem recompilar Sass:

```css
:root {
  --clarus-color-primary: #6d28d9;
  --clarus-radius-md: 10px;
  --clarus-font-sans: "Inter", sans-serif;
}
```

### Tokens principais disponíveis

| Token | Uso |
| --- | --- |
| `--clarus-color-primary` / `-success` / `-warning` / `-danger` / `-info` | cores de estado usadas em botões, badges, alertas, etc. |
| `--clarus-color-text` / `-muted` / `-border` / `-surface` / `-subtle` | cores neutras estruturais (texto, texto secundário, bordas, fundo de superfície, fundo sutil) |
| `--clarus-font-sans` / `-mono` | famílias tipográficas |
| `--clarus-radius-sm` / `-md` / `-lg` | raios de borda |
| `--clarus-shadow-sm` / `-md` / `-lg` | sombras (usadas por `.shadow-*` e componentes com elevação) |
| `--clarus-gutter-x` / `-y` | gutter do grid (normalmente controlado pelas classes `.g-*`/`.gx-*`/`.gy-*`, seção 6, mas pode ser redefinido globalmente aqui) |
| `--clarus-tooltip-bg` / `-text` | cores específicas do tooltip |
| `--clarus-alert-{nome}-bg` / `-text` | fundo/texto de cada variante de alerta (e tabelas de estado) |
| `--clarus-feedback-{nome}-bg` | fundo de `.valid-feedback`/`.invalid-feedback` |
| `--clarus-progress-value` | valor (0–100) da barra de progresso, quando não usado `style="width"` |

A lista completa e exaustiva vive em `scss/tokens/_root.scss` (valores do
tema claro) e `scss/themes/_dark.scss` (overrides do tema escuro) — vale
consultar esses dois arquivos quando precisar de um token que não está nesta
tabela resumida.

### Sobrescrevendo por escopo

Como são variáveis CSS normais, você pode redefini-las em qualquer seletor,
não só em `:root` — o que permite, por exemplo, uma seção específica da
página com uma cor primária diferente do resto do site:

```css
.secao-promocional {
  --clarus-color-primary: #dc263e;
}
```

Qualquer `.btn-primary`, `.badge-primary`, etc. dentro de `.secao-promocional`
passa a usar essa cor, sem afetar o resto da página.

## 29. Dark mode

O tema escuro é ativado por um único atributo em qualquer elemento
ancestral — normalmente o `<html>`, para afetar a página inteira:

```html
<html data-theme="dark">
```

Não há JavaScript obrigatório para isso funcionar (a troca é 100% CSS via
seletor de atributo); o JavaScript só entra se você quiser alternar o tema
dinamicamente pelo usuário (por exemplo, um botão de alternância), o que é
responsabilidade da sua aplicação, não do framework:

```js
document.getElementById("alternar-tema").addEventListener("click", () => {
  const html = document.documentElement;
  const atual = html.getAttribute("data-theme");
  html.setAttribute("data-theme", atual === "dark" ? "light" : "dark");
});
```

### Componentes que se posicionam fora do fluxo (dropdown, tooltip, select)

Dropdown e Tooltip criam seus elementos (`.dropdown-menu`, `.tooltip`) fora do
elemento original no DOM, para o posicionamento absoluto funcionar
corretamente. Isso significa que, sem tratamento especial, esses elementos
"herdariam" o tema errado se o `data-theme="dark"` estivesse só em um
contêiner específico da página (não no `<html>`). O componente já resolve
isso sozinho: ao abrir, ele verifica o `data-theme` mais próximo do elemento
de referência/gatilho e replica esse valor no elemento posicionado — você não
precisa fazer nada manualmente para isso funcionar, mesmo com dark mode
aplicado apenas a uma seção da página (não à página inteira).

```html
<div data-theme="dark">
  <button class="btn dropdown-toggle" data-clarus="dropdown" data-target="#menuEscuro">
    Opções
  </button>
  <div class="dropdown-menu" id="menuEscuro">
    <!-- o menu abre corretamente em dark mode, mesmo estando fora deste <div> no DOM -->
  </div>
</div>
```

## 30. Onde ver mais exemplos e como contribuir

- **`mockup/*.html`** — cada grupo de componente tem um arquivo de exemplo
  funcional dedicado (tema claro e escuro lado a lado), consumindo os
  arquivos já compilados em `dist/`. É a forma mais rápida de ver qualquer
  componente funcionando sem escrever código: abra o arquivo correspondente
  no navegador depois de rodar `npm run build`.
- **`docs/definitions.md`** — histórico de decisões de arquitetura e o
  catálogo técnico completo de cada componente (classes, tokens, módulos
  JS envolvidos).
- **`docs/scss-architecture.md`** — como o SCSS é organizado em camadas
  (`settings`, `tools`, `tokens`, `base`, `layout`, `forms`, `components`,
  `utilities`, `themes`) e como o pipeline de build gera os arquivos de
  `dist/`.
- **`docs/guia-comandos.md`** — referência de comandos de terminal (git,
  npm, build, versionamento, publicação) para quem for desenvolver no
  próprio repositório do framework.
- **`CONTRIBUTING.md`** — convenções de contribuição, caso queira propor
  mudanças ou novos componentes.
- **`CHANGELOG.md`** — histórico de versões, seguindo Keep a Changelog e
  Semantic Versioning.

Para rodar o projeto localmente (build, watch, lint, testes):

```bash
npm install
npm run build   # gera dist/css e dist/js a partir de scss/ e js/
npm run watch   # rebuild automático ao salvar arquivos
npm run lint    # stylelint em scss/**/*.scss
npm test        # testes funcionais (Vitest)
npm run test:visual  # testes de regressão visual (Playwright)
```
