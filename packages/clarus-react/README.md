# clarus-react

**Pacote opcional — não faz parte do núcleo recomendado.**

Wrapper React fino para o [Clarus CSS](https://github.com/jorgewreis/clarus-css)
— cada componente aplica `data-cl`/classes e delega comportamento (foco,
teclado, posicionamento, overlay) inteiramente pro JS vanilla já existente
em `clarus-css/js/*`. Não reimplementa nada: os componentes deste pacote
só instanciam a classe vanilla correspondente sobre o elemento que o React
renderiza, e a desfazem (`dispose()`) no unmount.

**Só React nesta versão.** Vue/Svelte ficam de fora até haver uso real
validando o padrão — este pacote serve de molde pra replicar depois.

**Cobertura parcial, deliberada**: `Modal`, `Dropdown` e `Tabs` — os dois
formatos de contrato que os demais componentes de `clarus-js` seguem
(gatilho+painel vs. raiz única), suficientes pra provar o padrão. Os
demais componentes seguem o mesmo molde; abra uma issue se precisar de um
específico.

## Instalação

```bash
npm install clarus-react clarus-css react react-dom
```

## Modal

```jsx
import { ModalTrigger, ModalPanel } from "clarus-react";

function Example() {
  return (
    <>
      <ModalTrigger target="#meu-modal" className="cl-btn cl-btn-primary">
        Abrir modal
      </ModalTrigger>

      <ModalPanel id="meu-modal">
        <div className="cl-modal-header">
          <h3 className="cl-modal-title">Título</h3>
        </div>
        <div className="cl-modal-body">Conteúdo do modal.</div>
      </ModalPanel>
    </>
  );
}
```

## Dropdown

```jsx
import { DropdownTrigger, DropdownMenu } from "clarus-react";

function Example() {
  return (
    <div className="cl-dropdown">
      <DropdownTrigger target="#meu-menu" className="cl-btn" placement="bottom" align="start">
        Opções
      </DropdownTrigger>
      <DropdownMenu id="meu-menu">
        <a href="#" className="cl-dropdown-item">Editar</a>
        <a href="#" className="cl-dropdown-item">Excluir</a>
      </DropdownMenu>
    </div>
  );
}
```

## Tabs

```jsx
import { TabList } from "clarus-react";

function Example() {
  return (
    <>
      <TabList>
        <a href="#" className="cl-nav-link is-active" data-cl-target="#perfil">Perfil</a>
        <a href="#" className="cl-nav-link" data-cl-target="#seguranca">Segurança</a>
      </TabList>
      <div className="cl-tab-content">
        <div className="cl-tab-pane is-active" id="perfil">Conteúdo Perfil.</div>
        <div className="cl-tab-pane" id="seguranca">Conteúdo Segurança.</div>
      </div>
    </>
  );
}
```

## Limitação conhecida

`TabList` (e, em geral, qualquer wrapper sobre um componente vanilla que lê
seus filhos uma vez na construção) não re-escaneia sozinho se a lista de
filhos mudar dinamicamente depois do mount. Troque a prop `key` do
componente pra forçar um remount quando a lista de abas mudar de verdade.

## Licença

MIT
