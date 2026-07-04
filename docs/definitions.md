# Clarus CSS — Definições Iniciais do Projeto

## 1. Visão Geral

Clarus CSS é um framework CSS open source, de uso recorrente nos projetos pessoais e profissionais do autor, com distribuição pública como produto para qualquer desenvolvedor que precise construir interfaces web com HTML, CSS e JavaScript de forma direta, consistente e reutilizável.

O projeto será publicado no GitHub sob o repositório `clarus-css` e terá distribuição oficial via npm desde o início. A licença adotada é MIT, mantendo o framework permissivo, simples de reutilizar e adequado para uso pessoal, comercial e comunitário.

## 2. Objetivo Estratégico

O objetivo do Clarus CSS é oferecer uma base visual moderna, minimalista e produtiva para criação de páginas, sistemas e componentes de interface sem exigir dependências externas ou integração obrigatória com frameworks JavaScript.

O projeto deve equilibrar três finalidades:

- Servir como biblioteca padrão para projetos recorrentes do autor.
- Funcionar como produto público open source, consultável e reutilizável por terceiros.
- Demonstrar maturidade técnica, organização de engenharia e clareza de documentação.

## 3. Público-Alvo

O público-alvo principal inclui o próprio autor e qualquer tipo de desenvolvedor que queira usar classes prontas, componentes visuais consistentes e padrões de layout próximos à experiência oferecida pelo Bootstrap.

O framework deve ser acessível para desenvolvedores iniciantes, mas suficientemente organizado para ser adotado por profissionais experientes em projetos reais.

## 4. Posicionamento do Produto

O Clarus CSS será mais próximo do Bootstrap do que de frameworks puramente utilitários como Tailwind CSS. A proposta é entregar componentes prontos, classes auxiliares e uma estrutura previsível para acelerar a construção de interfaces.

A identidade visual deve seguir uma linha minimalista e moderna, com foco em clareza, legibilidade, baixo ruído visual e adaptação a diferentes tipos de aplicação.

## 5. Filosofia de Design

A filosofia oficial do projeto é híbrida.

Isso significa que o framework deve combinar:

- Componentes prontos para uso, como botões, formulários, cards, menus, modais, alertas, tabelas e navegação.
- Classes utilitárias para espaçamento, alinhamento, display, visibilidade, grid, tipografia, cores e estados visuais.
- Padrões consistentes de nomenclatura para reduzir colisões, facilitar leitura do HTML e manter previsibilidade entre componentes.

Essa decisão é firme e deve orientar toda a arquitetura do projeto.

## 6. Stack Tecnológica

O projeto deve priorizar HTML, CSS e JavaScript nativo.

A stack definida é:

- CSS como base do framework.
- SCSS/Sass para organização modular, variáveis, mixins e funções.
- CSS Custom Properties para permitir customização em tempo de uso sem recompilação obrigatória.
- PostCSS para pós-processamento e compatibilidade entre navegadores.
- JavaScript nativo para componentes interativos.
- Empacotamento leve para distribuição em formatos compatíveis com uso moderno e inclusão direta em páginas HTML.

O Clarus CSS deve ter dependência externa zero em tempo de execução. Não deve depender de React, Vue, Angular, jQuery ou qualquer biblioteca JavaScript de terceiros para funcionar.

## 7. Arquitetura de Interface

O framework deve priorizar uso direto em HTML, CSS e JavaScript, sem exigir build complexo para o usuário final.

As classes e componentes devem ser pensados para:

- Uso direto em arquivos HTML.
- Integração simples com qualquer back-end ou front-end.
- Compatibilidade futura com projetos que usem React, Vue, Angular ou outras stacks, sem tornar essas stacks obrigatórias.

## 8. Sistema de Layout

O sistema de layout será baseado em Flexbox.

O grid deve seguir uma abordagem próxima ao Bootstrap, incluindo breakpoints familiares:

- `sm`
- `md`
- `lg`
- `xl`
- `xxl`

O objetivo é reduzir a curva de aprendizado para quem já conhece Bootstrap, mantendo liberdade para adaptar detalhes internos à identidade do Clarus CSS.

## 9. Escopo Inicial de Componentes

A primeira versão publicável deve mirar um escopo completo, com componentes suficientes para permitir o uso real do framework em projetos práticos.

O escopo inicial inclui:

- Layout e containers.
- Grid baseado em Flexbox.
- Utilitários de espaçamento, display, alinhamento, visibilidade e tipografia.
- Formulários e campos de entrada (incluindo validação visual, select customizado e upload de arquivo estilizado).
- Botões.
- Cards.
- Alertas.
- Badges.
- Tabelas.
- Navbar.
- Dropdown.
- Modal.
- Accordion.
- Tabs.
- Tooltips.
- Toasts.
- Paginação.
- Breadcrumbs.

O escopo pode ser implementado em etapas, mas o documento assume que todos esses grupos fazem parte da visão inicial do produto.

## 10. Temas e Customização

O Clarus CSS deve oferecer suporte nativo a dark mode desde a primeira versão.

A paleta de cores oficial é a "Indigo autoral" (`primary #4F46E5`,
`success #1BC559`, `warning #F0B40E`, `danger #DC263E`, `info #8BA2C4`,
com escala neutra própria de 9 degraus), definida na seção 18.1. A
arquitetura já está preparada para temas claros e escuros por meio de CSS
Custom Properties.

A customização deve permitir que usuários alterem cores, espaçamentos, tipografia e estados visuais sem reescrever o framework inteiro.

## 11. Tipografia

A família tipográfica oficial é a Plus Jakarta Sans (heading e body),
definida na seção 18.2, escolhida por boa legibilidade, aparência moderna e
compatibilidade com interfaces web de uso geral. Os arquivos da fonte são
distribuídos self-hosted junto ao próprio pacote (sem dependência de
serviços externos como fonts.googleapis.com em tempo de execução), alinhado
à stack definida na seção 6.

## 12. Documentação

A documentação inicial será mantida em Markdown no GitHub.

Não haverá, no primeiro momento, um site separado de documentação. A prioridade é manter a documentação simples, versionada junto ao código e acessível diretamente pelo repositório.

Os documentos devem explicar:

- Instalação via npm.
- Uso direto via arquivo compilado.
- Estrutura de classes.
- Sistema de grid.
- Componentes disponíveis.
- Customização por variáveis.
- Modo escuro.
- Convenções de contribuição.

## 13. Distribuição

O Clarus CSS será publicado no npm desde o início.

A distribuição deve contemplar:

- Pacote npm oficial.
- Arquivos compilados em `dist`.
- Versão minificada para produção.
- CSS principal.
- JavaScript nativo para componentes interativos.
- Possibilidade de uso via CDN por meio de serviços como jsDelivr e unpkg após publicação no npm.

## 14. Licenciamento

O projeto será licenciado sob MIT.

Essa licença confirma a intenção de permitir uso amplo, modificação, cópia, redistribuição e uso comercial, preservando apenas os requisitos básicos de atribuição e inclusão do aviso de licença.

## 15. Estrutura Inicial do Repositório

A estrutura-alvo do repositório deve evoluir para algo próximo de:

```text
clarus-css/
├── assets/
├── docs/
├── dist/
├── js/
├── mockup/
├── scss/
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── package.json
└── README.md
```

A estrutura atual pode ser ajustada progressivamente, mas deve convergir para separar fonte, distribuição, documentação e exemplos.

## 16. Boas Práticas de Engenharia

O projeto deve adotar práticas que transmitam seriedade técnica desde o início:

- Versionamento semântico.
- Histórico de mudanças em `CHANGELOG.md`.
- Orientações de contribuição em `CONTRIBUTING.md`.
- Scripts de build e minificação.
- Organização modular por componente.
- Convenção consistente de nomenclatura de classes.
- GitHub Actions para lint, build e validações básicas.
- Publicação controlada por release.

## 17. Decisões Firmes

As seguintes decisões estão definidas:

- Nome do produto: Clarus.
- Nome do projeto/repositório: `clarus-css`.
- Modelo de design: híbrido.
- Referência principal: Bootstrap.
- Stack prioritária: HTML, CSS e JavaScript nativo.
- Dependências externas em tempo de execução: zero.
- Sistema de layout: Flexbox.
- Breakpoints: próximos ao padrão Bootstrap.
- Identidade visual: minimalista e moderna.
- Paleta de cores: "Indigo autoral", definida na seção 18.1.
- Tipografia: Plus Jakarta Sans, self-hosted, definida na seção 18.2.
- Dark mode: nativo desde a primeira versão.
- Documentação inicial: Markdown no GitHub.
- Distribuição: npm desde o início.
- Licença: MIT.
- Tom do projeto: técnico, estratégico e com posicionamento de produto.
- Convenção de nomenclatura de classes: definida na seção 19.
- API JavaScript dos componentes interativos: definida na seção 20.
- Ordem de implementação dos componentes: definida na seção 21.
- Estratégia de testes visuais e funcionais: definida na seção 22.

## 18. Paleta de Cores e Tipografia

As duas pendências desta seção (antes "a definir posteriormente") foram decididas.

### 18.1 Paleta de cores oficial

Opção "Indigo autoral": paleta própria, escolhida por diferenciar o Clarus
tanto do azul característico do Bootstrap quanto da paleta do Material
Design do Google (esta última usada até então como placeholder em
`scss/settings/_colors.scss`), reforçando o posicionamento de identidade
visual própria (seção 4).

- Cores de estado:
  - `primary`: `#4F46E5`
  - `success`: `#1BC559`
  - `warning`: `#F0B40E`
  - `danger`: `#DC263E`
  - `info`: `#8BA2C4`
- `info` passa a ser uma cor distinta de `primary`, corrigindo a duplicidade
  que existia antes desta implementação (`$color-primary` e `$color-info`
  com o mesmo valor).
- Escala neutra com 9 degraus cheios (100 a 900, sem lacunas), já
  implementada em `scss/settings/_colors.scss`: `#F8FAFC`, `#F1F5F9`,
  `#E2E8F0`, `#CBD5E1`, `#94A3B8`, `#64748B`, `#475569`, `#334155`,
  `#1E293B`.
- Variantes de `primary`/`success`/`warning`/`danger`/`info` para o dark
  mode já implementadas em `scss/themes/_dark.scss` (token
  `--clarus-color-#{nome}`, recalculado via `color.mix()` com um peso por
  cor no mapa `$dark-color-weights`); `alert-*-bg`/`-text` continuam
  recalculados à parte para o tema escuro.

### 18.2 Família tipográfica final

Plus Jakarta Sans para heading e body (família única), mantendo Source Code
Pro no monoespaçado (`$font-family-mono`, sem alteração).

- Os arquivos da fonte (`.woff2`, licença OFL) já são self-hosted, distribuídos
  junto ao pacote em `assets/fonts/plus-jakarta-sans/` (incluindo o
  `OFL.txt` da fonte, requisito da licença), com `@font-face` declarado em
  `scss/base/_typography.scss` no lugar do antigo `@import
  url("https://fonts.googleapis.com/...")` — cumprindo a meta de
  "dependência externa zero em tempo de execução" (seção 6) para a fonte
  principal. O monoespaçado (Source Code Pro) permanece via `@import` do
  Google Fonts, sem alteração, conforme decidido acima.

## 19. Convenção de Nomenclatura de Classes

- Sem prefixo global: as classes seguem o padrão Bootstrap já em uso (`.btn`,
  `.card`, `.container`), sem prefixo `clarus-`.
- Variantes de cor/estilo por sufixo direto: `.btn-primary`, `.alert-danger`,
  `.badge-success`, seguindo os nomes já usados em `$theme-colors`
  (`scss/settings/_colors.scss`).
- Tamanhos por sufixo `-sm`/`-lg` consistente em todos os componentes que
  tiverem variação de tamanho (botões, badges, cards, inputs), generalizando
  o padrão já usado em `.form-control-sm`/`.form-control-lg`.
- Estados controlados por JavaScript usam classes `is-*` (`.is-open`,
  `.is-active`, `.is-expanded`), nunca atributos `data-state` customizados.
- Utilitários mantêm abreviações curtas estilo Bootstrap (`.d-flex`, `.mt-3`,
  `.gx-2`, `.p-2`), como já implementado em `scss/utilities/`.
- Responsividade em utilitários e grid segue sempre o formato fixo
  `{propriedade}-{breakpoint}-{valor}` (ex.: `.col-md-6`, `.d-md-none`,
  `.mt-lg-3`).

## 20. API JavaScript dos Componentes Interativos

- Inicialização sempre automática via atributo HTML (ex.:
  `data-clarus="modal" data-target="#meuModal"`), sem exigir `new` manual
  para o uso básico — alinhado com "uso direto em HTML sem build" (seção 7).
- Toda instância criada automaticamente continua acessível para controle
  programático via método estático de recuperação (ex.:
  `Clarus.Modal.getInstance(el)`), permitindo chamar seus métodos sem
  precisar instanciar manualmente.
- Namespace global único: `window.Clarus`, com cada componente como
  propriedade (`Clarus.Modal`, `Clarus.Tooltip`, `Clarus.Dropdown`, etc.),
  em vez de globais separados.
- API de instância padronizada para todo componente interativo: `.show()`,
  `.hide()`, `.toggle()`, `.dispose()`.
- Comunicação com a aplicação via eventos DOM customizados (ex.:
  `clarus:modal:shown`, `clarus:tab:changed`), disparados com
  `CustomEvent` nativo — sem exigir callbacks de construtor.
- Acessibilidade (ARIA, foco, teclado) é requisito obrigatório da API desde
  a v0.1 para todo componente interativo, não um extra a ser adicionado
  depois.
- Além do bundle único (`dist/js/clarus.js`), haverá import granular por
  componente (ex.: `import { Modal } from "clarus-css/js/modal"`), para uso
  com bundlers.

## 21. Ordem de Implementação dos Componentes

Critério de priorização: dependência técnica primeiro (o que outros
componentes reaproveitam é implementado antes), respeitando que todo
componente 100% CSS (sem JavaScript) seja concluído antes de iniciar os que
exigem JavaScript. A ordem abaixo é subdividida em **10 fases**, cada uma
tratada como um marco independente (ver seção 23) — fases menores facilitam
entrega incremental e validação visual a cada etapa.

**Regra obrigatória de mockup por fase:** ao concluir uma fase, toda
funcionalidade CSS nova introduzida nela deve ganhar um exemplo demonstrativo
em `mockup/` (arquivo novo ou atualização de um existente), seguindo o
padrão já usado em `mockup/layout.html` — HTML puro consumindo os arquivos
gerados em `dist/css/`. Isso reforça, por fase, a regra geral já definida na
seção 22 ("cada componente/grupo implementado ganha um mockup dedicado,
mantido atualizado") e o fluxo de evolução de `docs/scss-architecture.md`.
Fases que não introduzem classes CSS novas diretamente (caso da Fase 7,
infraestrutura JS) podem usar o mockup como harness de teste manual do
comportamento, sem exigir novas classes visuais.

### Fase 1 — Botões

**Status:** ✅ Concluído.

Reaproveitados por cards, alertas, modal e navbar; primeiro componente por
ser o de maior reaproveitamento técnico. Entregue: variantes sólidas e
outline por cor de estado (`.btn-primary/success/warning/danger/info`,
`.btn-outline-*`), tamanhos (`.btn-sm`/`.btn-lg`), estados de
hover/active/focus/disabled, e a função `color-contrast()`
(`scss/tools/_mixins.scss`) para garantir contraste WCAG AA em cada
variante.

Mockup: `mockup/buttons.html`.

### Fase 2 — Badges e Alertas

**Status:** ✅ Concluído.

Badges é pequeno e reaproveitado por cards, navbar e tabelas. Alertas
formaliza o padrão de variante de cor de estado (success/warning/danger/info)
que badges e tabelas também usam — os dois ficam juntos por definirem, em
conjunto, esse padrão de cor de estado. Entregue: badges sólidos com
tamanhos (`.badge-sm`/`.badge-lg`); alertas com fundo tintado por estado
(`.alert-*`), via tokens `--clarus-alert-*-bg`/`-text` com suporte a dark
mode; funções `tint-color()`/`shade-color()`
(`scss/tools/_mixins.scss`).

Mockup: `mockup/badges-alerts.html`.

### Fase 3 — Cards

**Status:** ✅ Concluído.

Combina botões, badges e tipografia base num contêiner; primeiro componente
de composição, por isso isolado em fase própria. Entregue:
`.card-header`/`.card-body`/`.card-footer`, `.card-title`/`.card-subtitle`/
`.card-text`, tamanhos (`.card-sm`/`.card-lg`), variante `.card-header` com
título + botão de fechar (`.btn-close`, reaproveitável em modal/toast),
utilitários de sombra (`.shadow-sm`/`.shadow`/`.shadow-lg`,
`scss/utilities/_shadow.scss`) para elevação do card, `.card-clickable` +
`.stretched-link` (card inteiro clicável/focável sem aninhar elementos
interativos) e `.card-horizontal` (eixo em linha, com raio/borda do
header/footer ajustados para a lateral).

Mockup: `mockup/cards.html`.

### Fase 4 — Tabelas e Navbar

**Status:** ✅ Concluído.

Tabelas reaproveita as cores de estado definidas em alertas/badges. Navbar
(versão estática, sem dropdown/collapse) reaproveita botões e badges — ambos
são componentes de exibição de conteúdo/estrutura de página. Entregue:
`.table-striped`/`.table-hover`/`.table-bordered`/`.table-borderless`/
`.table-sm`/`.table-responsive` e variantes de cor de estado (reaproveitando
os tokens `--clarus-alert-*` da Fase 2); `.navbar-brand`/`.navbar-nav`/
`.nav-link` (com `.active`/`.disabled`, sem toggle JS).

Mockup: `mockup/tables-navbar.html`.

### Fase 5 — Paginação e Breadcrumbs

**Status:** ✅ Concluído.

Paginação reaproveita o padrão de item ativo/desabilitado dos botões.
Breadcrumbs é mais simples, sem dependência de outros componentes — ambos
são auxiliares de navegação, agrupados por afinidade funcional. Entregue:
`.page-link` com estados `.active`/`.disabled` (reaproveitando
`color-contrast()`); `.breadcrumb-item` com separador via `::before` e
estado `.active`.

Mockup: `mockup/pagination-breadcrumbs.html`.

### Fase 6 — Formulários avançados (CSS-only)

**Status:** ✅ Concluído.

Estados de validação (`.is-valid`/`.is-invalid`, reaproveitando as cores de
estado de alertas/badges) e upload de arquivo estilizado (label + input
nativo oculto). É o último componente 100% CSS antes de iniciar
infraestrutura JavaScript (Fase 7). Entregue: `.form-control.is-valid`/
`.is-invalid` (borda e anel de foco em `--clarus-color-success`/`-danger`),
`.valid-feedback`/`.invalid-feedback` (texto exibido via seletor de irmão
adjacente, sem JavaScript); `.file-upload`/`.file-input`/`.file-label`
(input nativo ocultado por `clip-path` mantendo foco/teclado, rótulo
estilizado via `<label for>`), com tamanhos (`.file-label-sm`/`-lg`) e
estado desabilitado.

Mockup: `mockup/forms-advanced.html`.

### Fase 7 — Infraestrutura JS compartilhada

**Status:** ✅ Concluído.

Pré-requisito de qualquer componente interativo, sem componente visual
próprio:

1. Posicionamento/overlay — usado por dropdown, tooltip e modal.
2. Foco e teclado (focus trap + tecla Escape) — usado por modal e dropdown.
3. Transição/collapse — usado por accordion, tabs e toast.

Entregue em `js/core/` (ES modules, sem dependências externas): `positioning.js`
(`computePosition()`/`applyPosition()`, com flip automático para o lado
oposto e clamp dentro da viewport); `overlay.js` (`lockScroll()`/
`unlockScroll()` com compensação de scrollbar e contagem de referências para
overlays aninhados, `onClickOutside()`); `focus.js` (`createFocusTrap()` com
ciclo Tab/Shift+Tab, `onEscapeKey()`); `transition.js` (`collapse()`/
`expand()` animando `height` via `transitionend`, respeitando
`prefers-reduced-motion`). Reexportado como `Clarus.core` pelo bundle único
(`js/clarus.js` → `dist/js/clarus.js`) e também importável de forma granular
(`clarus-css/js/core/positioning`, etc.), alinhado com a API JavaScript
definida na seção 20.

Mockup: `mockup/js-foundation.html` (harness manual de posicionamento, foco
e transição, sem componente final).

### Fase 8 — Dropdown e Tooltip

**Status:** ✅ Concluído.

Dropdown é o consumidor mais simples da infraestrutura de posicionamento.
Tooltip reaproveita a mesma infraestrutura, com show/hide por hover/focus —
os dois são os primeiros componentes JS por serem os mais simples. Entregue:
`.dropdown-toggle`/`.dropdown-menu`/`.dropdown-item`/`.dropdown-divider`/
`.dropdown-header` (`scss/components/_dropdown.scss`); `.tooltip`/
`.tooltip-inner`/`.tooltip-arrow` com 4 posicionamentos (`scss/components/_tooltips.scss`),
usando os novos tokens `--clarus-tooltip-bg`/`-text` (invertidos no dark
mode). `js/dropdown.js` e `js/tooltip.js` seguem a API da seção 20:
auto-init via `data-clarus="dropdown"`/`"tooltip"`, `Clarus.Dropdown`/
`Clarus.Tooltip` com `getInstance()`, `.show()`/`.hide()`/`.toggle()`/
`.dispose()`, eventos `clarus:dropdown:shown`/`-hidden` e
`clarus:tooltip:shown`/`-hidden`. Dropdown adiciona navegação por
ArrowUp/ArrowDown entre itens e fecha ao clicar em um item, fora do menu ou
com Escape (foco retorna ao toggle); Tooltip mostra/esconde por
hover/foco/blur e Escape, com `aria-describedby` ligando o elemento de
referência ao tooltip. Novo `js/core/register.js` (`autoInit()`/
`createInstanceRegistry()`) generaliza esse padrão de inicialização/registro
de instância para os próximos componentes interativos.

`computePosition()` (`js/core/positioning.js`) ganhou a opção `align`
(`"start"`/`"center"`/`"end"`) para o eixo cruzado, além do `placement`
existente — usada pelo Dropdown via `data-align` no toggle (padrão
`"start"`: borda esquerda do menu alinhada à borda esquerda do botão, como
no Bootstrap). O offset do Dropdown em relação ao toggle caiu de 8px para
4px, e `.dropdown-menu` ganhou `position: absolute` explícito no CSS base
(antes só era aplicado via JS no `show()`), corrigindo uma medição incorreta
de largura: sem isso, o menu era medido ainda como bloco normal (ocupando a
largura inteira do `body`) antes do JS aplicar a posição, quebrando o
cálculo de alinhamento `start`/`end`.

Mockup: `mockup/dropdown-tooltip.html`.

### Fase 9 — Modal e Select customizado

**Status:** ✅ Concluído.

Modal reaproveita posicionamento e foco/teclado; mais complexo que
dropdown/tooltip. Select customizado (formulários avançados) é um dropdown
aplicado a um campo de formulário — depende do dropdown já existir (Fase 8).

Entregue: `.modal`/`.modal-dialog`/`.modal-content`/`.modal-header`/
`.modal-title`/`.modal-body`/`.modal-footer` (`scss/components/_modal.scss`),
com tamanhos `.modal-sm`/`.modal-lg` no `.modal-dialog`. `js/modal.js`
(`Clarus.Modal`) reaproveita a infraestrutura da Fase 7: `lockScroll()`
enquanto aberto, `createFocusTrap()` no `.modal-dialog`, `onEscapeKey()` e
`onClickOutside()` para fechar (foco retorna ao gatilho); dismiss via
qualquer elemento com `data-dismiss="modal"`; `data-backdrop="static"` no
`.modal` desativa fechar por Escape/clique fora. Select customizado
(`js/select.js`, `Clarus.Select`) gera a marcação (`.form-select` +
`.dropdown-menu`/`.dropdown-item` por `<option>`) a partir de um `<select>`
nativo (`data-clarus="select"`, oculto mas mantido em sincronia para
submissão de formulário) e **compõe uma instância de `Dropdown` por cima**
— reaproveitando 100% do posicionamento, navegação por setas e fechamento
já entregues na Fase 8, em vez de duplicar essa lógica. Seleção atualiza o
`<select>` nativo e dispara `change` nativo (compatibilidade com listeners
externos) além de `clarus:select:changed`. ARIA usa `role="listbox"`/
`"option"`/`aria-selected` (não `"menu"`/`"menuitem"` herdado do Dropdown),
por serem semânticas mais corretas para este caso de uso. Tamanhos via
`data-size="sm"/"lg"` no `<select>` (`.form-select-sm`/`-lg`, novo em
`scss/forms/_forms.scss`).

Mockup: `mockup/modal-select.html`.

### Fase 10 — Accordion, Tabs e Toast

**Status:** ✅ Concluído.

Todos reaproveitam a infraestrutura de transição/collapse (Fase 7): Accordion
e Tabs compartilham o mesmo padrão de alternância de painel; Toast reaproveita
a mesma infraestrutura e adiciona timers de auto-dismiss. Última fase do
escopo inicial de componentes (seção 9).

Entregue: **Accordion** (`.accordion`/`.accordion-item`/`.accordion-header`/
`.accordion-button`/`.accordion-collapse`/`.accordion-body`,
`scss/components/_accordion.scss`) — `js/accordion.js` usa `collapse()`/
`expand()` de `Clarus.core` para animar a altura de cada painel; só um
painel aberto por vez por padrão (`data-multiple="true"` permite vários).
**Tabs** (`.tabs`/`.tab-content`/`.tab-pane`, `scss/components/_tabs.scss`,
reaproveitando `.nav-link` já existente da Navbar/Fase 4 com um indicador de
sublinhado escopado a `.tabs`) — `js/tabs.js` alterna `.active` no link e no
painel correspondente, com navegação por ArrowLeft/ArrowRight/Home/End
(`role="tablist"`/`"tab"`/`"tabpanel"`, `aria-selected`, `tabindex` roving),
disparando `clarus:tab:changed`. **Toast**
(`.toast-container`/`.toast`/`.toast-header`/`.toast-body`, variantes de
cor de estado via `.toast-#{nome}`, `scss/components/_toasts.scss`) —
`js/toast.js` usa `expand()`/`collapse()` para mostrar/esconder, com timer
de auto-dismiss configurável (`data-delay`, `data-autohide="false"` para
desativar) e dismiss via `data-dismiss="toast"`; instâncias são criadas no
auto-init mas só ficam visíveis quando `.show()` é chamado (tipicamente após
alguma ação), via `Clarus.Toast.getInstance(el).show()`.

Com esta fase, todos os 10 marcos de componentes da seção 21 (e o escopo
inicial de componentes da seção 9) estão entregues.

Mockup: `mockup/accordion-tabs-toast.html`.

## 22. Estratégia de Testes Visuais e Funcionais

- Teste visual (regressão de CSS): Playwright com comparação de
  screenshots, rodando local e no CI já existente — sem dependência de
  serviço externo pago.
- Teste funcional de JavaScript: Vitest com `jsdom`, cobrindo estado,
  atributos ARIA e eventos disparados por cada componente interativo.
- Os arquivos em `mockup/*.html` são as fixtures oficiais dos testes
  visuais — cada componente/grupo implementado ganha (ou já usa) um mockup
  dedicado, mantido atualizado.
- Testes (visuais e funcionais) rodam automaticamente no GitHub Actions a
  cada push/PR, como um novo step em `.github/workflows/ci.yml`, além do
  lint e build já existentes.

## 23. Marcos do Projeto

O projeto transforma estas definições em uma estrutura técnica através de
marcos sequenciais. Cada marco tem escopo fechado, é validado com
`npm run lint` + `npm run build`, e — a partir do Marco 2 — entrega também um
mockup demonstrativo em `mockup/` (regra detalhada na seção 21).

### Marco 1 — Base da versão inicial (concluído)

Layout, grid, utilitários (display, flex, spacing, visibility, tipografia) e
formulários básicos (controles, tamanhos, estados de foco/desabilitado/
leitura) como fundação da versão inicial.

### Marcos 2 a 11 — Componentes (Fases 1 a 10)

Cada uma das 10 fases definidas na seção 21 corresponde a um marco próprio,
na mesma ordem (dependência técnica primeiro, CSS-only antes de JS). Esta
tabela é o checklist oficial de progresso do projeto — atualizar a coluna
Status ao concluir cada marco (mesmo status também replicado no cabeçalho de
cada fase, seção 21):

| Marco | Fase (seção 21) | Escopo | Status |
| --- | --- | --- | --- |
| 1 | — | Base da versão inicial (layout, grid, utilitários, formulários) | ✅ Concluído |
| 2 | Fase 1 | Botões | ✅ Concluído |
| 3 | Fase 2 | Badges, Alertas | ✅ Concluído |
| 4 | Fase 3 | Cards | ✅ Concluído |
| 5 | Fase 4 | Tabelas, Navbar | ✅ Concluído |
| 6 | Fase 5 | Paginação, Breadcrumbs | ✅ Concluído |
| 7 | Fase 6 | Formulários avançados (CSS-only) | ✅ Concluído |
| 8 | Fase 7 | Infraestrutura JS compartilhada | ✅ Concluído |
| 9 | Fase 8 | Dropdown, Tooltip | ✅ Concluído |
| 10 | Fase 9 | Modal, Select customizado | ✅ Concluído |
| 11 | Fase 10 | Accordion, Tabs, Toast | ✅ Concluído |

Ao concluir o Marco 11, todo o escopo inicial de componentes (seção 9) e a
ordem de implementação (seção 21) estarão entregues.
