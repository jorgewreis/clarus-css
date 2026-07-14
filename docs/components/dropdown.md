# Dropdown

Menu suspenso posicionado relativo a um gatilho — reposicionamento
automático (flip perto das bordas), navegação por teclado, fecha ao
clicar fora ou `Escape`.

## Visão geral

```html
<div class="cl-dropdown">
  <button type="button" class="cl-btn cl-dropdown-toggle" data-cl="dropdown" data-cl-target="#meu-menu">
    Opções
  </button>
  <div class="cl-dropdown-menu" id="meu-menu">
    <a href="#" class="cl-dropdown-item">Editar</a>
    <a href="#" class="cl-dropdown-item">Duplicar</a>
    <div class="cl-dropdown-divider"></div>
    <a href="#" class="cl-dropdown-item">Excluir</a>
  </div>
</div>
```

Sem `data-cl-target`, o menu é o próximo irmão do gatilho no HTML — usar
`data-cl-target` é mais explícito e não exige ordem específica no DOM (o
JS move o menu pra `<body>` na inicialização, pra escapar de
`overflow: hidden` de containers ancestrais).

## Anatomia

`.cl-dropdown` (posicionamento relativo, opcional — só necessário se você
não usa `data-cl-target`) > gatilho (`.cl-dropdown-toggle`, qualquer
elemento clicável) + `.cl-dropdown-menu` > `.cl-dropdown-item` (link ou
botão), `.cl-dropdown-divider` (separador), `.cl-dropdown-header` (rótulo
de grupo, sem interação).

## Variações

- **Posicionamento**: `data-placement` (`top`/`bottom`/`left`/`right`,
  padrão `bottom`) e `data-align` (`start`/`end`, padrão `start`) no
  gatilho — reposiciona automaticamente (flip) se não couber na direção
  pedida.

```html
<button class="cl-btn cl-dropdown-toggle" data-cl="dropdown" data-cl-target="#menu2" data-placement="top" data-align="end">
  Opções
</button>
```

## Estados

`.cl-dropdown-item.is-active` (fundo primário), `.cl-dropdown-item.is-disabled`
(opacidade reduzida, sem interação/fora da navegação por seta).

## A11y

O JS aplica automaticamente: `aria-haspopup="menu"` + `aria-expanded` no
gatilho, `role="menu"` no menu. Dentro do menu aberto: `ArrowDown`/
`ArrowUp` navegam entre itens (pulando desabilitados); o primeiro item
recebe foco ao abrir. `Escape` fecha e devolve o foco ao gatilho; clicar
num item fecha e devolve o foco ao gatilho também.

## API JS

Auto-init via `data-cl="dropdown"`. `Dropdown.getInstance(el)` (`el` é o
**gatilho**, não o menu).

| Método | Descrição |
|---|---|
| `show()` | Abre o menu, posiciona, foca o primeiro item, ativa fechamento por clique fora. |
| `hide()` | Fecha o menu. |
| `toggle()` | Alterna entre `show()`/`hide()`. |
| `dispose()` | Fecha se aberto, remove todos os listeners e desregistra a instância. |

| Evento (no gatilho) | Cancelável | Quando |
|---|---|---|
| `cl:dropdown:shown` | Não | Depois de abrir. |
| `cl:dropdown:hidden` | Não | Depois de fechar. |

## Tokens

`--cl-color-border`, `--cl-color-surface`, `--cl-color-text`,
`--cl-color-subtle` (hover), `--cl-color-primary` (item ativo),
`--cl-color-muted` (header/desabilitado), `--cl-radius-md`,
`--cl-shadow-md`.

## Exemplo

```html
<div class="cl-dropdown">
  <button type="button" class="cl-btn cl-btn-outline-secondary cl-dropdown-toggle" data-cl="dropdown" data-cl-target="#acoes">
    Ações
  </button>
  <div class="cl-dropdown-menu" id="acoes">
    <div class="cl-dropdown-header">Conta</div>
    <a href="#" class="cl-dropdown-item">Perfil</a>
    <a href="#" class="cl-dropdown-item is-disabled">Configurações (em breve)</a>
    <div class="cl-dropdown-divider"></div>
    <a href="#" class="cl-dropdown-item">Sair</a>
  </div>
</div>
```

Mockup: [laboratório do componente](../../mockup/overlays-commands.html#dropdown).
