# Radio

Radio button 100% CSS, mesma técnica do [Checkbox](checkbox.md) — sobre um
`<input type="radio">` nativo. É a única exceção circular do framework
além do [Spinner](progress.md), por decisão de design (anti-circular no
resto de tudo).

## Visão geral

```html
<div class="cl-radio">
  <input type="radio" name="periodo" class="cl-radio-input" id="dia" checked>
  <label for="dia" class="cl-radio-label">Dia</label>
</div>
<div class="cl-radio">
  <input type="radio" name="periodo" class="cl-radio-input" id="semana">
  <label for="semana" class="cl-radio-label">Semana</label>
</div>
```

Radios do mesmo grupo compartilham `name` — seleção exclusiva é
comportamento nativo do `<input type="radio">`, sem JS.

## Anatomia

`.cl-radio` (wrapper) > `.cl-radio-input` (oculto via clip) +
`.cl-radio-label` (`<label for="...">`, desenha o círculo via `::before` e
o ponto interno via `::after`).

## Variações

Tamanho: `.cl-radio-sm`, `.cl-radio-lg` no wrapper.

## Estados

- **checked**, **disabled**, validação (`.is-valid`/`.is-invalid`) e foco —
  mesmo padrão do [Checkbox](checkbox.md). Não existe `indeterminate` para
  radio.

## A11y

- `<input type="radio">` nativo com `name` compartilhado — `ArrowUp`/
  `ArrowDown`/`ArrowLeft`/`ArrowRight` movem a seleção **dentro do grupo**
  automaticamente (comportamento do navegador, não do framework).
  `Tab`/`Shift+Tab` entram/saem do grupo de uma vez (o item selecionado, ou
  o primeiro se nenhum estiver selecionado, é o único no fluxo de tab).
- Sempre associe `label` via `for`/`id`.

## API JS

Nenhuma — 100% CSS.

## Tokens

Mesmos do [Checkbox](checkbox.md) — sem tokens próprios.

## Exemplo

```html
<div class="cl-radio">
  <input type="radio" name="plano" class="cl-radio-input" id="p1" checked>
  <label for="p1" class="cl-radio-label">Mensal</label>
</div>
<div class="cl-radio">
  <input type="radio" name="plano" class="cl-radio-input" id="p2">
  <label for="p2" class="cl-radio-label">Anual</label>
</div>
```

Mockup: [`mockup/check-radio-switch.html`](../../mockup/check-radio-switch.html).
