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
- **Peso visual**: `.cl-badge-soft-{nome}` cria fundo translúcido com borda
  sutil, recomendado para status recorrentes em tabelas e cards;
  `.cl-badge-outline-{nome}` mantém apenas contorno e texto, útil para
  metadados e filtros. As variantes sólidas permanecem para destaque alto.
- **Tamanho**: `.cl-badge-sm` (18px), `.cl-badge-lg` (26px); sem sufixo =
  22px (padrão).
- **Padrões**: `.cl-badge-dot` adiciona um indicador circular antes do texto;
  `.cl-badge-count` estabiliza contagens com algarismos tabulares.
- **Split**: `.cl-badge-split` reúne um rótulo e um valor em segmentos
  conectados. Use `.cl-badge-split-{nome}` para colorir o valor; os elementos
  internos obrigatórios são `.cl-badge-split-label` e
  `.cl-badge-split-value`.

```html
<span class="cl-badge cl-badge-success cl-badge-sm">Ativo</span>
<span class="cl-badge cl-badge-danger cl-badge-lg">Crítico</span>
<span class="cl-badge cl-badge-soft-success cl-badge-dot">Disponível</span>
<span class="cl-badge cl-badge-outline-primary">Beta</span>
<span class="cl-badge-split cl-badge-split-primary">
  <span class="cl-badge-split-label">New</span>
  <span class="cl-badge-split-value">0.7.1</span>
</span>
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
[`docs/reference/design-tokens.md`](../reference/design-tokens.md)) e expõe
`--cl-badge-color`, `--cl-badge-bg`, `--cl-badge-border`,
`--cl-badge-height` e `--cl-badge-radius` (0 por padrão) para
personalização localizada. Split também expõe
`--cl-badge-split-{label|value}-{bg|color}`, `--cl-badge-split-height` e
`--cl-badge-split-radius`.

## Exemplo

```html
<span class="cl-badge">12</span>
<span class="cl-badge cl-badge-primary">Novo</span>
<span class="cl-badge cl-badge-warning cl-badge-sm">Pendente</span>
<span class="cl-badge cl-badge-soft-success cl-badge-dot">Online</span>
<span class="cl-badge cl-badge-count cl-badge-danger">12</span>
```

Mockup: [laboratório do componente](../../mockup/feedback-actions.html#badge).
