# Guia de migração para v1.0.0

A v1.0.0 renomeia mecanicamente toda a API pública do Clarus CSS para evitar
colisão com classes de terceiros na mesma página. É a única mudança
breaking desta versão — nenhum componente foi removido ou teve
comportamento alterado.

Não mudam: o global `window.Clarus` e o nome do pacote npm `clarus-css`.

## O que muda

| Categoria | Antes | Depois | Exemplo |
|---|---|---|---|
| Classe de componente/layout | sem prefixo | `cl-` | `.btn` → `.cl-btn`, `.dropdown-menu` → `.cl-dropdown-menu`, `.container`/`.row`/`.col-*` → `.cl-container`/`.cl-row`/`.cl-col-*` |
| Classe utilitária | sem prefixo | `u-` | `.d-flex` → `.u-d-flex`, `.mt-3` → `.u-mt-3` |
| Estado controlado por JS | variava | `is-*` | `.show` → `.is-open`, `.active` → `.is-active`, `.disabled` → `.is-disabled` |
| Tokens CSS | `--clarus-*` | `--cl-*` | `--clarus-color-primary` → `--cl-color-primary` |
| Atributo de auto-init | `data-clarus` | `data-cl` | `data-clarus="modal"` → `data-cl="modal"` |
| Atributos de alvo/dispensa | `data-target`/`data-dismiss` | `data-cl-target`/`data-cl-dismiss` | `data-target="#foo"` → `data-cl-target="#foo"` |
| Eventos DOM customizados | `clarus:*` | `cl:*` | `clarus:modal:shown` → `cl:modal:shown` |

`.is-valid`/`.is-invalid` (validação de formulário) e `.is-dragover`
(file-drop) já seguiam a convenção `is-*` antes da v1 — não mudam.

## Rodando o codemod

O pacote inclui um codemod que aplica essas substituições em arquivos
HTML/JS (`class="..."`, `data-clarus`/`data-target`/`data-dismiss`, tokens
`--clarus-*` em `<style>`/JS, e strings de evento `clarus:*`):

```bash
node node_modules/clarus-css/scripts/migrate-v1.mjs caminho/para/seu/projeto --dry-run
node node_modules/clarus-css/scripts/migrate-v1.mjs caminho/para/seu/projeto
```

- `--dry-run` só lista os arquivos que seriam alterados, sem escrever nada.
- Sem `--dry-run`, sobrescreve os arquivos in-place — rode com o working
  tree do seu projeto limpo (git) para poder revisar o diff depois.
- A substituição de classes é por correspondência **exata de token**: o
  codemod só troca tokens que batem com um nome antigo conhecido do Clarus
  (`scripts/migrate-v1-map.json`, ~1360 pares gerados diretamente da
  renomeação). Uma classe sua com o mesmo nome de uma classe antiga do
  Clarus (ex.: você também tinha uma `.card` própria) seria trocada por
  engano — **revise o diff antes de commitar**.
- O codemod não cobre CSS que você escreveu contra o seletor antigo (ex.:
  `.btn { ... }` no seu próprio stylesheet, sobrescrevendo o Clarus) — isso
  precisa de ajuste manual, com a tabela acima como referência.

## Checklist de migração manual

1. Rode o codemod (acima) na sua base HTML/JS.
2. Busque no seu CSS por seletores que dependam das classes antigas do
   Clarus (não só sobre elas, mas herdando de `--clarus-*`) e atualize para
   os novos nomes/tokens.
3. Se você escuta os eventos customizados do Clarus
   (`addEventListener("clarus:...")`), confirme que o codemod pegou todas as
   strings — ele só reescreve literais entre aspas.
4. Rode sua suíte de testes/visual regression e confira manualmente os
   componentes interativos (modal, dropdown, tabs, offcanvas) — o
   comportamento não muda, só os seletores.
5. Se você customizava o framework via `--clarus-*` num stylesheet próprio
   (não gerado pelo codemod, por não estar em HTML/JS), atualize esses
   arquivos `.css` manualmente para `--cl-*`.
