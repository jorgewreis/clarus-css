# Rating

Avaliação por estrelas, 100% CSS — mesma técnica de input oculto + label
irmã do [Checkbox](checkbox.md)/[Segmented Control](segmented-control.md),
usando `<input type="radio">` (seleção exclusiva nativa).

## Visão geral

```html
<div class="cl-rating">
  <input type="radio" name="nota" class="cl-rating-input" id="nota-5" value="5">
  <label for="nota-5" class="cl-rating-star">★</label>
  <input type="radio" name="nota" class="cl-rating-input" id="nota-4" value="4">
  <label for="nota-4" class="cl-rating-star">★</label>
  <input type="radio" name="nota" class="cl-rating-input" id="nota-3" value="3">
  <label for="nota-3" class="cl-rating-star">★</label>
  <input type="radio" name="nota" class="cl-rating-input" id="nota-2" value="2">
  <label for="nota-2" class="cl-rating-star">★</label>
  <input type="radio" name="nota" class="cl-rating-input" id="nota-1" value="1">
  <label for="nota-1" class="cl-rating-star">★</label>
</div>
```

**A ordem no HTML é decrescente** (5, 4, 3, 2, 1) — truque clássico de CSS
puro: o contêiner usa `row-reverse` (visualmente reordena pra crescente,
esquerda→direita) e o destaque "estrela clicada + todas à esquerda dela"
usa só o combinador de irmãos gerais (`~`, que só enxerga o que vem
**depois** no DOM) — depende da ordem decrescente pra funcionar.

## Anatomia

`.cl-rating` (contêiner, `row-reverse`) > pares `.cl-rating-input`
(`<input type="radio">`, mesmo `name`, oculto via clip) +
`.cl-rating-star` (`<label for="...">`, glifo `★`), um por nota possível,
em ordem decrescente de `value`.

## Variações

Tamanho: `.cl-rating-sm` (16px), `.cl-rating-lg` (32px); sem sufixo = 24px
(padrão).

## Estados

- Nota selecionada e todas as anteriores (maior valor) ficam na cor de
  aviso (`--cl-color-warning`) — via `:checked ~ .cl-rating-star`.
- **Hover** prévia a mesma seleção antes de confirmar o clique
  (`:hover`/`:hover ~`).
- `disabled` no input — opacidade reduzida, sem interação.

## A11y

`<input type="radio">` nativo — `Tab` foca o grupo, `ArrowLeft`/
`ArrowRight` (ou `Up`/`Down`) movem a seleção entre notas, `Space`
confirma. Cada `label` deve ter um texto acessível melhor que só `★`
para leitores de tela — considere `aria-label="5 estrelas"` no
`<label>` ou um `<span class="u-visually-hidden">` (não existe essa
utilitária no framework hoje; use `position: absolute; width: 1px...`
como no padrão de "visualmente oculto" usado internamente, ou seu
próprio CSS).

## API JS

Nenhuma — 100% CSS. O valor selecionado é lido como qualquer grupo de
radio nativo (`document.querySelector('input[name="nota"]:checked').value`).

## Tokens

`--cl-color-border` (estrela vazia), `--cl-color-warning` (selecionada/
hover), `--cl-color-primary` (anel de foco).

## Exemplo

```html
<fieldset>
  <legend>Avalie sua experiência</legend>
  <div class="cl-rating">
    <input type="radio" name="exp" class="cl-rating-input" id="exp-5" value="5" checked>
    <label for="exp-5" class="cl-rating-star" aria-label="5 estrelas">★</label>
    <input type="radio" name="exp" class="cl-rating-input" id="exp-4" value="4">
    <label for="exp-4" class="cl-rating-star" aria-label="4 estrelas">★</label>
    <input type="radio" name="exp" class="cl-rating-input" id="exp-3" value="3">
    <label for="exp-3" class="cl-rating-star" aria-label="3 estrelas">★</label>
  </div>
</fieldset>
```

Mockup: [`mockup/rating.html`](../../mockup/rating.html).
