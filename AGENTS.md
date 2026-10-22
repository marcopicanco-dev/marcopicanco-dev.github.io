# Trabalho neste repositório

- Leia `docs/deployment.md` antes de alterar workflows ou preparar uma publicação.
- Comece alterações em uma branch de trabalho criada a partir de `develop`
  atualizado, por exemplo `feature/nome`, `fix/nome`, `docs/nome` ou `chore/nome`.
- Envie alterações por pull request para `develop`. Não faça push direto para
  `develop` nem para `main`, mesmo quando o GitHub permitir.
- Publique por PR de `develop` para `main`. Não faça merge de uma release sem
  autorização para publicar. O merge em `main` dispara o deploy de produção.
- Use merge commit em `develop` → `main` e `main` → `develop`, preservando o
  histórico compartilhado. Não exclua as branches permanentes.
- Execute lint, segurança e build antes de concluir. Uma mudança só documental
  pode usar o resultado do CI se o ambiente local não conseguir executar o build;
  informe qualquer limitação.
- Não enfraqueça a CSP nem remova verificações para obter um deploy verde.
- Regras em arquivos não substituem a proteção configurada em Settings do GitHub.
  Informe claramente quando uma configuração remota ainda estiver pendente.
