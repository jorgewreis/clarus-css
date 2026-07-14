# Card

Contêiner de conteúdo genérico — a peça que mais combina outros
componentes (botões, badges, tipografia) dentro de si.

## Visão geral

```html
<div class="cl-card">
  <div class="cl-card-header">
    <h3 class="cl-card-title">Título do card</h3>
    <button type="button" class="cl-btn-close" aria-label="Fechar"></button>
  </div>
  <div class="cl-card-body">
    <p class="cl-card-text">Corpo de texto do card.</p>
    <button type="button" class="cl-btn cl-btn-primary">Ação</button>
  </div>
  <div class="cl-card-footer">
    <span class="cl-badge cl-badge-success">Ativo</span>
  </div>
</div>
```

## Anatomia

`.cl-card` > até três seções empilhadas, todas opcionais: `.cl-card-header`
(fundo sutil, borda inferior — quando tem `.cl-card-title` + botão, o
layout já vem com `justify-content: space-between`), `.cl-card-body`,
`.cl-card-footer` (fundo sutil, borda superior).

Dentro de `.cl-card-body`: `.cl-card-title` (destaque), `.cl-card-subtitle`
(secundário, cor muted), `.cl-card-text` (parágrafo de corpo — o último de
um card não tem margem inferior).

## Variações

- **Horizontal**: `.cl-card-horizontal` — eixo principal de coluna pra
  linha ("imagem à esquerda, texto à direita"); raios de header/footer se
  ajustam pra lateral em vez de topo/base.
- **Tamanho**: `.cl-card-sm` (5px de padding interno), `.cl-card-lg`
  (15px); sem sufixo = 10px (padrão) — não muda a largura do card, só a
  densidade.
- **Clicável**: `.cl-card-clickable` + `.cl-stretched-link` — ver abaixo.

```html
<div class="cl-card cl-card-horizontal">
  <div class="cl-card-header">Lateral</div>
  <div class="cl-card-body">Conteúdo ao lado.</div>
</div>
```

### `.cl-card-clickable`

Torna o card inteiro clicável/focável sem aninhar um `<a>` ao redor de todo
o conteúdo (o que quebraria a semântica havendo outros elementos
interativos dentro). Coloque `.cl-stretched-link` no link que deve capturar
o clique — ele se expande via `::after` pra cobrir o card inteiro:

```html
<div class="cl-card cl-card-clickable">
  <div class="cl-card-body">
    <h4 class="cl-card-title">
      <a href="/detalhes" class="cl-stretched-link">Ver detalhes</a>
    </h4>
    <p class="cl-card-text">O card inteiro é clicável, não só o link.</p>
  </div>
</div>
```

## Estados

`.cl-card-clickable:hover`/`:focus-within` — borda muda pra cor primária +
sombra (`:focus-within` em vez de `:focus` pra destacar tanto no hover
quanto ao navegar por teclado até o link interno).

## A11y

- `.cl-stretched-link` deve estar num elemento nativamente focável (`<a
  href="...">`), nunca num `<div>` — é o link real que recebe o foco/clique
  do teclado, o `::after` só expande a área clicável do mouse.
- Se o card tiver múltiplos links/botões, só o `.cl-stretched-link`
  expande; os demais continuam clicáveis normalmente por cima dele
  (`z-index` do `::after` é `1`, mas elementos com `position: relative` e
  `z-index` maior no conteúdo ficam acima).

## API JS

Nenhuma — 100% CSS.

## Tokens

`--cl-color-border`, `--cl-color-surface`, `--cl-color-subtle`
(header/footer), `--cl-radius-lg`, `--cl-shadow-sm` (hover clicável),
`--cl-color-primary` (borda hover clicável).

## Exemplo

```html
<div class="cl-card cl-card-clickable" style="max-width: 320px;">
  <div class="cl-card-body">
    <h4 class="cl-card-title"><a href="#" class="cl-stretched-link">Relatório Q3</a></h4>
    <p class="cl-card-subtitle">Atualizado há 2 dias</p>
    <p class="cl-card-text">Resumo financeiro do terceiro trimestre.</p>
  </div>
  <div class="cl-card-footer">
    <span class="cl-badge cl-badge-success">Publicado</span>
  </div>
</div>
```

Mockup: [laboratório do componente](../../mockup/content-data.html#card).
