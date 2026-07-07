# Suporte a navegadores

O Clarus CSS mira um alvo **moderno com fallback progressivo**: as duas
últimas versões dos navegadores principais, com piso mínimo garantido em
**Safari/iOS Safari 16.4**. Não há suporte a Internet Explorer.

## Alvo (`.browserslistrc`)

```text
last 2 Chrome versions
last 2 Edge versions
last 2 Firefox versions
Firefox ESR
last 2 Safari versions
Safari >= 16.4
last 2 iOS versions
iOS >= 16.4
not dead
not IE 11
```

Esse alvo alimenta o Autoprefixer no build (`scripts/build.mjs`), então
prefixos são adicionados automaticamente apenas onde o alvo ainda exige.

## Por que Safari 16.4 é o piso

É a versão mínima com suporte estável a todos os recursos usados pela base
do framework:

| Recurso | Uso no Clarus | Suporte mínimo |
|---|---|---|
| `@layer` (cascade layers) | Organiza `reset/tokens/base/layout/components/utilities/overrides` (ver `docs/scss-architecture.md`) | Safari 16.4, Chrome 99, Firefox 97 |
| `color-mix()` / OKLCH | Tokens de cor em 3 camadas (`packages/clarus-core/scss/settings/_colors.scss`) | Safari 16.4, Chrome 111, Firefox 113 |
| Propriedades customizadas (`--cl-*`) | Tokens em todas as camadas | Suportado amplamente há anos |
| `:focus-visible` | Anel de foco acessível (`focus-ring` mixin) | Suportado amplamente |

## Fallback progressivo

- Cores: os primitivos são gerados em OKLCH com fallback em hex declarado
  antes da regra OKLCH — navegadores sem suporte a OKLCH usam o hex
  (aproximação visual, não pixel-perfect).
- `@layer`: em navegadores sem suporte, todas as regras caem para a cascata
  padrão (ordem de origem + especificidade). Como o framework já organiza o
  SCSS na mesma ordem lógica das camadas, a degradação é aceitável — não há
  garantia formal de paridade visual, mas não há quebra funcional.
- Sem polyfills: o projeto não inclui polyfills de CSS; navegadores fora do
  alvo devem ser tratados como não suportados.

## Testes

A regressão visual (`npm run test:visual`, Playwright + Chromium) cobre o
navegador mais permissivo do alvo. Não há cobertura automatizada de
Safari/Firefox no momento — mudanças que dependem de recursos recentes devem
ser verificadas manualmente nesses engines antes do release.
