# Análise de Gaps — Clarus CSS vs 10 Frameworks Líderes

Comparação de funcionalidades do Clarus CSS (v0.2.0) contra Bootstrap, Tailwind, Foundation, Bulma, Material Design, Ant Design, Chakra UI, Material-UI, Vuetify e Semantic UI.

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

**Total: 17 componentes CSS + 7 componentes JS**

---

## Top 10 Implementações Recomendadas

### 1. **Carrossel / Slider (Carousel)**

**Status:** ✅ Implementado (Etapa 2 — `scss/components/_carousel.scss`, `js/carousel.js`)

**Uso:** Presente em 100% dos 10 frameworks analisados.

**Justificativa:** Componente crítico para hero sections, product galleries, testimonials. Bootstrap, Swiper (standalone), Splide são referências.

**Escopo sugerido:**
- Versão básica: indicadores (dots), navegação por setas (prev/next)
- Auto-play com intervalo configurável
- Transições (fade, slide)
- Touch/swipe support (mobile)
- Keyboard navigation (ArrowLeft/Right, Home/End)
- ARIA labels para acessibilidade
- Responsivo (slides visíveis por breakpoint)

**Estimativa:** 150-200 linhas SCSS + 250-300 linhas JS

**Exemplos:** Bootstrap Carousel, Chakra Slider, Material-UI Carousel

---

### 2. **Spinner / Progress Indicator**

**Status:** ✅ Implementado (Etapa 1 — `scss/components/_spinner.scss`)

**Uso:** Presente em 9/10 frameworks (padrão em Material Design, Chakra, Ant Design).

**Justificativa:** UX essencial para feedback de loading, progresso de operações.

**Escopo sugerido:**
- Spinner giratório (rotação contínua ou pulsante)
- Progress bar linear (% visível)
- Progress circular (donut/ring)
- Estados: loading, success, error
- Tamanhos: sm, md, lg
- Cores por estado

**Estimativa:** 80-120 linhas SCSS + 100 linhas JS (se com animação customizável)

**Exemplos:** Bootstrap Spinner, Material-UI CircularProgress, Chakra Spinner

---

### 3. **Popover**

**Status:** ❌ Não implementado

**Uso:** Em 8/10 frameworks. Diferente do tooltip por ter conteúdo rico e controle manual.

**Justificativa:** Suplementa Tooltip — permite conteúdo HTML, headers, footers, persist on click.

**Escopo sugerido:**
- Posicionamento automático (similar ao Tooltip)
- Disparador: click, hover, focus, manual
- Header + corpo + footer
- Fechar com Escape ou clique fora
- ARIA roles (dialog, popover)
- Dismissible

**Estimativa:** 100-150 linhas SCSS + 150-200 linhas JS

**Exemplos:** Bootstrap Popover, Chakra Popover, Semantic UI Popup

---

### 4. **Offcanvas / Side Drawer**

**Status:** ❌ Não implementado

**Uso:** Em 9/10 frameworks. Complemento do Modal para navegação side, filtros, menus responsivos.

**Justificativa:** UX padrão mobile-first para navigation, sidebars retráteis.

**Escopo sugerido:**
- Posição: left, right, top, bottom
- Backdrop (com/sem)
- Suporte a scroll body lock (similar ao Modal)
- Animação de deslize
- Teclado (Escape para fechar)
- Responsivo

**Estimativa:** 100-150 linhas SCSS + 150-200 linhas JS

**Exemplos:** Bootstrap Offcanvas, Material-UI Drawer, Chakra Drawer

---

### 5. **Breadcrumb avançado com collapse**

**Status:** ✅ Breadcrumb básico existe, mas sem features avançadas

**Justificativa:** O breadcrumb atual é estático. Versões modernas suportam collapse em mobile (show fewer levels), truncação de labels longos, versão compacta.

**Escopo sugerido:**
- Collapse automático em mobile (mostrar apenas primeiros + últimos)
- Truncação de labels com tooltip
- Versão "compacta" com dropdown para níveis intermediários
- Structured data (JSON-LD) opcional

**Estimativa:** 50-80 linhas SCSS + 80-120 linhas JS

**Exemplos:** Bootstrap breadcrumb avançado, Material-UI Breadcrumbs, Ant Design Breadcrumb

---

### 6. **Collapse / Disclosure (Componente independente de Accordion)**

**Status:** ⚠️ Existe em Accordion, mas não como componente standalone

**Justificativa:** Collapse é mais simples que Accordion — uma seção expansível. Presente em Foundation, Material Design, Chakra como componente independente. Útil para FAQs simplificadas, "Mais informações", etc.

**Escopo sugerido:**
- Uma seção expansível (não múltiplas como Accordion)
- Indicador de estado (chevron/seta)
- ARIA expanded
- Transição suave

**Estimativa:** 40-60 linhas SCSS + 80-120 linhas JS

**Exemplos:** Material-UI Collapse, Chakra Collapse, Semantic UI Accordion (single)

---

### 7. **Timeline (Componente de Sequência)**

**Status:** ❌ Não implementado

**Uso:** Em 7/10 frameworks, especialmente Ant Design, Material Design, Chakra.

**Justificativa:** Componente visual para históricos, processos, steps — comum em dashboards, documentação de releases, fluxos de aprovação.

**Escopo sugerido:**
- Vertical e horizontal
- Itens com ícone, label, conteúdo
- Estados: pending, active, completed, failed
- Cores por estado
- Tamanhos: sm, md, lg

**Estimativa:** 120-160 linhas SCSS + 50 linhas JS (principalmente visual)

**Exemplos:** Ant Design Timeline, Material Design Timeline (via Stepper), Chakra Timeline (community)

---

### 8. **Stepper / Wizard**

**Status:** ❌ Não implementado

**Uso:** Em 9/10 frameworks (padrão em fluxos multi-step).

**Justificativa:** Componente crítico para wizards, checkouts, onboarding em múltiplos passos.

**Escopo sugerido:**
- Steps horizontais e verticais
- Estados: inactive, active, completed, error
- Conector entre steps (linha/seta)
- Descrição e sub-label por step
- Navegação (next/prev)
- Validação por step

**Estimativa:** 150-200 linhas SCSS + 200-250 linhas JS

**Exemplos:** Material-UI Stepper, Chakra Stepper, Ant Design Steps

---

### 9. **Segmented Control / Button Group avançado**

**Status:** ⚠️ Parcialmente via Tabs, mas não como componente independente

**Justificativa:** Segmented control é comum em mobile (iOS) e em dashboards para filtros/views (grid/list view). Diferente de Tabs por ser mais compacto e orientado a ação instantânea.

**Escopo sugerido:**
- Grupo de botões com estado "selected"
- Full-width ou auto-width
- Icones + label
- Tamanhos: sm, md, lg
- Cores: neutral, primary, danger
- Versão "inclusive" (multi-select) vs "exclusive" (single)

**Estimativa:** 80-120 linhas SCSS + 80-120 linhas JS

**Exemplos:** Material Design Segmented Button, Chakra Button Group, iOS-style segments

---

### 10. **Skeletons / Placeholder Loaders**

**Status:** ❌ Não implementado

**Uso:** Em 8/10 frameworks (essencial para perceived performance).

**Justificativa:** UX best practice moderna — mostrar "ghost" do layout enquanto carrega, em vez de spinner vazio. Usado por Chakra, Material-UI, Ant Design.

**Escopo sugerido:**
- Skeleton base (retângulo cinza com animação pulse)
- Variantes: rect, circle, text (múltiplas linhas)
- Composição: card skeleton, list skeleton, table skeleton
- Animação customizável (fade, pulse, wave)
- Tema claro/escuro

**Estimativa:** 100-140 linhas SCSS + 50 linhas JS (principalmente CSS animation)

**Exemplos:** Material-UI Skeleton, Chakra Skeleton, Ant Design Skeleton

---

## Honoráveis Menções (Implementações Secundárias)

11. **Alert Dialog / Confirmação com Ações** — variante do Modal focada em confirmação
12. **Input Group** — prefix/suffix em inputs (ícone, moeda, botão ação)
13. **Rating / Stars** — componente de avaliação
14. **Badge com dismiss** — badges que podem ser removidas (tags)
15. **Hover Card / Detailed Tooltip** — tooltip rich com ações
16. **Menu (Nested)** — versão mais complexa de Dropdown com submenu nativo
17. **Divider / Separator** — componente de separação com label no meio
18. **Empty State** — placeholder para listas vazias com ilustração
19. **File Input Drag-and-Drop** — melhoria do upload atual com drag-drop
20. **Notification Center** — composição de múltiplos Toasts com histórico

---

## Priorização Recomendada (Por Impacto + Facilidade)

| Prioridade | Componente | Impacto | Dificuldade | Razão |
|---|---|---|---|---|
| 🔴 **Alta** | Carousel | Alto | Média | Crítico para hero/galleries, 100% dos frameworks |
| 🔴 **Alta** | Spinner | Alto | Baixa | Essencial UX, simples CSS |
| 🔴 **Alta** | Stepper | Alto | Alta | Wizard/checkout, complexo mas comum |
| 🟠 **Média** | Offcanvas | Médio | Média | Mobile-first, padrão moderno |
| 🟠 **Média** | Popover | Médio | Média | Estende Tooltip, suplementa Modal |
| 🟠 **Média** | Segmented Control | Médio | Baixa | Mobile/dashboard, simples |
| 🟡 **Baixa** | Collapse Standalone | Baixo | Baixa | Refinamento de Accordion |
| 🟡 **Baixa** | Timeline | Baixo | Baixa | Visual, pouco JS |
| 🟡 **Baixa** | Skeletons | Médio | Baixa | CSS puro, UX moderna |
| 🟣 **Futuro** | Menu Nested | Baixo | Alta | Complexidade alta, uso niche |

---

## Roadmap Sugerido para v0.3.x–v0.5.x

> **Progresso:** Etapa 1 (Spinner + Progress) e Etapa 2 (Carousel) concluídas.
> Próxima: Etapa 3 (Stepper).

### v0.3.0 — Componentes de Feedback & Loading
- ✅ Spinner
- Skeletons
- ✅ Progress bar/ring (barra linear; ring pendente)

### v0.4.0 — Navegação Avançada
- ✅ Carousel
- Offcanvas
- Collapse Standalone
- Timeline

### v0.5.0 — Componentes de Formulário & Dialog
- Stepper
- Popover
- Segmented Control
- Input Group (versão básica)

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
- Padrão: Muito opinativos em cores, animações, espaçamento

### Chakra UI
- Tem: Skeleton, Spinner, Progress, Drawer, Popover, Menu, Tabs, Modal
- Foco: Accessibility-first, simples de estender

### Ant Design
- Tem: Carousel, Progress, Spin (spinner), Timeline, Steps, Drawer, Popover, Empty, Skeleton
- Padrão: Enterprise-heavy, complexo

---

## Conclusão

O Clarus CSS cobriu bem os **componentes core** (v0.1–v0.2), focando em solidez de API JS e acessibilidade. Os **gaps mais críticos** para atingir paridade com frameworks líderes são:

1. **Carousel** (100% dos concorrentes)
2. **Spinner** (90%)
3. **Stepper** (90%)
4. **Offcanvas** (90%)
5. **Popover** (80%)

Recomenda-se focar em **v0.3–0.4** nesses 5 antes de explorar honoráveis menções, mantendo o padrão de API JS consistente (data-clarus, eventos customizados, getInstance, .show()/.hide()/.dispose()).
