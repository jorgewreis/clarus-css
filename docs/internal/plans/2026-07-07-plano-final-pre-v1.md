# Plano final pré-v1.0.0 — pendências e sugestões

> **Plano provisório.** Vive em `docs/internal/plans/` (gitignored) e deve ser
> removido após implementação. Deriva de `rascunho.txt`, do
> [plano mestre](2026-07-06-plano-mestre-clarus-v1.md) (Fases 0–3, já
> concluídas) e de uma auditoria do estado atual do repositório
> (2026-07-07) para decidir o que falta antes de cortar a v1.0.0.

## 1. Onde estamos (auditoria do plano mestre)

| Fase | Status | Evidência |
|---|---|---|
| Fase 0 — Refundação técnica (monorepo, `@layer`, rename `cl-`, tokens OKLCH, browserslist, governança) | ✅ Concluída | `packages/*`, `@layer reset, tokens, base, layout, components, utilities, overrides` em `_root.scss`, `.browserslistrc`, `CODE_OF_CONDUCT.md`, `.github/ISSUE_TEMPLATE/`, `docs/guides/migration-v1.md` + `scripts/migrate-v1.mjs` |
| Fase 1 — Componentes & refinamentos Cirrus | ✅ Concluída | `_check-radio-switch.scss`, `_tile.scss`, refinamentos em pagination/tabs/tag |
| Fase 2 — Documentação profissional | ✅ Concluída | `docs/` por categoria, `docs/internal/` gitignored |
| Fase 3 — Qualidade, A11y e performance como gate | ✅ Concluída (2026-07-07) | `test:a11y` (axe-core) + `size:check` + `contrast:check` no CI, `docs/reference/accessibility-matrix.md` |
| Fase 4 — Avançados & ecossistema | ⏳ Não iniciada, marcada como **"posterior"** no plano mestre | Nenhum vestígio de Combobox/Datepicker/DataTable, `@container`, `data-brand`, `clarus-icons`/`clarus-cli`, wrappers |

**Conclusão da auditoria:** as Fases 0–3 (a base técnica, os componentes
Cirrus, a documentação e os gates de qualidade) estão genuinamente completas
e validadas (lint + build + testes + a11y + budgets passando). O que resta
para a v1.0.0 não é "mais uma fase" do plano mestre — é decidir **quanto da
Fase 4** (hoje toda rotulada "posterior") precisa entrar antes do corte, e
fechar um conjunto de lacunas que o rascunho menciona mas o plano mestre
nunca atribuiu a nenhuma fase, mais alguns itens novos de benchmark que
faltam nos dois documentos originais.

## 2. Pendências reais do rascunho sem dono em nenhuma fase

O `rascunho.txt` (seção 6, "Layout avançado") pede **stack/cluster/sidebar
layouts utilitários** e **sticky areas/painéis** — nenhuma fase do plano
mestre menciona isso, e o repositório não tem nada (`grep` por
`stack`/`cluster`/`sticky` em `packages/*/scss` não retorna nada). Como é
puramente CSS (sem JS, sem componente novo, baixo risco de regressão
visual em componentes existentes), é candidato natural a entrar **antes**
da v1.0.0 — é exatamente o tipo de utilitário de layout que Tailwind/UIkit
usam para vender "produtividade" e hoje é uma lacuna real do Clarus.

## 3. Sugestões novas (benchmark de frameworks top-10 em 2026)

Itens que nem o rascunho nem o plano mestre cobrem, mas que aparecem como
padrão em projetos que o rascunho cita como referência (Tailwind, Bootstrap,
UIkit) ou que viraram expectativa mínima de confiança para bibliotecas OSS
publicadas em 2026:

- **Tipos TypeScript (`.d.ts`) para a API JS.** Hoje `Clarus`/`Modal.getInstance()`
  etc. não têm typings — qualquer consumidor TS perde autocomplete/checagem.
  Não precisa reescrever o JS em TS, só gerar/manter as declarações.
- **`npm publish --provenance`** (assinatura de proveniência via OIDC do
  GitHub Actions) — sinal de confiança de supply-chain que frameworks
  publicados após 2023 adotaram; custo baixo (flag no workflow de release).
- **`.github/FUNDING.yml` e Dependabot/Renovate** — ausentes hoje; baixo
  custo, aumenta credibilidade e mantém devDependencies atualizadas
  automaticamente (relevante pro budget/CI não quebrar por drift).
- **Utilitários de impressão (`@media print` / `.u-print-*`)** — Bootstrap
  tem desde a v4; não há nada equivalente no Clarus hoje.
- **Página "kitchen sink"** (todos os componentes numa página só, os dois
  temas) — acelera QA visual manual e é comum nos top frameworks como
  smoke test rápido; complementa (não substitui) os mockups individuais.

## 4. Decisões aprovadas (2026-07-07)

| # | Decisão | Escolha |
|---|---|---|
| 1 | Quanto da Fase 4 entra antes da v1.0.0 | **Tudo** — Combobox/Datepicker/DataTable/container queries/multi-brand/ecossistema entram nesta fase |
| 2 | Docs-app interativo | **Mantém a decisão original** — docs continuam em markdown, sem VitePress/Astro |
| 3 | Tipos TypeScript (`.d.ts`) | **Sim**, entram nesta fase |
| 4 | Governança/supply-chain novos (provenance, FUNDING.yml, Dependabot, print utilities, kitchen sink) | **Sim**, tudo entra |

Com "tudo" da Fase 4 dentro, este deixa de ser um plano pequeno — é
essencialmente a Fase 4 inteira do plano mestre, mais os itens novos das
seções 2–3, executados como a fase final antes do corte de v1.0.0.
**Ressalva de realismo**, sinalizada agora para não travar a execução mais
adiante: três itens do catálogo original (wrappers React/Vue/Svelte,
integração de tokens com Figma, "showcase de produção") descrevem
**ecossistema externo/comunidade** — não são código que se implementa e
valida sozinho num repo (wrappers precisam de consumidores reais pra fazer
sentido; Figma é uma integração com uma ferramenta de terceiros; showcase
de produção depende de casos de uso reais de terceiros usando o Clarus).
Proponho tratá-los como **scaffolding pronto para receber conteúdo**
(pacote `clarus-icons`/`clarus-cli` com API real e testado; estrutura de
wrapper mínima e testada para um framework por vez, React primeiro; guia de
tokens exportáveis para Figma via tokens JSON) em vez de fingir que
"showcase de produção" ou "casos de sucesso" podem ser produzidos sem
usuários reais. Sinalizo isso explicitamente abaixo em cada item.

## 5. Escopo aprovado, em ordem de execução (por prioridade)

A ordem importa: cada bloco é uma entrega verificável (build+lint+testes
verdes) antes de começar o próximo, para não acumular risco. A partir de
2026-07-07 o escopo passou a ser organizado nas prioridades P1–P4 definidas
pelo usuário (P1 é a nomenclatura que dou aqui ao que já estava aprovado na
seção 4 antes das prioridades existirem; P2–P4 vieram depois e têm o texto
literal do pedido preservado como referência).

### P1 — Fase 4 "núcleo" (já aprovado na seção 4, sem mudança)

#### 5.1 Layout avançado — ✅ concluída (2026-07-07)
- `.cl-stack`/`.cl-cluster`/`.cl-sidebar` (utilitários de layout, CSS puro)
  em `packages/clarus-core/scss/layout/`, com modificador de gap
  `.cl-{stack,cluster,sidebar}-gap-{0..5}`; Sidebar com
  `.cl-sidebar-width-{sm..xxxl}` e `.cl-sidebar-reverse`.
- Utilitários de posição sticky (`.u-sticky-top`, `.u-sticky-bottom`) com
  tokens de offset (`--cl-sticky-top`/`-bottom`), em
  `packages/clarus-utilities/scss/utilities/_position.scss`.
- Utilitários de `@container` (`--cl-cq-sm/md/lg` + classes
  `.u-cq`/`.u-cq-{sm,md,lg}-d-*`) — a base pedida no rascunho 15.2, em
  `_container-queries.scss`.
- Documentado em `docs/guides/layout-advanced.md`, com exemplo em
  `mockup/layout.html`. Suite completa verde (lint, build, unit, visual,
  a11y, contrast, size) — baseline visual win32 de `layout.html`
  regenerada (conteúdo novo mudou a altura da página).

#### 5.2 Theming multi-brand — ✅ concluída (2026-07-07)
- Suporte a `data-brand="x"` sobre a camada de tokens semânticos já
  existente (sem novo componente, só uma camada de override de tokens,
  igual ao que `_dark.scss` já faz para `data-theme`) — só a cor de ação
  primária muda por marca; `secondary`/`success`/`warning`/`danger`/`info`
  continuam universais. Combina corretamente com `data-theme="dark"`
  (seletor `[data-brand="x"][data-theme="dark"]`, maior especificidade,
  mesma técnica de mistura OKLCH do tema escuro padrão).
- Brand de exemplo `violet` em
  `packages/clarus-core/scss/themes/_brands.scss`, provando que a troca em
  runtime funciona sem recompilar CSS — documentado em
  `docs/guides/theming.md#multi-brand`, demo em `mockup/theming.html`, par
  de contraste auditado em `scripts/contrast-report.scss`/`npm run contrast`.
- **Limitação conhecida, documentada no guia**: `.cl-btn-primary`/
  `.cl-badge-primary` (preenchimento sólido) calculam a cor do texto via
  `color-contrast()` em tempo de **build**, a partir do primary padrão —
  não recalculam por marca. Brands com primitivo muito claro precisam
  sobrescrever `--cl-btn-color`/`--cl-badge-color` manualmente.
- Suite completa verde (lint, build, unit, visual — nova baseline de
  `theming.html` —, a11y, contrast, size).

#### 5.3 Combobox/Autocomplete — ✅ concluída (2026-07-07)
- `packages/clarus-js/js/combobox.js` reusa `js/core/positioning.js` +
  `.cl-dropdown-menu`/`.cl-dropdown-item` do Dropdown/Select; só
  `_combobox.scss` (wrapper + `max-height`/scroll) é CSS novo.
- Padrão WAI-ARIA Combobox (List Autocomplete): `role="combobox"` +
  `aria-autocomplete`/`aria-controls`/`aria-expanded` no input,
  `role="listbox"`/`role="option"`/`aria-selected` na lista,
  `aria-activedescendant` pro destaque (foco nunca sai do input — opções
  não são focáveis, ao contrário do Dropdown).
- Teclado completo: `ArrowUp`/`ArrowDown` (com wrap), `Home`/`End`,
  `Enter` seleciona, `Escape` fecha sem alterar o valor.
- Item opcional `data-cl-empty` pra mensagem de "sem resultados",
  visibilidade alternada automaticamente pelo filtro.
- DoD completo: 13 testes unitários, mockup (`mockup/combobox.html`,
  validado interativamente via script Playwright — filtro, navegação,
  seleção por teclado/clique, Escape, clique fora, todos corretos),
  a11y (axe) e visual regression verdes, documentado em
  `docs/components/combobox.md`. Budget de tamanho do JS: +0.87 KB gzip
  (11.19 → 12.06 KB de um teto de 14 KB).

#### 5.4 Datepicker/Timepicker — ✅ concluída (2026-07-07)
- CSS-only: `<input type="date">`/`"time"` herdam `.cl-form-control`;
  corrigido o indicador nativo (ícone) invisível no tema escuro
  (`filter: invert(1)` sob `[data-theme="dark"]`).
- Datepicker customizado (`packages/clarus-js/js/datepicker.js`): padrão
  WAI-ARIA Date Picker Dialog adaptado a popup não-modal, `role="combobox"`
  no input (obrigatório — `aria-expanded` não é permitido no role
  `textbox` implícito), `role="grid"`/`"row"`/`"gridcell"` na grade,
  roving `tabindex` real (dias focáveis, diferente do Combobox). Teclado
  completo (setas cruzam semana/mês, `Home`/`End`, `PageUp`/`PageDown`
  por mês, `Shift+PageUp`/`Down` por ano, `Enter`/`Space`/`Escape`).
- Dois bugs reais pegos e corrigidos durante o desenvolvimento: (1)
  `aria-expanded` reprovado pelo axe por causa do role errado — resolvido
  com `role="combobox"`; (2) setas do teclado sem efeito nenhum com foco
  no input (o keydown do grid só reagia com foco já num dia) — resolvido
  com handler dedicado no input que abre/move o foco pro grid em
  `ArrowDown`/`ArrowUp`, com guarda contra reabertura indevida ao
  devolver o foco após seleção/Escape.
- 17 testes unitários, mockup (`mockup/datepicker.html`, valida datepicker
  customizado + `date`/`time` nativos lado a lado), a11y e visual
  regression verdes. Documentado em `docs/components/datepicker.md`.
- ⚠️ **Budget de tamanho do JS ficou apertado**: 13.82 KB gzip de um teto
  de 14 KB (só ~180 bytes de folga). O teto foi calibrado antes da decisão
  de trazer a Fase 4 inteira pra esta fase final — DataTable (5.5) e
  Command palette/Tree view (5.6) quase certamente estourariam o budget
  atual. Precisa de decisão antes de 5.5: recalibrar o budget do JS pra
  cima (quanto?), ou considerar `dist/js` com entradas por componente
  (import só do que usa) em vez de um bundle único — ver seção 7.

#### 5.5 DataTable v1 — ✅ concluída (2026-07-07)

- `packages/clarus-js/js/datatable.js`: sort (ciclo asc → desc → nenhuma
  via `data-cl-sort` no `<th>`, `aria-sort`, padrão WAI-ARIA Table Sort),
  filtro por substring (`[data-cl-datatable-filter]`) e paginação
  client-side (`data-cl-page-size`), reusando `.cl-table`/`.cl-pagination`/
  `.cl-page-link` já shipados — só `_datatable.scss` (botão de ordenação +
  indicador ↕/↑/↓) é CSS novo.
- Estados vazio/carregando/erro reusam `.cl-empty-state`/`.cl-skeleton`
  (`setLoading()`/`setError()` públicos); roving `tabindex` nas células do
  corpo com navegação completa (setas, `Home`/`End`,
  `Ctrl+Home`/`Ctrl+End`).
- DoD completo: 18 testes unitários, mockup (`mockup/datatable.html`, dois
  temas + demonstração de loading/erro), a11y (axe) e visual regression
  verdes, documentado em `docs/components/datatable.md` (com
  `docs/components/table.md` atualizado pra referenciá-lo). Budget de
  tamanho do JS: 15.84 KB gzip de um teto de 24 KB (~8.16 KB de folga
  restante pra 5.6).

#### 5.6 Command Palette e Tree View — ✅ concluída (2026-07-07)

- `packages/clarus-js/js/command-palette.js`: diálogo de busca/comandos,
  disparado por botão (`data-cl="command-palette"`) ou atalho global
  opcional (`data-cl-shortcut="mod+k"`) — combina o overlay/focus trap do
  Modal (`js/core/focus.js#createFocusTrap`, `js/core/overlay.js#lockScroll`)
  com o filtro/navegação por teclado do Combobox; reusa
  `.cl-dropdown-item`/`.is-active`/`.is-disabled` pros itens da lista, só
  o backdrop/diálogo/campo de busca são CSS novo (`_command-palette.scss`).
- `packages/clarus-js/js/tree-view.js`: lista hierárquica seguindo o
  padrão [WAI-ARIA Tree View](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) —
  marcação `<ul>`/`<li>` nativa aninhada (só exige `<span class="cl-tree-label">`
  como filho direto de cada `<li>`), botão de expandir/colapsar
  auto-injetado (mesma técnica do botão de ordenação do DataTable), roving
  `tabindex` restrito aos nós visíveis, navegação completa por teclado
  (`ArrowRight`/`ArrowLeft` cruzam níveis do jeito certo — expande sem
  mover foco vs. move pro filho/pai —, `Home`/`End`, `Enter`/`Espaço`).
- DoD completo: 27 testes unitários somados, mockups
  (`mockup/command-palette.html`, `mockup/tree-view.html`, dois temas
  cada), a11y (axe) e visual regression verdes, documentados em
  `docs/components/command-palette.md` e `docs/components/tree-view.md`.
  Budget de tamanho do JS: 17.25 KB gzip de um teto de 24 KB (~6.75 KB de
  folga restante).

#### 5.8 DX e supply-chain (itens novos, podem correr em paralelo aos acima)
- `.d.ts` para a API JS pública (`Clarus`, `Modal`, `Dropdown`, `Select`,
  `Combobox`, `DataTable` etc. conforme forem entrando).
- `npm publish --provenance` no workflow de release (a criar).
- `.github/FUNDING.yml` + Dependabot (npm + GitHub Actions).
- Utilitários de impressão básicos (`.u-print-hide`, `.u-print-block`).
- Página "kitchen sink" em `mockup/`, atualizada conforme cada componente
  novo entra.

### P2 — Excelência de produto (texto literal do pedido, 2026-07-07)

> Componentes de dados avançados: DataTable completa
> (ordenação/filtro/paginação/estados/teclado). Matriz de compatibilidade
> explícita por feature moderna: `:has`, `@container`, `color-mix`, fallback
> documentado. Guia de migração formal: vindo de Bootstrap/Tailwind com
> equivalências de classes/componentes.

#### 5.5 DataTable v1 (substitui a versão anterior deste item — escopo ampliado)
- Sort + filter + paginação client-side sobre `<table>` semântica
  existente; reusa `_pagination.scss` e o design de Table já shipado.
- **Estados** (vazio/carregando/erro, reusando Empty State/Skeleton) e
  **teclado completo** (navegação por célula/linha, ordenação via
  `Enter`/`Space` no cabeçalho, `aria-sort`) — DoD completo, não um MVP.

#### 5.10 Matriz de compatibilidade por feature moderna — ✅ concluída (2026-07-07)

- `docs/reference/browser-support.md` ganhou uma tabela explícita por
  feature × navegador mínimo com suporte nativo × comportamento de
  fallback documentado: `@layer`, `color-mix()`/`oklch()`, `@container`,
  `:focus-visible`, `prefers-reduced-motion` — as features moderna
  *efetivamente usadas* no CSS/JS do framework hoje (auditado via grep no
  repo antes de escrever a tabela, não assumido).
- **Desvio da lista original do pedido**: `:has()` e `@custom-media` (dois
  dos quatro itens citados no pedido original) não são usados em nenhuma
  linha do framework — confirmado por busca no repo. Em vez de inventar
  uso ou omitir silenciosamente, a tabela ganhou uma seção própria
  ("Recursos considerados, mas não usados hoje") deixando isso explícito,
  com o compromisso de que qualquer uso futuro ganha uma linha na mesma
  tabela antes do merge.

#### 5.11 Guia de migração formal — de outro framework CSS → Clarus — ✅ concluída (2026-07-07)

- Novo `docs/guides/migration-external.md`, diferente do
  `docs/guides/migration-v1.md` existente (que documenta a migração
  *interna* do rename `cl-` da Fase 0): tabela de equivalência de
  utilitários (flex/grid/spacing/tipografia) e componentes
  (botão/card/alert/badge/table/modal/dropdown/form-control), seção "o
  que não migra 1:1" (API JS, escala de espaçamento, grid flexbox vs.
  CSS Grid, tema/dark mode, build) e checklist de migração em 5 passos.
- **Sem nomes de framework concorrente no texto** (regra já seguida em
  README/guias/CHANGELOG oficiais) — descreve os padrões genericamente
  ("framework baseado em classes utilitárias", "framework de componentes
  com prefixo `.btn`/`.card`") em vez de nomear Bootstrap/Tailwind, que só
  aparecem no título desta seção do plano interno (não no guia publicado).
- Ao escrever isso, notei que `docs/README.md` nunca ganhou entradas pro
  DataTable (5.5) nem pro Command Palette/Tree View (5.6) — corrigido
  junto (lacuna de documentação das duas sub-fases anteriores, não deste
  item).

### P3 — Liderança/ecossistema (texto literal do pedido, 2026-07-07)

> Plugins e extensões oficiais (charts wrappers, forms extras, presets de
> tema). Integrações opcionais (React/Vue/Svelte wrappers finos). Showcase
> de produção (casos reais com métricas).

#### 5.7 Ecossistema (escopo ampliado por P3 — ver ressalvas abaixo)
- `clarus-icons` — ✅ **concluído (2026-07-07)**: pacote de ícones SVG
  opcional, tree-shakeable, mesmo padrão de workspace dos demais
  `packages/*`. Decisão de escopo (conversa com o usuário): conjunto
  **Lucide** (ISC), não Flaticon/Streamline Ultimate (o usuário preferia
  esses dois esteticamente, mas ambos são licenciados/comerciais —
  redistribuir os SVGs crus num pacote npm público MIT violaria a licença
  deles; Lucide é feito justamente pra esse uso). Decisão de cobertura:
  conjunto **completo** (1994 ícones, não um subconjunto curado) — com
  módulo-por-ícone, o custo de ter "todos" é só espaço em disco no pacote
  publicado, não peso no bundle de quem consome (tree-shaking cuida do
  resto), e evita manutenção de decidir "esse ícone entra, esse não".
  Gerado em build-time por `scripts/build-icons.mjs` a partir do
  devDependency `lucide-static` — o pacote publicado (`packages/clarus-icons/`)
  não tem dependência de runtime nenhuma. Dois formatos (SVG puro +
  módulos ES), classe `.cl-icon` nova em `clarus-utilities` (sempre
  disponível, independe do pacote de ícones estar instalado), 5 testes
  unitários, mockup, doc (`docs/guides/icons.md`), a11y e visual
  regression verdes. Licenças de terceiro (`LICENSE-LUCIDE.txt`, ISC +
  atribuição ao projeto Feather/MIT) distribuídas junto do pacote.
- **Dogfooding pós-entrega (2026-07-07, a pedido do usuário)**: "se o
  projeto tem um pacote de ícones, pra que usar emojis?" — auditoria
  (`grep` por range Unicode de emoji) achou 📄🎨⚠️👤🔔🔍📭 usados como
  placeholder de ícone em mockups/docs (Empty State, Tile, Notification
  Center, DataTable); todos trocados por SVG do `clarus-icons`. Exceção
  deliberada: `★` do Rating não é placeholder, é o mecanismo visual do
  próprio widget — não mexi. Pedido evoluiu pra Pagination também
  (`«`/`»` → `chevron-left`/`chevron-right`, mais uma variação nova de
  reticências pra intervalo de páginas omitido, ícone `ellipsis`) e pro
  pager JS do DataTable (`‹`/`›` → mesmos chevrons, embutidos como string
  porque `clarus-js` não pode depender do pacote opcional em runtime).
  Isso expôs um bug real de layout: `.cl-btn`/`.cl-badge`/`.cl-alert` não
  tinham `gap` próprio — ícone+texto só "funcionava" por acidente via
  colapso de espaço em branco do HTML, ficando visualmente colado quando
  o espaço em branco não existia (ex.: `Notificações` sem espaço explícito
  antes do texto). Corrigido com `gap` real nos quatro componentes
  (`.cl-btn`, `.cl-badge`, `.cl-alert`, `.cl-breadcrumb-item a`), o que por
  sua vez exigiu remover o `margin-left` de `.cl-dropdown-toggle::after`
  (virou redundante — o `::after` conta como item flex do `.cl-btn` e já
  herda o `gap` novo, então o `margin-left` antigo dobraria o espaçamento).
  Build/lint/279 testes/a11y (38/38)/visual (90/90, só 2 baselines
  esperadas mudaram) verdes.
- `clarus-cli`: comandos `build`/`theme`/`analyze` já existentes hoje como
  scripts npm, empacotados como CLI instalável.
- **Presets de tema**: 2–3 arquivos de tokens prontos (ex.: "corporate",
  "vibrant") sobre a mesma camada de `data-brand` da P1/5.2 — isso é
  puramente CSS/tokens, sem dependência externa, plenamente entregável.
- **Wrapper React** (decidido em 2026-07-07) — só React nesta fase.
  Componente-fino que aplica `data-cl`/classes e delega pro JS vanilla
  existente. Vue/Svelte ficam de fora: sem nenhum consumidor real ainda
  validando o padrão, manter 3 pacotes/3 suítes de teste triplicaria a
  superfície de manutenção sem necessidade comprovada. O wrapper React
  serve de molde — depois que houver uso real (issues, feedback de quem
  consome via React), replicar pra Vue/Svelte fica rápido e já testado em
  produção.
- **Charts: tokens/tema agnóstico** (decidido em 2026-07-07) — em vez de
  wrapper de uma lib específica, entrega um guia (`docs/guides/charts.md`
  ou seção em `theming.md`) + tokens CSS dedicados (cores de série,
  grid/eixos, tooltip) que qualquer lib de gráfico (Chart.js, ECharts,
  Recharts etc.) pode consumir. Zero dependência nova — mantém a proposta
  de valor de zero dependências em runtime — e zero manutenção atrelada à
  API de uma lib de terceiro que muda com o tempo.
- **Forms extras** (decidido em 2026-07-07): **Range/Slider** (`<input
  type="range">` estilizado, com marcações/valor visível, tokens de
  trilha/thumb) e **Upload avançado** (evolução do `file-upload` atual:
  múltiplos arquivos, preview por arquivo — nome/tamanho/thumbnail de
  imagem —, progresso individual e remoção por item; o `file-upload`
  existente vira a variante "simples", este é a variante "avançada" do
  mesmo componente). DoD completo (estados, teclado, ARIA, tokens, testes)
  como os demais.
- **"Showcase de produção"** (decidido em 2026-07-07): **placeholder
  estrutural** por enquanto. Página `docs/showcase.md` (ou seção em
  `docs/README.md`) com layout/estrutura prontos e um aviso "em
  construção — em breve" no lugar de casos fictícios ou métricas
  inventadas. Fica pronta pra receber conteúdo assim que houver um projeto
  real usando o Clarus pra citar.

### P4 — Impacto de mercado imediato (texto literal do pedido, 2026-07-07)

> Docs como aplicação pública (não só docs em markdown): playground
> interativo, copy 1-click, exemplos vivos por componente. Pacotes de
> adoção rápida: templates oficiais (dashboard, auth, landing, admin).
> Página comparativa oficial: "Clarus vs Bootstrap/Tailwind" com
> benchmarks e trade-offs.

#### 5.12 Docs como aplicação pública — **adiado para depois do v1.0.0** (decidido em 2026-07-07)
- Mantida a decisão original (seção 4, item 2): docs seguem em markdown
  para o corte da v1.0.0. Um docs-app interativo (VitePress/Astro,
  playground, copy 1-click) vira um projeto próprio bem definido depois do
  v1.0, com o núcleo já estável, em vez de inflar esta fase final por
  semanas. Fora de escopo deste plano — ver "Fora de escopo" abaixo.

#### 5.13 Templates oficiais de adoção rápida (novo)
- 4 templates prontos (dashboard, auth, landing, admin) em
  `mockup/templates/` (ou pasta própria) — HTML completo, com o CSS/JS já
  publicado, prontos pra copiar. Escopo contido e claramente executável
  sem depender de decisão pendente.

#### 5.14 Página comparativa "Clarus vs Bootstrap/Tailwind" (decidido em 2026-07-07)
- Tabela de trade-offs (filosofia, tamanho de bundle, dependências, dark
  mode nativo, etc.) com dados públicos reais e verificáveis (tamanho gzip
  publicado de cada framework, por exemplo) — sem benchmarks de
  performance ao vivo nesta fase, marcados explicitamente na própria
  página como "pendente de metodologia" em vez de omitidos silenciosamente
  (evita publicar números não controláveis/desatualizados sobre projetos
  de terceiros, mas deixa claro que não é esquecimento).

### 5.9 Corte da v1.0.0 (último passo, só depois de tudo acima verde)
- Bump de versão (`1.0.0`), consolidar `CHANGELOG.md` (`[Unreleased]` →
  `## [1.0.0]`), checklist de release do `CONTRIBUTING.md`, tag e
  publicação com `--provenance`.

### Fora de escopo mesmo com "tudo" aprovado
- RFC process público / SLA de triagem comunitária (rascunho item 227) —
  baixo valor pra projeto de mantenedor único hoje; sugiro adiar
  indefinidamente em vez de agendar.
- Docs-app interativo (VitePress/Astro, playground, copy 1-click) —
  decisão confirmada em 2026-07-07 (ver 5.12): adiado para depois do
  v1.0.0.

## 6. Verificação (ao final de cada sub-fase e no total)

1. `npm run build && npm run lint && npm test` verdes.
2. `npm run test:visual` e `npm run test:a11y` verdes (novos utilitários de
   layout não devem tocar componentes existentes — sem diffs visuais
   esperados fora dos novos mockups).
3. `npm run contrast:check` e `npm run size:check` verdes (utilitários CSS
   puro têm impacto de bundle desprezível frente aos budgets já com folga).
4. `tsc --noEmit` (ou equivalente) validando os novos `.d.ts` contra um
   exemplo de uso.
5. `npm pack --dry-run` conferindo que `files`/`exports` do `package.json`
   publicam exatamente o esperado para a v1.0.0 (sem `docs/internal`, sem
   artefatos de teste).

## 7. Pontos que precisavam de aprovação (todos resolvidos em 2026-07-07)

Os itens P3/P4 trouxeram conflitos com decisões já tomadas e itens sem
escopo fechado. Todos foram resolvidos um de cada vez (perguntas
estruturadas, plano atualizado a cada resposta):

1. ~~**Wrappers**: só React ou React+Vue+Svelte?~~ ✅ Resolvido
   (2026-07-07): **só React** nesta fase — ver 5.7.
2. ~~**Charts wrappers**: qual lib (ou agnóstico/tokens só)?~~ ✅ Resolvido
   (2026-07-07): **agnóstico**, só tokens/tema — ver 5.7.
   ~~**Forms extras**: o que conta como extra?~~ ✅ Resolvido (2026-07-07):
   **Range/Slider + Upload avançado** — ver 5.7.
3. ~~**Showcase de produção**: projeto real ou placeholder?~~ ✅ Resolvido
   (2026-07-07): **placeholder estrutural** "em construção" — ver 5.7.
4. ~~**Docs-app (P4)**: reabrir agora ou adiar?~~ ✅ Resolvido
   (2026-07-07): **adiado para depois do v1.0.0** — ver 5.12 e "Fora de
   escopo".
5. ~~**Benchmarks de performance na página comparativa**: estrutural/bundle
   agora, ou performance ao vivo já?~~ ✅ Resolvido (2026-07-07): **só
   estrutural/de bundle** por agora, performance ao vivo marcada como
   pendente de metodologia — ver 5.14.
6. ~~**Budget de tamanho do JS**: recalibrar pra cima, mudar arquitetura de
   distribuição, ou manter rígido?~~ ✅ Resolvido (2026-07-07): **recalibrado
   pra 24 KB gzip** (opção a) — `scripts/size.mjs`, budget dobrado. Deixa
   folga real pra DataTable (5.5) e Command palette/Tree view (5.6) sem
   mudar a arquitetura de distribuição (bundle único `clarus.min.js`).

Com isso, o escopo e os budgets do plano estão totalmente fechados —
pronto para eu continuar a implementação pela sub-fase 5.5 (DataTable)
assim que você der o sinal verde.
