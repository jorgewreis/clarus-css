# Formas de uso

## Convenção de nomenclatura

| Prefixo | Papel | Exemplo |
|---|---|---|
| `.cl-*` | Componente (estrutura/aparência) | `.cl-btn`, `.cl-card`, `.cl-modal` |
| `.u-*` | Utilitário atômico | `.u-d-flex`, `.u-mt-3`, `.u-gx-2` |
| `.is-*` | Estado, controlado por você ou por JS | `.is-active`, `.is-disabled`, `.is-open` |
| `--cl-*` | Token CSS (Custom Property) | `--cl-color-primary`, `--cl-radius-md` |
| `data-cl` | Auto-init de componente interativo | `data-cl="modal"` |
| `data-cl-target`/`data-cl-dismiss` | Alvo/dispensa de componente interativo | `data-cl-target="#meuModal"` |
| `cl:*` | Evento DOM customizado disparado por um componente | `cl:modal:shown` |

Essa separação existe para o framework nunca colidir com classes de outras
bibliotecas/CSS na mesma página — ver
[`docs/reference/scss-architecture.md`](../reference/scss-architecture.md#cascade-layers-layer)
para como isso se reflete em cascade layers.

## Auto-init de componentes interativos

Todo componente que precisa de JavaScript se inicializa sozinho ao carregar
a página, a partir do atributo `data-cl="<nome>"` no elemento raiz — não é
preciso chamar `new Clarus.Algo(...)` manualmente:

```html
<button type="button" class="cl-btn" data-cl-target="#meuModal">Abrir</button>

<div class="cl-modal" data-cl="modal" id="meuModal">
  <div class="cl-modal-dialog">
    <div class="cl-modal-content">
      <div class="cl-modal-body">Conteúdo.</div>
    </div>
  </div>
</div>

<script src="dist/js/clarus.js"></script>
```

O auto-init roda em `DOMContentLoaded` (ou imediatamente, se o script for
carregado depois que o DOM já terminou) e é idempotente — chamar de novo não
cria uma segunda instância no mesmo elemento.

## API comum aos componentes interativos

A maioria segue a mesma forma, acessível via `getInstance()`:

```js
const modal = Clarus.Modal.getInstance(document.getElementById("meuModal"));
modal.show();
modal.hide();
modal.toggle();
modal.dispose(); // remove listeners e o registro da instância
```

- `getInstance(el)` — retorna a instância já criada para aquele elemento
  (`undefined` se não houver, ou se `data-cl` nunca esteve presente e você
  precisa instanciar manualmente com `new Clarus.Nome(el)`).
- `show()`/`hide()`/`toggle()` — nem todo componente tem os três (ex.:
  Tabs usa `show(tabEl)` para trocar a aba ativa; Tag só tem `dismiss()`).
  Ver a página de cada componente em [Componentes](../README.md#componentes)
  para a API exata.
- `dispose()` — remove os listeners e desregistra a instância; o elemento
  em si não é removido do DOM (exceto onde a própria natureza do componente
  implica remoção, como `Tag.dismiss()`).

Uma exceção à regra: **Alert Dialog** não usa `data-cl`/`getInstance()` — é
100% programático, via `Clarus.confirm({ title, message, ... })`, que
retorna uma Promise. Ver
[`../components/alert-dialog.md`](../components/alert-dialog.md).

## Eventos

Componentes disparam eventos DOM customizados, no padrão
`cl:<componente>:<ação>` (particípio: `shown`/`hidden`/`changed`...),
sempre com `bubbles: true` — escute no documento ou em qualquer ancestral:

```js
document.addEventListener("cl:modal:shown", (event) => {
  console.log("modal aberto:", event.target);
});
```

Alguns eventos são **canceláveis** (`cancelable: true`) — chamar
`event.preventDefault()` no handler impede a ação (ex.: `cl:tag:dismissed`
cancela a remoção da tag). A documentação de cada componente lista quais
eventos existem e se são canceláveis.

## Import via ES modules

Além do bundle IIFE (`dist/js/clarus.js`, global `Clarus`), os módulos
individuais são importáveis via `clarus-css/js/*`:

```js
import { Modal } from "clarus-css/js/modal.js";
```

Útil para bundlers que fazem tree-shaking — importar só o que usa em vez do
JS inteiro.

## Próximo passo

[Componentes](../README.md#componentes) — catálogo completo, ou
[Theming](../guides/theming.md) para customizar cores/tipografia/raio sem
fork.
