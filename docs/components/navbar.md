# Navbar

Barra de navegação horizontal estática — marca de um lado, links do outro.
Versão "crua": sem collapse/hambúrguer próprio para mobile e sem dropdown
embutido; para um menu suspenso dentro da navbar, combine com
[Dropdown](dropdown.md).

## Visão geral

```html
<nav class="cl-navbar">
  <a href="#" class="cl-navbar-brand">Minha Marca</a>
  <ul class="cl-navbar-nav">
    <li><a href="#" class="cl-nav-link is-active">Início</a></li>
    <li><a href="#" class="cl-nav-link">Produtos</a></li>
    <li><a href="#" class="cl-nav-link is-disabled">Em breve</a></li>
  </ul>
</nav>
```

## Anatomia

`.cl-navbar` (flex, `justify-content: space-between`, quebra linha se não
houver espaço) > `.cl-navbar-brand` (nome/logo) + `.cl-navbar-nav`
(`<ul>` sem marcadores) > `<li>` > `.cl-nav-link`.

`.cl-nav-link` é compartilhado com [Tabs](tabs.md) — o mesmo estilo de
link de navegação serve pros dois contextos.

## Variações

Nenhuma variação de cor/tamanho — a navbar é sempre o mesmo visual; a
composição (o que vai dentro) que muda.

## Estados

- `.cl-nav-link.is-active` — destaque de cor primária + peso de fonte
  maior.
- `.cl-nav-link.is-disabled` — cor muted, não clicável.

## A11y

- Use `<nav>` como elemento raiz (já no exemplo) — landmark de navegação
  pra leitores de tela.
- Se houver mais de uma navbar na página, diferencie com
  `aria-label="Navegação principal"` (ou similar) em cada `<nav>`.

## API JS

Nenhuma — 100% CSS.

## Tokens

`--cl-color-border` (borda inferior), `--cl-color-surface` (fundo),
`--cl-color-text`, `--cl-color-primary` (ativo), `--cl-color-muted`
(desabilitado), `--cl-radius-sm` (hover do link).

## Exemplo

```html
<nav class="cl-navbar" aria-label="Navegação principal">
  <a href="#" class="cl-navbar-brand">Clarus</a>
  <ul class="cl-navbar-nav">
    <li><a href="#" class="cl-nav-link is-active">Dashboard</a></li>
    <li><a href="#" class="cl-nav-link">Relatórios</a></li>
    <li><a href="#" class="cl-nav-link">Configurações</a></li>
  </ul>
</nav>
```

Mockup: [`mockup/tables-navbar.html`](../../mockup/tables-navbar.html).
