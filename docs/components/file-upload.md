# File Upload

Botão de seleção de arquivo estilizado (o `<input type="file">` nativo não
é estilizável) — CSS-only na base, com arrastar-e-soltar opcional via JS.

## Visão geral

```html
<div class="cl-file-upload">
  <input type="file" class="cl-file-input" id="arquivo">
  <label for="arquivo" class="cl-file-label">Escolher arquivo</label>
</div>
```

Mesma técnica de input oculto + label irmã dos outros controles
CSS-only — `for`/`id` é o que faz o clique na label abrir o seletor de
arquivo nativo.

## Anatomia

`.cl-file-upload` (wrapper) > `.cl-file-input` (`<input type="file">`,
oculto via clip) + `.cl-file-label` (`<label for="...">`, o botão
visível).

## Variações

- **Tamanho**: `.cl-file-label-sm`, `.cl-file-label-lg`; sem sufixo =
  padrão.
- **Dropzone**: `.cl-file-label-dropzone` — versão maior, borda tracejada,
  layout em coluna, pra uma área de soltar mais generosa que o botão
  padrão. Combine com `.cl-file-dropzone-hint` pra um texto de apoio
  discreto dentro.

```html
<div class="cl-file-upload" style="width: 100%;">
  <input type="file" class="cl-file-input" id="arquivo2" data-cl="file-drop">
  <label for="arquivo2" class="cl-file-label cl-file-label-dropzone">
    Arraste um arquivo ou clique para escolher
    <span class="cl-file-dropzone-hint">PNG, JPG até 5MB</span>
  </label>
</div>
```

## Estados

- `:disabled` no input — opacidade reduzida, sem interação.
- `:focus` no input — anel de foco na label.
- `.is-dragover` na label — aplicada pelo JS de drag-and-drop enquanto um
  arquivo é arrastado por cima (ver API JS).

## A11y

`<input type="file">` nativo — totalmente operável por teclado (`Tab`
foca, `Enter`/`Space` abre o seletor do sistema) sem nenhum JS. O
drag-and-drop é um **complemento**, não uma alternativa obrigatória — quem
usa teclado sempre tem o clique na label como caminho.

## API JS

Drag-and-drop é opcional, via `data-cl="file-drop"` **na `<label>`** (não
no input). `FileDrop.getInstance(labelEl)`.

| Método | Descrição |
|---|---|
| `dispose()` | Remove os listeners de drag/drop e desregistra a instância. |

Sem eventos customizados — ao soltar um arquivo, o JS atribui
`inputEl.files` e dispara o evento nativo `change` no input (mesmo evento
de uma seleção manual, então seu código de validação/upload não precisa
saber a diferença).

```js
document.getElementById("arquivo2").addEventListener("change", (event) => {
  console.log(event.target.files);
});
```

## Tokens

`--cl-color-border`, `--cl-color-subtle`, `--cl-color-text`,
`--cl-color-muted` (hint), `--cl-color-primary` (borda durante drag-over),
`--cl-radius-sm`.

## Exemplo

Ver acima (Visão geral e Variações) — mockup completo em
[`mockup/file-drop.html`](../../mockup/file-drop.html).

## Variante avançada (múltiplos arquivos)

Pra upload de múltiplos arquivos com preview, progresso e remoção por
item, veja [Upload avançado](file-upload-advanced.md) — evolução deste
componente, reaproveitando a mesma dropzone/botão como gatilho.
