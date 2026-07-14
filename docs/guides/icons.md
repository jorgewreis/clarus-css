# Ícones

O Clarus CSS não embute nenhum ícone no pacote principal — ícone é
conteúdo, não estilo, e forçar um conjunto específico no core inflaria o
bundle de quem não usa. Em vez disso, há um pacote **opcional**,
`clarus-icons`, com 1994 ícones SVG do conjunto
[Lucide](https://lucide.dev) (licença ISC), mais uma classe utilitária
`.cl-icon` no `clarus-css` (sempre disponível, custo desprezível) pro
dimensionamento.

## Instalação

```bash
npm install clarus-icons
```

Zero dependências em runtime — o pacote é só arquivos `.svg` e módulos
`.js` gerados; `lucide-static` é usado apenas para gerar o pacote, nunca é
instalado por quem consome o `clarus-icons`.

## Uso — SVG puro (zero JS)

Cada ícone tem um arquivo próprio em `clarus-icons/svg/<nome>.svg`, já
com `class="cl-icon"` aplicada. Copie o conteúdo direto no seu HTML:

```html
<button type="button" class="cl-btn cl-btn-primary">
  <svg class="cl-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
  Salvar
</button>
```

Essa é a forma recomendada: nenhuma dependência de build, o SVG já nasce
otimizado (sem comentários, sem atributos redundantes).

## Uso — módulo JS (tree-shakeable)

Se seu projeto já usa um bundler (Vite, esbuild, Rollup, webpack), importe
só os ícones que usa — cada um é um módulo próprio, então o restante dos
1994 nunca entra no seu bundle final:

```js
import check from "clarus-icons/icons/check.js";

document.querySelector("#status-icon").innerHTML = check;
```

Ou pelo barrel, com nomes em camelCase (`arrow-right` → `arrowRight`):

```js
import { arrowRight, check } from "clarus-icons";
```

O pacote é publicado com `"sideEffects": false`, então bundlers modernos
eliminam os ícones não usados mesmo importando do barrel — mas prefira o
caminho direto (`clarus-icons/icons/check.js`) se seu bundler não fizer
tree-shaking de barrels corretamente.

## Dimensionamento e cor — `.cl-icon`

```html
<svg class="cl-icon cl-icon-lg" ...>...</svg>
```

| Classe | Tamanho |
|---|---|
| `.cl-icon` (padrão) | `1em` × `1em` — acompanha o `font-size` do elemento ao redor |
| `.cl-icon-xs` | 12px |
| `.cl-icon-sm` | 16px |
| `.cl-icon-lg` | 32px |
| `.cl-icon-xl` | 48px |

Cor: os ícones usam `stroke="currentColor"` — herdam a cor do texto
automaticamente. Para uma cor diferente do texto ao redor, aplique `color`
no elemento (ou num ancestral) como faria com qualquer texto.

## Ícones em componentes com JS

Componentes como [Combobox](../components/combobox.md) ou
[Command Palette](../components/command-palette.md) não têm nenhuma
integração especial com `clarus-icons` — você cola o SVG (ou injeta via
módulo JS) dentro da marcação normal do componente, exatamente como faria
com qualquer outro conteúdo:

```html
<li class="cl-dropdown-item" data-value="download">
  <svg class="cl-icon" ...>...</svg>
  Baixar arquivo
</li>
```

## Licença

O código de geração do pacote é MIT (mesma licença do Clarus). Os ícones
em si são do projeto Lucide, licença ISC — parte deles derivada do
projeto Feather (MIT). Ambos os avisos de copyright são distribuídos junto
do pacote (`LICENSE`/`LICENSE-LUCIDE.txt` em `node_modules/clarus-icons/`
depois de instalado).

Mockup: [`mockup/foundations.html#icons`](../../mockup/foundations.html#icons).
