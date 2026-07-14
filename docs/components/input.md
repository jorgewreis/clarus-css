# Input

Campos de formulário de texto — 100% CSS, sobre elementos nativos
(`<input>`, `<textarea>`, `<select>`). Ver também
[Checkbox](checkbox.md)/[Radio](radio.md)/[Switch](switch.md) para
controles booleanos, e [Select customizado](select.md) para um `<select>`
com dropdown estilizado.

## Visão geral

```html
<div class="cl-form-col">
  <label for="nome" class="cl-form-label">Nome completo</label>
  <input type="text" class="cl-form-control" id="nome" placeholder="Seu nome">
</div>
```

## Anatomia

- `.cl-form-control` — em `<input>`/`<textarea>`.
- `.cl-form-select` — versão estática (sem JS) de um `<select>`
  estilizado apenas visualmente com uma seta; para dropdown customizado
  completo, ver [Select](select.md).
- `.cl-form-label` — rótulo (associe via `for`/`id`).
- `.cl-form-text` — texto de apoio, sempre visível.
- `.cl-valid-feedback`/`.cl-invalid-feedback` — texto de apoio que só
  aparece quando o input tem `.is-valid`/`.is-invalid` (via combinador de
  irmãos gerais `~` — precisam estar depois do input no DOM).
- `.cl-form-row`/`.cl-form-col` — helpers de layout (linha/coluna) pra
  organizar label + campo + texto de apoio.

```html
<div class="cl-form-col">
  <label for="email" class="cl-form-label">E-mail</label>
  <input type="email" class="cl-form-control is-invalid" id="email">
  <div class="cl-invalid-feedback">E-mail inválido.</div>
</div>
```

## Variações

- **Tamanho**: `.cl-form-control-sm`, `.cl-form-control-lg` (idem para
  `.cl-form-select`); sem sufixo = 38px de altura.
- **Largura**: `.cl-form-size-{sm|md|lg|xl|xxl}` — larguras fixas
  (120px–360px) pra campos que não devem esticar 100%.

```html
<input type="text" class="cl-form-control cl-form-control-sm cl-form-size-sm">
```

## Estados

- `:focus` — anel de foco (mixin `focus-ring`).
- `:disabled` — cor muted, fundo sutil, opacidade reduzida.
- `:read-only` — fundo sutil, cursor padrão (não indica edição).
- `.is-valid`/`.is-invalid` — borda verde/vermelha + ativa o
  `.cl-valid-feedback`/`.cl-invalid-feedback` correspondente.

## A11y

- Sempre associe `.cl-form-label` ao campo via `for`/`id`.
- Associe o texto de apoio (`.cl-form-text`, `.cl-valid-feedback`) ao
  campo via `aria-describedby` — não é automático (o `id` do texto de
  apoio é definido por você).
- `.cl-form-select` estático não tem teclado/ARIA customizados — é a
  aparência de um `<select>` nativo real, herda tudo do navegador.

## API JS

Nenhuma — 100% CSS. Para o `<select>` com dropdown customizado (JS), ver
[Select](select.md).

## Tokens

`--cl-color-border`, `--cl-color-surface`, `--cl-color-text`,
`--cl-color-muted`, `--cl-color-subtle` (disabled/read-only),
`--cl-color-success`/`--cl-color-danger` (validação), `--cl-radius-sm`.

## Exemplo

```html
<div class="cl-form-col">
  <label for="senha" class="cl-form-label">Senha</label>
  <input type="password" class="cl-form-control is-valid" id="senha" aria-describedby="senha-ok">
  <div class="cl-valid-feedback" id="senha-ok">Senha forte.</div>
</div>
```

Mockups: [`mockup/forms.html#input`](../../mockup/forms.html#input),
[`mockup/foundations.html#layout`](../../mockup/forms.html#input).
