# Badge

Rótulo pequeno de destaque — contagem, status — usado sozinho ou embutido
em cards, navbar, tabelas. Para a variante removível, ver
[Tag](tag.md).

## Visão geral

```html
<span class="cl-badge">Padrão</span>
<span class="cl-badge cl-badge-primary">Primary</span>
```

## Anatomia

Um único elemento, `.cl-badge` — sem marcação interna obrigatória.

## Variações

- **Cor**: `.cl-badge-{primary|secondary|success|warning|danger|info}` —
  fundo sólido, texto com contraste calculado automaticamente. Sem
  modificador, usa cores neutras (`--cl-color-subtle`/`--cl-color-text`).
- **Tamanho**: `.cl-badge-sm` (16px), `.cl-badge-lg` (24px); sem sufixo =
  20px (padrão).

```html
<span class="cl-badge cl-badge-success cl-badge-sm">Ativo</span>
<span class="cl-badge cl-badge-danger cl-badge-lg">Crítico</span>
```

## Estados

Nenhum — elemento estático, sem interação.

## A11y

Badge é decorativo/informativo, não interativo — se o conteúdo for
significativo pra quem usa leitor de tela (ex.: contador de notificações
não lidas), garanta que o texto ao redor já comunique o contexto (não
dependa só da cor).

## API JS

Nenhuma — 100% CSS.

## Tokens

Usa os tokens de cor de tema (`--cl-color-{nome}`, ver
[`docs/reference/design-tokens.md`](../reference/design-tokens.md)) e
`--cl-radius-sm`. Sem tokens de componente próprios.

## Exemplo

```html
<span class="cl-badge">12</span>
<span class="cl-badge cl-badge-primary">Novo</span>
<span class="cl-badge cl-badge-warning cl-badge-sm">Pendente</span>
```

Mockup: [`mockup/badges-alerts.html`](../../mockup/badges-alerts.html).
