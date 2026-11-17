# SEO: clientes, recrutadores e leitores

O objetivo é ajudar cada público a encontrar uma página que responda ao que
procura. As consultas abaixo são hipóteses para validar com os dados do Search
Console, sem estimativa de volume ou promessa de posição.

| Público      | Página de entrada                     | Exemplos de buscas a trabalhar                                          |
| ------------ | ------------------------------------- | ----------------------------------------------------------------------- |
| Clientes     | Inicial e futuras páginas de serviços | Criação de sites, desenvolvimento de sistemas web, integração de APIs   |
| Recrutadores | Sobre e projetos                      | Marco Picanço, desenvolvedor Full Stack Ruby on Rails                   |
| Leitores     | Artigos e arquivo do blog             | Jekyll vs Astro, headers de segurança no GitHub Pages, Cloudflare e CSP |

## Base técnica implementada

- Sitemap automático: `sitemap-index.xml` aponta para `sitemap-0.xml`, que lista
  as páginas canônicas e os artigos gerados pelo Astro.
- `robots.txt` e o cabeçalho HTML anunciam o sitemap.
- O site tem versões em inglês (`/en/`) e francês (`/fr/`). Cada página traz
  `hreflang` para as versões que existem e `x-default` para o português, e o
  sitemap repete essas ligações. Detalhes em [i18n.md](i18n.md).
- `/portfolio/`, `/pt/` e `/sr/` redirecionam para a página inicial com meta
  refresh imediato, que o Google trata como redirecionamento permanente. Elas
  ficam fora do sitemap.
- Títulos específicos para a inicial, Sobre e blog; descrições dos dois artigos
  iniciais revisadas conforme o conteúdo existente.
- Quando o título de um artigo é longo demais para o resultado de busca, o
  frontmatter pode trazer `seoTitle`, usado apenas no `<title>`. O h1 e os
  cartões de redes sociais mantêm `title`. A série de headers de segurança usa
  esse campo para que o número da parte apareça antes do corte.
- Os artigos usam sua própria imagem de capa nos metadados de compartilhamento,
  com alternativa para a imagem geral do site.
- Artigos têm marcação `BlogPosting`, com título, descrição, autor, data visível
  e imagem quando existente. O autor aponta para `/sobre/`.
- Sobre tem marcação `ProfilePage` e `Person`, com nome, função, imagem e perfis
  públicos já apresentados na página.

A marcação usa microdata no HTML, formato aceito pelo Google, sem scripts inline
adicionais. Ela descreve o conteúdo real; não promete resultados enriquecidos.
As URLs dos artigos publicados foram preservadas, com uma exceção: o roteiro de
Python foi substituído pelo artigo Cloudflare Free, em
`/cloudflare-free-seguranca-desempenho-metricas/`. A URL antiga redireciona para a
nova publicação pelo HTML estático gerado pelo Astro e fica fora do sitemap.

Referências: [sitemaps no Astro](https://docs.astro.build/en/guides/integrations-guide/sitemap/),
[URLs canônicas](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls),
[artigos](https://developers.google.com/search/docs/appearance/structured-data/article)
e [páginas de perfil](https://developers.google.com/search/docs/appearance/structured-data/profile-page).

## Guia de SEO do Google: como o site atende

Revisão feita em novembro de 2026 com base no
[guia de introdução](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

| Recomendação do guia                         | Situação no site                                                                                    |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Google encontra o conteúdo                   | Sitemap, `robots.txt` liberado e links internos entre artigos, tags e séries.                       |
| Google vê a página como o visitante          | CSS e JavaScript públicos; idioma pela URL, sem redirecionar por localização.                       |
| URLs descritivas                             | Caminhos com palavras do título. Traduções mantêm o caminho português com o prefixo do idioma.      |
| Uma URL por conteúdo                         | Canonical em todas as páginas; URLs antigas redirecionam e ficam fora do sitemap.                   |
| Conteúdo fácil de ler e organizado           | Artigos divididos em seções com subtítulos reais, nas três línguas.                                 |
| Links com texto descritivo                   | Nenhum link "clique aqui"; comentários ficam no iframe do Giscus, fora das páginas do site.         |
| Títulos únicos, claros e concisos            | Nenhum título repetido; `seoTitle` encurta os títulos longos da série.                              |
| Meta description única de uma ou duas frases | Uma descrição própria por página e idioma.                                                          |
| Imagens perto do texto, com `alt` descritivo | Capas e diagramas com `alt`; logotipos decorativos usam `alt` vazio ao lado do nome da instituição. |
| Sem intersticiais que atrapalhem a leitura   | Só o aviso de cookies, que responde a uma obrigação legal.                                          |
| Não focar em meta keywords                   | O site não usa a tag `keywords`.                                                                    |

Fica fora do código: divulgar os artigos (GitHub, LinkedIn, comunidades) e
acompanhar o Search Console por algumas semanas antes de avaliar uma mudança.

## Configurar o Google Search Console

O Analytics mede o que acontece após a visita. O Search Console mostra consultas,
impressões, cliques e informações de indexação no Google.

1. Acesse o [Search Console](https://search.google.com/search-console/) com sua
   conta Google. Se a propriedade já existir, abra-a.
2. Para uma nova propriedade, escolha **Domínio** e informe `marcopicanco.com`.
3. Siga a verificação oferecida pelo Google. Se for necessário um registro TXT,
   adicione em **Cloudflare → DNS → Registros**, no domínio raiz (`@`), o valor
   fornecido pelo Search Console, e conclua a verificação no Google.
4. Após publicar o sitemap, envie
   `https://www.marcopicanco.com/sitemap-index.xml` em **Sitemaps**.
5. Use **Inspeção de URL** para conferir a inicial, Sobre, blog e um artigo.
6. Acompanhe **Indexação de páginas** e **Desempenho** para identificar erros e
   as consultas que já trazem impressões e cliques.

Referências: [verificar a propriedade](https://support.google.com/webmasters/answer/9008080)
e [usar Search Console com Analytics](https://developers.google.com/search/docs/monitor-debug/google-analytics-search-console).

## Próximas melhorias de conteúdo

1. Criar páginas próprias para serviços que tenham uma oferta concreta: criação
   de sites, desenvolvimento com Rails e integrações. Explicar para quem cada
   serviço serve, o problema resolvido, escopo, processo e contato.
2. Publicar um estudo de caso do HexaAlerts no próprio domínio, com as imagens,
   decisões e desafios reais já apresentados no portfólio. Relacionar o projeto
   aos serviços e à trajetória profissional.
3. Acompanhar as consultas e dúvidas trazidas pelo artigo Cloudflare Free para
   orientar novos textos com exemplos práticos de DNS, cache e métricas.
4. Continuar os temas em que há experiência demonstrável. Os artigos de
   Cloudflare, segurança e sites estáticos já partem de um problema real.
5. Ligar artigos, projetos, serviços e Sobre quando a relação ajudar a leitura.
   Divulgar os conteúdos em GitHub, LinkedIn e comunidades pertinentes.

Avalie quais páginas recebem impressões, quais consultas geram cliques e quais
visitas orgânicas resultam em cliques de contato. A inspeção local não revela
quais URLs estão indexadas na sua propriedade; essa confirmação vem do Search
Console. Mudanças podem levar semanas ou mais para mostrar efeito.

Veja o [guia de SEO do Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).
