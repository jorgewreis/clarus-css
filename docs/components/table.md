# Table

Tabelas seguem a marcação HTML nativa — classes modificadoras no próprio
`<table>` ligam/desligam comportamentos visuais.

## Visão geral

```html
<table class="cl-table cl-table-striped cl-table-hover">
  <thead>
    <tr><th>Nome</th><th>Status</th></tr>
  </thead>
  <tbody>
    <tr><td>Ana</td><td>Ativo</td></tr>
    <tr><td>Bruno</td><td>Inativo</td></tr>
  </tbody>
</table>
```

## Anatomia

`<table class="cl-table">` com `<thead>`/`<tbody>` nativos — nenhuma
marcação extra obrigatória. `<thead th>` já vem em uppercase, cor muted,
peso médio.

## Variações

- `.cl-table-striped` — linhas ímpares do corpo com fundo diferente (zebra).
- `.cl-table-hover` — destaca a linha sob o cursor.
- `.cl-table-bordered` — bordas em todas as células.
- `.cl-table-borderless` — remove todas as bordas internas.
- `.cl-table-sm` — reduz o padding das células.
- `.cl-table-{primary|secondary|success|warning|danger|info}` — tinge
  fundo/texto da tabela inteira com uma cor de estado (mesmos tokens dos
  alerts).
- `.cl-table-responsive` — aplique num `<div>` **envolvendo** a
  `<table>` (não na tabela em si), para rolagem horizontal em telas
  estreitas:

```html
<div class="cl-table-responsive">
  <table class="cl-table">...</table>
</div>
```

Combináveis entre si (ex.: `cl-table-striped cl-table-bordered cl-table-sm`).

## Estados

Nenhum — tabela é conteúdo estático; ordenação/filtro/paginação de dados
ficam a cargo da sua aplicação (não há JS de tabela no framework hoje).

## A11y

- Use `<th scope="col">`/`<th scope="row">` conforme o cabeçalho for de
  coluna ou linha — não é aplicado automaticamente.
- Para tabelas grandes/complexas, considere `<caption>` descrevendo o
  conteúdo.

## API JS

Nenhuma — 100% CSS.

## Tokens

`--cl-color-border`, `--cl-color-text`, `--cl-color-muted` (cabeçalho),
`--cl-color-subtle` (striped/hover), `--cl-alert-{nome}-bg`/`-text`
(variante de cor de estado).

## Exemplo

```html
<div class="cl-table-responsive">
  <table class="cl-table cl-table-striped cl-table-bordered cl-table-sm">
    <thead>
      <tr><th scope="col">Nome</th><th scope="col">E-mail</th><th scope="col">Status</th></tr>
    </thead>
    <tbody>
      <tr><td>Ana</td><td>ana@exemplo.com</td><td>Ativo</td></tr>
    </tbody>
  </table>
</div>
```

Mockup: [`mockup/tables-navbar.html`](../../mockup/tables-navbar.html).
