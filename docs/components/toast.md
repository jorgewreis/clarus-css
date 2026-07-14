# Toast

Notificação temporária, empilhada num canto da tela, com dispensa manual
ou automática por tempo. Base do [Notification Center](notification-center.md).

## Visão geral

```html
<button type="button" class="cl-btn cl-btn-primary" id="btn-toast">Mostrar toast</button>

<div class="cl-toast-container">
  <div class="cl-toast cl-toast-success" data-cl="toast" id="meuToast" data-delay="4000">
    <div class="cl-toast-header">
      <span>Sucesso</span>
      <button type="button" class="cl-btn-close" data-cl-dismiss="toast" aria-label="Fechar"></button>
    </div>
    <div class="cl-toast-body">Operação concluída com sucesso.</div>
  </div>
</div>
```

```js
document.getElementById("btn-toast").addEventListener("click", () => {
  Clarus.Toast.getInstance(document.getElementById("meuToast")).show();
});
```

Ao contrário de Modal/Offcanvas, o Toast **não** abre sozinho ao clicar num
gatilho com `data-cl-target` — ele é mostrado programaticamente via
`.show()`, porque geralmente é disparado por um evento da sua aplicação
(sucesso de uma requisição, etc.), não diretamente por um clique.

## Anatomia

`.cl-toast-container` (posição fixa num canto — um só por página,
compartilhado por todos os toasts) > `.cl-toast` (`data-cl="toast"`) >
`.cl-toast-header` (título + `.cl-btn-close`) + `.cl-toast-body`.

## Variações

Cor: `.cl-toast-{primary|secondary|success|warning|danger|info}` no
`.cl-toast` — tinge só o header.

## Estados

`.is-open` — controlado pelo JS (o toast começa com `display: none`
inline até a primeira `show()`).

- `data-delay` (ms, padrão `4000`) — tempo até auto-esconder.
- `data-autohide="false"` — desativa o auto-esconder; só fecha pelo
  `.cl-btn-close` ou `.hide()` programático.

## A11y

`role="status"` + `aria-live="polite"` aplicados automaticamente — leitor
de tela anuncia o conteúdo ao aparecer, sem interromper o que está sendo
lido (diferente de `aria-live="assertive"`, que interromperia).

## API JS

Auto-init via `data-cl="toast"` (registra a instância, mas **não** mostra
automaticamente). `Toast.getInstance(el)`.

| Método | Descrição |
|---|---|
| `show()` | Mostra (anima expansão), inicia o temporizador de auto-esconder se `autohide` estiver ativo. |
| `hide()` | Esconde (anima recolhimento), cancela o temporizador. |
| `toggle()` | Alterna. |
| `dispose()` | Cancela o temporizador, remove listeners, desregistra a instância. |

| Evento | Cancelável | Quando |
|---|---|---|
| `cl:toast:shown` | Não | Depois que a animação de mostrar termina. |
| `cl:toast:hidden` | Não | Depois que a animação de esconder termina (inclusive auto-hide). |

## Tokens

`--cl-color-border`, `--cl-color-surface`, `--cl-alert-{nome}-bg`/`-text`
(header colorido), `--cl-radius-md`, `--cl-shadow-md`.

## Exemplo

```html
<div class="cl-toast-container">
  <div class="cl-toast cl-toast-danger" data-cl="toast" id="erroToast" data-autohide="false">
    <div class="cl-toast-header">
      <span>Erro</span>
      <button type="button" class="cl-btn-close" data-cl-dismiss="toast" aria-label="Fechar"></button>
    </div>
    <div class="cl-toast-body">Falha ao salvar. Tente novamente.</div>
  </div>
</div>
```

Mockup: [laboratório do componente](../../mockup/overlays-commands.html#toast).
