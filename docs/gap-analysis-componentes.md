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

**Total: 20 componentes CSS + 9 componentes JS** (Dropdown, Tooltip, Modal,
Select, Accordion, Tabs, Toast, Carousel, Stepper).

---

## Top 10 Recomendados — Status Atual

Os 10 gaps críticos originais foram integralmente absorvidos pelo plano de 5
etapas. Ao concluir a Etapa 5, **todo o Top-10 está fechado**.

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

**Status:** 🔜 Planejado (Etapa 4)

**Uso:** Em 8/11 frameworks. **Ausente no Cirrus** (só tooltip). Diferente do
tooltip por ter conteúdo rico e controle manual.

**Escopo:** reaproveita `positioning.js` (flip automático, já usado por Dropdown/
Tooltip); disparo configurável (click/hover/focus/manual); header + corpo +
footer; fecha com Escape/clique fora; `role="dialog"`.

### 4. Offcanvas / Side Drawer

**Status:** 🔜 Planejado (Etapa 4)

**Uso:** Em 9/11 frameworks. **Ausente no Cirrus.** Complemento do Modal para
navegação lateral, filtros, menus responsivos.

**Escopo:** posições left/right/top/bottom; reaproveita `overlay.js`/`focus.js`
exatamente como o Modal (lock scroll, focus trap, Escape/clique fora).

### 5. Breadcrumb avançado com collapse

**Status:** 🔜 Planejado (Etapa 5) — breadcrumb básico já existe

**Escopo:** collapse automático em mobile (primeiros + últimos), truncação de
labels com tooltip (reaproveita `js/tooltip.js`), versão compacta com dropdown
para níveis intermediários (reaproveita `js/dropdown.js`).

### 6. Collapse / Disclosure (standalone)

**Status:** 🔜 Planejado (Etapa 5) — hoje só embutido no Accordion

**Escopo:** extrai o padrão `expand()`/`collapse()` (`js/core/transition.js`, já
usado pelo Accordion) para uma seção expansível independente, com
`aria-expanded`/`aria-controls`.

### 7. Timeline

**Status:** 🔜 Planejado (Etapa 5)

**Uso:** Em ~7/11 frameworks (forte em Ant Design, Material). **Ausente no Cirrus.**

**Escopo:** vertical/horizontal, itens com ícone/label/conteúdo, estados
pending/active/completed/failed reaproveitando tokens de cor de estado. CSS puro.

### 8. Stepper / Wizard

**Status:** ✅ Implementado (Etapa 3 — `scss/components/_stepper.scss`, `js/stepper.js`)

**Uso:** Comum nos frameworks com JS. **Ausente no Cirrus.**

Entregue com horizontal/vertical, estados active/completed/error, conector de
progresso, painéis + navegação, validação por passo via evento cancelável
`clarus:stepper:beforechange`.

### 9. Segmented Control / Button Group

**Status:** 🔜 Planejado (Etapa 5) — hoje parcial via Tabs

**Uso:** Button group presente em vários (incl. Cirrus). **Escopo:** grupo de
botões com estado `selected`, modos exclusivo/inclusivo, reaproveita
`color-contrast()`.

### 10. Skeletons / Placeholder Loaders

**Status:** 🔜 Planejado (Etapa 5)

**Uso:** Em 8/11 frameworks (Cirrus **tem** placeholder). **Escopo:** `.skeleton`
base + variantes rect/circle/text, animação pulse/wave respeitando
`prefers-reduced-motion`. Majoritariamente CSS.

---

## Gaps Remanescentes — Nova Priorização (pós-Etapa 5)

Fechado o Top-10, as antigas "honoráveis menções" passam a ser os próximos alvos.
Re-priorizadas por impacto × facilidade contra o conjunto já implementado e os 11
frameworks:

| Prioridade | Item | Impacto | Dificuldade | Observação |
|---|---|---|---|---|
| 🔴 Alta | **Input Group** (prefix/suffix em inputs) | Alto | Baixa | Forms são core; presente em quase todos (Cirrus: `form-ext`) |
| 🔴 Alta | **Alert Dialog / Confirm** | Médio-alto | Baixa | Compõe o Modal; padrão universal de confirmação |
| 🟠 Média | **Divider / Separator com label** | Médio | Muito baixa | Quick win 100% CSS |
| 🟠 Média | **Empty State** | Médio | Baixa | Placeholder de lista vazia; quase todo CSS |
| 🟠 Média | **Rating / Stars** | Médio | Média | **Ausente no Cirrus**; comum em Ant/MUI |
| 🟠 Média | **Badge dismissível / Tags** | Médio | Baixa | Cirrus tem `tags`; reaproveita `.badge` + `.btn-close` |
| 🟡 Baixa | **File Input Drag-and-Drop** | Médio | Média | Evolui o upload atual |
| 🟡 Baixa | **Hover Card** | Baixo | Média | Fica trivial depois do Popover (Etapa 4) |
| 🟡 Baixa | **Notification Center** | Baixo-médio | Média-alta | Compõe múltiplos Toasts + histórico |
| 🟣 Futuro | **Menu aninhado (nested)** | Baixo | Alta | Complexidade alta, uso de nicho |

---

## Roadmap por Etapas

> **Progresso:** Etapas 1–3 concluídas (Spinner/Progress, Carousel, Stepper).
> Próxima: Etapa 4.

| Etapa | Componentes | Status |
|---|---|---|
| **1** — Feedback & Loading | Spinner, Progress bar | ✅ Concluída |
| **2** — Carousel | Carousel (slide/fade, autoplay, swipe) | ✅ Concluída |
| **3** — Stepper | Stepper/Wizard (horizontal/vertical, validação) | ✅ Concluída |
| **4** — Overlays avançados | Offcanvas, Popover | 🔜 Planejada |
| **5** — Fechamento do Top-10 | Segmented Control, Skeletons, Timeline, Collapse standalone, Breadcrumb avançado | 🔜 Planejada |

Progress circular (ring) e os "gaps remanescentes" acima entram depois da Etapa 5.

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

Com as Etapas 1–3 concluídas, o Clarus CSS já cobre os três gaps de **maior
impacto** do estudo original (Carousel, Spinner, Stepper). As Etapas 4 e 5 fecham
os sete restantes (Offcanvas, Popover, Segmented Control, Skeletons, Timeline,
Collapse standalone, Breadcrumb avançado), atingindo **paridade completa com o
Top-10** frente aos frameworks líderes.

A comparação com o Cirrus UI reforça um diferencial do Clarus: mesmo entre
frameworks híbridos, componentes interativos ricos como **carousel, offcanvas,
popover, timeline e stepper permanecem raros** — e o Clarus os entrega com JS
nativo, API consistente (`data-clarus`, `getInstance()`, `.show()/.hide()/
.dispose()`, eventos DOM) e acessibilidade desde a v0.1.

Depois da Etapa 5, o foco passa aos **gaps remanescentes** priorizados acima,
começando por Input Group e Alert Dialog (alto impacto, baixa dificuldade).
