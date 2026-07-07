# Segmented Control

Grupo de botões com estado selecionado — alternativa compacta a radio
buttons/tabs para poucas opções mutuamente exclusivas (ou não). 100% CSS,
mesma técnica de input oculto + label irmã.

## Visão geral

```html
<div class="cl-segmented-control">
  <div class="cl-segmented-item">
    <input type="radio" name="periodo" class="cl-segmented-input" id="p-dia" checked>
    <label for="p-dia" class="cl-segmented-label">Dia</label>
  </div>
  <div class="cl-segmented-item">
    <input type="radio" name="periodo" class="cl-segmented-input" id="p-semana">
    <label for="p-semana" class="cl-segmented-label">Semana</label>
  </div>
  <div class="cl-segmented-item">
    <input type="radio" name="periodo" class="cl-segmented-input" id="p-mes">
    <label for="p-mes" class="cl-segmented-label">Mês</label>
  </div>
</div>
```

## Anatomia

`.cl-segmented-control` (contêiner, borda externa única) >
`.cl-segmented-item` (um por opção) > `.cl-segmented-input`
(`<input>`, oculto via clip) + `.cl-segmented-label` (`<label for="...">`).

## Variações

- **Exclusivo vs. inclusivo**: use `<input type="radio">` com o mesmo
  `name` (só uma opção selecionada por vez — como no exemplo) ou
  `<input type="checkbox">` (cada item seleciona/deseleciona
  independentemente).
- **Tamanho**: `.cl-segmented-control-sm`, `.cl-segmented-control-lg`; sem
  sufixo = padrão (38px de altura).

```html
<div class="cl-segmented-control cl-segmented-control-sm">...</div>
```

## Estados

- **checked**: item selecionado ganha fundo/texto na cor primária.
- **disabled**: no input — opacidade reduzida, sem interação.
- **Foco**: anel sobre o item focado (`z-index` elevado pra não ficar
  parcialmente escondido pela borda do vizinho).

## A11y

`<input>` nativo (radio ou checkbox) — toda a semântica de grupo (seleção
exclusiva com radio, navegação por seta entre itens do mesmo `name`) vem
do navegador, sem JS. Sempre associe `label` via `for`/`id`.

## API JS

Nenhuma — 100% CSS.

## Tokens

`--cl-color-border`, `--cl-color-surface`, `--cl-color-subtle` (hover),
`--cl-color-primary` (selecionado), `--cl-radius-sm`.

## Exemplo

```html
<div class="cl-segmented-control">
  <div class="cl-segmented-item">
    <input type="checkbox" class="cl-segmented-input" id="f-ativo" checked>
    <label for="f-ativo" class="cl-segmented-label">Ativos</label>
  </div>
  <div class="cl-segmented-item">
    <input type="checkbox" class="cl-segmented-input" id="f-arquivado">
    <label for="f-arquivado" class="cl-segmented-label">Arquivados</label>
  </div>
</div>
```

Mockup: [`mockup/segmented-control.html`](../../mockup/segmented-control.html).
