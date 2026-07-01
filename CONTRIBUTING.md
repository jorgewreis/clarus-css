# Contribuindo com o Clarus CSS

## Pré-requisitos

- Node.js >= 18

## Setup

```bash
npm install
```

## Scripts

- `npm run build` — compila `scss/` e `js/` para `dist/` (CSS expandido +
  minificado com source maps, JS via esbuild).
- `npm run watch` — recompila automaticamente ao editar arquivos em `scss/` ou `js/`.
- `npm run lint` — roda o stylelint sobre `scss/**/*.scss`.

## Convenções de SCSS

Antes de criar ou alterar módulos SCSS, leia
[`docs/scss-architecture.md`](docs/scss-architecture.md). Resumo do fluxo para
novos componentes:

1. Criar `scss/components/_nome-do-componente.scss`.
2. Adicionar o arquivo em `scss/components/_index.scss`.
3. Documentar a API de classes em Markdown.
4. Adicionar exemplo em `mockup/` quando fizer sentido.

## Decisões do projeto

As decisões de arquitetura e escopo já firmadas estão em
[`docs/definitions.md`](docs/definitions.md). Mudanças que contradigam uma
decisão firme devem ser discutidas antes de implementadas.

## Pull Requests

- Uma branch por mudança, a partir de `main`.
- Rode `npm run lint` e `npm run build` localmente antes de abrir o PR.
- Descreva o "porquê" da mudança, não só o "o quê".
