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

## 5. Escopo aprovado, em ordem de execução

A ordem importa: cada bloco é uma entrega verificável (build+lint+testes
verdes) antes de começar o próximo, para não acumular risco. Vou tratar
isso como sub-fases numeradas (4.1 a 4.7) dentro desta fase final.

### 5.1 Layout avançado (rascunho, sem dono — baixo risco, primeiro)
- `.cl-stack`/`.cl-cluster`/`.cl-sidebar` (utilitários de layout, CSS puro).
- Utilitários de posição sticky (`.u-sticky-top`, `.u-sticky-bottom`) com
  tokens de offset.
- Utilitários de `@container` (`--cl-cq-sm/md/lg` + classes de breakpoint
  de container) — a base pedida no rascunho 15.2.

### 5.2 Theming multi-brand
- Suporte a `data-brand="x|y|z"` sobre a camada de tokens semânticos já
  existente (sem novo componente, só uma camada de override de tokens,
  igual ao que `_dark.scss` já faz para `data-theme`).
- Um brand de exemplo (além do padrão) documentado em `docs/guides/theming.md`
  para provar que a troca em runtime funciona sem recompilar CSS.

### 5.3 Combobox/Autocomplete
- Reusa `js/core/positioning.js` + a base de Dropdown/Select já existentes.
- DoD completo (estados, teclado, ARIA `combobox`/`listbox`, tokens, testes
  unit + visual + a11y).

### 5.4 Datepicker/Timepicker
- CSS-only quando possível (`<input type="date">`/`time` estilizado) com
  variante JS opcional para um calendar picker customizado, seguindo o
  mesmo padrão de auto-init (`data-cl="datepicker"`) dos demais componentes.

### 5.5 DataTable v1
- Sort + filter + paginação client-side sobre `<table>` semântica
  existente; reusa `_pagination.scss` e o design de Table já shipado.

### 5.6 Depois do DataTable (rascunho: "depois")
- Command palette, Tree view — mesmo DoD dos demais componentes.

### 5.7 Ecossistema (com a ressalva da seção 4)
- `clarus-icons`: pacote de ícones SVG opcional, tree-shakeable, mesmo
  padrão de workspace dos demais `packages/*`.
- `clarus-cli`: comandos `build`/`theme`/`analyze` já existentes hoje como
  scripts npm, empacotados como CLI instalável.
- Wrapper mínimo para **um** framework (React) — componente-fino que só
  aplica `data-cl`/classes e delega pro JS vanilla existente; Vue/Svelte
  ficam de fora desta fase (mesmo princípio, replicável depois, mas
  triplica a superfície de manutenção sem usuário validando ainda).
- Tokens exportados em JSON (formato compatível com Figma Tokens/Style
  Dictionary) — a "integração com Figma" possível de entregar sem depender
  de conta/plugin de terceiros.
- "Showcase de produção" fica **fora** desta fase — não posso gerar casos
  de uso reais de terceiros; substituo por manter a página "kitchen sink"
  (item novo, seção 3) como demo interna.

### 5.8 DX e supply-chain (itens novos, podem correr em paralelo aos acima)
- `.d.ts` para a API JS pública (`Clarus`, `Modal`, `Dropdown`, `Select`,
  `Combobox`, `DataTable` etc. conforme forem entrando).
- `npm publish --provenance` no workflow de release (a criar).
- `.github/FUNDING.yml` + Dependabot (npm + GitHub Actions).
- Utilitários de impressão básicos (`.u-print-hide`, `.u-print-block`).
- Página "kitchen sink" em `mockup/`, atualizada conforme cada componente
  novo entra.

### 5.9 Corte da v1.0.0 (último passo, só depois de 5.1–5.8 verdes)
- Bump de versão (`1.0.0`), consolidar `CHANGELOG.md` (`[Unreleased]` →
  `## [1.0.0]`), checklist de release do `CONTRIBUTING.md`, tag e
  publicação com `--provenance`.

### Fora de escopo mesmo com "tudo" aprovado
- Docs-app interativo — decisão mantida (seção 4, item 2).
- RFC process público / SLA de triagem comunitária (rascunho item 227) —
  baixo valor pra projeto de mantenedor único hoje; sugiro adiar
  indefinidamente em vez de agendar.
- Vue/Svelte wrappers, showcase de produção real — ver ressalva da seção 4.

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
