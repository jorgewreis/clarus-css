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

**Spinner**: um único elemento, `.cl-spinner` — um anel com trilho sutil e
segmento ativo, girando; sem marcação interna.

**Progress**: `.cl-progress` (trilho) > `.cl-progress-bar` (preenchimento
— a largura é controlada pela custom property `--cl-progress-value`, de
`0` a `100`, ou diretamente por `style="width: 60%"`).

## Variações

**Spinner**:
- Tamanho: `.cl-spinner-sm` (14px), `.cl-spinner-lg` (32px); sem sufixo =
  20px.
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
- Valor visual: use texto dentro de `.cl-progress-bar` apenas em
  `.cl-progress-lg`; nas barras compactas, exponha o valor por `aria-valuenow`
  e por um rótulo externo quando ele precisar ser visível.
- Rótulo externo: `.cl-progress-meta` contém o nome da operação e
  `.cl-progress-value` para percentual, contagem ou duração.
- Indeterminado: `.cl-progress-indeterminate` mostra deslocamento contínuo;
  omita `aria-valuenow` e use `aria-valuetext="Progresso indeterminado"`.
- Finalização: `.cl-progress-complete` aplica `success`; `.cl-progress-error`
  aplica `danger`. Use `.cl-progress-status` para uma confirmação ou ação de
  recuperação fora da barra.
- Meta: adicione `.cl-progress-marker` dentro do trilho e defina
  `--cl-progress-marker-value` (0–100). Explique a meta em texto externo.
- Início perceptível: `.cl-progress-minimum` preserva ao menos 4px visíveis
  para valores reais acima de zero; `aria-valuenow` continua sendo a fonte de
  verdade.
- Fluxo por etapas: componha [Stepper](stepper.md) para comunicar a etapa
  atual e uma `.cl-progress` para representar o avanço global. Não duplique
  ambos para o mesmo significado.

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
- A animação de listras (`.cl-progress-bar-animated`), a barra indeterminada
  e a rotação do spinner desaceleram em `prefers-reduced-motion: reduce`, mas
  não param completamente para não parecerem travadas.
- Para o indeterminado, não informe um valor numérico inexistente. O movimento
  reduz a velocidade em `prefers-reduced-motion`, mas continua ativo para não
  parecer uma interface travada.

## API JS

Nenhuma — 100% CSS. Atualizar `--cl-progress-value` é responsabilidade da
sua aplicação (ex.: `barEl.style.setProperty("--cl-progress-value", "75")`).

## Tokens

Spinner: `--cl-color-{nome}` (variantes de cor). Progress:
`--cl-color-subtle` (trilho), `--cl-color-primary`/`--cl-color-{nome}`
(preenchimento), `--cl-progress-height`, `--cl-progress-track`,
`--cl-progress-bar-bg` e `--cl-progress-radius`. O Spinner também expõe
`--cl-spinner-size`, `--cl-spinner-stroke` e `--cl-spinner-duration` para
ajustes locais.

## Exemplo

```html
<div class="cl-spinner" role="status" aria-label="Carregando"></div>

<div class="cl-progress" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
  <div class="cl-progress-bar" style="--cl-progress-value: 60;">60%</div>
</div>

<div class="cl-progress-meta"><span>Upload de anexos</span><span class="cl-progress-value">3 de 8 arquivos</span></div>
<div class="cl-progress" role="progressbar" aria-label="Upload de anexos" aria-valuetext="3 de 8 arquivos enviados" aria-valuenow="38" aria-valuemin="0" aria-valuemax="100">
  <div class="cl-progress-bar" style="--cl-progress-value: 38"></div>
</div>

<div class="cl-progress cl-progress-indeterminate" role="progressbar" aria-label="Processando pagamento" aria-valuetext="Progresso indeterminado" aria-busy="true">
  <div class="cl-progress-bar"></div>
</div>
```

Mockup: [laboratório do componente](../../mockup/feedback-actions.html#progress).
