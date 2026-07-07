# Notification Center

Orquestra múltiplas instâncias de [Toast](toast.md) e mantém um histórico
com painel de notificações e contador de não-lidas — não introduz um
elemento visual novo, compõe o que já existe.

## Visão geral

```html
<button type="button" class="cl-btn" data-cl="notification-center" data-cl-target="#painel-notif" aria-label="Notificações">
  <svg class="cl-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>
  <span class="cl-notification-badge" hidden>0</span>
</button>

<div class="cl-notification-center" id="painel-notif">
  <div class="cl-notification-center-header">
    <span class="cl-notification-center-title">Notificações</span>
    <button type="button" class="cl-btn cl-btn-sm" data-notification="clear">Limpar tudo</button>
  </div>
  <ul class="cl-notification-list"></ul>
  <p class="cl-notification-empty">Nenhuma notificação.</p>
</div>
```

```js
const center = Clarus.NotificationCenter.getInstance(document.querySelector('[data-cl="notification-center"]'));
center.push({ title: "Sucesso", body: "Arquivo salvo.", variant: "success" });
```

## Anatomia

Gatilho (`data-cl="notification-center"` + `data-cl-target`, com
`.cl-notification-badge` opcional dentro) + `.cl-notification-center`
(painel) > `.cl-notification-center-header` (título + botão "limpar tudo",
via `data-notification="clear"`) + `.cl-notification-list` (`<ul>`,
preenchida dinamicamente) + `.cl-notification-empty` (mostrado/escondido
automaticamente conforme o histórico). O `.cl-toast-container` é criado
automaticamente se não existir um na página (ou aponte pra um existente
com `data-toast-container="#seletor"`).

## Variações

Cor por item de notificação: `.cl-notification-item-{nome}` (borda
esquerda colorida) — aplicada automaticamente a partir do `variant`
passado em `push()`.

## Estados

- `.cl-notification-item-unread` — aplicada automaticamente aos itens
  ainda não lidos (some ao abrir o painel — abrir marca tudo como lido).
- Persistência: `data-storage="local"` + `data-storage-key="..."` no
  gatilho grava o histórico em `localStorage` (sobrevive a reload); padrão
  é `"memory"` (perde ao recarregar a página).

```html
<button data-cl="notification-center" data-cl-target="#painel" data-storage="local" data-storage-key="minhas-notificacoes" aria-label="Notificações">
  <svg class="cl-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>
</button>
```

## A11y

`aria-haspopup="dialog"` + `aria-expanded` no gatilho, `role="region"` +
`aria-label="Notificações"` no painel (aplicados automaticamente, a menos
que você já tenha definido `aria-label` próprio). `Escape` fecha e devolve
foco ao gatilho; clique fora fecha.

## API JS

Auto-init via `data-cl="notification-center"` **no gatilho**.
`NotificationCenter.getInstance(triggerEl)`.

| Método | Descrição |
|---|---|
| `push({ title, body, variant, autohide, delay })` | Empilha um toast na hora e registra a notificação no histórico. Retorna o `id` do registro. |
| `remove(id)` | Remove uma notificação específica do histórico. |
| `clear()` | Remove todo o histórico. |
| `getAll()` | Retorna uma cópia do histórico atual (array de registros). |
| `open()` / `close()` / `toggle()` | Abrem/fecham o painel (abrir marca tudo como lido). |
| `dispose()` | Fecha se aberto, remove listeners, desregistra a instância. |

| Evento (no gatilho) | Cancelável | Quando |
|---|---|---|
| `cl:notification:pushed` | Não | Depois de `push()` — `event.detail.record` traz o registro criado. |
| `cl:notification:opened` / `-closed` | Não | Depois de abrir/fechar o painel. |
| `cl:notification:cleared` | Não | Depois de `clear()`. |

## Tokens

`--cl-color-border`, `--cl-color-surface`, `--cl-color-subtle` (item não
lido), `--cl-color-danger` (badge de contagem), `--cl-color-{nome}` (borda
por variante), `--cl-radius-md`, `--cl-shadow-md`.

## Exemplo

```html
<button type="button" class="cl-btn" data-cl="notification-center" data-cl-target="#nc" id="nc-trigger" aria-label="Notificações">
  <svg class="cl-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>
  <span class="cl-notification-badge" hidden>0</span>
</button>
<div class="cl-notification-center" id="nc">
  <div class="cl-notification-center-header">
    <span class="cl-notification-center-title">Notificações</span>
    <button type="button" class="cl-btn cl-btn-sm" data-notification="clear">Limpar tudo</button>
  </div>
  <ul class="cl-notification-list"></ul>
  <p class="cl-notification-empty">Nenhuma notificação.</p>
</div>
<script>
  document.getElementById("nc-trigger").addEventListener("cl:notification:pushed", (e) => {
    console.log("nova notificação:", e.detail.record);
  });
</script>
```

Mockup: [`mockup/notification-center.html`](../../mockup/notification-center.html).
