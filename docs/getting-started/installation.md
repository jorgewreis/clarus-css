# Instalação

## Via npm

```bash
npm install clarus-css
```

## Via CDN

Sem instalar nada, direto do jsDelivr ou unpkg:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/clarus-css/dist/css/clarus.css">
<script src="https://cdn.jsdelivr.net/npm/clarus-css/dist/js/clarus.js"></script>
```

Troque `clarus.css`/`clarus.js` por `clarus.min.css`/`clarus.min.js` para as
versões minificadas em produção.

## Fontes self-hosted

Plus Jakarta Sans (sans) e Source Code Pro (mono) são distribuídas à parte,
em `fonts.css`, para não forçar o download das fontes em quem prefere usar
as próprias. Inclua **antes** do CSS principal:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/clarus-css/dist/css/fonts.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/clarus-css/dist/css/clarus.css">
```

Sem `fonts.css`, a tipografia cai no fallback `sans-serif`/`monospace` do
sistema — nada quebra, só muda a fonte.

## Distribuições disponíveis

O pacote publica o bundle completo (`clarus.css`) e distribuições granulares,
para quem não precisa do framework inteiro:

| Arquivo | Conteúdo |
|---|---|
| `dist/css/clarus.css` | Bundle completo: tokens, reset, layout, forms, components, utilities, tema escuro. |
| `dist/css/layout.css` | Só grid/containers (+ tokens/reset/tema). |
| `dist/css/forms.css` | Só formulários (+ tokens/reset/tema). |
| `dist/css/components.css` | Só componentes prontos (+ tokens/reset/tema). |
| `dist/css/helpers.css` | Só utilitários atômicos (+ tokens/reset/tema). |
| `dist/css/fonts.css` | Só os `@font-face` self-hosted (opcional, ver acima). |
| `dist/js/clarus.js` | Todo o JavaScript dos componentes interativos, IIFE global `Clarus`. |

Cada distribuição CSS granular já inclui tokens, reset e tema escuro
completos — pode ser usada isoladamente sem quebrar variáveis ou dark mode.

## Import via Sass

Para compilar com suas próprias variáveis Sass (sobrescrever antes de
compilar, em vez de sobrescrever CSS Custom Properties depois):

```scss
@use "clarus-css/scss/clarus" with (
  $radius-md: 10px
);
```

Ver [`docs/reference/scss-architecture.md`](../reference/scss-architecture.md)
para a lista completa de variáveis e a organização dos módulos.

## Próximo passo

[Formas de uso](usage.md) — como inicializar componentes interativos e a
convenção de nomenclatura de classes.
