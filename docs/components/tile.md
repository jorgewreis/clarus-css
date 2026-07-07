# Tile

Linha compacta ícone + título/subtítulo + ações, para listas de
opções/configurações/itens (sinergia visual com
[Notification Center](notification-center.md) e [Empty State](empty-state.md)).

## Visão geral

```html
<div class="cl-tile">
  <div class="cl-tile-icon" aria-hidden="true">
    <svg class="cl-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
  </div>
  <div class="cl-tile-body">
    <p class="cl-tile-title">Relatório mensal.pdf</p>
    <p class="cl-tile-subtitle">2.4 MB · Atualizado há 2h</p>
  </div>
  <div class="cl-tile-actions">
    <button type="button" class="cl-btn cl-btn-sm">Abrir</button>
  </div>
</div>
```

## Anatomia

`.cl-tile` > `.cl-tile-icon` (ícone SVG — [`clarus-icons`](../guides/icons.md)
recomendado — ou imagem, largura fixa) +
`.cl-tile-body` (`.cl-tile-title` + `.cl-tile-subtitle`, opcional, ambos
truncam com reticências se não couberem) + `.cl-tile-actions` (opcional —
botões, switch, badge).

## Variações

- **Ações à direita** (padrão) ou **embaixo**: adicione
  `.cl-tile-actions-bottom` no `.cl-tile` para `.cl-tile-actions` quebrar
  para uma segunda linha, alinhada à direita.
- **Clicável**: `.cl-tile-clickable` + [`.cl-stretched-link`](card.md#cl-stretched-link)
  num link dentro do `.cl-tile-body` — o tile inteiro fica clicável/focável
  sem aninhar um `<a>` ao redor de tudo.
- **Tamanho**: `.cl-tile-sm`, `.cl-tile-lg`; sem sufixo = padrão.

```html
<div class="cl-tile cl-tile-actions-bottom">
  <div class="cl-tile-icon" aria-hidden="true">
    <svg class="cl-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
  </div>
  <div class="cl-tile-body">
    <p class="cl-tile-title">Plano expira em 3 dias</p>
  </div>
  <div class="cl-tile-actions">
    <button type="button" class="cl-btn cl-btn-outline-secondary cl-btn-sm">Depois</button>
    <button type="button" class="cl-btn cl-btn-primary cl-btn-sm">Renovar</button>
  </div>
</div>

<div class="cl-tile cl-tile-clickable">
  <div class="cl-tile-icon" aria-hidden="true">
    <svg class="cl-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  </div>
  <div class="cl-tile-body">
    <p class="cl-tile-title"><a href="/perfil" class="cl-stretched-link">Jorge Reis</a></p>
    <p class="cl-tile-subtitle">Ver perfil</p>
  </div>
</div>
```

## Estados

Nenhum próprio — hover/focus da variante clicável reusa o mesmo padrão do
[Card clicável](card.md#cl-card-clickable) (`:hover`/`:focus-within`, borda
+ sombra).

## A11y

- Título/subtítulo truncados (`text-overflow: ellipsis`) escondem texto
  visualmente, mas o conteúdo continua no DOM/acessível — se o truncamento
  for crítico, considere `title="..."` no elemento pra tooltip nativo.
- Na variante clicável, o link dentro de `.cl-tile-body` é o elemento
  focável real — o `::after` do stretched-link só expande a área de
  clique, não tira o foco do link.

## API JS

Nenhuma — 100% CSS.

## Tokens

Sem tokens de componente próprios — usa `--cl-color-border`,
`--cl-color-surface`, `--cl-color-bg-subtle` (ícone), `--cl-color-text`,
`--cl-color-muted`, `--cl-radius-md`, `--cl-shadow-sm` (hover clicável).

## Exemplo

```html
<div class="cl-tile">
  <div class="cl-tile-icon" aria-hidden="true">
    <svg class="cl-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>
  </div>
  <div class="cl-tile-body">
    <p class="cl-tile-title">Tema escuro</p>
    <p class="cl-tile-subtitle">Alterna a aparência da interface</p>
  </div>
  <div class="cl-tile-actions">
    <div class="cl-switch">
      <input type="checkbox" class="cl-switch-input" id="tile-theme" checked aria-label="Ativar tema escuro">
      <label for="tile-theme" class="cl-switch-label"></label>
    </div>
  </div>
</div>
```

Mockup: [`mockup/tile.html`](../../mockup/tile.html).
