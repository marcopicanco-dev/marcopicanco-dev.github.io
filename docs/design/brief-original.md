# Marco Picanço — proposta de identidade visual e layout

Versão 1.0 · 17 de outubro de 2026  
Status: proposta para escolha de direção. O site público permanece sem alterações.

## 1. Objetivo

Reposicionar a apresentação de Marco Picanço como prestador de serviços de desenvolvimento web e de aplicativos, com uma identidade minimalista, pessoal e tecnicamente cuidadosa. A página deve ajudar o visitante a entender o serviço, avaliar evidências de competência e iniciar uma conversa.

Público principal: pessoas responsáveis por negócios que precisam de sites, sistemas, integrações ou evolução de produtos. Público secundário: recrutadores e equipes técnicas. A mensagem comercial abre a página; tecnologias, trajetória e decisões de engenharia sustentam a avaliação posterior.

Esta proposta aplica princípios de usabilidade e composição às referências fornecidas. Não representa leitura integral dos livros, pesquisa com clientes ou comprovação de ganho de conversão.

## 2. Diagnóstico do site atual

Inspeção de conteúdo e da primeira tela de https://www.marcopicanco.com/.

Pontos a preservar:

- Nome pessoal como marca e linguagem direta.
- Especialidade em Ruby on Rails, aplicações web, APIs e manutenção.
- Valorização de testes e qualidade técnica.
- Links para GitHub e LinkedIn e apresentação da trajetória profissional.

Oportunidades:

- A abertura “Desenvolvedor Full Stack Ruby on Rails” informa uma função, mas pode explicar melhor o que um cliente consegue contratar.
- O painel de código decorativo ocupa uma área que poderia expressar uma identidade própria ou mostrar uma entrega real.
- A seção apresentada como portfólio descreve frentes de serviço. Serviços e casos de projeto precisam de nomes e conteúdos distintos.
- A navegação reúne Home, Blog, Projetos, Consultoria, Sobre, Contato, busca, redes e tema. É possível reduzir a concorrência de ações no cabeçalho.
- A formação acadêmica extensa pode ficar em Sobre, preservando a página inicial para oferta, provas de trabalho e contato.
- Roxo, verde-azulado, sombras e cartões são elementos visíveis da composição atual. A nova direção propõe uma paleta mais concentrada e separações por espaço, alinhamento e linhas finas.

## 3. Direção recomendada: Editorial

Conceito: uma presença editorial com precisão geométrica. Referências culturais aparecem no tratamento tipográfico e no ritmo da página; matemática aparece nas relações de espaço, no alinhamento e em construções geométricas discretas. A competência em computação aparece em casos reais e decisões explicadas.

### Paleta clara

| Papel | Cor | Aplicação |
| --- | --- | --- |
| Fundo | `#F7F4EE` | Marfim quente como superfície principal |
| Texto | `#252B2A` | Grafite para leitura e títulos |
| Destaque | `#6D302C` | Vinho para ação principal e um detalhe tipográfico |
| Texto secundário | `#596158` | Descrições, legendas e apoio |
| Separador | `#D8D5CB` | Linhas discretas, sem transmitir informação sozinhas |

A cor de destaque deve ocupar pouca área. Texto de botões usa marfim sobre vinho. A versão escura exige suas próprias combinações de contraste; não deve ser uma simples inversão automática. A exploração visual inclui pares claros e escuros.

### Tipografia

- **Instrument Serif:** grandes títulos editoriais e uma palavra em itálico quando houver motivo de ênfase.
- **Inter:** navegação, descrições, formulários e leitura do blog.
- **IBM Plex Mono:** numeração de seção e pequenas legendas técnicas. Uso opcional e restrito.

Na implementação, carregar apenas famílias e pesos efetivamente usados, com fontes locais ou estratégia de carregamento que evite deslocamentos. Corpo principal entre 16 e 18 px; títulos responsivos; artigos com aproximadamente 60–75 caracteres por linha como ponto de partida, ajustado à fonte e à tela.

### Assinatura visual

Nome “Marco Picanço” como marca principal. Um monograma MP pode ser estudado para favicon e usos pequenos. A forma geométrica é um elemento secundário, com função de assinatura, sem competir com o texto ou exigir interpretação para navegar.

Composição com bastante espaço, proporções assimétricas e linhas finas. Fotografias entram quando agregam evidência ou proximidade: retrato no Sobre, imagens reais nos casos e conteúdo relevante no blog.

## 4. Alternativas comparadas

| Direção | Composição | Impressão pretendida | Quando escolher |
| --- | --- | --- | --- |
| Editorial | Serifa expressiva, duas colunas e construção geométrica | Autoridade tranquila, cultura e cuidado | Melhor combinação com a personalidade descrita |
| Modernismo | Sans forte, eixo lateral e serviços numerados | Objetividade, energia e precisão | Se a preferência for uma marca mais gráfica e direta |
| Cartografia | Título central, malha discreta e percurso visual | Investigação, orientação e método | Se a ideia de explorar problemas e conduzir projetos for central |

As três explorações mostram a abertura e uma amostra de serviços. São propostas de aparência, com textos sujeitos a revisão. Casos, depoimentos e métricas não foram inventados para preencher o desenho.

## 5. Estrutura da página inicial completa

### Cabeçalho

Marca à esquerda. Links: Projetos, Serviços, Sobre e Contato. Blog pode ficar em uma posição secundária ou no rodapé. GitHub e LinkedIn aparecem na apresentação e no contato. A busca pode ficar dentro do blog, caso o volume de conteúdo justifique.

O esboço comparativo usa uma navegação reduzida a Serviços, Sobre e Contato porque apresenta somente um recorte da página.

### Abertura

Sobretítulo: “Desenvolvimento web e de aplicativos”.

Título proposto: “Boas ideias merecem software bem construído.”

Texto de apoio: “Sites, sistemas e aplicativos pensados para facilitar o dia a dia do seu negócio. Do entendimento do problema à evolução do produto.”

Ação principal: “Conversar sobre um projeto”. Ação secundária: “Ver projetos”, quando houver casos publicados; até lá, “Conhecer soluções” leva à seção de serviços.

Antes da publicação, definir exatamente o alcance de “aplicativos”: aplicações web, PWA ou desenvolvimento nativo. A oferta deve refletir o que Marco efetivamente consegue entregar. Não presumir experiência em iOS ou Android nativos.

### Projetos selecionados

Até três casos com boa documentação, incluindo:

1. Problema e contexto do usuário ou negócio.
2. Responsabilidade de Marco e participação de outras pessoas.
3. Solução, imagem real e decisões relevantes.
4. Resultado verificável: tarefa simplificada, capacidade entregue, comparação de desempenho ou outra evidência disponível.
5. Link para estudo detalhado, demonstração ou repositório quando permitido.

Se forem projetos pessoais, identificar como “Projeto autoral” ou “Estudo de caso”. Se o trabalho for confidencial, usar uma descrição autorizada e sem dados privados. Métricas só entram quando houver registros que as sustentem.

Possíveis temas coerentes com a oferta: um sistema operacional de negócio; uma aplicação com integrações e processamento em segundo plano; uma implantação documentada com monitoramento e recuperação. A escolha final depende do material já construído.

### Serviços

Três famílias claras:

- Sites e presença digital.
- Sistemas e aplicativos.
- Integrações, manutenção e evolução.

Cada serviço explica o problema que resolve, o que pode ser entregue e como começar. Termos como API, Rails e PostgreSQL entram no detalhamento técnico quando ajudam a avaliar a solução.

### Processo

Quatro passos compreensíveis: entender o problema; definir escopo e prioridades; construir e validar; publicar e acompanhar. Esclarecer entregáveis e responsabilidades, sem prometer prazo ou suporte ainda não acordados.

### Sobre

Retrato natural, apresentação curta, experiência relevante e uma ligação pessoal com cultura, matemática e computação. Um link abre a trajetória completa, formação e certificações.

### Escrita e contato

Dois ou três textos selecionados podem mostrar capacidade de explicar decisões e compartilhar aprendizados. Não é necessário um blog volumoso para sustentar a página.

Contato com ação concreta: e-mail válido ou formulário funcional. Enquanto o endereço não for confirmado, o LinkedIn público é uma alternativa conhecida. Não usar um link chamado “E-mail” que apenas volta para uma seção sem fornecer um meio de contato.

## 6. Aplicação das referências

| Referência | Decisão proposta |
| --- | --- |
| Don Norman — design compreensível | Ações identificáveis e retorno visível ao enviar formulário ou concluir uma ação |
| Steve Krug — usabilidade web | Navegação convencional, títulos claros e destino previsível para cada link |
| Fabrício Teixeira e Senac — processos de UX | Arquitetura da informação, conteúdo, acessibilidade e validação tratados juntos |
| Jon Yablonski — psicologia e UX | Agrupar conteúdo relacionado, reduzir decisões concorrentes e facilitar o toque |
| Design Emocional | Consistência, personalidade e acabamento a serviço de uma experiência agradável |
| Thinking with Type / Grid Systems / Refactoring UI | Hierarquia tipográfica, alinhamento e espaçamento consistente |
| Artigo da Criativito | Coerência entre identidade da marca e apresentação do site |

Estas são aplicações propostas, não citações literais dos livros. Os artigos de referência ajudam a orientar escolhas; não comprovam que uma paleta específica aumentará vendas ou posição no Google.

## 7. Regras para implementação e validação

- Usar HTML semântico, hierarquia coerente de títulos e navegação por teclado.
- Manter foco visível e rótulos explícitos em controles e campos.
- Verificar contraste mínimo de 4,5:1 para texto comum e 3:1 para texto grande, conforme critérios WCAG aplicáveis. Esses números não equivalem a uma auditoria completa de acessibilidade.
- Oferecer alvos confortáveis de toque e informação essencial disponível sem depender de hover.
- Reorganizar colunas em telas pequenas; testar de 320 px até telas largas e com zoom.
- Priorizar texto e imagens úteis. Evitar animação contínua; respeitar a preferência de movimento reduzido.
- Usar formatos e dimensões adequados para imagens e evitar arquivos pesados na abertura.
- Testar ações reais: navegação, envio, erro, confirmação, retorno e abertura de casos.
- Validar com pessoas representativas: conseguem dizer o que Marco faz, encontrar um trabalho e iniciar contato? Registrar dúvidas e ajustar.

## 8. Decisões registradas e pendências

Proposta recomendada: Editorial. A escolha ainda depende da avaliação do usuário.

Material produzido: comparação visual de três direções e este documento de orientação. O site em produção não foi modificado.

Antes da implementação: escolher direção, selecionar casos reais, confirmar escopo dos serviços e canal de contato, revisar textos, aprovar fotografias e concluir os estados móveis e formulários.

A comparação foi verificada por inspeção de estrutura, destinos locais e combinações de cores. A validação visual em navegador da proposta não foi concluída neste ambiente. A implementação final precisará de testes responsivos, de acessibilidade e de funcionamento; o esboço não deve ser tratado como produto pronto para publicar.

## 9. Fontes consultadas

- Site atual: https://www.marcopicanco.com/
- Criativito: https://criativito.com.br/identidade-visual-no-site-como-um-design-bem-aplicado-aumenta-credibilidade-permanencia-e-autoridade-da-marca/
- Lista de livros da Untitled UI: https://www.untitledui.com/blog/ui-design-books
- Don Norman, página oficial do livro: https://jnd.org/books/the-design-of-everyday-things-revised-and-expanded-edition/
- Senac, página da obra: https://www.editorasenacsp.com.br/livro/ux-ui-design-experiencias-interfaces-usuarios
- Jon Yablonski: https://lawsofux.com/
- Nielsen Norman Group, heurísticas de usabilidade: https://www.nngroup.com/articles/ten-usability-heuristics/
- Refactoring UI: https://refactoringui.com/
- W3C, contraste mínimo: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

Os demais livros foram considerados a partir das referências e descrições fornecidas pelo usuário.
