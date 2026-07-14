# Select customizado

Substitui a aparência do `<select>` nativo (impossível de estilizar
consistentemente entre navegadores) por um [Dropdown](dropdown.md), mantendo
o `<select>` real por baixo — sincronizado, escondido visualmente.

## Visão geral

```html
<select class="cl-form-select" data-cl="select" id="pais">
  <option value="br">Brasil</option>
  <option value="pt">Portugal</option>
  <option value="us" disabled>Estados Unidos (indisponível)</option>
</select>
```

O JS constrói o dropdown customizado logo depois do `<select>` no DOM e
esconde o original (`display: none` — continua no DOM, então
`<select>`/`<option>` do seu HTML/backend seguem sendo a fonte da
verdade).

## Anatomia

Gerado automaticamente a partir do `<select>`: `.cl-dropdown.cl-form-select-dropdown`
> `.cl-form-select` (botão-toggle, mesma aparência estática documentada em
[Input](input.md#anatomia)) + `.cl-dropdown-menu` > um `.cl-dropdown-item`
por `<option>`.

## Variações

Tamanho: `data-size="sm"`/`"lg"` no `<select>` original — vira
`.cl-form-select-sm`/`-lg` no toggle gerado.

```html
<select class="cl-form-select" data-cl="select" data-size="sm">...</select>
```

## Estados

- `<option disabled>` vira um item com `.is-disabled` no menu (não
  clicável).
- `<select disabled>` desabilita o botão-toggle inteiro.
- Item selecionado (`selectedIndex`) fica com `.is-active` no menu.

## A11y

`aria-haspopup="listbox"` no toggle, `role="listbox"` no menu,
`role="option"` + `aria-selected` em cada item — aplicados
automaticamente. Navegação por teclado herdada do
[Dropdown](dropdown.md) (`ArrowDown`/`ArrowUp` entre opções, `Escape`
fecha). Selecionar uma opção dispara `change` no `<select>` original —
formulários/validação que escutam esse evento continuam funcionando sem
mudança.

## API JS

Auto-init via `data-cl="select"` **no `<select>`**. `Select.getInstance(selectEl)`.

| Método | Descrição |
|---|---|
| `show()` / `hide()` / `toggle()` | Delegam pro Dropdown interno. |
| `dispose()` | Desmonta o dropdown gerado, restaura o `<select>` original visível. |

| Evento (no `<select>` original) | Cancelável | Quando |
|---|---|---|
| `change` (nativo) | Não | Ao selecionar uma opção — mesmo evento que um `<select>` comum dispara. |
| `cl:select:changed` | Não | Mesmo momento, com `event.detail.value` (o novo valor). |

## Tokens

Os mesmos do [Dropdown](dropdown.md) e de
[`.cl-form-select`](input.md) — sem tokens próprios.

## Exemplo

```html
<select class="cl-form-select" data-cl="select" id="prioridade">
  <option value="baixa">Baixa</option>
  <option value="media" selected>Média</option>
  <option value="alta">Alta</option>
</select>
<script>
  document.getElementById("prioridade").addEventListener("cl:select:changed", (e) => {
    console.log("nova prioridade:", e.detail.value);
  });
</script>
```

Mockup: [laboratório do componente](../../mockup/forms.html#select).
