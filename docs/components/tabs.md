# Tabs

Alterna painéis de conteúdo por clique/teclado. Reusa `.cl-nav-link`
([Navbar](navbar.md)) como item — o HTML e a navegação por teclado são os
mesmos em qualquer um dos 3 estilos visuais.

## Visão geral

```html
<div class="cl-tabs" data-cl="tabs">
  <a href="#" class="cl-nav-link is-active" data-cl-target="#perfil">Perfil</a>
  <a href="#" class="cl-nav-link" data-cl-target="#seguranca">Segurança</a>
</div>
<div class="cl-tab-content">
  <div class="cl-tab-pane is-active" id="perfil">Conteúdo Perfil.</div>
  <div class="cl-tab-pane" id="seguranca">Conteúdo Segurança.</div>
</div>
```

## Anatomia

`.cl-tabs` (`data-cl="tabs"`) > `.cl-nav-link` (um por aba, `data-cl-target`
apontando pro painel) + `.cl-tab-content` > `.cl-tab-pane` (um por aba,
`id` batendo com o `data-cl-target` correspondente).

## Variações

- **Estilo**: linha (padrão, sublinhado na aba ativa), `.cl-tabs-pill`
  (chip com fundo sólido na aba ativa, sem linha), `.cl-tabs-depth` (aba
  ativa "sobe" com fundo igual ao conteúdo, sobre um backdrop neutro — como
  aba de pasta).
- **Alinhamento**: `.cl-tabs-center`, `.cl-tabs-right`; sem sufixo =
  esquerda (padrão). `.cl-tabs-fill` distribui os itens em largura igual.
- **Tamanho**: `.cl-tabs-sm`, `.cl-tabs-lg`; sem sufixo = padrão.

```html
<div class="cl-tabs cl-tabs-pill cl-tabs-center" data-cl="tabs">...</div>
<div class="cl-tabs cl-tabs-depth cl-tabs-fill cl-tabs-lg" data-cl="tabs">...</div>
```

## Estados

- `.is-active` na aba e no painel correspondente — controlado pelo JS ao
  trocar, ou definido no HTML inicial (exatamente uma aba/painel deve
  começar ativo).
- `.is-disabled` na aba — não recebe clique nem entra na navegação por
  seta.

## A11y

O JS aplica automaticamente ao inicializar: `role="tablist"` no `.cl-tabs`,
`role="tab"` + `aria-selected` + `tabindex` (roving: só a aba ativa tem
`tabindex="0"`) em cada `.cl-nav-link`, e `role="tabpanel"` +
`aria-labelledby` no painel correspondente. Nenhum desses atributos precisa
ser escrito manualmente no HTML.

Teclado (com foco numa aba): `ArrowLeft`/`ArrowRight` move e ativa a
aba anterior/próxima (pulando desabilitadas), `Home`/`End` vai pra
primeira/última.

## API JS

Auto-init via `data-cl="tabs"`. `Tabs.getInstance(el)`.

| Método | Descrição |
|---|---|
| `show(tabEl)` | Ativa a aba `tabEl` (deve ser uma das `.cl-nav-link` do grupo) e o painel correspondente; desativa as demais. Não faz nada se `tabEl` já é a ativa. |
| `dispose()` | Remove os listeners de clique/teclado e desregistra a instância. |

| Evento | Cancelável | Quando |
|---|---|---|
| `cl:tab:changed` | Não | Depois de trocar de aba — `event.detail.target` traz o seletor (`data-cl-target`) da aba ativa. |

```js
const tabs = Clarus.Tabs.getInstance(document.getElementById("minhas-tabs"));
tabs.show(document.querySelector('[data-cl-target="#seguranca"]'));
```

## Tokens

Usa `--cl-color-border`, `--cl-color-primary` (linha/pill ativos),
`--cl-color-bg-subtle` (depth), `--cl-color-surface` (depth ativo),
`--cl-radius-sm`.

## Exemplo

```html
<div class="cl-tabs" data-cl="tabs">
  <a href="#" class="cl-nav-link is-active" data-cl-target="#tab-perfil">Perfil</a>
  <a href="#" class="cl-nav-link" data-cl-target="#tab-seguranca">Segurança</a>
  <a href="#" class="cl-nav-link is-disabled" data-cl-target="#tab-notif">Notificações</a>
</div>
<div class="cl-tab-content">
  <div class="cl-tab-pane is-active" id="tab-perfil">Conteúdo da aba Perfil.</div>
  <div class="cl-tab-pane" id="tab-seguranca">Conteúdo da aba Segurança.</div>
  <div class="cl-tab-pane" id="tab-notif">Conteúdo da aba Notificações (desabilitada).</div>
</div>
```

Mockup: [`mockup/accordion-tabs-toast.html`](../../mockup/accordion-tabs-toast.html).
