# Tag

Badge dismissível — reusa [Badge](badge.md) e `.cl-btn-close`
([Button](button.md)) mais o JS mínimo pra remover do DOM ao clicar no "x".

## Visão geral

```html
<span class="cl-badge cl-tag" data-cl="tag">
  Frontend
  <button type="button" class="cl-btn-close" data-cl-dismiss="tag" aria-label="Remover tag Frontend"></button>
</span>
```

## Anatomia

`.cl-badge.cl-tag` (mesmo elemento, duas classes — Tag é um refinamento de
Badge, não um componente separado) contendo texto + `.cl-btn-close` com
`data-cl-dismiss="tag"`.

## Variações

- **Cor**: as mesmas de [Badge](badge.md) (`.cl-badge-{cor}`).
- **Tamanho**: apenas o tamanho padrão. Tags são controles compactos de
  remoção; usar uma única densidade evita variações de alvo e de texto em
  filtros e formulários.
- **Ícone inicial**: envolva um SVG de `clarus-icons` em `.cl-tag-icon` antes
  de `.cl-tag-label`. O ícone é decorativo (`aria-hidden="true"`) quando o
  texto já descreve a tag.
- **Texto longo**: use `.cl-tag-truncate` na tag e `.cl-tag-label` no texto.
  Defina `--cl-tag-max-inline-size` conforme o contexto; o texto integral
  continua no DOM e pode ser exposto em `title` como apoio visual.
- **Agrupamento**: `.cl-tag-group` (flex + wrap) no contêiner pai,
  une tags lado a lado com separadores translúcidos; o botão de remoção só é
  revelado em hover ou foco, evitando ruído visual. A reserva simétrica de
  espaço para o botão mantém o texto visualmente centralizado; o fundo da tag
  inteira sinaliza o hover.
- **Protegida**: `.cl-tag-protected` desativa interação com `pointer-events:
  none`; substitua o botão por `.cl-tag-lock` e o ícone `shield-check` de
  `clarus-icons` quando a tag não puder ser removida.
- **Overflow**: `.cl-tag-overflow` é um `<button>` compacto e transparente,
  sem borda, com o ícone `tags` em `primary` centralizado; ele representa tags
  não exibidas.
  Conecte-o a um popover ou a uma lista expandida e mantenha `aria-expanded`
  sincronizado com essa interface.

```html
<div class="cl-tag-group">
  <span class="cl-badge cl-tag" data-cl="tag">Design<button type="button" class="cl-btn-close" data-cl-dismiss="tag" aria-label="Remover"></button></span>
  <span class="cl-badge cl-tag" data-cl="tag">Frontend<button type="button" class="cl-btn-close" data-cl-dismiss="tag" aria-label="Remover"></button></span>
</div>
```

## Estados

Botão de dispensa é transparente no repouso; tem hover (fundo sutil) e
`:active` (leve "afundar", feedback tátil antes da remoção assíncrona). Ao
receber foco pelo teclado, a tag inteira também recebe um anel de foco para
ficar distinguível em agrupamentos densos.

Para uma operação assíncrona, aplique `aria-busy="true"` e `.is-loading`, ou
use `Tag.setLoading(true)`. Inclua um `.cl-spinner` depois de `.cl-tag-label`:
o estado pendente usa fundo `warning`, texto e spinner pretos. O botão de
remoção é desabilitado até que o estado seja removido.

## A11y

- `.cl-btn-close` **precisa** de `aria-label` descritivo (ex.: "Remover tag
  Frontend", não só "Remover") — é um botão só-ícone.
- A remoção só acontece ao clicar no botão de fechar, nunca ao clicar na
  tag inteira — evita remoção acidental.
- Para tags truncadas, mantenha a string completa dentro de `.cl-tag-label`;
  ela continua disponível para tecnologias assistivas. `title` é apenas uma
  ajuda adicional para ponteiro.
- O botão `.cl-tag-overflow` requer um nome acessível descritivo, como
  `aria-label="Mostrar mais 3 tags"`.

## API JS

Auto-init via `data-cl="tag"`. `Tag.getInstance(el)`.

| Método | Descrição |
|---|---|
| `dismiss()` | Dispara `cl:tag:dismissed` (cancelável); se não cancelado, remove o elemento do DOM e retorna `true`. Retorna `false` se estiver carregando ou se o evento for cancelado. |
| `setLoading(loading)` | Alterna `.is-loading`, `aria-busy` e o estado desabilitado do botão de remoção. |
| `dispose()` | Remove o listener de clique e desregistra a instância (não remove o elemento). |

| Evento | Cancelável | Quando |
|---|---|---|
| `cl:tag:dismissed` | Sim | Antes de remover — `event.preventDefault()` cancela a remoção. |

## Tokens

Usa os tokens de [Badge](badge.md). Sem tokens de componente próprios.

## Exemplo

```html
<div class="cl-tag-group">
  <span class="cl-badge cl-badge-primary cl-tag" data-cl="tag">
    Urgente
    <button type="button" class="cl-btn-close" data-cl-dismiss="tag" aria-label="Remover tag Urgente"></button>
  </span>
  <span class="cl-badge cl-badge-danger cl-tag" data-cl="tag">
    Bloqueado
    <button type="button" class="cl-btn-close" data-cl-dismiss="tag" aria-label="Remover tag Bloqueado"></button>
  </span>
</div>
```

```html
<span class="cl-badge cl-tag cl-tag-truncate" style="--cl-tag-max-inline-size: 20rem;" data-cl="tag">
  <span class="cl-tag-icon" aria-hidden="true"><!-- SVG de clarus-icons --></span>
  <span class="cl-tag-label">Revisão de acessibilidade e compatibilidade entre navegadores</span>
  <button type="button" class="cl-btn-close" data-cl-dismiss="tag" aria-label="Remover tag Revisão de acessibilidade e compatibilidade entre navegadores"></button>
</span>

<button type="button" class="cl-badge cl-tag cl-tag-overflow" aria-label="Mostrar mais 3 tags" aria-expanded="false">
  <svg class="cl-icon" aria-hidden="true"><!-- SVG tags de clarus-icons --></svg>
</button>

<span class="cl-badge cl-tag is-loading" data-cl="tag" aria-busy="true">
  <span class="cl-tag-label">Salvando</span>
  <span class="cl-spinner" aria-hidden="true"></span>
  <button type="button" class="cl-btn-close" data-cl-dismiss="tag" aria-label="Remover tag Salvando" disabled></button>
</span>
```

Mockup: [laboratório do componente](../../mockup/feedback-actions.html#tag).
