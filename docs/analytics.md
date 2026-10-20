# Estatísticas com Google Analytics 4

O site usa o fluxo web `G-EELP6HSE1R`. Os relatórios ficam no
[painel privado do Google Analytics](https://analytics.google.com/), acessível
pela conta Google com permissão nessa propriedade.

## Coleta

O layout compartilhado inclui `public/scripts/google-analytics.js` nos builds de
produção. O script só inicializa o GA4 em HTTPS nos hosts `www.marcopicanco.com`
e `marcopicanco.com`. Desenvolvimento local e previews em outros hosts não enviam
dados, mesmo quando usam o build de produção.

O carregamento de `gtag.js` é assíncrono. A configuração é colocada na fila antes
de carregar a biblioteca. O `page_view` inicial fica a cargo do próprio GA4;
não há envio manual adicional. Tempo de engajamento também é coletado pelo GA4.
Google Signals e sinais de personalização de anúncios ficam desativados na
configuração do site.

Os cliques identificados no HTML usam os seguintes eventos:

| Evento          | Quando ocorre                                              | Parâmetros                        |
| --------------- | ---------------------------------------------------------- | --------------------------------- |
| `contact_click` | Clique em um canal de contato por e-mail ou LinkedIn       | `contact_method`, `link_location` |
| `project_click` | Clique na imagem, arquitetura ou repositório do HexaAlerts | `project_id`, `link_location`     |

Os parâmetros dos eventos personalizados contêm apenas identificadores definidos
no código. Não incluem o endereço de e-mail, assunto da mensagem, texto do link
ou URL de destino. `contact_click` mede a abertura do canal; não confirma o envio
de uma mensagem. Links de navegação para `#contato` não disparam esse evento.

Para instrumentar novos links, use `data-analytics-contact="email"` ou
`data-analytics-contact="linkedin"` para contato, ou
`data-analytics-project="identificador_do_projeto"` para projetos. Defina também
`data-analytics-location` com um identificador do local do link na página.

## Publicação e CSP do Cloudflare

A CSP do Astro permite os destinos necessários ao GA4 sem recursos de anúncios,
seguindo a [documentação do Google](https://developers.google.com/tag-platform/security/guides/csp#google_analytics).
A inicialização usa um arquivo do próprio site, sem adicionar scripts inline.

O domínio também recebe um cabeçalho CSP do Cloudflare. É necessário atualizar
esse cabeçalho para permitir os novos destinos; a política no HTML não substitui
o cabeçalho HTTP. Gere o valor completo após o build:

```sh
rtk npm run build
rtk npm run security:csp
```

No Cloudflare, edite a regra de transformação dos cabeçalhos de resposta:

- Operação: `Set static`.
- Nome: `Content-Security-Policy`.
- Valor: a linha completa emitida por `security:csp`, sem as mensagens do npm.

Veja [as instruções de segurança](security/production-headers.md) para os demais
cabeçalhos. Após publicar e atualizar o Cloudflare, valide com:

```sh
rtk npm run security:headers
```

## Conferência no painel

1. Abra o site publicado em uma janela sem bloqueadores de analytics.
2. No Google Analytics, abra o relatório **Tempo real** da propriedade.
3. Visite a página inicial, o blog e um artigo; confira os eventos `page_view`.
4. Clique em um link de contato e em um link do HexaAlerts; confira
   `contact_click` e `project_click`.

Para analisar os parâmetros personalizados nos relatórios e explorações, crie
dimensões personalizadas com escopo de evento para `contact_method`,
`link_location` e `project_id` em **Administrador → Exibição de dados → Definições
personalizadas**. Os eventos e parâmetros podem ser conferidos primeiro em
Tempo real. Veja a [documentação de parâmetros de eventos](https://developers.google.com/analytics/devguides/collection/ga4/event-parameters).

Os relatórios passam a receber os acessos coletados após a publicação; essa
integração não recupera visitas anteriores à instalação.
