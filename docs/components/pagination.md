# Pagination

Navegação entre páginas de uma listagem — sem JavaScript próprio; qual
página está ativa/desabilitada é responsabilidade da sua aplicação (você
adiciona/remove `.is-active`/`.is-disabled` conforme o estado atual).

## Visão geral

```html
<ul class="cl-pagination">
  <li class="cl-page-item is-disabled"><a href="#" class="cl-page-link">«</a></li>
  <li class="cl-page-item"><a href="#" class="cl-page-link">1</a></li>
  <li class="cl-page-item is-active"><a href="#" class="cl-page-link">2</a></li>
  <li class="cl-page-item"><a href="#" class="cl-page-link">3</a></li>
  <li class="cl-page-item"><a href="#" class="cl-page-link">»</a></li>
</ul>
```

## Anatomia

`<ul class="cl-pagination">` > `<li class="cl-page-item">` >
`<a class="cl-page-link">` — marcação de lista nativa, `<ul>`/`<li>`.

## Variações

- **Bordered**: `.cl-pagination-bordered` — itens colados (sem gap), borda
  fundida entre eles (técnica de margin negativo do
  [Input Group](input-group.md)), cantos arredondados só nas pontas.
- **Tamanho**: `.cl-pagination-sm`, `.cl-pagination-lg`; sem sufixo =
  padrão (32px).
- **Prev/next descritivo**: `.cl-page-link-text` no item de anterior/
  próxima, pra texto (`"← Anterior"`) em vez de só `«`/`»` — só ajusta o
  `gap`/padding pro ícone+texto, o `.cl-page-link` já acomoda largura
  variável.

```html
<ul class="cl-pagination cl-pagination-bordered cl-pagination-sm">
  <li class="cl-page-item"><a href="#" class="cl-page-link">1</a></li>
  <li class="cl-page-item is-active"><a href="#" class="cl-page-link">2</a></li>
</ul>

<ul class="cl-pagination">
  <li class="cl-page-item"><a href="#" class="cl-page-link cl-page-link-text">← Anterior</a></li>
  <li class="cl-page-item"><a href="#" class="cl-page-link cl-page-link-text">Próxima →</a></li>
</ul>
```

## Estados

- `.cl-page-item.is-active .cl-page-link` — fundo/borda na cor primária.
- `.cl-page-item.is-disabled .cl-page-link` — opacidade reduzida,
  `pointer-events: none` (não clicável, não focável por mouse; ainda é
  focável por teclado como um link comum — considere `aria-disabled="true"`
  e remover do fluxo de tab se precisar bloquear totalmente).

## A11y

- Envolva a lista num `<nav aria-label="Paginação">` — o elemento `<nav>`
  não é gerado pelo framework, adicione no seu HTML.
- Marque a página atual com `aria-current="page"` no link ativo, além de
  `.is-active` (a classe é só visual).

## API JS

Nenhuma — 100% CSS. Ativar/desativar itens é feito pela sua aplicação.

## Tokens

Usa `--cl-color-border`, `--cl-color-surface`, `--cl-color-subtle`
(hover), `--cl-color-primary` (ativo), `--cl-color-muted` (desabilitado),
`--cl-radius-sm`.

## Exemplo

```html
<nav aria-label="Paginação">
  <ul class="cl-pagination cl-pagination-bordered">
    <li class="cl-page-item is-disabled"><a href="#" class="cl-page-link">«</a></li>
    <li class="cl-page-item"><a href="#" class="cl-page-link">1</a></li>
    <li class="cl-page-item is-active"><a href="#" class="cl-page-link" aria-current="page">2</a></li>
    <li class="cl-page-item"><a href="#" class="cl-page-link">3</a></li>
    <li class="cl-page-item"><a href="#" class="cl-page-link">»</a></li>
  </ul>
</nav>
```

Mockup: [`mockup/pagination-breadcrumbs.html`](../../mockup/pagination-breadcrumbs.html).
