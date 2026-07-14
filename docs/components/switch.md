# Switch

Toggle liga/desliga 100% CSS, sobre um `<input type="checkbox">` nativo —
semanticamente é um checkbox (representa um estado booleano), só a
aparência muda. Knob **retangular arredondado**, não circular — decisão de
design deliberada (nada circular no framework além de radio/spinner).

## Visão geral

```html
<div class="cl-switch">
  <input type="checkbox" class="cl-switch-input" id="notif" checked>
  <label for="notif" class="cl-switch-label">Notificações</label>
</div>
```

## Anatomia

`.cl-switch` (wrapper) > `.cl-switch-input` (oculto via clip) +
`.cl-switch-label` (`<label for="...">`, desenha o trilho via `::before` e
o knob via `::after`, que desliza com `left` + `transition`).

## Variações

Tamanho: `.cl-switch-sm`, `.cl-switch-lg` no wrapper.

## Estados

checked/disabled/foco — mesmo padrão do [Checkbox](checkbox.md). Sem
`indeterminate` nem validação (switch não é um campo de formulário
validável, é um controle de preferência/estado).

## A11y

- `<input type="checkbox">` nativo — `Space` alterna, leitor de tela
  anuncia como checkbox marcado/desmarcado (não há um role "switch" nativo
  em HTML; usar `type="checkbox"` é a escolha correta e amplamente
  suportada — um `role="switch"` explícito é opcional, não aplicado pelo
  framework).
- Quando não houver texto visível ao lado (ex.: dentro de um
  [Tile](tile.md), como no exemplo abaixo), use `aria-label` no `<input>`
  em vez de deixar a `<label>` vazia.

```html
<div class="cl-switch">
  <input type="checkbox" class="cl-switch-input" id="s1" aria-label="Ativar tema escuro">
  <label for="s1" class="cl-switch-label"></label>
</div>
```

## API JS

Nenhuma — 100% CSS.

## Tokens

Sem tokens de componente próprios — usa `--cl-color-primary` (trilho
ligado), `--cl-color-border` (knob desligado), `--cl-radius-md` (trilho),
`--cl-radius-sm` (knob).

## Exemplo

```html
<div class="cl-switch">
  <input type="checkbox" class="cl-switch-input" id="sw1">
  <label for="sw1" class="cl-switch-label">Desligado</label>
</div>
<div class="cl-switch">
  <input type="checkbox" class="cl-switch-input" id="sw2" checked>
  <label for="sw2" class="cl-switch-label">Ligado</label>
</div>
```

Mockup: [laboratório do componente](../../mockup/content-data.html#tile).
Uso combinado com Tile: [laboratório de conteúdo e dados](../../mockup/content-data.html#tile).
