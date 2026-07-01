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
- Formulários e campos de entrada.
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

A paleta de cores ainda será escolhida posteriormente, mas a arquitetura deve estar preparada para temas claros e escuros por meio de CSS Custom Properties.

A customização deve permitir que usuários alterem cores, espaçamentos, tipografia e estados visuais sem reescrever o framework inteiro.

## 11. Tipografia

O projeto usará Google Fonts como fonte oficial de tipografia.

A família tipográfica final ainda será definida, mas a decisão estratégica é usar uma fonte externa com boa legibilidade, aparência moderna e compatibilidade com interfaces web de uso geral.

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
- Tipografia: Google Fonts.
- Dark mode: nativo desde a primeira versão.
- Documentação inicial: Markdown no GitHub.
- Distribuição: npm desde o início.
- Licença: MIT.
- Tom do projeto: técnico, estratégico e com posicionamento de produto.

## 18. Pontos a Definir Posteriormente

Apesar das decisões principais estarem firmadas, ainda precisam ser definidos em documentos específicos:

- Paleta de cores oficial.
- Família tipográfica final.
- Convenção exata de nomes de classes.
- API JavaScript dos componentes interativos.
- Ordem de implementação dos componentes.
- Estratégia de testes visuais e funcionais.

## 19. Próximo Marco

O próximo marco do projeto é transformar estas definições em uma estrutura técnica inicial:

1. Criar pipeline de build.
2. Organizar `dist`.
3. Documentar instalação e uso inicial no `README.md`.
4. Implementar layout, grid, utilitários e formulários como base da versão inicial.
