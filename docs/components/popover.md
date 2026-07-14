# Popover

Painel flutuante com conteúdo rico (header/body/footer, pode conter
elementos interativos) — mesmo posicionamento do [Tooltip](tooltip.md),
aparência de card de superfície em vez do chip escuro.

## Visão geral

```html
<button type="button" class="cl-btn" data-cl="popover" data-cl-target="#meu-popover">
  Mais informações
</button>
<div class="cl-popover" id="meu-popover">
  <div class="cl-popover-header">Título</div>
  <div class="cl-popover-body">Conteúdo detalhado aqui.</div>
</div>
```

## Anatomia

Gatilho (qualquer elemento) + `.cl-popover` > `.cl-popover-header`
(opcional) + `.cl-popover-body` + `.cl-popover-footer` (opcional, ações
alinhadas à direita). A seta (`.cl-popover-arrow`) é gerada
automaticamente.

## Variações

- **Posicionamento**: `data-placement`/`data-align` no gatilho — mesma
  convenção do [Dropdown](dropdown.md).
- **Gatilho**: `data-trigger` no elemento gatilho —
  `click` (padrão), `hover` (com pequeno atraso ao sair, pra dar tempo de
  mover o mouse até o popover), `focus` (mostra ao focar, some ao perder
  foco pra fora do trigger+popover), `manual` (você chama `show()`/`hide()`
  vocẽ mesmo, sem listener automático).
- **Hover Card**: `.cl-popover-hover-card` — não é um componente
  separado, é este mesmo Popover com `data-trigger="hover"` e um
  modificador visual (mais largo, corpo em linha) pra conteúdo tipo
  avatar + bio.

```html
<a href="#" data-cl="popover" data-cl-target="#hc-1" data-trigger="hover">@jorgewreis</a>
<div class="cl-popover cl-popover-hover-card" id="hc-1">
  <div class="cl-popover-body">
    <img src="avatar.jpg" alt="" width="40" height="40">
    <div>
      <strong>Jorge Reis</strong>
      <p>Mantenedor do Clarus CSS.</p>
    </div>
  </div>
</div>
```

## Estados

`.is-open` — controlado pelo JS.

## A11y

`role="dialog"` + `aria-modal="false"` no popover, `aria-controls`/
`aria-expanded` no gatilho (JS aplica automaticamente). Com
`data-trigger="click"` (padrão): `Escape` fecha e devolve foco ao gatilho;
clique fora fecha. Um elemento dentro do popover com
`data-cl-dismiss="popover"` fecha ao ser clicado (útil pra um botão "OK"
no footer).

## API JS

Auto-init via `data-cl="popover"`. `Popover.getInstance(el)` (`el` é o
**gatilho**).

| Método | Descrição |
|---|---|
| `show()` | Abre, posiciona, ativa fechamento por clique fora (só no trigger `click`). |
| `hide()` | Fecha. |
| `toggle()` | Alterna. |
| `dispose()` | Fecha se aberto, remove todos os listeners, remove o elemento do popover do DOM. |

| Evento (no gatilho) | Cancelável | Quando |
|---|---|---|
| `cl:popover:shown` | Não | Depois de abrir. |
| `cl:popover:hidden` | Não | Depois de fechar. |

## Tokens

`--cl-color-border`, `--cl-color-surface`, `--cl-color-subtle` (header),
`--cl-color-text`, `--cl-radius-md`, `--cl-shadow-md`.

## Exemplo

```html
<button type="button" class="cl-btn" data-cl="popover" data-cl-target="#confirmar-envio">
  Enviar
</button>
<div class="cl-popover" id="confirmar-envio">
  <div class="cl-popover-header">Confirmar envio?</div>
  <div class="cl-popover-body">Não será possível editar depois de enviado.</div>
  <div class="cl-popover-footer">
    <button type="button" class="cl-btn cl-btn-sm" data-cl-dismiss="popover">Cancelar</button>
    <button type="button" class="cl-btn cl-btn-primary cl-btn-sm">Confirmar</button>
  </div>
</div>
```

Mockup: [laboratório do componente](../../mockup/overlays-commands.html#popover),
[`mockup/overlays-commands.html#hover-card`](../../mockup/overlays-commands.html#popover).
