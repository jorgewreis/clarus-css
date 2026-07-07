# clarus-icons

Pacote de ícones SVG **opcional** para o [Clarus CSS](https://github.com/jorgewreis/clarus-css) —
1994 ícones do conjunto [Lucide](https://lucide.dev) (licença ISC),
gerados em dois formatos, sem nenhuma dependência em runtime.

Instalação e uso completo: [`docs/guides/icons.md`](https://github.com/jorgewreis/clarus-css/blob/main/docs/guides/icons.md)
no repositório principal.

## Instalação

```bash
npm install clarus-icons
```

## Uso — SVG puro (zero JS)

```html
<div class="cl-icon-check"><!-- cole o conteúdo de svg/check.svg aqui --></div>
```

Ou sirva os arquivos de `node_modules/clarus-icons/svg/*.svg` diretamente
(`<img src="...">`, `background-image`, etc.).

## Uso — módulo JS (tree-shakeable)

```js
import check from "clarus-icons/icons/check.js";

document.querySelector("#slot").innerHTML = check;
```

Ou, via o barrel (nomes em camelCase, `arrow-right` → `arrowRight`):

```js
import { arrowRight, check } from "clarus-icons";
```

Cada ícone já vem com `class="cl-icon"` e `stroke="currentColor"` — a cor
acompanha o `color` do CSS herdado; tamanho/cor customizados via a classe
utilitária `.cl-icon` do `clarus-css` (ou seu próprio CSS).

## Licença

Código deste pacote (script de geração, `index.js`): MIT (ver `LICENSE`).
Os ícones em si são do projeto [Lucide](https://lucide.dev), licença ISC
(ver `LICENSE-LUCIDE.txt`) — parte deles é derivada do projeto Feather
(MIT), atribuição preservada no mesmo arquivo.
