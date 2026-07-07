# Stepper

Wizard de múltiplos passos — cabeçalho com indicadores de progresso, painéis
de conteúdo opcionais, navegação linear ou livre.

## Visão geral

```html
<div class="cl-stepper" data-cl="stepper">
  <ol class="cl-stepper-header">
    <li class="cl-step cl-step-active">
      <span class="cl-step-indicator">1</span>
      <span class="cl-step-label">Conta</span>
    </li>
    <li class="cl-step">
      <span class="cl-step-indicator">2</span>
      <span class="cl-step-label">Perfil</span>
    </li>
    <li class="cl-step">
      <span class="cl-step-indicator">3</span>
      <span class="cl-step-label">Revisão</span>
    </li>
  </ol>
  <div class="cl-stepper-content">
    <div class="cl-step-panel is-active">Passo 1: dados da conta.</div>
    <div class="cl-step-panel">Passo 2: dados do perfil.</div>
    <div class="cl-step-panel">Passo 3: revise e confirme.</div>
  </div>
  <div class="cl-stepper-actions">
    <button type="button" class="cl-btn" data-stepper="prev">Voltar</button>
    <button type="button" class="cl-btn cl-btn-primary" data-stepper="next">Avançar</button>
  </div>
</div>
```

## Anatomia

`.cl-stepper` (`data-cl="stepper"`) > `.cl-stepper-header` (`<ol>`) >
`.cl-step` (um por passo) > `.cl-step-indicator` (número/check) +
`.cl-step-label` + `.cl-step-description` (opcional) — mais, opcionais:
`.cl-stepper-content` > `.cl-step-panel` (um por passo, na mesma ordem) e
`.cl-stepper-actions` com botões `data-stepper="prev"`/`"next"`.

Um `.cl-step` pode apontar pra um painel específico via `data-cl-target`
(seletor) em vez de depender da ordem posicional.

## Variações

`.cl-stepper-vertical` no `.cl-stepper` — cabeçalho em coluna, cada passo
com label/descrição ao lado do indicador em vez de embaixo.

## Estados

Cada `.cl-step` recebe uma destas classes, sincronizadas pelo JS:

| Classe | Significado |
|---|---|
| (nenhuma) | Pendente — ainda não alcançado. |
| `.cl-step-active` | Passo atual. |
| `.cl-step-completed` | Já concluído (indicador vira um check). |
| `.cl-step-error` | Marcado com erro via `setError()` — não muda automaticamente. |
| `.cl-step-clickable` | Aplicada automaticamente aos passos navegáveis pelo cabeçalho. |

**Modo linear** (padrão, `data-linear` ausente ou `"true"`): só permite
voltar clicando em passos já concluídos, não pular pra frente. `data-linear="false"` libera clicar em qualquer passo do cabeçalho a
qualquer momento.

## A11y

Cada `.cl-step` tem `role="listitem"`, `tabindex` (só os clicáveis
recebem `0`) e `aria-current="step"` no passo ativo — navegável e ativável
por teclado (`Enter`/`Space`) quando clicável.

## API JS

Auto-init via `data-cl="stepper"`. `Stepper.getInstance(el)`.

| Método | Descrição |
|---|---|
| `next()` | Avança um passo; no último, chama `complete()`. |
| `prev()` | Volta um passo. |
| `goTo(index)` | Vai direto pro passo `index` (respeitando o modo linear se disparado pelo cabeçalho — via método, sempre permitido). |
| `setError(index, hasError = true)` | Marca/desmarca `.cl-step-error` num passo específico. |
| `complete()` | Marca o wizard como concluído (todos os passos ficam `.cl-step-completed`). |
| `dispose()` | Remove todos os listeners e desregistra a instância. |

| Evento | Cancelável | Quando |
|---|---|---|
| `cl:stepper:beforechange` | Sim | Antes de trocar de passo (ou concluir) — `event.detail` traz `{ from, to }`; `preventDefault()` bloqueia a mudança (útil pra validar o passo atual antes de avançar). |
| `cl:stepper:changed` | Não | Depois de trocar de passo. |
| `cl:stepper:completed` | Não | Depois de `complete()`. |

```js
stepperEl.addEventListener("cl:stepper:beforechange", (event) => {
  if (!formularioValido()) event.preventDefault();
});
```

## Tokens

`--cl-color-border`, `--cl-color-primary` (ativo/concluído),
`--cl-color-danger` (erro), `--cl-color-muted`, `--cl-color-text`.

## Exemplo

Ver acima (Visão geral) — mockup completo com validação por passo em
[`mockup/stepper.html`](../../mockup/stepper.html).
