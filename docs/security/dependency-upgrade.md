# Atualização das dependências de segurança

O CI falhava em `npm run security:audit`, depois de aprovar o TypeScript e os
seis testes de segurança. O lockfile mantinha versões vulneráveis do Astro e
de dependências transitivas. O comando da auditoria continua sendo
`npm audit --audit-level=moderate --omit=dev`.

## Alterações

- Astro 7.4.0 e atualização das dependências dentro das faixas compatíveis,
  incluindo Sharp, Vite e pacotes transitivos apontados pela auditoria.
- Tailwind CSS 4.3.3 com `@tailwindcss/vite`. O arquivo de configuração existente
  é carregado explicitamente por `@config`; o antigo plugin PostCSS e o
  Autoprefixer foram removidos.
- Node.js definido em `.nvmrc` e npm 12.2.0 em `packageManager`, utilizados nos
  workflows de CI e publicação. O lockfile foi regenerado e validado com
  instalação limpa usando essas mesmas versões.
- Override limitado a `@expressive-code/core` para usar `postcss-nested` 7.0.2
  ou uma versão compatível da série 7. Essa versão utiliza
  `postcss-selector-parser` 7, cuja resolução atualizada elimina o alerta da
  cadeia do Expressive Code. A API do plugin continua baseada em PostCSS 8.

O override é necessário enquanto o Expressive Code declarar `postcss-nested` 6. Ele deve ser revisto quando o pacote atualizar essa dependência. A migração
é verificada pelo build dos seis artigos e pela renderização dos blocos de
código no navegador.

## Verificação

```sh
npm ci
npm run lint
npm run security
npm run build
```

As verificações acima passaram após a instalação limpa. O navegador aprovou
21 verificações responsivas, 17 verificações de acessibilidade com axe e seis
grupos de interações. A comparação de medidas, tipografia, cores e espaçamento
da página inicial, do blog e de um artigo, em 390 e 1440 px, não encontrou
diferenças. Essas verificações automáticas não equivalem a uma auditoria
completa de acessibilidade.

A auditoria de produção passou a retornar zero vulnerabilidades. A auditoria
com dependências de desenvolvimento incluídas ainda aponta alertas nas cadeias
do CLI do axe, do plugin de tipografia e do plugin de lint do Astro; eles não
estão excluídos por overrides nem por alterações no nível de severidade.

Referências: [instalação do Tailwind no Astro](https://tailwindcss.com/docs/installation/framework-guides/astro),
[migração para Tailwind 4](https://tailwindcss.com/docs/upgrade-guide) e
[mudanças do postcss-nested 7](https://github.com/postcss/postcss-nested/releases/tag/7.0.0).
