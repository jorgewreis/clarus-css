# Análise de Gaps — Clarus CSS vs 11 Frameworks Líderes

> **Documento interno / estratégico.** Não faz parte da documentação pública do
> Clarus CSS — por isso cita frameworks concorrentes nominalmente, o que é
> proibido nos documentos oficiais (README, guide, definitions, scss-architecture,
> CHANGELOG). Serve como bússola de roadmap, não como material de divulgação.

Comparação de funcionalidades do Clarus CSS (v0.3.0) contra Bootstrap, Tailwind,
Foundation, Bulma, Material Design, Ant Design, Chakra UI, Material-UI, Vuetify,
Semantic UI e Cirrus UI.

## Componentes Implementados no Clarus CSS

- ✅ Layout (Container, Grid, Row/Col)
- ✅ Buttons
- ✅ Cards (incluindo variantes clicável e horizontal)
- ✅ Alerts
- ✅ Badges
- ✅ Tables (com variantes striped, hover, bordered)
- ✅ Navbar (estático)
- ✅ Dropdown
- ✅ Modal
- ✅ Accordion
- ✅ Tabs
- ✅ Tooltips
- ✅ Toasts
- ✅ Pagination
- ✅ Breadcrumbs
- ✅ Forms (inputs, select customizado, file upload, validação visual)
- ✅ **Spinner / Progress** (Etapa 1 — v0.3.0)
- ✅ **Carousel** (Etapa 2 — v0.3.0)
- ✅ **Stepper / Wizard** (Etapa 3)
- ✅ **Offcanvas** (Etapa 4)
- ✅ **Popover** (Etapa 4)
- ✅ **Segmented Control / Button Group** (Etapa 5)
- ✅ **Skeletons / Placeholder Loaders** (Etapa 5)
- ✅ **Timeline** (Etapa 5)
- ✅ **Collapse standalone** (Etapa 5)
- ✅ **Breadcrumb avançado** (colapso mobile + truncamento + tooltip, Etapa 5)
- ✅ **Input Group** (Etapa 6)
- ✅ **Alert Dialog / Confirm** (Etapa 6)
- ✅ **Divider** (Etapa 7)
- ✅ **Empty State** (Etapa 7)
- ✅ **Rating / Stars** (Etapa 7)

**Total: 29 componentes CSS + 14 componentes JS/funções** (Dropdown, Tooltip,
Modal, Select, Accordion, Tabs, Toast, Carousel, Stepper, Offcanvas, Popover,
Collapse, Breadcrumb, `Clarus.confirm`).

---

## Top 10 Recomendados — Status Atual

Os 10 gaps críticos originais foram integralmente absorvidos pelo plano de 5
etapas. **Com a Etapa 5 concluída, todo o Top-10 está fechado.**

### 1. Carrossel / Slider (Carousel)

**Status:** ✅ Implementado (Etapa 2 — `scss/components/_carousel.scss`, `js/carousel.js`)

**Uso:** Presente em ~100% dos frameworks com JS. **Ausente no Cirrus UI** (100% CSS).

Entregue com layout slide + fade, setas, indicadores, autoplay com pausa no
hover/foco, teclado, swipe e o modificador `.carousel-hover-controls`.

### 2. Spinner / Progress Indicator

**Status:** ✅ Implementado (Etapa 1 — `scss/components/_spinner.scss`)

**Uso:** Progress em quase todos; spinner dedicado na maioria (Cirrus tem progress,
mas **não** um spinner dedicado).

Entregue 100% CSS: spinner giratório + progress linear (com faixas), tamanhos e
cores de estado. Progress circular (ring) segue como refinamento futuro opcional.

### 3. Popover

**Status:** ✅ Implementado (Etapa 4 — `scss/components/_popover.scss`, `js/popover.js`)

**Uso:** Em 8/11 frameworks. **Ausente no Cirrus** (só tooltip). Diferente do
tooltip por ter conteúdo rico e controle manual.

Entregue com `positioning.js` (flip automático, como Dropdown/Tooltip); 4 modos
de disparo (`data-trigger`: click/hover/focus/manual); header + corpo + footer;
fecha com Escape/clique fora (ignorando conteúdo interativo interno);
`role="dialog"` + `aria-modal="false"` (sem focus trap, não é modal).

### 4. Offcanvas / Side Drawer

**Status:** ✅ Implementado (Etapa 4 — `scss/components/_offcanvas.scss`, `js/offcanvas.js`)

**Uso:** Em 9/11 frameworks. **Ausente no Cirrus.** Complemento do Modal para
navegação lateral, filtros, menus responsivos.

Entregue com posições left/right/top/bottom (`.offcanvas-start/-end/-top/-bottom`),
reaproveitando `overlay.js`/`focus.js` como o Modal (lock scroll, focus trap,
Escape/clique fora), aplicado de forma independente; backdrop opcional
(`data-backdrop="false"`) ou estático (`data-backdrop="static"`).

### 5. Breadcrumb avançado com collapse

**Status:** ✅ Implementado (Etapa 5 — `scss/components/_breadcrumbs.scss`, `js/breadcrumb.js`)

Entregue com truncamento por CSS (`.breadcrumb-item-truncate`) + tooltip
(`js/tooltip.js`) só quando o texto realmente transborda, e colapso automático
abaixo do breakpoint `sm` (640px): mantém o primeiro e o último nível
visíveis e substitui os intermediários por um item "…" que compõe um
`Dropdown` (`js/dropdown.js`), mesmo padrão de composição já usado pelo
Select customizado.

### 6. Collapse / Disclosure (standalone)

**Status:** ✅ Implementado (Etapa 5 — `scss/components/_collapse.scss`, `js/collapse.js`)

Extrai o padrão `expand()`/`collapse()` (`js/core/transition.js`, já usado
pelo Accordion) para uma seção expansível independente, com auto-init via
`data-clarus="collapse"`, `aria-expanded`/`aria-controls` geridos
automaticamente e eventos `clarus:collapse:shown`/`-hidden`.

### 7. Timeline

**Status:** ✅ Implementado (Etapa 5 — `scss/components/_timeline.scss`)

**Uso:** Em ~7/11 frameworks (forte em Ant Design, Material). **Ausente no Cirrus.**

Entregue vertical (padrão) e horizontal (`.timeline-horizontal`), itens com
marcador/label/conteúdo, estados padrão (pendente)/`.timeline-active`/
`.timeline-completed`/`.timeline-failed` reaproveitando os tokens de cor de
estado. 100% CSS, mesma lógica de conector de progresso do Stepper.

### 8. Stepper / Wizard

**Status:** ✅ Implementado (Etapa 3 — `scss/components/_stepper.scss`, `js/stepper.js`)

**Uso:** Comum nos frameworks com JS. **Ausente no Cirrus.**

Entregue com horizontal/vertical, estados active/completed/error, conector de
progresso, painéis + navegação, validação por passo via evento cancelável
`clarus:stepper:beforechange`.

### 9. Segmented Control / Button Group

**Status:** ✅ Implementado (Etapa 5 — `scss/components/_segmented-control.scss`)

**Uso:** Button group presente em vários (incl. Cirrus). Entregue 100% CSS:
grupo de botões com estado selecionado, modo exclusivo (`<input
type="radio">`) ou inclusivo (`<input type="checkbox">`), reaproveitando
`color-contrast()`. Tamanhos `.segmented-control-sm`/`-lg`.

### 10. Skeletons / Placeholder Loaders

**Status:** ✅ Implementado (Etapa 5 — `scss/components/_skeleton.scss`)

**Uso:** Em 8/11 frameworks (Cirrus **tem** placeholder). Entregue: `.skeleton`
base + variantes rect/circle/text, animação pulse/wave respeitando
`prefers-reduced-motion`. 100% CSS.

---

## Gaps Remanescentes — Nova Priorização (pós-Etapa 5)

Fechado o Top-10, as antigas "honoráveis menções" passam a ser os próximos alvos.
Re-priorizadas por impacto × facilidade contra o conjunto já implementado e os 11
frameworks. Organizados em 5 etapas (6 a 10, ver detalhamento abaixo), seguindo
o mesmo critério das Etapas 1–5: prioridade alta primeiro e, dentro de cada
etapa, componente 100% CSS antes do que depende de JavaScript.

| Prioridade | Item | Impacto | Dificuldade | Etapa | Observação |
|---|---|---|---|---|---|
| ✅ | **Input Group** (prefix/suffix em inputs) | Alto | Baixa | 6 | Forms são core; presente em quase todos (Cirrus: `form-ext`) |
| ✅ | **Alert Dialog / Confirm** | Médio-alto | Baixa | 6 | Compõe o Modal; padrão universal de confirmação |
| ✅ | **Divider / Separator com label** | Médio | Muito baixa | 7 | Quick win 100% CSS |
| ✅ | **Empty State** | Médio | Baixa | 7 | Placeholder de lista vazia; quase todo CSS |
| ✅ | **Rating / Stars** | Médio | Média | 7 | **Ausente no Cirrus**; comum em Ant/MUI |
| 🟠 Média | **Badge dismissível / Tags** | Médio | Baixa | 8 | Cirrus tem `tags`; reaproveita `.badge` + `.btn-close` |
| 🟡 Baixa | **File Input Drag-and-Drop** | Médio | Média | 9 | Evolui o upload atual |
| 🟡 Baixa | **Hover Card** | Baixo | Média | 9 | Fica trivial depois do Popover (Etapa 4) |
| 🟡 Baixa | **Notification Center** | Baixo-médio | Média-alta | 10 | Compõe múltiplos Toasts + histórico |
| 🟣 Futuro | **Menu aninhado (nested)** | Baixo | Alta | 10 | Complexidade alta, uso de nicho |

---

## Roadmap por Etapas

> **Progresso:** Etapas 1–7 concluídas. Etapas 8–10 planejadas abaixo,
> cobrindo o restante dos "Gaps Remanescentes".

| Etapa | Componentes | Status |
|---|---|---|
| **1** — Feedback & Loading | Spinner, Progress bar | ✅ Concluída |
| **2** — Carousel | Carousel (slide/fade, autoplay, swipe) | ✅ Concluída |
| **3** — Stepper | Stepper/Wizard (horizontal/vertical, validação) | ✅ Concluída |
| **4** — Overlays avançados | Offcanvas, Popover | ✅ Concluída |
| **5** — Fechamento do Top-10 | Segmented Control, Skeletons, Timeline, Collapse standalone, Breadcrumb avançado | ✅ Concluída |
| **6** — Formulários e confirmação | Input Group, Alert Dialog / Confirm | ✅ Concluída |
| **7** — Quick wins CSS-only | Divider, Empty State, Rating / Stars | ✅ Concluída |
| **8** — Badge dismissível | Badge dismissível / Tags | 🔜 Planejada |
| **9** — Evoluções de componentes existentes | File Input Drag-and-Drop, Hover Card | 🔜 Planejada |
| **10** — Maior complexidade | Notification Center, Menu aninhado (nested) | 🔜 Planejada |

Progress circular (ring) entra numa etapa futura, ainda sem posição definida.

### Etapa 6 — Formulários e confirmação ✅

Os dois itens de prioridade alta da tabela acima. Ordem interna: Input Group
primeiro (100% CSS, sem dependência), Alert Dialog depois (compõe o Modal já
existente — mesma regra geral de "CSS-only antes do que depende de JS" usada
desde a seção 21).

- **Input Group** (`scss/forms/_forms.scss`): `.input-group` envolvendo
  `.form-control` com addons de prefixo/sufixo (texto, ícone ou `.btn`),
  reaproveitando os tokens visuais de `.form-control` (borda, radius,
  tamanhos `-sm`/`-lg`) para os addons ficarem visualmente fundidos ao
  campo. 100% CSS. Mockup `mockup/input-group.html`.
- **Alert Dialog / Confirm** (`scss/components/_alert-dialog.scss`,
  `js/confirm.js`): variante do Modal (`.modal`) para confirmação
  (ex. "Excluir item?"), compondo `js/modal.js` sem duplicar a lógica de
  foco/teclado/overlay — a marcação (ícone de estado + dois botões de ação)
  é montada dinamicamente, sem precisar de HTML pré-declarado na página.
  API `Clarus.confirm(options)`, baseada em Promise: resolve `true`/`false`
  conforme o botão clicado (ou `false` em Escape/clique fora), com o foco
  voltando ao elemento que chamou. Mockup `mockup/alert-dialog.html`.

### Etapa 7 — Quick wins CSS-only ✅

Nenhum dos três depende de JavaScript; agrupados por serem os de menor
esforço restante.

- **Divider / Separator com label** (`scss/components/_divider.scss`):
  linha divisória com texto opcional centralizado (`.divider`/
  `.divider-label`), via `::before`/`::after`. Mockup `mockup/divider.html`.
- **Empty State** (`scss/components/_empty-state.scss`): bloco padrão para
  listas/telas vazias (`.empty-state-icon` como slot vazio + título +
  descrição + ação opcional), reaproveitando botões existentes para a ação.
  Mockup `mockup/empty-state.html`.
- **Rating / Stars** (`scss/components/_rating.scss`): reaproveita a mesma
  técnica de input oculto + label irmão do Segmented Control (Etapa 5) —
  `<input type="radio">` por estrela, exclusivo dentro do grupo, sem
  necessidade de JavaScript. Tamanhos `.rating-sm`/`-lg`. Mockup
  `mockup/rating.html`.

### Etapa 8 — Badge dismissível / Tags

Fica isolada porque é o primeiro item desta leva que precisa de JavaScript
— mas é pouco o suficiente (um `click` no `.btn-close` que remove/oculta o
badge) para não justificar posicionamento em par com outro componente.
Reaproveita `.badge` (Fase 2) e `.btn-close` (Fase 3). API mínima: evento
`clarus:tag:dismissed` antes de remover o elemento do DOM (permite cancelar
via `preventDefault()`, no mesmo espírito do `clarus:stepper:beforechange`).

### Etapa 9 — Evoluções de componentes existentes

Os dois reaproveitam infraestrutura já pronta, sem introduzir posicionamento
ou overlay novo.

- **File Input Drag-and-Drop**: evolui `.file-upload`/`.file-input`
  (Fase 6) com eventos `dragenter`/`dragover`/`drop` no `.file-label`,
  sincronizando o arquivo solto com o `<input type="file">` nativo (dispara
  `change` nativo, mesmo padrão do Select customizado).
- **Hover Card**: na prática, uma composição do Popover (Etapa 4) já
  existente com `data-trigger="hover"` (já suportado) e um conteúdo mais
  rico (ex. avatar + bio). Esforço concentrado em documentação/mockup e,
  no máximo, um ajuste visual pontual em `_popover.scss` — não é um
  componente novo de infraestrutura.

### Etapa 10 — Maior complexidade

Deixados por último por dependerem de mais decisões de design e terem o
menor ROI imediato entre os 10.

- **Notification Center**: orquestra múltiplas instâncias de `Clarus.Toast`
  com histórico persistente — é o item de maior complexidade de estado
  entre os 10 (precisa de uma decisão de armazenamento: em memória vs.
  `localStorage`, a definir na implementação).
- **Menu aninhado (nested)**: dropdown com submenus recursivos; complexidade
  alta (posicionamento em cascata, navegação por teclado entre níveis) e uso
  de nicho — já indicado como "Futuro" na priorização original.

---

## Análise Comparativa por Framework

### Bootstrap (v5.3)
- Tem: Carousel, Spinner, Offcanvas, Popover, Collapse, Scrollspy
- Não tem: Timeline, Stepper, Segmented Control, Skeletons

### Tailwind CSS (com plugins)
- Puramente utilitário — componentes vêm de plugins (Headless UI, DaisyUI)
- Equivalente: Carousel, Popover, Dialog, etc. disponíveis via plugins

### Material Design (Google)
- Tem: Carousel/Sliders, Progress, Stepper, Collapse, Card, Menu
- Padrão: muito opinativo em cores, animações, espaçamento

### Chakra UI
- Tem: Skeleton, Spinner, Progress, Drawer, Popover, Menu, Tabs, Modal
- Foco: accessibility-first, simples de estender

### Ant Design
- Tem: Carousel, Progress, Spin, Timeline, Steps, Drawer, Popover, Empty, Skeleton
- Padrão: enterprise-heavy, complexo

### Cirrus UI (~v0.8)
- Framework SCSS híbrido (component + utility-first), **100% CSS, sem JavaScript**.
- Tem: modal, dropdown, tabs, tooltip, toast, accordion, breadcrumb, pagination,
  tags, button group, progress bar, placeholder/skeleton, avatar, card, forms, table
- Não tem: carousel, offcanvas, popover, timeline, stepper, rating, spinner dedicado
- Padrão: prototipagem rápida com design system exposto via utilitários; tema e
  dark mode via **configuração SCSS**, não via CSS custom properties em runtime
  (contraste direto com a abordagem do Clarus, que expõe tudo em `--clarus-*`)

---

## Conclusão

Com as Etapas 1–5 concluídas, o Clarus CSS cobre os dez gaps do estudo
original (Carousel, Spinner, Stepper, Offcanvas, Popover, Segmented Control,
Skeletons, Timeline, Collapse standalone, Breadcrumb avançado), atingindo
**paridade completa com o Top-10** frente aos frameworks líderes.

A comparação com o Cirrus UI reforça um diferencial do Clarus: mesmo entre
frameworks híbridos, componentes interativos ricos como **carousel, offcanvas,
popover, timeline e stepper permanecem raros** — e o Clarus os entrega com JS
nativo, API consistente (`data-clarus`, `getInstance()`, `.show()/.hide()/
.dispose()`, eventos DOM) e acessibilidade desde a v0.1.

Com o Top-10 fechado, o foco passa aos **gaps remanescentes** priorizados
acima, organizados nas Etapas 6 a 10 (seção "Roadmap por Etapas"). Etapas 6
(Input Group, Alert Dialog/Confirm) e 7 (Divider, Empty State, Rating/Stars)
já estão concluídas; a próxima é a Etapa 8 (Badge dismissível / Tags).
