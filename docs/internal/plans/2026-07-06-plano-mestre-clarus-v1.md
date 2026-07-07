# Plano Mestre de Evolução — Clarus CSS → v1.0.0 ("top-10")

> **Plano provisório.** Vive em `docs/internal/plans/` (gitignored) e deve ser
> removido após implementação. Baseado em `rascunho.txt`, no benchmark do Cirrus
> UI e em 20 decisões confirmadas com o usuário.

## Context (por que este plano existe)

O `rascunho.txt` define a ambição de levar o Clarus CSS ao nível dos 10 melhores
frameworks CSS: arquitetura híbrida moderna, theming enterprise, acessibilidade
por padrão, performance com budget, docs de excelência e governança sólida. O
usuário decidiu adotar a visão de forma agressiva (rename global, `@layer`,
monorepo, tokens OKLCH), somada a um benchmark do Cirrus (pagination, tabs, tags,
tiles, checkbox, toggle, tipografia) e a preferências de design próprias
(anti-circular, cantos 4–6px; fontes menores). Também pediu refatoração
profissional da documentação e uma pasta de planos provisórios.

O resultado é uma **major (v1.0.0)**: uma refundação técnica com rebranding de
API (prefixo `cl-`), acompanhada de guia de migração, entregando em seguida os
componentes/refinamentos e a nova documentação.

## Decisões confirmadas (resumo)

| # | Tema | Decisão |
|---|---|---|
| 1 | Abrangência | Plano-mestre faseado, near-term detalhado |
| 2 | Nomenclatura | Rename total para `cl-` agora |
| 3 | Alcance do rename | Classes `.cl-*`, util `.u-*`, estados `.is-*`, tokens `--cl-*`, markup `data-cl`, eventos `cl:*`; **mantém** global `Clarus` e pacote `clarus-css` |
| 4 | `@layer` | Adoção completa: `reset, tokens, base, layout, components, utilities, overrides` |
| 5 | Monorepo | Migrar agora (npm workspaces) |
| 6 | Tokens/cor | 3 camadas (primitivo→semântico→componente) + OKLCH mantendo matizes atuais + validação de contraste |
| 7 | Formato | Tokens de raio 4/6px; quadrado/arredondado em tudo; exceções: spinner e radio (redondos) |
| 8 | Tipografia | Nova escala modular compacta (~13px corpo) com piso de legibilidade (~11px) |
| 9 | Form controls | checkbox + radio + switch CSS-only, estados + tamanhos; switch com knob retangular |
| 10 | Tiles | Criar `.tile` CSS-only com variantes de ação |
| 11 | Refinamentos Cirrus | Pacote dos três: pagination + tabs + tags |
| 12 | Docs | Só refatorar markdown (sem docs-app) |
| 13 | Estrutura docs | Por categoria, 1 arquivo por componente, kebab-case, template padrão |
| 14 | Docs internos | Só `guia-comandos.md` + `gap-analysis-componentes.md` em `docs/internal/` (gitignored); `definitions`/`scss-architecture` → `docs/reference/` |
| 15 | Planos | `docs/internal/plans/` |
| 16 | Browsers | Moderno com fallback progressivo (Baseline recente, Safari 16.4+) |
| 17 | A11y/testes | Gate axe no CI (via Playwright) + matriz de a11y nas docs |
| 18 | Budgets | Medir baseline + budgets como blocker no CI + relatório por release |
| 19 | Governança | Cortar v1.0.0 + guia de migração + semver/deprecação + templates + CoC |
| 20 | Avançados | Ordem do rascunho: Combobox → Datepicker → DataTable |

## Convenções congeladas (aplicam a todo o código novo/migrado)

- **Classes de componente:** `.cl-btn`, `.cl-card`, `.cl-modal`, `.cl-tile`…
- **Utilitários:** `.u-mt-4`, `.u-flex`, `.u-text-muted` (helpers/utilities).
- **Estados:** `.is-active`, `.is-disabled`, `.is-loading`, `.is-open`.
- **Tokens CSS:** `--cl-*` em 3 camadas — primitivo (`--cl-color-blue-500`,
  `--cl-space-4`, `--cl-radius-md`), semântico (`--cl-color-bg-surface`,
  `--cl-color-text-primary`, `--cl-color-border-default`), de componente
  (`--cl-btn-bg`, `--cl-switch-knob`).
- **Markup:** `data-cl="modal"` (auto-init), `data-cl-target`, `data-cl-dismiss`.
- **Eventos:** `cl:<componente>:<ação>` (ex.: `cl:modal:shown`).
- **JS:** global `Clarus` e pacote npm `clarus-css` **inalterados**.
- **Raio:** `--cl-radius-sm: 4px`, `--cl-radius-md: 6px`, `--cl-radius-lg: 8px`;
  circular só em spinner e radio.
- **Arquivos de docs:** kebab-case, minúsculo, sem número no nome; ordem via
  índice/frontmatter. SCSS parciais seguem `_kebab-case.scss` (já é o padrão).

---

## Fase 0 — Refundação técnica (v1.0.0) — *near-term, detalhada*

Objetivo: base moderna e estável para escalar sem retrabalho. É a fase que
"toca tudo" — feita como uma migração concentrada, com testes/baselines
atualizados ao final.

### 0.1 Monorepo (npm workspaces)
Reestruturar para:
```
packages/
  clarus-core/        # reset, base, tipografia, grid, tokens (scss/base, layout, settings, tokens)
  clarus-utilities/   # scss/utilities → helpers.css
  clarus-components/  # scss/components → components.css
  clarus-js/          # js/ (ESM, tree-shakeable)
  clarus-fonts/       # @font-face opt-in (scss/base/_fonts.scss atual)
docs/                 # markdown (não publicado como pacote)
scripts/ tests/       # compartilhados
```
- `package.json` raiz com `workspaces`; cada pacote com seu `exports`/`build`.
- Adaptar `scripts/build.mjs` para iterar pacotes; manter as distribuições
  atuais (`core`, `components`, `utilities`, `fonts`, `full`, `js`).
- Distribuição agregada `clarus-css` (full) segue como pacote principal público.
- Reusar toda a lógica de build já existente (sass + postcss + esbuild).

### 0.2 `@layer` completo
- Declarar uma vez, em `clarus-core`: `@layer reset, tokens, base, layout,
  components, utilities, overrides;`.
- Envolver cada parcial na sua camada (reset→`@layer reset`, `_root.scss`/tokens
  →`tokens`, base→`base`, grid/containers→`layout`, `scss/components/*`
  →`components`, `scss/utilities/*`→`utilities`).
- Fallback progressivo documentado (browsers-alvo suportam `@layer`).

### 0.3 Rename `cl-` (padrão, mecânico — descrito uma vez)
Aplicar em **todos** os arquivos, por categoria de substituição:
- **SCSS** (`packages/*/scss/**`, `scss/**`): classes `.x`→`.cl-x`; utilitários
  →`.u-*`; estados ad-hoc→`.is-*`; variáveis CSS `--clarus-*`→`--cl-*`.
- **JS** (`js/*.js`, com destaque para `js/core/register.js` — o `autoInit`):
  atributo de init `data-clarus`→`data-cl`; `data-target`/`data-dismiss`
  →`data-cl-target`/`data-cl-dismiss`; eventos `clarus:*`→`cl:*`; seletores de
  classe internos.
- **Markup/exemplos**: `mockup/*.html` (27), `guide.md`, `README.md`.
- **Testes**: `tests/unit/*` e `tests/visual/*` (+ regenerar baselines).
- **Não mudar**: global `Clarus`, nome do pacote `clarus-css`.
- Produzir um **mapa de migração** (tabela nome-antigo → `cl-`) e um
  **codemod** (script de regex/AST) reutilizável, base do guia de migração.

### 0.4 Tokens em 3 camadas + OKLCH
- `packages/clarus-core/scss/settings/_colors.scss`: primitivos gerados em OKLCH
  (com fallback hex/HSL) **calibrados para reproduzir os matizes atuais** —
  identidade visual inalterada.
- Novo `_tokens-semantic.scss` (bg-surface/text-primary/border-default…) e
  ganchos de token por componente (`--cl-btn-bg` etc.), emitidos em
  `scss/tokens/_root.scss` (camada `tokens`).
- Função de validação de contraste no build (reusar/estender
  `color-contrast()` de `scss/tools/_mixins.scss`); relatório AA/AAA.

### 0.5 Formato (anti-circular) e tipografia compacta
- Tokens de raio 4/6/8px; revisar componentes que usam `--cl-radius-*` para não
  ficarem pílula/redondos (badge, tag, avatar, switch, pagination). Exceções:
  spinner, radio.
- Nova escala de `font-size` (`--cl-font-size-*`): corpo ~13px, piso ~11px só
  para meta/label; recalibrar headings; expandir utilitários `.u-fs-*`/`.u-fw-*`.

### 0.6 Baseline técnico e governança
- `.browserslistrc`: alvo moderno com fallback progressivo; página
  `docs/reference/browser-support.md`.
- Medir tamanho baseline das distribuições (script de size gzip) e registrar.
- Semver estrito; `CODE_OF_CONDUCT.md`; `.github/ISSUE_TEMPLATE/` + template de
  PR com checklist técnico; política de depreciação (2 versões) em `CONTRIBUTING.md`.
- **Guia de migração** `docs/guides/migration-v1.md` (mapa + codemod) — corte v1.0.0.

**Saída da fase:** framework renomeado, em `@layer`, com tokens semânticos/OKLCH,
monorepo e governança — base estável.

---

## Fase 1 — Componentes & refinamentos (Cirrus + preferências) — *near-term, detalhada*

Construídos já na convenção nova. Cada componente segue o DoD do rascunho
(estados, teclado, ARIA, tokens, testes, nota de bundle).

- **Form controls** (`packages/clarus-components/scss/forms/_check-radio-switch.scss`
  + JS mínimo se necessário): checkbox/radio/switch 100% CSS reusando a técnica
  input-nativo + label-irmão do Segmented Control (`_segmented-control.scss`) e
  do Rating (`_rating.scss`). Estados checked/disabled/indeterminate/focus,
  cores de estado, tamanhos sm/md/lg. **Switch com knob retangular arredondado**.
- **Tiles** (`_tile.scss`): `.cl-tile` > `.cl-tile-icon` / `.cl-tile-body`
  (`-title`/`-subtitle`) / `.cl-tile-actions` (embaixo ou à direita). Reusa
  avatar/botões; sinergia com Notification Center e Empty State.
- **Refinamentos Cirrus** (`_pagination.scss`, `_tabs.scss`, `_tag.scss`/`_badges.scss`):
  - Pagination: variante `.cl-pagination-bordered`, compacta, prev/next descritivo.
  - Tabs: estilos (linha/pill/depth), alinhamento (center/right/fill), tamanhos.
  - Tags: escala `.cl-tag-xs…-xl`, agrupamento, dismiss aprimorado (já quadradas).
- **Auditoria ARIA/teclado** por componente durante o rename (arquivos abertos).

---

## Fase 2 — Documentação profissional (markdown)

Estrutura por categoria (kebab-case), quebrando `guide.md` (76KB) em um arquivo
por componente, com o template padrão do rascunho (Visão geral → Anatomia →
Variações → Estados → A11y → API JS → Tokens → Exemplo).
```
docs/
  README.md                    # índice
  getting-started/ (installation.md, usage.md)
  guides/          (theming.md, dark-mode.md, accessibility.md, migration-v1.md)
  components/      (button.md, card.md, modal.md, tabs.md, tile.md, switch.md, …)
  reference/       (design-tokens.md, scss-architecture.md, browser-support.md)
  contributing/    (contributing.md)
  internal/        # .gitignore — só local
    guia-comandos.md
    gap-analysis-componentes.md
    plans/         # planos provisórios (este arquivo está aqui)
```
- `.gitignore`: adicionar `docs/internal/`; `git rm --cached` nos dois arquivos
  internos (preserva no disco). `definitions.md`/`scss-architecture.md` →
  `docs/reference/`.
- Atualizar `package.json > files` para publicar a nova `docs/` pública.

---

## Fase 3 — Qualidade, A11y e performance como gate — ✅ concluída (2026-07-07)

- **axe-core** sobre os mockups via Playwright (reusa a infra visual existente)
  como gate no CI (`.github/workflows/ci.yml`). Rodar isolado: `npm run test:a11y`
  (`tests/a11y/axe.spec.mjs`). Descobriu e corrigiu violações reais de
  contraste (texto de token cru sobre fundo — link/nav ativo, botão
  `outline-*`, feedback de formulário, step/timeline de erro — agora usam
  `--cl-alert-{nome}-text`) e de nome acessível ausente em
  `role="progressbar"` (`aria-label` nos mockups + guia atualizado).
- **Matriz de a11y** por componente em
  [`docs/reference/accessibility-matrix.md`](../../reference/accessibility-matrix.md)
  (teclado/ARIA/foco/contraste, com link pra seção "A11y" de cada componente).
- **Budgets** como blocker no CI (`npm run size:check`, metas do rascunho
  calibradas ao baseline medido em 0.6: layout/core 12 KB, components 18 KB,
  full 32 KB, JS 14 KB gzip — todos com folga hoje) + relatório de tamanho
  gzip desta release no CHANGELOG. `npm run contrast:check` também virou
  gate (mesma auditoria de `npm run contrast`, falhando abaixo de AA).
- Vitest (unit) e Playwright (regressão visual) mantidos; baselines locais
  (win32) já batem após as correções de cor — sem diffs visuais
  perceptíveis dentro da tolerância (`maxDiffPixelRatio: 0.02`). Baselines
  Linux do CI devem ser regeneradas no próximo merge via
  `update-visual-baselines.yml` caso o job de visual falhe por divergência
  de renderização entre plataformas.

---

## Fase 4 — Avançados & ecossistema (posterior)

- Componentes na ordem do rascunho: **Combobox/Autocomplete** (reusa
  `js/core/positioning.js` + Dropdown/Select) → **Datepicker/Timepicker** →
  **DataTable v1** (sort/filter/paginação). Depois: Command palette, Tree view.
- Utilitários de container query (`@container`, tokens `--cl-cq-*`).
- Theming multi-brand (`data-brand` + tokens semânticos).
- Ecossistema: `clarus-icons`, `clarus-cli`, wrappers React/Vue/Svelte,
  integração de tokens com Figma, showcase/templates.

---

## Verificação (end-to-end por fase)

1. `npm run build` (monorepo) gera todas as distribuições sem erro.
2. `npm run lint` (stylelint) limpo, inclusive com `@layer`/OKLCH.
3. `npm test` (Vitest) verde — testes migrados para `cl-`/`data-cl`/`cl:*`.
4. `npm run test:visual` — baselines regeneradas (win32 local; linux via CI/Docker).
5. Gate **axe** verde nos mockups; **budgets** dentro do teto no CI.
6. Smoke manual dos mockups (claro/escuro): rename aplicado, formas 4–6px,
   tipografia compacta, novos componentes (switch/checkbox/radio, tile,
   pagination/tabs/tags refinados) funcionais e acessíveis por teclado.
7. Guia de migração + codemod validados convertendo um exemplo real.

## Riscos & mitigações

- **Rename é breaking amplo** → corte v1.0.0 + guia de migração + codemod;
  comunicar no CHANGELOG/README.
- **OKLCH pode deslocar cores** → calibrar para os matizes atuais + snapshots
  visuais + validação de contraste.
- **Monorepo adiciona infra** → manter as mesmas saídas de `dist`; migrar build
  incrementalmente reusando `scripts/build.mjs`.
- **Escopo grande** → escopo congelado por fase; Fase 0/1 detalhadas, 3/4 como marcos.
- **Baselines visuais** → regenerar ao fim de cada fase que muda pixels.

## Primeiro passo de execução (pós-aprovação)

Adicionar `docs/internal/` ao `.gitignore`; então iniciar a Fase 0 por 0.1
(monorepo) + 0.3 (rename mecânico com codemod), que destravam o resto.
