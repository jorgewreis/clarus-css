# Spinner & Progress

Dois indicadores de carregamento, 100% CSS: Spinner (indeterminado, giratório)
e Progress (determinado, barra linear).

## Visão geral

```html
<div class="cl-spinner" role="status" aria-label="Carregando"></div>

<div class="cl-progress">
  <div class="cl-progress-bar" style="--cl-progress-value: 60;"></div>
</div>
```

## Anatomia

**Spinner**: um único elemento, `.cl-spinner` — um anel com um lado
transparente, girando; sem marcação interna.

**Progress**: `.cl-progress` (trilho) > `.cl-progress-bar` (preenchimento
— a largura é controlada pela custom property `--cl-progress-value`, de
`0` a `100`, ou diretamente por `style="width: 60%"`).

## Variações

**Spinner**:
- Tamanho: `.cl-spinner-sm` (16px), `.cl-spinner-lg` (40px); sem sufixo =
  24px.
- Cor: `.cl-spinner-{primary|secondary|success|warning|danger|info}` — o
  spinner herda `currentColor` por padrão, então também responde a
  qualquer utilitário de cor de texto (`.u-text-*`) se você não usar essas
  classes.

**Progress**:
- Altura: `.cl-progress-sm` (4px), `.cl-progress-lg` (16px); sem sufixo =
  8px.
- Cor da barra: `.cl-progress-bar-{cor}` — mesmas 6 cores de tema.
- `.cl-progress-bar-striped` — faixas diagonais; some com
  `.cl-progress-bar-animated` pra elas se moverem continuamente.

```html
<div class="cl-spinner cl-spinner-lg cl-spinner-primary"></div>

<div class="cl-progress cl-progress-lg">
  <div class="cl-progress-bar cl-progress-bar-success cl-progress-bar-striped cl-progress-bar-animated" style="--cl-progress-value: 40;"></div>
</div>
```

## Estados

Nenhum — ambos refletem o valor/presença que você controla (spinner:
presente = carregando; progress: `--cl-progress-value` = progresso atual).

## A11y

- Spinner: adicione `role="status"` + `aria-label` (ou um texto
  visualmente oculto dentro) — não é automático, o elemento é puramente
  visual por padrão.
- Progress: para expor o valor a leitores de tela, adicione
  `role="progressbar"` + `aria-valuenow`/`aria-valuemin="0"`/
  `aria-valuemax="100"` **e um nome acessível** (`aria-label="Progresso: 60%"`
  ou `aria-labelledby` apontando pro rótulo visível) no `.cl-progress`
  (mantidos em sincronia com `--cl-progress-value` pela sua aplicação — o
  framework não injeta automaticamente). Sem nome acessível, o
  `role="progressbar"` é rejeitado por leitores de tela (gate `axe` no CI:
  regra `aria-progressbar-name`).
- A animação de listras (`.cl-progress-bar-animated`) para sob
  `prefers-reduced-motion: reduce`; a rotação do spinner desacelera (não
  para completamente, pra não parecer travado) no mesmo cenário.

## API JS

Nenhuma — 100% CSS. Atualizar `--cl-progress-value` é responsabilidade da
sua aplicação (ex.: `barEl.style.setProperty("--cl-progress-value", "75")`).

## Tokens

Spinner: `--cl-color-{nome}` (variantes de cor). Progress:
`--cl-color-subtle` (trilho), `--cl-color-primary`/`--cl-color-{nome}`
(preenchimento), `--cl-radius-sm`.

## Exemplo

```html
<div class="cl-spinner" role="status" aria-label="Carregando"></div>

<div class="cl-progress" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
  <div class="cl-progress-bar" style="--cl-progress-value: 60;">60%</div>
</div>
```

Mockup: [`mockup/spinner-progress.html`](../../mockup/spinner-progress.html).
