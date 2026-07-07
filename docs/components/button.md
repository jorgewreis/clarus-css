# Button

Botão de ação, base visual (cor de contraste automática, tamanhos) para
badges, alertas, tags e tabelas.

## Visão geral

```html
<button type="button" class="cl-btn">Padrão</button>
<button type="button" class="cl-btn cl-btn-primary">Primary</button>
<button type="button" class="cl-btn cl-btn-outline-primary">Outline</button>
```

Funciona em `<button>`, `<a>` ou qualquer elemento — a classe é puramente
visual, sem exigir uma tag específica.

## Anatomia

Um único elemento (`.cl-btn`); nenhuma marcação interna obrigatória. O
botão de fechar (`.cl-btn-close`, usado por Card/Modal/Toast/Tag) é uma
variante separada, sem texto, desenhada só com `::before`/`::after`:

```html
<button type="button" class="cl-btn-close" aria-label="Fechar"></button>
```

## Variações

- **Cor sólida**: `.cl-btn-primary`, `-secondary`, `-success`, `-warning`,
  `-danger`, `-info` — fundo colorido, texto com contraste calculado
  automaticamente (`color-contrast()`, garante AA).
- **Cor outline**: `.cl-btn-outline-{cor}` — borda e texto coloridos, fundo
  transparente; hover/active preenchem com a cor sólida.
- **Tamanho**: `.cl-btn-sm` (30px), `.cl-btn-lg` (46px); sem sufixo = 38px
  (padrão).

```html
<button type="button" class="cl-btn cl-btn-danger cl-btn-sm">Excluir</button>
<button type="button" class="cl-btn cl-btn-outline-success cl-btn-lg">Aprovar</button>
```

## Estados

- **Hover/active**: `filter: brightness()` (escurece), sem redeclarar cor.
- **Foco**: anel via `:focus` (mixin `focus-ring`).
- **Desabilitado**: atributo `disabled` (em `<button>`) ou classe
  `.is-disabled` (funciona em qualquer elemento, inclusive `<a>`, que não
  aceita `disabled` nativamente).

```html
<button type="button" class="cl-btn cl-btn-primary" disabled>Desabilitado</button>
<a href="#" class="cl-btn is-disabled">Link desabilitado</a>
```

## A11y

- `<button>` é a tag recomendada para ações (não navegação); use `<a
  href="...">` só quando o clique navega para outra URL.
- Botões só-ícone (sem texto visível) precisam de `aria-label` — o
  framework não injeta um automaticamente.
- Foco visível por padrão; não remova o anel sem substituir por outro
  indicador com contraste equivalente.

## API JS

Nenhuma — 100% CSS.

## Tokens

Componente (`--cl-btn-*`, com fallback pro semântico correspondente —
sobrescrevível por instância sem `!important`):

| Token | Fallback |
|---|---|
| `--cl-btn-bg` | `--cl-color-bg-subtle` |
| `--cl-btn-color` | `--cl-color-text-primary` |
| `--cl-btn-border-color` | `--cl-color-border-default` |

As variantes de cor (`.cl-btn-primary` etc.) sobrescrevem esses três tokens
diretamente, não `background-color`/`color`/`border-color` — ver
[`docs/reference/scss-architecture.md`](../reference/scss-architecture.md#tokens)
para o padrão. Raio: `--cl-radius-sm`.

## Exemplo

```html
<button type="button" class="cl-btn">Padrão</button>
<button type="button" class="cl-btn cl-btn-primary">Primary</button>
<button type="button" class="cl-btn cl-btn-outline-danger cl-btn-sm">Cancelar</button>
<button type="button" class="cl-btn cl-btn-success cl-btn-lg">Confirmar</button>

<style>
  .meu-botao { --cl-btn-bg: #6d28d9; --cl-btn-color: #fff; --cl-btn-border-color: #6d28d9; }
</style>
<button type="button" class="cl-btn meu-botao">Cor custom por instância</button>
```

Mockup: [`mockup/buttons.html`](../../mockup/buttons.html).
