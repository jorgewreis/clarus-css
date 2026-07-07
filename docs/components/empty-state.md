# Empty State

Bloco padrão para listas/telas vazias ("nenhum resultado", "nada aqui
ainda") — 100% CSS.

## Visão geral

```html
<div class="cl-empty-state">
  <div class="cl-empty-state-icon">📭</div>
  <h3 class="cl-empty-state-title">Nenhum resultado encontrado</h3>
  <p class="cl-empty-state-text">Tente ajustar os filtros ou buscar por outro termo.</p>
  <button type="button" class="cl-btn cl-btn-primary">Limpar filtros</button>
</div>
```

## Anatomia

`.cl-empty-state` (contêiner centralizado em coluna) > `.cl-empty-state-icon`
(slot vazio — emoji/SVG/ilustração próprios, sem variantes fixas de estado)
+ `.cl-empty-state-title` + `.cl-empty-state-text` (opcional) + ação
opcional (reusa [Button](button.md), não é parte do componente).

## Variações

Nenhuma — o componente é deliberadamente sem modificadores; a variação vem
do conteúdo que você põe dentro do slot de ícone.

## Estados

Nenhum — elemento estático.

## A11y

Se o Empty State substitui uma lista que normalmente teria itens (ex.:
resultado de busca), considere `aria-live="polite"` no contêiner pai se ele
aparece dinamicamente após uma ação do usuário (busca, filtro), para
leitores de tela anunciarem a mudança.

## API JS

Nenhuma — 100% CSS.

## Tokens

`--cl-color-subtle`/`--cl-color-muted` (ícone), `--cl-color-text` (título),
`--cl-color-muted` (texto).

## Exemplo

```html
<div class="cl-empty-state">
  <div class="cl-empty-state-icon">🔍</div>
  <h3 class="cl-empty-state-title">Nada por aqui ainda</h3>
  <p class="cl-empty-state-text">Quando você criar seu primeiro projeto, ele aparece nesta lista.</p>
  <button type="button" class="cl-btn cl-btn-primary">Criar projeto</button>
</div>
```

Mockup: [`mockup/empty-state.html`](../../mockup/empty-state.html).
