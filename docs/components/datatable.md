# DataTable

Camada JS opcional sobre uma [Table](table.md) comum: ordenação por coluna,
filtro por texto e paginação client-side, tudo sobre a marcação `<table>`
semântica já existente — sem framework de dados, sem dependência externa.
Reusa `.cl-table` para a tabela, `.cl-pagination`/`.cl-page-link` para o
paginador (mesmas classes do [Pagination](pagination.md)) e
`.cl-empty-state` para a lista vazia.

## Visão geral

```html
<div class="cl-datatable" data-cl="datatable" data-cl-page-size="5">
  <div class="cl-datatable-toolbar">
    <input type="search" class="cl-form-control" data-cl-datatable-filter placeholder="Filtrar…">
  </div>
  <table class="cl-table cl-table-striped cl-table-hover">
    <thead>
      <tr>
        <th scope="col" data-cl-sort="name">Nome</th>
        <th scope="col" data-cl-sort="age">Idade</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Ana</td><td>35</td></tr>
      <tr><td>Bruno</td><td>19</td></tr>
    </tbody>
  </table>
  <div class="cl-empty-state" data-cl-datatable-empty hidden>
    <p class="cl-empty-state-title">Nenhum resultado encontrado.</p>
  </div>
</div>
```

Auto-init em `data-cl="datatable"`, colocado no `<div>` que envolve
toolbar/tabela/estados — não no `<table>` diretamente. O JS lê as linhas de
`<tbody>` uma vez na inicialização; se a tabela for repovoada por fora
(ex.: resposta de uma API), chame `instance.refresh()`.

## Anatomia

`.cl-datatable[data-cl="datatable"]` > opcionalmente `.cl-datatable-toolbar`
(com `input[data-cl-datatable-filter]`) + `table.cl-table` (com
`th[data-cl-sort]` no `<thead>`) + opcionalmente
`[data-cl-datatable-empty]`/`[data-cl-datatable-loading]`/`[data-cl-datatable-error]`
+ `nav[data-cl-datatable-pagination]` (criado automaticamente se ausente).

## Variações

- `data-cl-sort="chave"` num `<th>` o torna ordenável — o JS envolve o
  conteúdo existente num `<button class="cl-datatable-sort-btn">`
  automaticamente (não escreva o botão você mesmo).
- `data-cl-sort-type="number"`, `"currency"` ou `"date"` no `<th>` ativa
  comparação tipada; sem o atributo, a ordenação usa texto. Combine com
  `data-cl-sort-value` quando o valor exibido for formatado.
- `data-cl-sort-value` numa `<td>` define o valor usado pra ordenar aquela
  célula, se for diferente do texto exibido (ex.: data ISO por trás de um
  texto formatado, número por trás de um texto com símbolo).
- `data-cl-page-size="N"` no elemento raiz define quantas linhas por
  página (padrão: 10).
- `[data-cl-datatable-filter]` — um `<input>` (dentro do elemento raiz)
  que filtra por substring em qualquer célula da linha, case-insensitive.
- `[data-cl-datatable-empty]` — bloco (tipicamente `.cl-empty-state`)
  mostrado no lugar da tabela quando o filtro não encontra nenhuma linha.
- `[data-cl-datatable-loading]` / `[data-cl-datatable-error]` — blocos
  mostrados via `setLoading()`/`setError()` (ver API JS); nenhum dos dois é
  obrigatório.
- `[data-cl-datatable-pagination]` — se você quiser controlar onde o
  paginador aparece, forneça o elemento; senão o JS cria um `<nav>` e
  anexa ao final do elemento raiz.

## Estados

- **Vazio**: filtro sem correspondências — tabela ocultada,
  `[data-cl-datatable-empty]` exibido (se fornecido; sem ele, a tabela só
  fica com zero linhas visíveis).
- **Carregando**: acionado por `instance.setLoading(true)` — tabela e
  paginador ocultados, `[data-cl-datatable-loading]` exibido (tipicamente
  linhas `.cl-skeleton-text`).
- **Erro**: acionado por `instance.setError("mensagem")` — tabela e
  paginador ocultados, `[data-cl-datatable-error]` exibido, com o texto
  escrito em `[data-cl-datatable-error-message]` dentro dele (se existir).
- Paginação: o `<nav>` só é exibido quando há mais de uma página.

## A11y

`aria-sort` (`"none"`/`"ascending"`/`"descending"`) em cada `<th>`
ordenável, atualizado a cada clique — o botão interno recebe o clique/foco
(padrão recomendado pelo
[WAI-ARIA Table Sort](https://www.w3.org/WAI/ARIA/apg/patterns/table/examples/sortable-table/),
`aria-sort` no `th`, ativação num elemento focável dentro dele). Células de
dados usam roving `tabindex` (uma célula visível por vez com `tabindex="0"`,
as demais `-1"`) pra navegação em grade sem tornar cada célula uma parada
extra no Tab da página.

Teclado (com foco numa célula do corpo da tabela):
- `ArrowRight`/`ArrowLeft`/`ArrowUp`/`ArrowDown`: move o foco pra célula
  vizinha (não cruza limites da página visível).
- `Home`/`End`: primeira/última célula da linha atual.
- `Ctrl+Home`/`Ctrl+End`: primeira célula da tabela / última célula da
  última linha visível.

Teclado (com foco no botão de ordenação do cabeçalho): `Enter`/`Espaço`
ativam nativamente (é um `<button>`), ciclando
ascendente → descendente → nenhuma.

## API JS

Auto-init via `data-cl="datatable"` no elemento raiz.
`DataTable.getInstance(rootEl)`.

| Método | Descrição |
|---|---|
| `sort(key, direction)` | Ordena pela coluna com `data-cl-sort="key"`. `direction`: `"asc"` \| `"desc"` \| `"none"`. |
| `filter(query)` | Filtra por substring (aplica também no input, se houver um). |
| `goToPage(page)` | Navega pra página (1-indexado, com clamp nos limites). |
| `refresh()` | Relê as linhas de `<tbody>` do zero — use após repovoar a tabela por fora. |
| `setLoading(bool)` | Alterna o estado de carregamento. |
| `setError(mensagem \| null)` | Mostra (com mensagem) ou limpa (`null`) o estado de erro. |
| `dispose()` | Remove listeners e desregistra a instância. |

| Propriedade | Descrição |
|---|---|
| `sortKey` / `sortDirection` | Coluna e direção de ordenação atuais (`sortDirection`: `"asc"` \| `"desc"` \| `"none"`). |
| `filterQuery` | Texto de filtro atual. |
| `currentPage` / `pageCount` | Página atual e total de páginas (considerando o filtro). |
| `rowCount` | Quantidade de linhas que correspondem ao filtro atual. |
| `pageSize` | Linhas por página (lido de `data-cl-page-size`, ou 10). |

| Evento (no elemento raiz) | Cancelável | Quando |
|---|---|---|
| `cl:datatable:sorted` | Não | Após ordenar, com `detail.key`/`detail.direction`. |
| `cl:datatable:filtered` | Não | Após filtrar, com `detail.query`/`detail.matched`. |
| `cl:datatable:paged` | Não | Após trocar de página, com `detail.page`/`detail.pageCount`. |

## Tokens

Reusa os tokens de [Table](table.md) e [Pagination](pagination.md) — sem
tokens próprios de cor. `.cl-datatable-sort-btn` usa
`var(--cl-color-muted)`/`var(--cl-color-text)` pro indicador de direção
(↕/↑/↓).

## Exemplo

```html
<div class="cl-datatable" data-cl="datatable" data-cl-page-size="3">
  <div class="cl-datatable-toolbar">
    <input type="search" class="cl-form-control" data-cl-datatable-filter placeholder="Filtrar por nome ou status…">
  </div>
  <table class="cl-table cl-table-striped">
    <thead>
      <tr>
        <th scope="col" data-cl-sort="name">Nome</th>
        <th scope="col" data-cl-sort="status">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Ana</td><td>Ativo</td></tr>
      <tr><td>Bruno</td><td>Inativo</td></tr>
    </tbody>
  </table>
  <div class="cl-empty-state" data-cl-datatable-empty hidden>
    <p class="cl-empty-state-title">Nenhum resultado encontrado.</p>
  </div>
</div>
<script>
  document.querySelector(".cl-datatable").addEventListener("cl:datatable:sorted", (e) => {
    console.log("ordenado por", e.detail.key, e.detail.direction);
  });
</script>
```

Mockup: [laboratório do componente](../../mockup/content-data.html#datatable).
