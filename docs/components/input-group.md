# Input Group

Funde um [Input](input.md) (ou Select, ou Button) com "addons" de texto/
ícone de prefixo/sufixo — 100% CSS, reaproveita os tokens visuais do
próprio `.cl-form-control` (borda, cor, raio).

## Visão geral

```html
<div class="cl-input-group">
  <span class="cl-input-group-text">R$</span>
  <input type="number" class="cl-form-control">
</div>
```

## Anatomia

`.cl-input-group` (flex, `align-items: stretch` — a altura do addon
acompanha a do controle automaticamente) > qualquer combinação de
`.cl-form-control`/`.cl-form-select`/`.cl-btn` + `.cl-input-group-text`
(addon de texto/ícone estático). As bordas dos itens adjacentes se fundem
(sem borda dupla), com o item focado subindo por cima (`z-index`) pra sua
borda de foco não ficar parcialmente escondida atrás do vizinho.

## Variações

Tamanho: `.cl-input-group-sm`, `.cl-input-group-lg` no
`.cl-input-group` — redimensiona **todos** os filhos de uma vez (controle
+ addons), não precisa repetir `-sm`/`-lg` em cada um.

```html
<div class="cl-input-group cl-input-group-sm">
  <span class="cl-input-group-text">@</span>
  <input type="text" class="cl-form-control">
</div>
```

## Estados

Nenhum próprio — herda os estados do `.cl-form-control`/`.cl-form-select`
interno (foco, disabled, validação).

## A11y

O addon (`.cl-input-group-text`) é só visual — se o texto dele for
essencial pra entender o campo (não decorativo), associe ao input via
`aria-describedby` com um `id` no addon, igual a um texto de apoio comum.

## API JS

Nenhuma — 100% CSS.

## Tokens

Os mesmos de [Input](input.md) — `--cl-color-border`,
`--cl-color-surface`, `--cl-color-subtle` (addon), `--cl-color-muted`
(texto do addon), `--cl-radius-sm`.

## Exemplo

```html
<div class="cl-input-group">
  <span class="cl-input-group-text" id="addon-url">https://</span>
  <input type="text" class="cl-form-control" aria-describedby="addon-url" placeholder="seusite.com">
</div>

<div class="cl-input-group">
  <input type="text" class="cl-form-control" placeholder="Buscar...">
  <button type="button" class="cl-btn">Buscar</button>
</div>
```

Mockup: [laboratório do componente](../../mockup/forms.html#input-group).
