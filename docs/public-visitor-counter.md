# Contador público de visitantes

O rodapé de todas as páginas exibe uma estimativa acumulada de visitantes únicos
quando a integração com o GA4 está configurada. O componente acompanha as cores,
o símbolo geométrico e a tipografia do site nos temas claro e escuro.

O build consulta a métrica `totalUsers` do GA4 uma vez para todo o período, sem
somar usuários únicos de dias diferentes. O relatório considera os hosts
`www.marcopicanco.com` e `marcopicanco.com`, desde o início do histórico disponível
do GA4 até ontem, no fuso horário da propriedade. Ele não recupera acessos
anteriores à instalação do Analytics.

Esse total representa usuários estimados pelo Analytics, não pessoas físicas,
IPs ou aparelhos identificados com precisão. Só inclui acessos que o GA4
conseguiu registrar, respeitando o consentimento já existente no site.

## Ativar a integração

1. No Google Cloud, habilite a **Google Analytics Data API** em um projeto.
2. Crie uma conta de serviço dedicada. Ela não precisa receber papéis amplos de
   administração do projeto no Google Cloud.
3. No GA4, em **Administrador → Gerenciamento de acesso à propriedade**, adicione
   o e-mail dessa conta com o papel **Leitor (Viewer)** na propriedade do site.
4. Gere uma chave JSON para a conta de serviço. No repositório GitHub, abra
   **Settings → Secrets and variables → Actions → Secrets** e crie o segredo
   `GA4_SERVICE_ACCOUNT_JSON` com o conteúdo completo desse JSON. Não coloque a
   chave no código, em arquivos públicos, em comentários ou no chat.
5. Na aba **Variables** da mesma tela, crie `GA4_PROPERTY_ID` com o ID **numérico**
   da propriedade. Ele aparece nos detalhes da propriedade no GA4 e é diferente
   do ID de medição `G-89409729L9`.
6. Depois que esta alteração estiver na `main`, abra **Actions → Deploy to GitHub
   Pages → Run workflow**, escolhendo `main`. Confira o passo **Update public
   visitor count** e o resultado da publicação.

O workflow também roda diariamente por volta de **06:17, horário de São Paulo**
(`09:17 UTC`), sujeito aos atrasos do agendador do GitHub. O agendamento passa a
valer depois que o arquivo do workflow estiver na branch padrão. Em repositórios
públicos, o GitHub pode desabilitar agendamentos após 60 dias sem atividade;
nesse caso, reative o workflow em Actions. Não é uma atualização em tempo real.

Referências: [início rápido da API](https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart),
[métricas do GA4](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema),
[contas de serviço](https://developers.google.com/identity/protocols/oauth2/service-account),
[segredos do Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)
e [agendamentos](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule).

## Como funciona

- `npm run stats:update` autentica no Google com escopo somente de leitura e
  gera `src/data/public-visitor-count.json` durante o build de produção.
- O JSON contém somente `totalUsers`, `updatedAt` (hora da consulta em UTC) e
  `throughDate` (último dia incluído no fuso da propriedade).
- O Astro insere o número no HTML. O navegador não consulta a API, não recebe
  credenciais e não precisa de JavaScript adicional para mostrar o contador.
- O arquivo versionado contém valores `null`. O dado real é gerado no ambiente
  de publicação e não exige commits automáticos na `main`.
- A etapa com o segredo só roda na `main`. Os testes de pull requests usam
  respostas simuladas, sem acesso às credenciais.
- Se a configuração estiver ausente, a API falhar ou o relatório indicar
  amostragem ou supressão, o build limpa o número e o contador fica oculto.
  Uma falha na consulta não interrompe a publicação nem vira um zero fictício.
  Um zero confirmado pela API pode ser exibido normalmente.
- O link no contador explica a estimativa na política de privacidade. O total
  fica disponível para todos sem ativar a coleta de estatísticas de quem recusou
  os cookies.

## Verificar localmente

`npm run test:visitor-count` valida o relatório, a assinatura da autenticação,
o fuso horário, o comportamento em falhas e a ausência de credenciais na saída.
Não usa serviços externos. `npm run build` valida o componente Astro.

Sem as variáveis de integração, `npm run stats:update` deixa o contador oculto.
Para uma conferência visual, pode-se preencher o JSON temporariamente com um
número de demonstração, uma data ISO em `updatedAt` e uma data `AAAA-MM-DD` em
`throughDate`, e executar o build. Restaure os três valores para `null` antes de
versionar. Nunca publique números simulados como se fossem acessos reais.
