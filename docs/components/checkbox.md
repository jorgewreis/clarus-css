# Checkbox

Checkbox 100% CSS, desenhado sobre um `<input type="checkbox">` nativo —
teclado, foco e semântica são os do navegador; o framework só estiliza.

## Visão geral

```html
<div class="cl-check">
  <input type="checkbox" class="cl-check-input" id="aceite">
  <label for="aceite" class="cl-check-label">Aceito os termos</label>
</div>
```

## Anatomia

`.cl-check` (wrapper) > `.cl-check-input` (`<input>`, visualmente oculto
via clip — continua focável/anunciado por leitor de tela) + `.cl-check-label`
(`<label for="...">`, desenha a caixa via `::before` e a marca via
`::after`). Input e label são **irmãos**, não aninhados — a associação é só
por `for`/`id` (mesma técnica de [Segmented Control](segmented-control.md)
e [Rating](rating.md)).

O `for`/`id` é obrigatório: sem ele, clicar no texto não alterna o
checkbox, e leitores de tela não anunciam o rótulo.

## Variações

Tamanho: `.cl-check-sm`, `.cl-check-lg` no wrapper (sem sufixo = padrão).

```html
<div class="cl-check cl-check-sm">...</div>
<div class="cl-check cl-check-lg">...</div>
```

## Estados

- **checked**: atributo `checked` no `<input>`.
- **indeterminate**: só via JavaScript (`input.indeterminate = true` — não
  existe atributo HTML equivalente; o framework estiliza `:indeterminate`,
  você decide quando aplicar).
- **disabled**: atributo `disabled` no `<input>`.
- **Validação**: classes `.is-valid`/`.is-invalid` no `<input>` (mesma
  convenção de [`.cl-form-control`](input.md)) — muda a cor da borda.
- **Foco**: `:focus-visible` no input desenha o anel sobre a caixa
  (`::before` da label), não sobre o texto.

```html
<input type="checkbox" class="cl-check-input is-invalid" id="c1">
<label for="c1" class="cl-check-label">Campo obrigatório</label>
```

```js
document.getElementById("c2").indeterminate = true;
```

## A11y

- `<input type="checkbox">` nativo — `Space` alterna, `Tab` foca, leitor de
  tela anuncia estado (marcado/desmarcado/indeterminado) automaticamente.
  Nenhum ARIA extra é necessário.
- Sempre associe `label` via `for`/`id` — não use só `aria-label` no input
  se houver texto visível ao lado (duplica a leitura ou some com o clique
  no texto).

## API JS

Nenhuma — 100% CSS. `indeterminate` é uma propriedade do DOM nativo do
`<input>`, não uma API do Clarus.

## Tokens

Sem tokens de componente próprios — usa `--cl-color-primary` (caixa
marcada), `--cl-color-border`/`--cl-color-surface` (caixa vazia),
`--cl-color-success`/`--cl-color-danger` (validação), `--cl-radius-sm`.

## Exemplo

```html
<div class="cl-check">
  <input type="checkbox" class="cl-check-input" id="c1" checked>
  <label for="c1" class="cl-check-label">Marcado</label>
</div>
<div class="cl-check">
  <input type="checkbox" class="cl-check-input" id="c2" disabled>
  <label for="c2" class="cl-check-label">Desabilitado</label>
</div>
```

Mockup: [`mockup/check-radio-switch.html`](../../mockup/check-radio-switch.html).
