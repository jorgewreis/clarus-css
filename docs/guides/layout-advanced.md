# Layout avançado

Três primitivas de layout CSS-only (Stack, Cluster, Sidebar), utilitários de
posição sticky e utilitários de container query (`@container`) — para
composições que os utilitários de grid/flex existentes (`.cl-row`/`.cl-col-*`,
`.u-d-flex`) não cobrem bem sozinhos. Exemplo funcional completo em
[`mockup/foundations.html#layout`](../../mockup/foundations.html#layout).

## Stack

Empilha os filhos diretos verticalmente com espaçamento consistente via
`gap` (não `margin` — evita o problema de "o último filho não deve ter
margin-bottom"):

```html
<div class="cl-stack">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

O espaçamento padrão vem do token `--cl-stack-gap` (`$spacers[3]`, `1rem`).
Ajuste com uma classe `.cl-stack-gap-{0..5}` (mesma escala de
`$spacers` usada nos utilitários `.u-m*`/`.u-p*`) ou redefinindo o token
direto no elemento:

```html
<div class="cl-stack cl-stack-gap-1">…</div>
```

## Cluster

Agrupa itens horizontalmente com quebra de linha automática e espaçamento
consistente nos dois eixos — para grupos de tags, botões ou badges que
precisam "fluir" sem estourar o container:

```html
<div class="cl-cluster">
  <span class="cl-tag">Frontend</span>
  <span class="cl-tag">CSS</span>
  <span class="cl-tag">Acessibilidade</span>
</div>
```

Gap ajustável do mesmo jeito que o Stack: `.cl-cluster-gap-{0..5}` ou
`--cl-cluster-gap`.

## Sidebar

Um lado com largura fixa (a "aside") e o outro preenchendo o espaço
restante — quebra para empilhado quando o container fica estreito demais,
sem media query (a técnica é puramente flexbox: `.cl-sidebar-content` tem
`flex-basis: 0` e `min-width: 50%`, forçando a quebra quando não cabe ao
lado da aside na largura disponível):

```html
<div class="cl-sidebar">
  <aside class="cl-sidebar-aside">Menu lateral</aside>
  <div class="cl-sidebar-content">Conteúdo principal</div>
</div>
```

- Largura da aside: `--cl-sidebar-width` (padrão `16rem`), ou uma classe
  `.cl-sidebar-width-{sm,md,lg,xl,xxl,xxxl}` (reusa a escala de
  `$column-max-widths`, de 120px a 720px).
- `.cl-sidebar-reverse` inverte a ordem visual (aside à direita).
- Gap: `.cl-sidebar-gap-{0..5}` ou `--cl-sidebar-gap`.

## Sticky

`.u-sticky-top`/`.u-sticky-bottom` (`position: sticky`) com offset
configurável via `--cl-sticky-top`/`--cl-sticky-bottom` (padrão `0`) e
`z-index: 1020` (mesma faixa numérica dos demais componentes de overlay —
acima de conteúdo normal e do Dropdown, abaixo de Modal/Offcanvas):

```html
<div style="overflow-y: auto; max-height: 300px;">
  <div class="u-sticky-top">Cabeçalho fixo</div>
  <p>Conteúdo rolável…</p>
</div>
```

Um contêiner com scroll próprio (como no exemplo acima) precisa ser
focável por teclado (`tabindex="0"`) se o conteúdo for maior que a área
visível — sem isso, quem navega só por teclado não consegue rolar o
conteúdo (regra `scrollable-region-focusable` do gate `axe` no CI).

## Container queries (`@container`)

Reagem à largura do **container** mais próximo, não da viewport — útil
para um componente que se comporta de forma diferente dependendo de onde é
colocado (uma sidebar estreita vs. uma área de conteúdo larga), independente
do tamanho da tela. Ative com `.u-cq` no elemento pai:

```html
<div class="u-cq">
  <div class="u-cq-md-d-flex u-gap-2">
    <div>A</div>
    <div>B</div>
  </div>
</div>
```

- `.u-cq` define `container-type: inline-size` — só aplique num elemento
  cuja largura você quer usar como referência (não precisa ser o `:root`).
- Utilitários disponíveis: `.u-cq-{sm,md,lg}-d-{none,block,inline-block,flex}`,
  seguindo os limiares `--cl-cq-sm` (320px), `--cl-cq-md` (480px),
  `--cl-cq-lg` (640px) — uma escala própria, mais compacta que a de
  viewport (`$breakpoints`), porque containers costumam ser bem menores
  que a tela inteira.
- Os tokens `--cl-cq-*` em `:root` são só **informativos** (documentam os
  valores usados) — a condição de um `@container` exige um valor literal
  em tempo de build, não aceita `var()`; mudar o token em runtime não
  recalibra as regras já compiladas.
- Complementam, não substituem, os utilitários de viewport existentes
  (`.u-d-flex` etc.) — para a maioria dos casos, media query por viewport
  continua sendo a ferramenta certa.
