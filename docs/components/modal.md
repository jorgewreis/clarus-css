# Modal

Diálogo sobreposto à página inteira, com focus trap, `Escape` e clique
fora pra fechar. Base do [Alert Dialog](alert-dialog.md).

## Visão geral

```html
<button type="button" class="cl-btn cl-btn-primary" data-cl="modal" data-cl-target="#meuModal">
  Abrir modal
</button>

<div class="cl-modal" id="meuModal">
  <div class="cl-modal-dialog">
    <div class="cl-modal-content">
      <div class="cl-modal-header">
        <h3 class="cl-modal-title">Título</h3>
        <button type="button" class="cl-btn-close" data-cl-dismiss="modal" aria-label="Fechar"></button>
      </div>
      <div class="cl-modal-body">Conteúdo do modal.</div>
      <div class="cl-modal-footer">
        <button type="button" class="cl-btn" data-cl-dismiss="modal">Cancelar</button>
        <button type="button" class="cl-btn cl-btn-primary">Confirmar</button>
      </div>
    </div>
  </div>
</div>
```

`data-cl` vai no **gatilho** (o botão que abre), não no `.cl-modal` — ao
contrário da maioria dos outros componentes.

## Anatomia

Gatilho (`data-cl="modal"` + `data-cl-target`) + `.cl-modal` (overlay de
tela cheia, centraliza o conteúdo) > `.cl-modal-dialog` (limita a largura)
> `.cl-modal-content` (card visual) > `.cl-modal-header` (título +
`.cl-btn-close`, opcional) + `.cl-modal-body` (rola internamente se o
conteúdo for maior que a viewport) + `.cl-modal-footer` (ações, opcional).

## Variações

Tamanho do diálogo: `.cl-modal-sm` (320px), `.cl-modal-lg` (720px) em
`.cl-modal-dialog`; sem sufixo = 480px (padrão).

```html
<div class="cl-modal-dialog cl-modal-lg">...</div>
```

## Estados

`.is-open` no `.cl-modal` — controlado pelo JS.

**Backdrop estático** (`data-backdrop="static"` no `.cl-modal`): desativa
fechamento por `Escape` e clique fora — só um `data-cl-dismiss="modal"`
explícito fecha. Use para fluxos que exigem uma decisão explícita.

```html
<div class="cl-modal" id="modalCritico" data-backdrop="static">...</div>
```

## A11y

`role="dialog"` + `aria-modal="true"` aplicados automaticamente. Ao abrir:
foco preso dentro do `.cl-modal-dialog` (`Tab`/`Shift+Tab` ciclam só entre
os elementos focáveis internos), primeiro elemento focável recebe foco,
scroll da página é bloqueado. Ao fechar: foco volta pro gatilho que abriu.

## API JS

Auto-init via `data-cl="modal"` **no gatilho**. `Modal.getInstance(triggerEl)`.

| Método | Descrição |
|---|---|
| `show()` | Abre, trava o scroll, ativa o focus trap. |
| `hide()` | Fecha, libera o scroll, devolve o foco ao gatilho. |
| `toggle()` | Alterna. |
| `dispose()` | Fecha se aberto, remove listeners, desregistra a instância. |

| Evento (no gatilho) | Cancelável | Quando |
|---|---|---|
| `cl:modal:shown` | Não | Depois de abrir. |
| `cl:modal:hidden` | Não | Depois de fechar (inclusive via Escape/clique fora). |

## Tokens

`--cl-color-surface`, `--cl-color-text`, `--cl-color-border`,
`--cl-radius-md`, `--cl-shadow-lg`.

## Exemplo

```html
<button type="button" class="cl-btn cl-btn-danger" data-cl="modal" data-cl-target="#confirmarExclusao">
  Excluir
</button>
<div class="cl-modal" id="confirmarExclusao">
  <div class="cl-modal-dialog cl-modal-sm">
    <div class="cl-modal-content">
      <div class="cl-modal-body">
        <h3 class="cl-modal-title">Excluir item?</h3>
        <p>Essa ação não pode ser desfeita.</p>
      </div>
      <div class="cl-modal-footer">
        <button type="button" class="cl-btn" data-cl-dismiss="modal">Cancelar</button>
        <button type="button" class="cl-btn cl-btn-danger">Excluir</button>
      </div>
    </div>
  </div>
</div>
```

Para o mesmo padrão sem escrever HTML, ver [Alert Dialog](alert-dialog.md)
(`Clarus.confirm()`). Mockup: [`mockup/modal-select.html`](../../mockup/modal-select.html).
