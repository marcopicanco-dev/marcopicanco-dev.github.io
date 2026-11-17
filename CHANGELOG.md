# Histórico de versões

As versões seguem o [versionamento semântico](https://semver.org/lang/pt-BR/):
mudanças maiores no site sobem o segundo número (1.1.0, 1.2.0) e correções
pontuais, o terceiro (1.1.1). O formato se baseia em
[Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [1.1.0] — 17/11/2026

Site em três idiomas, ajustes de SEO segundo o guia do Google e declaração de
acessibilidade.

### Adicionado

- Versões em inglês (`/en/`) e francês (`/fr/`). As bandeiras **Br**, **En** e
  **Fr** ao lado do Blog levam à mesma página no outro idioma ou, se o artigo
  ainda não tem tradução, ao blog daquele idioma.
- Tradução dos seis artigos, da política de privacidade e dos termos de uso, com
  diagramas e imagens de compartilhamento próprios de cada idioma. Nos textos
  legais traduzidos, um aviso informa que vale a versão em português.
- Uma discussão de comentários separada para cada idioma.
- `hreflang` e `x-default` em todas as páginas, e sitemap com os três idiomas.
- Declaração de acessibilidade em `/acessibilidade/`, nos três idiomas, inspirada
  na página do Mercado Livre: padrão adotado (WCAG 2.2 AA), recursos, testes,
  limitações conhecidas e canal para relatar problemas.
- Atalho **Relatar problema de acessibilidade** no topo de cada página, logo após
  “Pular para o conteúdo”, e link “Acessibilidade” no rodapé.
- Campo opcional `seoTitle` nos artigos, para um título mais curto nos
  resultados de busca.
- Auditoria de dependências que aceita apenas exceções com pacote, motivo e data
  de validade (`scripts/security-audit.mjs`), com testes.

### Alterado

- Os artigos “Jekyll vs Astro” e “Cloudflare Free” foram reorganizados em seções
  com subtítulos, nos três idiomas.
- O `security.txt` passou a indicar português, inglês e francês.
- Astro 7.4.8 e Node.js 22.23.5.
- Documentação nova ou revisada: idiomas ([docs/i18n.md](docs/i18n.md)), checklist
  do guia de SEO ([docs/seo.md](docs/seo.md)) e regras da auditoria
  ([docs/security/npm-audit.md](docs/security/npm-audit.md)).

### Corrigido

- Grafia de “Portfólio” e erros de digitação no artigo “Cloudflare Free”.
- O nome acessível das bandeiras de idioma e dos links “Ler artigo” agora
  começa pelo texto visível (WCAG 2.5.3).
- O aviso de cookies não encobre mais o elemento em foco (WCAG 2.4.11).
- Links que abrem nova aba avisam isso aos leitores de tela.

### Segurança

- [GHSA-mh32-jxcr-mh9f](https://github.com/advisories/GHSA-mh32-jxcr-mh9f)
  (Astro): corrigido com a atualização para o Astro 7.4.8.
- [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf)
  (`picomatch`): ainda sem correção. Aceito até 17/12/2026, porque o pacote só
  roda no build, com padrões do próprio repositório.

## [1.0.0] — 12/11/2026

Primeira versão do site atual, publicada em www.marcopicanco.com pelo GitHub
Pages, com a Cloudflare na frente.

### Site

- Página inicial com serviços, processo de trabalho, carrossel de projetos
  (HexaAlerts e Brasil Eleitoral), apresentação e contato.
- Página Sobre com trajetória profissional e formação.
- Identidade visual modernista, com temas claro e escuro e contraste medido.

### Blog

- Artigos em MDX com arquivo por mês, busca, tags, séries e comentários via Giscus.
- Artigos publicados: “Jekyll vs Astro”, a série em quatro partes sobre headers
  de segurança no GitHub Pages com Cloudflare e “Cloudflare Free na prática”.

### Segurança, privacidade e SEO

- Content Security Policy com hashes gerados no build e headers de segurança
  aplicados pela Cloudflare. Antes de cada deploy, o CI confere se o header da
  Cloudflare cobre o build.
- `security.txt`, testes de segurança, auditoria de dependências e Dependabot.
- Aviso de cookies conforme a LGPD: o Google Analytics só carrega após o aceite.
  Política de privacidade e termos de uso.
- Sitemap, URLs canônicas e marcação estruturada de artigos e perfil.
- Link para pular ao conteúdo, foco visível e respeito à preferência por menos
  movimento.

[1.1.0]: https://github.com/marcopicanco-dev/marcopicanco-dev.github.io/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/marcopicanco-dev/marcopicanco-dev.github.io/releases/tag/v1.0.0
