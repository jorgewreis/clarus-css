# Divider

Linha divisória, 100% CSS — traço simples ou com rótulo centralizado.

## Visão geral

```html
<hr class="cl-divider">

<div class="cl-divider"><span class="cl-divider-label">ou</span></div>
```

## Anatomia

Duas formas, conforme o elemento:

- `<hr class="cl-divider">` — traço simples, uma linha (`<hr>` não aceita
  filhos).
- `<div class="cl-divider">` com `.cl-divider-label` dentro — texto
  centralizado, flanqueado por duas linhas desenhadas via
  `::before`/`::after` (precisa ser `<div>`, não `<hr>`, por causa do
  filho).

## Variações

Nenhuma — sem cor, tamanho ou orientação alternativa.

## Estados

Nenhum — elemento estático.

## A11y

`<hr>` já tem `role="separator"` implícito. Na variante com `<div>`, se a
separação for só visual (não estrutural), não precisa de role extra; se
divide seções de conteúdo distintas, considere `role="separator"`
explícito.

## API JS

Nenhuma — 100% CSS.

## Tokens

`--cl-color-border`, `--cl-color-muted` (texto do label).

## Exemplo

```html
<p>Conteúdo acima.</p>
<hr class="cl-divider">
<p>Conteúdo abaixo.</p>

<div class="cl-divider"><span class="cl-divider-label">ou entre com</span></div>
```

Mockup: [laboratório do componente](../../mockup/foundations.html#divider).
