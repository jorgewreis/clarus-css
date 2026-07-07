# Carousel

Carrossel de slides — navegação por setas, indicadores, teclado, swipe/
arraste e autoplay opcional.

## Visão geral

```html
<div class="cl-carousel" data-cl="carousel">
  <div class="cl-carousel-inner">
    <div class="cl-carousel-item is-active"><img src="slide1.jpg" alt=""></div>
    <div class="cl-carousel-item"><img src="slide2.jpg" alt=""></div>
  </div>
  <button type="button" class="cl-carousel-control-prev" aria-label="Anterior"></button>
  <button type="button" class="cl-carousel-control-next" aria-label="Próximo"></button>
</div>
```

## Anatomia

`.cl-carousel` (`data-cl="carousel"`, recorte via `overflow: hidden`) >
`.cl-carousel-inner` (trilha flex, deslocada por `translateX`) >
`.cl-carousel-item` (um por slide; exatamente um começa com `.is-active`)
+ `.cl-carousel-control-prev`/`-next` (opcionais) +
`.cl-carousel-indicators` (`<ul>` de botões, opcional).

## Variações

- **Fade**: `.cl-carousel-fade` — troca por opacidade em vez de deslizar
  (slides empilhados via `position: absolute`).
- **Setas só no hover**: `.cl-carousel-hover-controls` — esconde as setas
  até passar o mouse ou focar um controle por teclado.

```html
<div class="cl-carousel cl-carousel-fade cl-carousel-hover-controls" data-cl="carousel">...</div>
```

## Estados

`.cl-carousel-item.is-active`/`.cl-carousel-indicators button.is-active` —
sincronizados pelo JS a cada troca de slide.

- `data-autoplay="true"` — avança sozinho a cada `data-interval` ms
  (padrão `5000`). Pausa automaticamente no hover e ao focar qualquer
  controle por teclado, retoma ao sair.

```html
<div class="cl-carousel" data-cl="carousel" data-autoplay="true" data-interval="4000">...</div>
```

## A11y

`role="group"` + `aria-roledescription="carousel"` no contêiner (foco
recebível para navegação por teclado). Cada `.cl-carousel-item` ganha
`aria-hidden` sincronizado com o estado ativo; cada indicador ganha
`aria-current`. Teclado (com foco no carrossel): `ArrowLeft`/`ArrowRight`
troca de slide, `Home`/`End` vai pro primeiro/último. Arraste por
ponteiro (mouse/touch) também troca de slide (limiar de 40px). Transições
são desativadas sob `prefers-reduced-motion: reduce`.

## API JS

Auto-init via `data-cl="carousel"`. `Carousel.getInstance(el)`.

| Método | Descrição |
|---|---|
| `next()` / `prev()` | Avança/volta um slide (circular — do último volta pro primeiro). |
| `goTo(index)` | Vai direto para o slide `index`. |
| `pause()` | Para o autoplay (se ativo). |
| `dispose()` | Para o autoplay, remove todos os listeners, desregistra a instância. |

| Evento | Cancelável | Quando |
|---|---|---|
| `cl:carousel:slid` | Não | Depois de trocar de slide — `event.detail` traz `{ from, to }` (índices). |

## Tokens

`--cl-radius-md`. Setas/indicadores usam cores fixas (branco sobre
overlay escuro semitransparente), não tokenizadas — pensado pra imagens de
fundo variadas.

## Exemplo

```html
<div class="cl-carousel" data-cl="carousel" data-autoplay="true">
  <div class="cl-carousel-inner">
    <div class="cl-carousel-item is-active"><img src="a.jpg" alt="Slide 1"></div>
    <div class="cl-carousel-item"><img src="b.jpg" alt="Slide 2"></div>
    <div class="cl-carousel-item"><img src="c.jpg" alt="Slide 3"></div>
  </div>
  <button type="button" class="cl-carousel-control-prev" aria-label="Anterior"></button>
  <button type="button" class="cl-carousel-control-next" aria-label="Próximo"></button>
  <ul class="cl-carousel-indicators">
    <li><button type="button" class="is-active" aria-label="Slide 1"></button></li>
    <li><button type="button" aria-label="Slide 2"></button></li>
    <li><button type="button" aria-label="Slide 3"></button></li>
  </ul>
</div>
```

Mockup: [`mockup/carousel.html`](../../mockup/carousel.html).
