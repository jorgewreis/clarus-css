# Nested Menu

[Dropdown](dropdown.md) com submenus recursivos, quantos níveis quiser.
Reusa `.cl-dropdown-menu`/`.cl-dropdown-item` sem reestilizar — só adiciona
o posicionamento em cascata e a navegação por nível. Componente próprio
(não é o Dropdown com opção extra) porque a navegação por teclado é por
nível, não linear sobre todos os itens.

## Visão geral

```html
<button type="button" class="cl-btn cl-dropdown-toggle" data-cl="nested-menu" data-cl-target="#menu">
  Arquivo
</button>
<div class="cl-dropdown-menu" id="menu">
  <a href="#" class="cl-dropdown-item">Novo</a>
  <div class="cl-dropdown-submenu">
    <a href="#" class="cl-dropdown-item cl-dropdown-item-submenu">Exportar</a>
    <div class="cl-dropdown-menu">
      <a href="#" class="cl-dropdown-item">PDF</a>
      <a href="#" class="cl-dropdown-item">CSV</a>
    </div>
  </div>
  <a href="#" class="cl-dropdown-item">Fechar</a>
</div>
```

## Anatomia

Gatilho + `.cl-dropdown-menu` (raiz) — cada submenu é
`.cl-dropdown-submenu` (âncora de posicionamento) envolvendo um
`.cl-dropdown-item.cl-dropdown-item-submenu` (o item que abre, com seta
lateral) seguido de outro `.cl-dropdown-menu` (o submenu em si, mesmo
padrão recursivamente).

## Variações

Mesmas de [Dropdown](dropdown.md) no gatilho raiz (`data-placement`,
`data-align`). Submenus não têm variação própria — abrem sempre à direita
do item pai, com flip automático para a esquerda se não couber (a classe
`.cl-dropdown-submenu-left` é aplicada/removida pelo JS, não escreva
manualmente).

## Estados

`.is-open` em cada `.cl-dropdown-menu` (raiz e submenus, independentes).
Só um submenu por nível fica aberto por vez — abrir um fecha os irmãos do
mesmo nível.

Abertura por **hover** é 100% CSS (`:hover` no `.cl-dropdown-submenu`);
por **clique/teclado** é controlada pelo JS, coexistindo sem conflito
(passar o mouse fecha ramos abertos por teclado que não estão no caminho
do hover).

## A11y

`role="menu"` em todo nível, `aria-haspopup="menu"` + `aria-expanded` em
todo item que abre submenu (sincronizados automaticamente). Teclado (com
foco num item do menu): `ArrowDown`/`ArrowUp` navegam no nível atual,
`ArrowRight` abre o submenu do item focado e move o foco pro primeiro item
dele, `ArrowLeft` fecha o submenu atual e devolve o foco ao item pai,
`Escape` fecha só o nível atual (se estiver num submenu) ou o menu inteiro
(se estiver na raiz), `Enter`/`Space` num item com submenu alterna
abrir/fechar.

## API JS

Auto-init via `data-cl="nested-menu"`. `NestedMenu.getInstance(el)` (`el`
é o gatilho).

| Método | Descrição |
|---|---|
| `show()` | Abre o menu raiz, posiciona, foca o primeiro item. |
| `hide()` | Fecha o menu raiz e todos os submenus abertos. |
| `toggle()` | Alterna. |
| `dispose()` | Fecha se aberto, remove todos os listeners, desregistra a instância. |

| Evento (no gatilho) | Cancelável | Quando |
|---|---|---|
| `cl:nested-menu:shown` | Não | Depois de abrir o menu raiz. |
| `cl:nested-menu:hidden` | Não | Depois de fechar o menu raiz (fecha todos os submenus junto). |

## Tokens

Mesmos do [Dropdown](dropdown.md) — sem tokens próprios.

## Exemplo

Ver acima (Visão geral) — mockup com múltiplos níveis em
[`mockup/nested-menu.html`](../../mockup/nested-menu.html).
