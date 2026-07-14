# Offcanvas

Painel deslizante de qualquer borda da tela (menu lateral mobile, carrinho,
filtros) — mesmo focus trap/`Escape`/clique-fora do [Modal](modal.md), mas
não cobre a tela inteira.

## Visão geral

```html
<button type="button" class="cl-btn" data-cl="offcanvas" data-cl-target="#meuPainel">
  Abrir menu
</button>

<div class="cl-offcanvas cl-offcanvas-start" id="meuPainel">
  <div class="cl-offcanvas-header">
    <h3 class="cl-offcanvas-title">Menu</h3>
    <button type="button" class="cl-btn-close" data-cl-dismiss="offcanvas" aria-label="Fechar"></button>
  </div>
  <div class="cl-offcanvas-body">Conteúdo do painel.</div>
</div>
```

`data-cl` vai no gatilho, como no Modal.

## Anatomia

Gatilho + `.cl-offcanvas` (painel, `position: fixed`, fora da viewport até
abrir) > `.cl-offcanvas-header` (título + `.cl-btn-close`, opcional) +
`.cl-offcanvas-body` (rola internamente) + `.cl-offcanvas-footer`
(opcional). Um `.cl-offcanvas-backdrop` é criado/removido dinamicamente
pelo JS a cada abertura (não escreva no HTML).

## Variações

Borda de entrada — obrigatório escolher uma:

- `.cl-offcanvas-start` — esquerda, 320px de largura.
- `.cl-offcanvas-end` — direita, 320px de largura.
- `.cl-offcanvas-top` — topo, 40vh de altura.
- `.cl-offcanvas-bottom` — base, 40vh de altura.

## Estados

`.is-open` — controlado pelo JS, anima via `transform`/`transition`
(desativada automaticamente sob `prefers-reduced-motion: reduce`).

**Backdrop**: `data-backdrop="false"` no `.cl-offcanvas` remove o
backdrop (painel some, mas o resto da página continua interativa por
baixo); `data-backdrop="static"` mantém o backdrop mas desativa
`Escape`/clique-fora (só `data-cl-dismiss="offcanvas"` fecha) — mesma
semântica do Modal.

## A11y

Ao inicializar, o componente controla `aria-hidden` e, quando encontra
`.cl-offcanvas-title`, cria automaticamente o vínculo `aria-labelledby`. Um
`id` existente no título é preservado.

`role="dialog"` + `aria-modal="true"` aplicados automaticamente. Foco
preso dentro do painel enquanto aberto, movido pro primeiro elemento
focável (com um pequeno atraso técnico pra garantir que a transição de
`visibility` já rodou — o painel usa `visibility: hidden` em vez de
`display: none` pra poder animar). Ao fechar, foco volta pro gatilho.

## API JS

Auto-init via `data-cl="offcanvas"` **no gatilho**. `Offcanvas.getInstance(triggerEl)`.

| Método | Descrição |
|---|---|
| `show()` | Abre, cria o backdrop (se aplicável), trava scroll, ativa focus trap. |
| `hide()` | Fecha, remove o backdrop, libera scroll, devolve foco ao gatilho. |
| `toggle()` | Alterna. |
| `dispose()` | Fecha se aberto, remove listeners, desregistra a instância. |

| Evento (no gatilho) | Cancelável | Quando |
|---|---|---|
| `cl:offcanvas:shown` | Não | Depois de abrir. |
| `cl:offcanvas:hidden` | Não | Depois de fechar. |

## Tokens

`--cl-color-surface`, `--cl-color-text`, `--cl-color-border`,
`--cl-shadow-lg`.

## Exemplo

```html
<button type="button" class="cl-btn" data-cl="offcanvas" data-cl-target="#filtros">Filtros</button>
<div class="cl-offcanvas cl-offcanvas-end" id="filtros" data-backdrop="static">
  <div class="cl-offcanvas-header">
    <h3 class="cl-offcanvas-title">Filtros</h3>
    <button type="button" class="cl-btn-close" data-cl-dismiss="offcanvas" aria-label="Fechar"></button>
  </div>
  <div class="cl-offcanvas-body">...</div>
  <div class="cl-offcanvas-footer">
    <button type="button" class="cl-btn cl-btn-primary" data-cl-dismiss="offcanvas">Aplicar</button>
  </div>
</div>
```

Mockup: [laboratório do componente](../../mockup/overlays-commands.html#offcanvas).
