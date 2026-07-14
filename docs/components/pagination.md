# Pagination

Navegação entre páginas de uma listagem — sem JavaScript próprio; qual
página está ativa/desabilitada é responsabilidade da sua aplicação (você
adiciona/remove `.is-active`/`.is-disabled` conforme o estado atual). Os
ícones de anterior/próxima/reticências usam o pacote
[`clarus-icons`](../guides/icons.md) (Lucide) — veja lá se quiser trocar
por outro conjunto.

## Visão geral

```html
<ul class="cl-pagination">
  <li class="cl-page-item is-disabled">
    <a href="#" class="cl-page-link" aria-label="Anterior">
      <svg class="cl-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
    </a>
  </li>
  <li class="cl-page-item"><a href="#" class="cl-page-link">1</a></li>
  <li class="cl-page-item is-active"><a href="#" class="cl-page-link">2</a></li>
  <li class="cl-page-item"><a href="#" class="cl-page-link">3</a></li>
  <li class="cl-page-item">
    <a href="#" class="cl-page-link" aria-label="Próxima">
      <svg class="cl-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </a>
  </li>
</ul>
```

## Anatomia

`<ul class="cl-pagination">` > `<li class="cl-page-item">` >
`<a class="cl-page-link">` — marcação de lista nativa, `<ul>`/`<li>`. Nos
itens de anterior/próxima só com ícone (sem texto visível), o `<a>` precisa
de `aria-label` (`"Anterior"`/`"Próxima"`) já que o SVG é `aria-hidden`.

## Variações

- **Bordered**: `.cl-pagination-bordered` — itens colados (sem gap), borda
  fundida entre eles (técnica de margin negativo do
  [Input Group](input-group.md)), cantos arredondados só nas pontas.
- **Tamanho**: `.cl-pagination-sm`, `.cl-pagination-lg`; sem sufixo =
  padrão (32px).
- **Prev/next descritivo**: `.cl-page-link-text` no item de anterior/
  próxima, pra ícone + texto (`"Anterior"`/`"Próxima"`) em vez de só o
  ícone — só ajusta o `gap`/padding, o `.cl-page-link` já acomoda largura
  variável. Com texto visível, dispensa o `aria-label` (o link já tem
  nome acessível pelo próprio texto).
- **Reticências** (intervalo de páginas omitido, ex. `1 2 3 … 8 9 10`):
  `.cl-page-item.is-disabled` com um `<span>` (não `<a>` — não é uma ação)
  contendo o ícone `ellipsis`, `aria-hidden="true"` no item inteiro
  (não comunica nada de acionável a leitores de tela).

```html
<ul class="cl-pagination cl-pagination-bordered cl-pagination-sm">
  <li class="cl-page-item"><a href="#" class="cl-page-link">1</a></li>
  <li class="cl-page-item is-active"><a href="#" class="cl-page-link">2</a></li>
</ul>

<ul class="cl-pagination">
  <li class="cl-page-item">
    <a href="#" class="cl-page-link cl-page-link-text">
      <svg class="cl-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      Anterior
    </a>
  </li>
  <li class="cl-page-item">
    <a href="#" class="cl-page-link cl-page-link-text">
      Próxima
      <svg class="cl-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </a>
  </li>
</ul>

<ul class="cl-pagination">
  <li class="cl-page-item"><a href="#" class="cl-page-link">1</a></li>
  <li class="cl-page-item"><a href="#" class="cl-page-link">2</a></li>
  <li class="cl-page-item"><a href="#" class="cl-page-link">3</a></li>
  <li class="cl-page-item is-disabled" aria-hidden="true">
    <span class="cl-page-link">
      <svg class="cl-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
    </span>
  </li>
  <li class="cl-page-item"><a href="#" class="cl-page-link">8</a></li>
  <li class="cl-page-item"><a href="#" class="cl-page-link">9</a></li>
  <li class="cl-page-item"><a href="#" class="cl-page-link">10</a></li>
</ul>
```

## Estados

- `.cl-page-item.is-active .cl-page-link` — fundo/borda na cor primária.
- `.cl-page-item.is-disabled .cl-page-link` — opacidade reduzida,
  `pointer-events: none` (não clicável, não focável por mouse; ainda é
  focável por teclado como um link comum — considere `aria-disabled="true"`
  e remover do fluxo de tab se precisar bloquear totalmente). No item de
  reticências (sem `<a>`), isso não se aplica — ele nunca é focável.

## A11y

- Envolva a lista num `<nav aria-label="Paginação">` — o elemento `<nav>`
  não é gerado pelo framework, adicione no seu HTML.
- Marque a página atual com `aria-current="page"` no link ativo, além de
  `.is-active` (a classe é só visual).
- Ícone sozinho (sem texto) precisa de `aria-label` no `<a>` pai; ícone +
  texto visível não precisa (o texto já nomeia o link) — só marque o SVG
  como `aria-hidden="true"` nos dois casos, pra não duplicar o nome
  acessível.

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
    <li class="cl-page-item is-disabled">
      <a href="#" class="cl-page-link" aria-label="Anterior">
        <svg class="cl-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </a>
    </li>
    <li class="cl-page-item"><a href="#" class="cl-page-link">1</a></li>
    <li class="cl-page-item is-active"><a href="#" class="cl-page-link" aria-current="page">2</a></li>
    <li class="cl-page-item"><a href="#" class="cl-page-link">3</a></li>
    <li class="cl-page-item">
      <a href="#" class="cl-page-link" aria-label="Próxima">
        <svg class="cl-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </a>
    </li>
  </ul>
</nav>
```

Mockup: [laboratório do componente](../../mockup/navigation-disclosure.html#pagination).
