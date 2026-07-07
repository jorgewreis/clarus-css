# Tag

Badge dismissível — reusa [Badge](badge.md) e `.cl-btn-close`
([Button](button.md)) mais o JS mínimo pra remover do DOM ao clicar no "x".

## Visão geral

```html
<span class="cl-badge cl-tag" data-cl="tag">
  Frontend
  <button type="button" class="cl-btn-close" data-cl-dismiss="tag" aria-label="Remover tag Frontend"></button>
</span>
```

## Anatomia

`.cl-badge.cl-tag` (mesmo elemento, duas classes — Tag é um refinamento de
Badge, não um componente separado) contendo texto + `.cl-btn-close` com
`data-cl-dismiss="tag"`.

## Variações

- **Cor**: as mesmas de [Badge](badge.md) (`.cl-badge-{cor}`).
- **Tamanho**: escala própria, mais granular que a de Badge —
  `.cl-tag-xs`, `.cl-tag-sm`, `.cl-tag-lg`, `.cl-tag-xl` (sem sufixo =
  padrão).
- **Agrupamento**: `.cl-tag-group` (flex + wrap + gap) no contêiner pai,
  pra várias tags lado a lado quebrando linha sem cortar.

```html
<div class="cl-tag-group">
  <span class="cl-badge cl-tag cl-tag-sm" data-cl="tag">Design<button type="button" class="cl-btn-close" data-cl-dismiss="tag" aria-label="Remover"></button></span>
  <span class="cl-badge cl-tag cl-tag-sm" data-cl="tag">Frontend<button type="button" class="cl-btn-close" data-cl-dismiss="tag" aria-label="Remover"></button></span>
</div>
```

## Estados

Botão de dispensa tem hover (fundo sutil) e `:active` (leve "afundar",
feedback tátil antes da remoção assíncrona).

## A11y

- `.cl-btn-close` **precisa** de `aria-label` descritivo (ex.: "Remover tag
  Frontend", não só "Remover") — é um botão só-ícone.
- A remoção só acontece ao clicar no botão de fechar, nunca ao clicar na
  tag inteira — evita remoção acidental.

## API JS

Auto-init via `data-cl="tag"`. `Tag.getInstance(el)`.

| Método | Descrição |
|---|---|
| `dismiss()` | Dispara `cl:tag:dismissed` (cancelável); se não cancelado, remove o elemento do DOM. |
| `dispose()` | Remove o listener de clique e desregistra a instância (não remove o elemento). |

| Evento | Cancelável | Quando |
|---|---|---|
| `cl:tag:dismissed` | Sim | Antes de remover — `event.preventDefault()` cancela a remoção. |

```js
document.getElementById("tag-protegida").addEventListener("cl:tag:dismissed", (event) => {
  event.preventDefault();
  alert("Essa tag não pode ser removida.");
});
```

## Tokens

Usa os tokens de [Badge](badge.md). Sem tokens de componente próprios.

## Exemplo

```html
<div class="cl-tag-group">
  <span class="cl-badge cl-badge-primary cl-tag" data-cl="tag">
    Urgente
    <button type="button" class="cl-btn-close" data-cl-dismiss="tag" aria-label="Remover tag Urgente"></button>
  </span>
  <span class="cl-badge cl-badge-danger cl-tag" data-cl="tag">
    Bloqueado
    <button type="button" class="cl-btn-close" data-cl-dismiss="tag" aria-label="Remover tag Bloqueado"></button>
  </span>
</div>
```

Mockup: [`mockup/tag.html`](../../mockup/tag.html).
