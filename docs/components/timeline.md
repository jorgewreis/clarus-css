# Timeline

Linha do tempo de eventos — 100% CSS, com marcadores conectados e estados
por item (pendente/ativo/concluído/falhou).

## Visão geral

```html
<ol class="cl-timeline">
  <li class="cl-timeline-item cl-timeline-completed">
    <div class="cl-timeline-marker"></div>
    <div class="cl-timeline-content">
      <p class="cl-timeline-title">Pedido criado</p>
      <p class="cl-timeline-text">Seu pedido foi registrado.</p>
      <span class="cl-timeline-time">10:32</span>
    </div>
  </li>
  <li class="cl-timeline-item cl-timeline-active">
    <div class="cl-timeline-marker"></div>
    <div class="cl-timeline-content">
      <p class="cl-timeline-title">Em preparação</p>
    </div>
  </li>
  <li class="cl-timeline-item">
    <div class="cl-timeline-marker"></div>
    <div class="cl-timeline-content">
      <p class="cl-timeline-title">Enviado</p>
    </div>
  </li>
</ol>
```

## Anatomia

`<ol class="cl-timeline">` > `.cl-timeline-item` (um por evento) >
`.cl-timeline-marker` (círculo) + `.cl-timeline-content` >
`.cl-timeline-title` + `.cl-timeline-text` (opcional) +
`.cl-timeline-time` (opcional). O conector entre marcadores é desenhado
via `::before` — não insira manualmente.

## Variações

`.cl-timeline-horizontal` no `<ol>` — inverte o eixo (itens em colunas,
marcador no topo, conector na horizontal).

## Estados

Cada `.cl-timeline-item` aceita uma destas classes (mesma lógica visual do
[Stepper](stepper.md) — controle manual, sem JS):

| Classe | Efeito |
|---|---|
| (nenhuma) | Pendente — marcador vazio, conector cinza. |
| `.cl-timeline-active` | Em andamento — marcador preenchido na cor primária. |
| `.cl-timeline-completed` | Concluído — marcador com check verde; o conector seguinte também fica verde (indica progresso). |
| `.cl-timeline-failed` | Falhou — marcador e título em vermelho. |

## A11y

Use `<ol>` (ordem cronológica importa) — já no exemplo. Sem JS, sem
interação por teclado própria; se os itens forem clicáveis (ex.: expandir
detalhes), essa interação é sua responsabilidade.

## API JS

Nenhuma — 100% CSS. Estados são classes que você controla pela sua
aplicação.

## Tokens

`--cl-color-border` (conector/marcador padrão), `--cl-color-primary`
(ativo), `--cl-color-success` (concluído), `--cl-color-danger` (falhou),
`--cl-color-text`, `--cl-color-muted`.

## Exemplo

Ver acima (Visão geral) — mockup completo com as duas orientações em
[`mockup/content-data.html#timeline`](../../mockup/content-data.html#timeline).
