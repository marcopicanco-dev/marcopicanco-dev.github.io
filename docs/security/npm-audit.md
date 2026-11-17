# Auditoria de dependências e exceções

O CI e o deploy rodam `npm run security:audit`, que executa
[scripts/security-audit.mjs](../../scripts/security-audit.mjs). O script roda
`npm audit --omit=dev` e bloqueia o build quando uma dependência de produção tem
alerta de severidade moderada ou maior.

Um alerta só deixa de bloquear se constar em
[scripts/audit-exceptions.json](../../scripts/audit-exceptions.json) com:

- `id`: o identificador GHSA do alerta;
- `package`: o pacote vulnerável. A exceção não vale para outro pacote com o
  mesmo alerta;
- `reason`: por que o trecho vulnerável não é alcançável neste site;
- `expires`: a data limite, no formato `AAAA-MM-DD`. No dia seguinte o alerta
  volta a bloquear.

Enquanto a exceção vale, o GitHub Actions mostra um aviso com o motivo. Se a
auditoria não conseguir rodar (falha de rede ou resposta inválida), o build
falha em vez de passar como limpo. As regras têm testes em
[tests/audit-policy.test.mjs](../../tests/audit-policy.test.mjs).

## Quando criar uma exceção

Só quando não existe versão corrigida e o risco não alcança o site publicado.
`npm audit fix --force` não é saída: costuma propor versões antigas, com
mudanças incompatíveis. Use prazos curtos, de cerca de 30 dias.

## Exceção atual

| Alerta                                                                   | Pacote      | Vale até   |
| ------------------------------------------------------------------------ | ----------- | ---------- |
| [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf) | `picomatch` | 17/12/2026 |

ReDoS no `picomatch` até a versão 4.0.7, a mais recente quando o alerta entrou
no `npm audit`, em 17/11/2026. O ataque exige que alguém envie um padrão de glob
malicioso. Aqui o `picomatch` roda apenas no build, dentro de Astro, Vite e
tinyglobby, com padrões escritos no repositório; o site publicado é HTML
estático.

## Ao vencer ou quando sair a correção

1. Veja se o alerta já indica uma versão corrigida.
2. Se houver, atualize com `npm update picomatch` (ou atualize o Astro quando ele
   trouxer a correção), espere a versão ter ao menos duas semanas de publicação
   e confirme com `npm run security`.
3. O script avisa quando uma exceção não corresponde mais a nenhum alerta.
   Remova-a do arquivo.
4. Se ainda não houver correção, reavalie o risco e só então renove a data.
