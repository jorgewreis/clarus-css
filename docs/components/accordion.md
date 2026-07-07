# Accordion

Grupo de painéis expansíveis, com controle de exclusividade (só um aberto
por vez, ou vários) — construído sobre a mesma animação de altura do
[Collapse](collapse.md).

## Visão geral

```html
<div class="cl-accordion" data-cl="accordion">
  <div class="cl-accordion-item">
    <h3 class="cl-accordion-header">
      <button type="button" class="cl-accordion-button" aria-expanded="true">Pergunta 1</button>
    </h3>
    <div class="cl-accordion-collapse">
      <div class="cl-accordion-body">Resposta 1.</div>
    </div>
  </div>
  <div class="cl-accordion-item">
    <h3 class="cl-accordion-header">
      <button type="button" class="cl-accordion-button" aria-expanded="false">Pergunta 2</button>
    </h3>
    <div class="cl-accordion-collapse">
      <div class="cl-accordion-body">Resposta 2.</div>
    </div>
  </div>
</div>
```

`data-cl="accordion"` vai no contêiner do grupo (não em cada item) — os
botões internos são descobertos automaticamente.

## Anatomia

`.cl-accordion` > `.cl-accordion-item` (um por painel) > `.cl-accordion-header`
(`<h3>`, envolve o botão — nível de heading ajustável conforme a hierarquia
da sua página) > `.cl-accordion-button` (seta gerada via `::after`,
rotaciona ao abrir) + `.cl-accordion-collapse` > `.cl-accordion-body`.

## Variações

`data-multiple="true"` no `.cl-accordion` permite vários painéis abertos
simultaneamente; sem o atributo (padrão), abrir um fecha os demais do
grupo.

```html
<div class="cl-accordion" data-cl="accordion" data-multiple="true">...</div>
```

## Estados

`aria-expanded="true"/"false"` no botão define o estado inicial de cada
item (exatamente como no HTML — o JS lê e sincroniza a partir daí, não
força todos fechados).

## A11y

`aria-controls`/`aria-expanded` (botão) e `role="region"`/
`aria-labelledby` (painel) aplicados automaticamente. Cada botão é um
`<button>` nativo dentro de um heading (`<h3>`) — navegável por `Tab` e
ativável por `Enter`/`Space` sem JS extra. Respeita
`prefers-reduced-motion` (herdado do Collapse).

## API JS

Auto-init via `data-cl="accordion"` **no contêiner do grupo**.
`Accordion.getInstance(el)`.

| Método | Descrição |
|---|---|
| `dispose()` | Remove os listeners de todos os botões do grupo e desregistra a instância. |

Não há `show()`/`hide()` no grupo — a interação é sempre pelo clique no
botão de cada item (ou disparando o evento de clique programaticamente).

| Evento (no botão do item) | Cancelável | Quando |
|---|---|---|
| `cl:accordion:shown` | Não | Depois que o painel termina de expandir. |
| `cl:accordion:hidden` | Não | Depois que o painel termina de recolher. |

## Tokens

`--cl-color-border`, `--cl-color-surface`, `--cl-color-subtle` (hover),
`--cl-color-text`, `--cl-radius-md`.

## Exemplo

```html
<div class="cl-accordion" data-cl="accordion">
  <div class="cl-accordion-item">
    <h3 class="cl-accordion-header">
      <button type="button" class="cl-accordion-button" aria-expanded="true">O que é o Clarus CSS?</button>
    </h3>
    <div class="cl-accordion-collapse">
      <div class="cl-accordion-body">Um framework CSS open source, HTML/CSS/JS nativo, zero dependências.</div>
    </div>
  </div>
</div>
```

Mockup: [`mockup/accordion-tabs-toast.html`](../../mockup/accordion-tabs-toast.html).
