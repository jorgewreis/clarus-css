# Design tokens

Referência completa dos tokens do Clarus CSS. Ver
[Theming](../guides/theming.md) para como customizá-los.

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

### Aliases por papel (`tokens/_semantic.scss`)

Mesmos valores dos acima, com nome por função — use estes quando o nome
comunica melhor a intenção no seu código:

| Token | Alias de |
|---|---|
| `--cl-color-bg-surface` | `--cl-color-surface` |
| `--cl-color-bg-subtle` | `--cl-color-subtle` |
| `--cl-color-text-primary` | `--cl-color-text` |
| `--cl-color-text-muted` | `--cl-color-muted` |
| `--cl-color-border-default` | `--cl-color-border` |
| `--cl-color-action-primary` | `--cl-color-primary` |
| `--cl-color-action-danger` | `--cl-color-danger` |

### Gráficos (`tokens/_charts.scss`)

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

Alguns componentes expõem tokens próprios, com fallback pra um token
semântico — sobrescrevíveis por instância. Ver a página do componente para
a lista (ex.: `.cl-btn` → `--cl-btn-bg`/`--cl-btn-color`/`--cl-btn-border-color`,
documentado em [`../components/button.md`](../components/button.md)).

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
