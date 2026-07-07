# Guia Interno de Comandos — Clarus CSS

Guia de referência rápida para uso pessoal no terminal: git/GitHub, npm e
build. Não é documentação pública do projeto (isso é papel do README).

## Ambiente

Node.js pode não estar no `PATH` da sessão do terminal. Se `node -v` / `npm -v`
derem "command not found", aponte o `PATH` para a pasta onde o Node está
instalado (ex.: `%USERPROFILE%\node`), em PowerShell:

```powershell
$env:PATH = "$env:USERPROFILE\node;$env:PATH"
```

Para não repetir isso sempre, adicione essa pasta de forma permanente ao PATH
do Windows (Configurações > Sistema > Variáveis de Ambiente).

Remote configurado no repositório: `work` → `https://github.com/jorgewreis/clarus-css.git`.

## Fluxo diário (git)

```bash
# ver o que mudou
git status
git diff

# stage seletivo (evite "git add -A" se não revisou tudo)
git add caminho/do/arquivo

# commit
git commit -m "mensagem no imperativo, explicando o porquê"

# sincronizar com o GitHub
git fetch work
git push work main
```

Se `git fetch work` mostrar `behind`, rode `git pull work main` antes do
push (ou `git merge work/main` se preferir revisar antes).

## Branches

```bash
# nova branch a partir da main
git checkout -b feature/nome-da-mudanca

# voltar pra main e atualizar
git checkout main
git pull work main

# apagar branch local já mergeada
git branch -d feature/nome-da-mudanca
```

## Build, lint e watch

```bash
npm install            # instala dependências (roda depois de clonar ou puxar mudanças no package.json)
npm run build          # gera dist/css e dist/js a partir de scss/ e js/
npm run watch          # rebuild automático ao salvar arquivos em scss/ ou js/
npm run lint           # stylelint em scss/**/*.scss
npm test               # testes funcionais (Vitest + jsdom)
npm run test:visual    # testes de regressão visual (Playwright)
```

`npm run build` sempre limpa `dist/` antes (script `clean`), então não
precisa rodar `clean` manualmente.

### Baselines visuais por plataforma

Os testes visuais geram screenshots de baseline por plataforma (sufixo
`-win32`/`-linux`). O CI roda em `ubuntu-latest`, então as baselines `-linux`
precisam ser geradas num container Docker que bate com o ambiente do CI (mesma
versão do Playwright), sem tocar no `node_modules` do host:

```bash
docker run --rm \
  -v "$PWD":/work -v /work/node_modules -w /work \
  mcr.microsoft.com/playwright:v1.61.1-noble \
  bash -c "npm ci && npx playwright test tests/visual/mockups.spec.mjs -g '<mockup>' --update-snapshots"
```

No Git Bash do Windows, prefixe com `MSYS_NO_PATHCONV=1` e use o caminho
absoluto no formato `/d/...`. As baselines `-win32` são geradas localmente com
`npm run test:visual -- --update-snapshots`.

## Versionamento (semver)

```bash
# bump de versão (atualiza package.json, package-lock.json e cria tag git vX.Y.Z)
npm version patch   # correções   0.1.0 -> 0.1.1
npm version minor   # features   0.1.0 -> 0.2.0
npm version major   # breaking   0.1.0 -> 1.0.0

# depois do bump, subir o commit + a tag
git push work main --follow-tags
```

## Publicação no npm

Rodar sempre a partir da branch `main` já sincronizada e com o build
funcionando (`npm run build` e `npm run lint` sem erro).

```bash
# login (uma vez por máquina, ou quando expirar)
npm login

# conferir com qual usuário está logado
npm whoami

# ver exatamente o que seria publicado (sem publicar)
npm pack --dry-run

# publicar de fato (publishConfig.access já está "public" no package.json)
npm publish

# publicar uma pré-release (ex: 0.2.0-beta.1), sem virar "latest"
npm publish --tag beta
```

`prepublishOnly` já roda `npm run build && npm test` automaticamente antes
de qualquer `npm publish` — se o build ou o lint falhar, a publicação é
abortada.

**Nunca rode `npm unpublish` em pacotes com mais de 72h publicados** — o
npm restringe/impede isso por padrão; trate erros de publicação com uma
nova versão de patch em vez de tentar apagar a anterior.

## Atalho: commit + sync numa linha

```bash
git add caminho1 caminho2 && git commit -m "mensagem" && git push work main
```

## Checklist antes de publicar uma nova versão

1. `git status` limpo (nada pendente).
2. `npm run lint` e `npm run build` passando.
3. `CHANGELOG.md` atualizado com o que mudou.
4. `npm version <patch|minor|major>`.
5. `git push work main --follow-tags`.
6. `npm publish`.
