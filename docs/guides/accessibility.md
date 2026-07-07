# Acessibilidade

Acessibilidade não é um retrofit no Clarus CSS — foco, teclado e ARIA fazem
parte da API de todo componente interativo desde a primeira versão. Este
guia documenta os padrões **compartilhados** entre componentes; o
comportamento específico de cada um está na sua página em
[Componentes](../README.md#componentes), seção "A11y".

## Foco visível

Todo elemento interativo (botões, links, inputs, itens de menu) usa
`:focus-visible` (não `:focus`) para o anel de destaque — aparece só na
navegação por teclado, não em cliques de mouse, evitando o "flash" de foco
indesejado ao clicar. O mixin `focus-ring` (`packages/clarus-core/scss/tools/_mixins.scss`)
centraliza esse estilo; todo componente novo deve reusá-lo em vez de
desenhar um anel de foco próprio.

## Focus trap (modal, offcanvas)

Componentes que sobrepõem a página inteira (Modal, Offcanvas) prendem o
foco dentro de si enquanto abertos — `Tab` no último elemento focável volta
pro primeiro, `Shift+Tab` no primeiro vai pro último
(`packages/clarus-js/js/core/focus.js`, `createFocusTrap()`). Ao abrir, o
foco vai para o primeiro elemento focável do painel; ao fechar, volta para o
elemento que abriu (o gatilho).

## Escape e clique fora

Overlays (Modal, Offcanvas, Dropdown, Popover, Nested Menu) fecham com
`Escape` e com clique fora do painel, por padrão. Componentes com um modo
"preso" (`data-backdrop="static"` no Modal/Offcanvas) desativam essas duas
saídas deliberadamente — para fluxos que exigem uma decisão explícita
(confirmar/cancelar) antes de sair.

## Navegação por teclado em grupos (Tabs, Accordion, Nested Menu)

Grupos de itens relacionados seguem o padrão de "roving tabindex" do
[WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/): só o item
ativo tem `tabindex="0"`, os demais `tabindex="-1"` — `Tab` entra/sai do
grupo de uma vez, e as setas navegam **dentro** dele:

- **Tabs**: `ArrowLeft`/`ArrowRight` move entre abas, `Home`/`End` vai pra
  primeira/última.
- **Nested Menu**: `ArrowDown`/`ArrowUp` navegam no nível atual,
  `ArrowRight` abre um submenu, `ArrowLeft`/`Escape` fecham.

## ARIA injetado automaticamente

Alguns atributos ARIA são calculados e aplicados pelo próprio JS na
inicialização (não precisam ser escritos manualmente no HTML) — por
exemplo, Tabs aplica `role="tablist"`/`role="tab"`/`aria-selected`/
`aria-controls` aos elementos com `data-cl="tabs"`. Onde isso acontece, a
página do componente avisa explicitamente; o resto (`aria-label` em botões
sem texto visível, `alt` em imagens, etc.) é responsabilidade de quem
escreve o HTML — o framework não adivinha texto alternativo.

## `prefers-reduced-motion`

Toda transição de altura acionada por JS (Collapse, Accordion, Toast via
`packages/clarus-js/js/core/transition.js`) verifica
`window.matchMedia("(prefers-reduced-motion: reduce)")` e pula direto para
o estado final — sem animação — quando o usuário pediu menos movimento no
sistema operacional. Transições puramente CSS (hover, focus-ring,
`filter`/`opacity` em botões) não são pausadas automaticamente; se você
adicionar animações CSS próprias, envolva-as em
`@media (prefers-reduced-motion: no-preference)`.

## Contraste de cor

Botões/badges/alerts sólidos calculam a cor de texto automaticamente
(`color-contrast()`) para garantir contraste AA (≥ 4.5:1 texto normal, ≥
3:1 texto grande/UI) contra a cor de fundo escolhida — nunca é preciso
escolher manualmente entre texto branco ou preto. O relatório
`npm run contrast` (ver [`docs/reference/contrast-report.md`](../reference/contrast-report.md))
audita os pares texto/fundo de tokens nos temas claro e escuro; rode-o
depois de qualquer mudança de cor de token.

## Formulários

Inputs de validação (`.is-valid`/`.is-invalid`) e os textos de apoio
(`.cl-valid-feedback`/`.cl-invalid-feedback`, `.cl-form-text`) são
elementos visuais — associe-os ao input via `aria-describedby` no seu HTML
para que leitores de tela anunciem a mensagem ao focar o campo. O
framework não injeta esse atributo automaticamente, porque o `id` do texto
de apoio é definido por você.

## Testes automatizados

A regressão visual (`npm run test:visual`, Playwright) cobre
carregamento/interação sem erros de console, mas não é um gate de
acessibilidade. `npm run test:a11y` roda o axe-core (regras WCAG 2.1 A/AA)
contra todo mockup em `mockup/*.html` e falha o build ao encontrar
violações (nome acessível ausente, contraste insuficiente, papel ARIA
inválido etc.) — roda no CI a cada PR. Veja a cobertura por componente na
[matriz de acessibilidade](../reference/accessibility-matrix.md).

Mesmo com o gate automatizado, valide manualmente com um leitor de tela e
navegação só por teclado antes de considerar um componente pronto — axe
cobre um subconjunto de regras verificáveis por máquina (contraste, nomes,
papéis), não a experiência real de uso (ordem de leitura, clareza dos
anúncios, foco percebido).
