# Design tokens

Referência completa dos tokens do Clarus CSS. Escolha primeiro o token pelo
papel que ele desempenha; consulte [Theming](../guides/theming.md) para
customizá-lo em runtime ou via Sass.

## Cor — primitivo → semântico → componente

### Semânticos (uso geral)

| Token | Papel |
|---|---|
| `--cl-color-text` | Texto principal |
| `--cl-color-muted` | Texto secundário/discreto |
| `--cl-color-border` | Bordas padrão |
| `--cl-color-surface` | Fundo de superfície (card, modal, input) |
| `--cl-color-subtle` | Fundo levemente destacado (hover, header de card) |
| `--cl-color-white` / `--cl-color-black` | Acromáticos, sem variação por tema |

### Aliases por papel (`packages/clarus-core/scss/tokens/_semantic.scss`)

Mesmos valores dos acima, com nome por função — use estes quando o nome
comunica melhor a intenção no seu código:

| Token | Alias de |
|---|---|
| `--cl-color-bg-surface` | `--cl-color-surface` |
| `--cl-color-bg-subtle` | `--cl-color-subtle` |
| `--cl-color-surface-raised` | `--cl-color-surface` |
| `--cl-color-text-primary` | `--cl-color-text` |
| `--cl-color-text-muted` | `--cl-color-muted` |
| `--cl-color-border-default` | `--cl-color-border` |
| `--cl-color-action-primary` | `--cl-color-primary` |
| `--cl-color-action-danger` | `--cl-color-danger` |

### Gráficos (`packages/clarus-core/scss/tokens/_charts.scss`)

Agnósticos de biblioteca — ver [guia de gráficos](../guides/charts.md).

| Token | Alias de |
|---|---|
| `--cl-chart-series-1` | `--cl-color-primary` |
| `--cl-chart-series-2` | `--cl-color-success` |
| `--cl-chart-series-3` | `--cl-color-warning` |
| `--cl-chart-series-4` | `--cl-color-danger` |
| `--cl-chart-series-5` | `--cl-color-info` |
| `--cl-chart-series-6` | `--cl-color-secondary` |
| `--cl-chart-grid` | `--cl-color-border` |
| `--cl-chart-axis` | `--cl-color-muted` |
| `--cl-chart-tooltip-bg` | `--cl-tooltip-bg` |
| `--cl-chart-tooltip-text` | `--cl-tooltip-text` |

### Cores de tema

Seis papéis, cada um com 3 tokens derivados automaticamente do primitivo
(tint/shade em OKLCH):

`primary`, `secondary`, `success`, `warning`, `danger`, `info`

| Padrão de token | Exemplo (`primary`) | Uso |
|---|---|---|
| `--cl-color-{nome}` | `--cl-color-primary` | Cor sólida (fundo de botão, borda ativa) |
| `--cl-alert-{nome}-bg` | `--cl-alert-primary-bg` | Fundo tintado (alerta) |
| `--cl-alert-{nome}-text` | `--cl-alert-primary-text` | Texto sobre o fundo tintado |
| `--cl-feedback-{nome}-bg` | `--cl-feedback-primary-bg` | Fundo tintado mais sutil (badge suave, notificação) |

### Componente

Componentes expõem tokens próprios quando precisam de uma API de customização
local. Eles têm fallback para um token semântico e podem ser alterados sem
`!important`:

```css
.meu-botao-especial {
  --cl-btn-bg: var(--cl-color-action-primary);
}
```

Consulte a página do componente para a lista completa. Por exemplo,
`.cl-btn` documenta `--cl-btn-bg`, `--cl-btn-color` e
`--cl-btn-border-color`. Prefira nomes de intenção, como
`--cl-color-action-primary`, em vez de nomes baseados no valor da cor.

## Tipografia

| Token | Valor | Uso |
|---|---|---|
| `--cl-font-sans` | Plus Jakarta Sans, sans-serif | Corpo, UI |
| `--cl-font-mono` | Source Code Pro, monospace | Código |
| `--cl-font-size-md` | 0.8125rem (13px) | Corpo — único tamanho de texto exposto como token; `xs`/`sm`/`lg`/`xl` são variáveis Sass (`$font-size-*`), não CSS Custom Properties, por serem só usadas em geração de classe |
| `--cl-font-size-h1`…`h6` | 1.75rem → 0.875rem | Headings |
| `--cl-font-weight-semibold` | 600 | Peso dos headings |
| `--cl-line-height-base` | 1.5 | Corpo |
| `--cl-line-height-heading` | 1.25 | Headings |

## Formato

| Token | Valor |
|---|---|
| `--cl-radius-sm` | 4px |
| `--cl-radius-md` | 6px |
| `--cl-radius-lg` | 8px |

Circular só é usado em dois lugares deliberadamente (radio, spinner) — o
resto do framework é quadrado/arredondado por decisão de design, não por
limitação técnica.

## Espaçamento, elevação e controles

Os valores mais usados também ficam disponíveis em runtime para que
componentes e extensões mantenham a mesma escala visual:

| Token | Papel |
|---|---|
| `--cl-space-0` … `--cl-space-5` | Escala de espaçamento baseada em `$spacers` |
| `--cl-z-dropdown` … `--cl-z-tooltip` | Camadas padronizadas para overlays |
| `--cl-control-height` / `--cl-control-height-sm` / `--cl-control-height-lg` | Alturas dos controles de formulário |
| `--cl-control-padding-x` / `--cl-control-padding-x-sm` / `--cl-control-padding-x-lg` | Padding horizontal dos controles |
| `--cl-border-width` | Espessura padrão de bordas |
| `--cl-disabled-opacity` | Opacidade visual de controles desabilitados |
| `--cl-color-on-primary` … `--cl-color-on-info` | Cor de conteúdo sobre cada cor de tema |

## Interação e movimento

| Token | Papel |
|---|---|
| `--cl-color-focus` | Cor semântica do foco de teclado |
| `--cl-focus-width` / `--cl-focus-offset` | Geometria do anel de foco |
| `--cl-focus-ring-alpha` | Intensidade do halo de foco |
| `--cl-transition-fast` / `--cl-transition-normal` | Durações de transição |
| `--cl-ease-standard` | Curva de movimento padrão |

O framework respeita `prefers-reduced-motion: reduce`, reduzindo transições e
animações CSS ao mínimo sem remover estados ou interações.

Use `--cl-color-on-{nome}` em texto e ícones sobre fundos de tema. Isso
permite que uma marca altere o contraste sem duplicar regras de componente.

## Sombra

| Token |
|---|
| `--cl-shadow-sm` |
| `--cl-shadow-md` |
| `--cl-shadow-lg` |

## Grid

| Token | Valor |
|---|
| `--cl-gutter-x` | 1.5rem |
| `--cl-gutter-y` | 0px |

Controlados em runtime pelas classes `.u-g-*`/`.u-gx-*`/`.u-gy-*` — ver
[`docs/reference/scss-architecture.md`](scss-architecture.md#layout).

## Layout avançado (Stack/Cluster/Sidebar/sticky/container queries)

| Token | Valor padrão |
|---|---|
| `--cl-stack-gap` | `1rem` (`.cl-stack-gap-{0..5}` sobrescreve) |
| `--cl-cluster-gap` | `0.5rem` (`.cl-cluster-gap-{0..5}` sobrescreve) |
| `--cl-sidebar-gap` | `1rem` (`.cl-sidebar-gap-{0..5}` sobrescreve) |
| `--cl-sidebar-width` | `16rem` (`.cl-sidebar-width-{sm..xxxl}` sobrescreve) |
| `--cl-sticky-top` / `--cl-sticky-bottom` | `0` |
| `--cl-cq-sm` / `--cl-cq-md` / `--cl-cq-lg` | `320px` / `480px` / `640px` — só informativos, ver [Layout avançado](../guides/layout-advanced.md#container-queries-container) |

Ver [Layout avançado](../guides/layout-advanced.md) para a documentação
completa de uso.

## Só-Sass (sem CSS Custom Property)

Não têm equivalente em token CSS porque alimentam geração de classe em
tempo de build (nome de classe fixo, não pode reagir a uma variável em
runtime):

| Variável Sass | Uso |
|---|---|
| `$spacers` | Escala de espaçamento (`.u-m*`/`.u-p*`/`.u-g*`) |
| `$breakpoints` | Grid e utilitários responsivos (`.u-*-{breakpoint}`) |
| `$container-max-widths` / `$column-max-widths` | Containers e colunas com largura máxima |
| `$font-size-xs`/`-sm`/`-lg`/`-xl` | Escala de tamanho de texto (utilitários `.u-fs-*` e tamanhos `-sm`/`-lg` de componente) |
| `$font-weight-regular`/`-medium`/`-bold` | Peso de texto (`.u-fw-*`) |
| `$theme-colors` / `$theme-bg-colors` | Mapas usados pelos `@each` que geram as variantes de cor de cada componente |

Customizáveis só via `@use ... with (...)` na compilação — ver
[Theming](../guides/theming.md#customizando-via-sass).
