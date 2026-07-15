# Carousel

Carrossel de painéis ou mídias relacionadas, com navegação por setas,
indicadores, teclado, arraste e autoplay opcional. Use-o para conteúdo
complementar; informação essencial deve continuar disponível fora dos slides.

## Visão geral

```html
<div class="cl-carousel" data-cl="carousel" aria-label="Destaques de produto">
  <div class="cl-carousel-inner">
    <div class="cl-carousel-item is-active">
      <img src="slide1.jpg" alt="Equipe colaborando em um painel">
      <div class="cl-carousel-caption">
        <h2>Fluxos mais claros</h2>
        <p>Centralize tarefas recorrentes em uma experiência previsível.</p>
      </div>
    </div>
    <div class="cl-carousel-item"><img src="slide2.jpg" alt="Resumo de resultados"></div>
  </div>
  <button type="button" class="cl-carousel-control-prev" aria-label="Slide anterior"></button>
  <button type="button" class="cl-carousel-control-next" aria-label="Próximo slide"></button>
</div>
```

## Anatomia

`.cl-carousel` (`data-cl="carousel"`, rótulo acessível e recorte) >
`.cl-carousel-inner` (trilha flex deslocada por `translate3d`) >
`.cl-carousel-item` (um por slide; exatamente um inicia com `.is-active`).

Use `.cl-carousel-media` com `background-image` para uma fotografia de fundo;
como a imagem é decorativa nesse padrão, deixe-a com `aria-hidden="true"` e
forneça o contexto na legenda. Para imagem semântica, prefira `<img alt>`.

Filhos opcionais do contêiner são `.cl-carousel-control-prev`,
`.cl-carousel-control-next`, `.cl-carousel-control-toggle`,
`.cl-carousel-indicators` (lista de botões) e `.cl-carousel-caption` dentro
de cada item. A legenda recebe um gradiente de leitura, título, texto e CTA
opcional.

## Variações

- **Fade**: `.cl-carousel-fade` troca os slides por opacidade.
- **Controles no hover**: `.cl-carousel-hover-controls` revela setas e toggle
  ao passar o mouse ou ao focar um controle.
- **Legenda lateral**: `.cl-carousel-caption-side` posiciona a legenda à
  direita em telas largas e volta ao overlay padrão em telas pequenas. Adicione
  `.cl-carousel-caption-start` à legenda de um slide para alinhá-la à esquerda
  quando isso preservar melhor o assunto da imagem. Em telas pequenas, a
  legenda ocupa a largura disponível, mas mantém o alinhamento visual: à
  direita por padrão e à esquerda com `.cl-carousel-caption-start`.
- **Legenda empilhada**: `.cl-carousel-caption-stacked` posiciona a legenda e
  os indicadores abaixo da mídia, sem qualquer sobreposição.
- **Sem mídia**: `.cl-carousel-no-media` cria painéis de superfície para
  conteúdo informativo ou interativo.
- **Autoplay controlável**: use `data-autoplay="true"` e inclua o botão
  `[data-cl-carousel-toggle]` para oferecer pausa e reprodução explícitas.

```html
<div class="cl-carousel cl-carousel-fade cl-carousel-hover-controls"
     data-cl="carousel" data-autoplay="true" data-interval="4000"
     aria-label="Atualizações automáticas">
  <!-- .cl-carousel-inner e itens -->
  <button type="button" class="cl-carousel-control-toggle" data-cl-carousel-toggle></button>
</div>
```

## Estados

`.cl-carousel-item.is-active` e `.cl-carousel-indicators button.is-active`
são sincronizados pelo JavaScript. O botão de reprodução recebe
`aria-pressed="true"` enquanto o autoplay está habilitado e troca seu nome
acessível entre pausar e reproduzir.

`data-autoplay="true"` avança a cada `data-interval` ms (padrão `5000`). O
timer pausa temporariamente no hover, foco, arraste e quando a aba fica
oculta. `pause()` ou o toggle impedem sua retomada até `play()` ser chamado.

Com zero ou um slide, o componente recebe `.is-static`; controles e
indicadores são ocultados e não é criado um tab stop de navegação.

As áreas superior e inferior ficam reservadas pelos tokens
`--cl-carousel-top-safe-area` e `--cl-carousel-bottom-safe-area`: legendas
padrão nunca ocupam a barra de controles nem os indicadores. Para um
carrossel de dois slides, `.cl-carousel-hide-indicators-two` oculta os dots.
`[data-cl-carousel-counter]` recebe automaticamente o texto `1 de 3`, e
`[data-cl-carousel-progress]` anima o progresso do autoplay. Use
`data-drag="false"` quando o conteúdo do slide for altamente interativo.

Na variação `.cl-carousel-caption-side`, a mesma reserva é aplicada no modo
compacto: a legenda não invade a barra superior ou os indicadores, o excesso
de conteúdo é recortado sem criar barra de rolagem e o gradiente de leitura
ocupa toda a área da mídia.

## A11y

O contêiner recebe `role="group"` e `aria-roledescription="carousel"`; forneça
sempre um `aria-label` que descreva seu conteúdo. Slides inativos recebem
`aria-hidden`; indicadores recebem `aria-current`; e a trilha é `aria-live`
`off` durante autoplay ativo e `polite` quando manual ou pausado.

Com foco no próprio carrossel, `ArrowLeft`/`ArrowRight` trocam o slide e
`Home`/`End` vão ao primeiro/último. Os botões mantêm foco nativo e não têm
suas teclas capturadas pelo contêiner. O arraste por mouse, toque ou caneta
segue o movimento horizontal, preserva rolagem vertical e ignora gestos que
começam em controles ou conteúdo interativo. Transições respeitam
`prefers-reduced-motion: reduce`.

## API JS

Auto-init via `data-cl="carousel"`. `Carousel.getInstance(el)` recupera a
instância criada.

| Método | Descrição |
|---|---|
| `next()` / `prev()` | Avança/volta um slide, circularmente. |
| `goTo(index)` | Vai diretamente ao índice informado. |
| `pause()` | Pausa o autoplay configurado até uma chamada a `play()`. |
| `play()` | Retoma o autoplay configurado, se o carrossel for navegável e a página estiver visível. |
| `dispose()` | Para o timer, remove listeners e desregistra a instância. |

| Evento | Cancelável | Quando |
|---|---|---|
| `cl:carousel:slid` | Não | Após trocar de slide; `detail` contém `{ from, to }`. |

## Tokens

O componente expõe tokens locais com fallback para tokens globais:
`--cl-carousel-radius`, `--cl-carousel-transition-duration`,
`--cl-carousel-transition-easing`, `--cl-carousel-control-size`,
`--cl-carousel-control-inset`, `--cl-carousel-control-color`,
`--cl-carousel-control-bg`, `--cl-carousel-control-bg-hover`,
`--cl-carousel-focus-color`, `--cl-carousel-indicator-size`,
`--cl-carousel-indicator-active-width`, `--cl-carousel-indicator-color`,
`--cl-carousel-indicator-active-color`, `--cl-carousel-caption-scrim`,
`--cl-carousel-top-safe-area`, `--cl-carousel-bottom-safe-area` e
`--cl-carousel-progress-height`.

## Exemplo

```html
<div class="cl-carousel" data-cl="carousel" data-autoplay="true"
     aria-label="Destaques do produto">
  <div class="cl-carousel-inner">
    <div class="cl-carousel-item is-active"><img src="a.jpg" alt="Produto em uso"></div>
    <div class="cl-carousel-item"><img src="b.jpg" alt="Equipe em reunião"></div>
    <div class="cl-carousel-item"><img src="c.jpg" alt="Painel de resultados"></div>
  </div>
  <button type="button" class="cl-carousel-control-prev" aria-label="Slide anterior"></button>
  <button type="button" class="cl-carousel-control-next" aria-label="Próximo slide"></button>
  <button type="button" class="cl-carousel-control-toggle" data-cl-carousel-toggle></button>
  <ul class="cl-carousel-indicators">
    <li><button type="button" class="is-active" aria-label="Ir para o slide 1"></button></li>
    <li><button type="button" aria-label="Ir para o slide 2"></button></li>
    <li><button type="button" aria-label="Ir para o slide 3"></button></li>
  </ul>
</div>
```

Mockup: [laboratório do componente](../../mockup/content-data.html#carousel).

## Limitações

O Carousel mostra um item por vez e não inclui thumbnails, vídeo, zoom,
lightbox ou múltiplos slides visíveis. Prefira compor recursos existentes para
esses casos antes de propor uma expansão deste componente avançado.
