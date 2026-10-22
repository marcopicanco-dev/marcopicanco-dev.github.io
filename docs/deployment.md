# Desenvolvimento e publicação

O site público em `https://www.marcopicanco.com` é publicado pelo GitHub Pages.
As mudanças seguem duas etapas de integração:

| Branch                                    | Finalidade                                             | Publica em produção?                     |
| ----------------------------------------- | ------------------------------------------------------ | ---------------------------------------- |
| `feature/*`, `fix/*`, `docs/*`, `chore/*` | Uma alteração por branch, criada a partir de `develop` | Não                                      |
| `develop`                                 | Integração das alterações por pull request             | Não                                      |
| `main`                                    | Versão aprovada para publicação                        | Sim, depois das verificações do workflow |

`develop` é uma branch de integração. Ela não cria automaticamente um ambiente de
homologação com outra URL. A conferência visual pode ser feita localmente com
`npm run preview`; um ambiente hospedado de preview exige configuração própria.

## Ativar as proteções no GitHub

**Os workflows e os arquivos JSON deste repositório não ativam regras remotas por
conta própria.** Antes de considerar a migração concluída, configure as regras em
Settings com uma conta administradora e confira o resultado.

1. Garanta que `develop` exista, criada a partir da `main` atual.
2. Abra o PR de implantação deste fluxo para `develop` e aguarde o CI registrar
   os checks `checks` e `branch-policy` com sucesso.
3. Em **Settings → Rules → Rulesets**, importe
   [`main.json`](rulesets/main.json) e [`develop.json`](rulesets/develop.json)
   em **New ruleset → Import a ruleset**. Confira os alvos antes de salvar.
4. Mantenha os dois rulesets **Active**, sem atores na lista de bypass.
   Exija PR, resolução das conversas, os dois checks e branch atualizada antes
   do merge. Quando a interface permitir selecionar a origem dos checks,
   escolha **GitHub Actions**.
5. Em **Settings → Environments → github-pages**, limite
   **Deployment branches and tags** a **Selected branches and tags**, com a regra
   de branch `main`. Não adicione regra de tag.
6. Em **Settings → Pages**, confirme **Source: GitHub Actions**. A branch padrão
   do repositório continua sendo `main`.
7. Integre o PR em `develop`; depois abra `develop` → `main` e publique após
   revisar os checks. Não faça um commit direto em `main` para instalar o fluxo.

As regras preparadas bloqueiam exclusão e force push de `main` e `develop` e
exigem PR sem obrigar uma segunda pessoa a aprovar. O autor não consegue aprovar
o próprio PR; exigir uma aprovação externa bloquearia o trabalho individual.
Quando houver outro mantenedor, a exigência pode subir para uma aprovação.

Os rulesets novos se somam aos existentes. O ruleset `macapa`, observado na
migração, já bloqueia exclusão e force push em todas as branches. Isso também
pode impedir a exclusão de branches de trabalho após o merge; não remova essa
proteção para contornar um bloqueio sem revisar seus alvos.

Não habilite a exclusão automática de branches de origem: `develop` é permanente
e será origem das releases. Não exija histórico linear, pois usamos merge commits
nas sincronizações entre as duas branches permanentes.

## Começar uma alteração

Com Node e npm configurados conforme o README:

```sh
git fetch origin
git switch develop
git pull --ff-only origin develop
git switch -c feature/nome-da-alteracao
npm ci
npm run dev
```

Se `develop` ainda não existir localmente, use `git switch --track origin/develop`
na primeira vez. Para artigos, use um nome como `docs/artigo-idempotencia`;
para correções, `fix/menu-mobile`.

Antes de enviar:

```sh
npm run lint
npm run security
npm run build
npm run preview
```

Confira as páginas afetadas, inclusive nos temas claro e escuro e no celular.
O servidor de preview permanece em execução até ser interrompido.

```sh
git add caminho/dos/arquivos-alterados
git commit -m "Descreve a alteração"
git push -u origin feature/nome-da-alteracao
```

Abra o PR escolhendo **base: develop**. O GitHub pode sugerir `main`, por ser a
branch padrão; altere o destino. Depois que os checks passarem e a mudança for
revisada, integre em `develop`. Esse merge não publica o site.

## O que o CI valida

- PRs para `develop` e `main`, inclusive após mudar o destino do PR.
- Pushes em `develop`, verificando a versão integrada.
- Rota de publicação: PR para `main` precisa vir de `develop` **deste repositório**.
  Uma branch homônima em um fork não atende à regra.
- Lint, tipagem, testes de segurança, auditoria das dependências de produção e build.
- Compatibilidade do build com a CSP de produção nos PRs para `main`.

O job `branch-policy` precisa ser obrigatório junto com `checks`; executar um CI
sem torná-lo obrigatório não impede um merge com falha. Os workflows operam com
leitura do conteúdo. Somente o job que publica recebe `pages: write` e
`id-token: write`.

O Dependabot envia atualizações de versão de npm e Actions para `develop`.
Atualizações de segurança podem continuar direcionadas à branch padrão pelo
GitHub; nesses casos, altere a base do PR para `develop` e confira o novo CI.

## Publicar uma versão

1. Aguarde os checks do último commit de `develop` e confira o build localmente.
2. Abra um PR com **base: main** e **compare: develop**. Revise o conjunto de
   alterações: tudo que estiver em `develop` nessa comparação será publicado.
3. Aguarde `branch-policy` e `checks`. Se necessário, atualize a CSP conforme a
   seção seguinte e reexecute o CI do mesmo commit.
4. Use **Create a merge commit**. Não use squash nem rebase na promoção
   `develop` → `main`, para preservar a relação entre as branches permanentes.
5. Acompanhe **Deploy to GitHub Pages**, incluindo `production-security`.
   Abra o site, confira navegação, artigos e console do navegador.
6. Abra um PR de `main` para `develop` e use **Create a merge commit**, trazendo
   o commit da release de volta antes de começar o próximo trabalho.

Não exclua `develop`. Para evitar que a release mude durante a revisão, conclua a
publicação antes de integrar mais alterações nessa branch. Novos commits exigem
nova conferência dos checks e do diff.

O disparo manual do workflow em outra branch não executa o build de publicação
nem o deploy. Na `main`, o disparo manual repete a publicação com as validações.
Isso não substitui as restrições do environment `github-pages`.

## CSP da Cloudflare durante uma release

Mudanças de scripts e estilos inline podem gerar hashes novos. O desenvolvimento
deve conseguir construir essas mudanças antes da atualização da regra em produção.
Por isso, a comparação da CSP com o domínio público roda no PR de release e no
deploy, em vez de bloquear os PRs de desenvolvimento.

Se `security:edge-csp` falhar, o resumo do job apresenta a política de transição
que inclui os tokens atuais e os do novo build. Confira o valor, atualize o header
na Cloudflare e reexecute o CI. Não resolva o bloqueio liberando `unsafe-inline`
ou removendo a verificação.

O comportamento existente de `check-edge-csp.mjs` é mantido: se o domínio estiver
inacessível ou não entregar o header, ele emite um aviso e não bloqueia o build.
A checagem posterior continua necessária. Uma falha em `production-security`
acontece **depois** da publicação e não executa rollback automático.

## Corrigir ou reverter uma publicação

Uma correção urgente também começa em uma branch a partir de `develop` e passa
por PR para `develop` e release para `main`. Confira se há outras mudanças ainda
não prontas em `develop`, pois a release inclui todas elas.

Para desfazer uma alteração já publicada, crie `fix/reverter-alteracao` a partir
de `develop` atualizada e use `git revert` no commit que introduziu o problema.
Para um merge commit, confira os pais antes de usar `git revert -m 1 <sha>`.
Abra os dois PRs habituais e acompanhe a nova publicação. Não use reset ou
force push nas branches permanentes.

Se a CSP também foi alterada, mantenha temporariamente os hashes necessários às
páginas que ainda possam estar em cache e confira a política do build de reversão.

## Referências

- [Rulesets e disponibilidade por plano](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
- [Criação e importação de rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository)
- [Configuração de environments e restrições de deploy](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments)
- [Aprovação de pull requests](https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/approving-a-pull-request-with-required-reviews)
- [Opções do Dependabot](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/dependabot-options-reference#target-branch)
