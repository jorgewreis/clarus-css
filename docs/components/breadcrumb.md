# Breadcrumb

Trilha de navegação hierárquica ("você está aqui"). O uso básico é 100%
CSS; auto-init opcional (`data-cl="breadcrumb"`) adiciona truncamento com
tooltip e colapso em telas pequenas.

## Visão geral

```html
<nav aria-label="breadcrumb">
  <ol class="cl-breadcrumb">
    <li class="cl-breadcrumb-item"><a href="#">Início</a></li>
    <li class="cl-breadcrumb-item"><a href="#">Categoria</a></li>
    <li class="cl-breadcrumb-item is-active">Página atual</li>
  </ol>
</nav>
```

## Anatomia

`<ol class="cl-breadcrumb">` > `<li class="cl-breadcrumb-item">` (com
`<a>` interno, exceto o último). O separador `/` entre itens é desenhado
via `::before` — não insira manualmente.

## Variações

Nenhuma variação visual (cor/tamanho); a variação é comportamental (ver
Avançado abaixo).

## Estados

`.cl-breadcrumb-item.is-active` — marca o item atual, sem link, cor de
texto normal (os demais usam `--cl-color-muted`).

## Avançado: truncamento + colapso (JS opcional)

Com `data-cl="breadcrumb"`, cada label longo trunca com reticências (CSS)
e ganha um tooltip com o texto completo **só se realmente transbordar**
(medido após as fontes carregarem, pra não errar o corte com a métrica do
fallback). Abaixo de 640px de largura de viewport, os níveis
intermediários (mantendo sempre o primeiro e o último visíveis) colapsam
num único item "…" que abre um dropdown com os links ocultos.

```html
<ol class="cl-breadcrumb" data-cl="breadcrumb" data-max-items="3">
  <li class="cl-breadcrumb-item"><a href="#">Início</a></li>
  <li class="cl-breadcrumb-item"><a href="#">Categoria de produtos muito específica</a></li>
  <li class="cl-breadcrumb-item"><a href="#">Subcategoria</a></li>
  <li class="cl-breadcrumb-item"><a href="#">Marca</a></li>
  <li class="cl-breadcrumb-item is-active">Produto atual com nome bem longo</li>
</ol>
```

`data-max-items` (padrão `4`) define quantos itens cabem antes do colapso
entrar em ação (só é avaliado abaixo do breakpoint `sm`, 640px).

## A11y

- Envolva a lista num `<nav aria-label="breadcrumb">` (ou "trilha de
  navegação") — não gerado automaticamente.
- O item "…" do colapso tem `aria-label="Mostrar níveis ocultos"` e abre um
  [Dropdown](dropdown.md) padrão, com toda a navegação por teclado dele.

## API JS

Auto-init via `data-cl="breadcrumb"` (só necessário para truncamento/
colapso — a trilha básica não precisa de JS). `Breadcrumb.getInstance(el)`.

| Método | Descrição |
|---|---|
| `dispose()` | Remove o listener de media query, restaura os itens colapsados e desregistra a instância. |

Sem eventos customizados.

## Tokens

`--cl-color-muted`, `--cl-color-primary` (links), `--cl-color-text`
(item ativo). O dropdown do colapso usa os tokens de
[Dropdown](dropdown.md).

## Exemplo

```html
<nav aria-label="breadcrumb">
  <ol class="cl-breadcrumb">
    <li class="cl-breadcrumb-item"><a href="#">Início</a></li>
    <li class="cl-breadcrumb-item"><a href="#">Categoria</a></li>
    <li class="cl-breadcrumb-item is-active">Produto atual</li>
  </ol>
</nav>
```

Mockup: [`mockup/pagination-breadcrumbs.html`](../../mockup/pagination-breadcrumbs.html).
