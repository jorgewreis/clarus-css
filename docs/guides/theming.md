# Theming

Toda a identidade visual do Clarus CSS é exposta via CSS Custom Properties
(prefixo `--cl-*`) — customize redefinindo a variável no seu próprio CSS,
sem fork e sem recompilar.

## As 3 camadas de tokens

1. **Primitivo** — valores Sass em tempo de compilação
   (`packages/clarus-core/scss/settings/`): `$color-blue-500`, `$radius-md`,
   `$spacers`. Não são emitidos como CSS diretamente; só existem para gerar
   as camadas seguintes.
2. **Semântico** — CSS Custom Properties nomeadas por papel, não por valor
   (`packages/clarus-core/scss/tokens/`): `--cl-color-primary`,
   `--cl-color-bg-surface`, `--cl-color-text-primary`,
   `--cl-color-border-default`. É aqui que você customiza na prática.
3. **Componente** — alguns componentes expõem tokens próprios, com fallback
   pra um token semântico (ex.: `.cl-btn` tem `--cl-btn-bg`/`--cl-btn-color`/
   `--cl-btn-border-color`) — permite sobrescrever **uma instância**
   específica sem afetar o resto:

   ```css
   .meu-botao-especial {
     --cl-btn-bg: #6d28d9;
   }
   ```

Ver [`docs/reference/design-tokens.md`](../reference/design-tokens.md) para
a lista completa de tokens e [`docs/reference/scss-architecture.md`](../reference/scss-architecture.md)
para como as camadas se organizam em `@layer`.

## Customizando globalmente

Redefina o token semântico em `:root` (afeta todos os componentes que o
usam):

```css
:root {
  --cl-color-primary: #6d28d9;
  --cl-radius-md: 10px;
  --cl-font-sans: "Inter", sans-serif;
}
```

Isso funciona em runtime, direto no CSS final — não precisa recompilar o
Sass nem ter acesso ao código-fonte do framework.

## Cores: OKLCH com fallback automático

Os primitivos de cor são gerados em [OKLCH](https://oklch.com/), calibrados
para reproduzir o mesmo matiz do hex histórico do projeto (round-trip
hex→oklch→hex). Cada token de cor é declarado duas vezes:

```css
:root {
  --cl-color-primary: #1a61e6; /* fallback sRGB, todo navegador */
}

@supports (color: oklch(0% 0 0)) {
  :root {
    --cl-color-primary: oklch(53.6% 0.213 261.6deg); /* nativo, navegadores modernos */
  }
}
```

Navegadores sem suporte a `oklch()` ignoram o bloco `@supports` inteiro e
ficam só com o fallback — sem quebra, sem polyfill. Se você **também**
customiza uma cor em OKLCH, recomenda-se o mesmo padrão de dois valores
(fallback + `@supports`) pelo mesmo motivo. Ver
[`docs/reference/browser-support.md`](../reference/browser-support.md).

## Customizando via Sass

Para quem compila o próprio bundle (em vez de sobrescrever CSS em runtime),
os valores primitivos aceitam override na hora do `@use`:

```scss
@use "clarus-css/scss/clarus" with (
  $radius-md: 10px,
  $font-family-sans: "Inter", sans-serif
);
```

Qualquer variável marcada `!default` nos arquivos de
`packages/clarus-core/scss/settings/` pode ser sobrescrita dessa forma.

## Escala de espaçamento e breakpoints

`$spacers` (0–5, usado pelos utilitários `.u-m*`/`.u-p*`/`.u-g*`) e
`$breakpoints` (`xs`–`xxxl`, usado pelo grid e por todo utilitário
responsivo `.u-*-{breakpoint}`) também são customizáveis via Sass — não têm
equivalente em CSS Custom Property, porque alimentam a geração de classes
(nomes de classe fixos em `.css`, não podem reagir a uma variável em
runtime). Ver [`docs/reference/design-tokens.md`](../reference/design-tokens.md).

## Próximo passo

[Dark mode](dark-mode.md) — como o tema escuro usa a mesma camada de tokens.
