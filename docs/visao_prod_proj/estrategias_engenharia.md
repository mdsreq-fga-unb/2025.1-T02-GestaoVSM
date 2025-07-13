## 3.1 Estratégia Priorizada

*Abordagem de Desenvolvimento de Software*  

A abordagem adotada para o desenvolvimento do sistema é a **híbrida**, combinando elementos das filosofias dirigida por plano e ágil. Foram incorporadas práticas típicas de abordagens preditivas — como a definição inicial dos requisitos e o planejamento estruturado — juntamente com princípios ágeis, como a priorização incremental, a colaboração direta com o cliente e a abertura a adaptações ao longo do projeto.

Essa escolha foi motivada pelas características específicas do projeto da Barbearia VSM: por um lado, o cliente apresentou uma visão clara e bem definida de suas necessidades desde o início; por outro, mostrou-se disponível para interações frequentes, o que possibilitou ciclos contínuos de validação. Esse cenário favoreceu a adoção de uma abordagem que equilibrasse previsibilidade com flexibilidade, e controle com adaptação, promovendo uma entrega mais alinhada às reais expectativas do cliente.

*Ciclo de Vida*  

O ciclo de vida selecionado foi o **iterativo e incremental**, por permitir a construção progressiva do sistema em partes evolutivas e validadas. Embora tenha sido prevista apenas uma entrega formal ao final do projeto, o uso de protótipos funcionais e validações constantes com o cliente proporcionou ciclos internos de revisão e melhoria contínua.

Essa estrutura contribuiu para o alinhamento contínuo entre equipe e cliente, além de reduzir o risco de retrabalho por falhas de entendimento. Com cada iteração, foi possível refinar os requisitos, antecipar problemas e ajustar o escopo de maneira controlada, resultando em maior qualidade e aderência à realidade do negócio.

*Processo de Engenharia de Software*  

O processo seguido foi estruturado por meio da combinação entre OpenUP e RAD, aproveitando as forças de cada um em momentos específicos do projeto. A condução se deu em cinco fases principais, com foco na progressividade, validação contínua e reaproveitamento de artefatos sempre que possível.

A **Fase de Concepção (OpenUP)** teve como objetivo estabelecer os fundamentos do projeto. Foram definidos o escopo preliminar, os objetivos do sistema, os principais stakeholders e riscos associados. Também foi elaborada a visão do produto, garantindo um entendimento compartilhado entre os envolvidos antes do início do detalhamento técnico.

Em seguinda, na **Fase de Elaboração (OpenUP)**, os requisitos foram refinados e estruturados por meio de histórias de usuário, com definição clara de critérios de aceitação. Também foi organizada a primeira versão do backlog do produto. A elaboração serviu como base sólida para as fases seguintes, reduzindo ambiguidade e promovendo clareza nos fluxos e funcionalidades essenciais.

A prototipação rápida ocorreu na **Fase de Design de Usuário (RAD)**, com foco nas interfaces e nos fluxos de navegação mais relevantes. Foram criados protótipos de alta fidelidade diretamente em ambiente de front-end, com simulação de comportamentos e respostas visuais mesmo antes da integração com o backend.

Embora esses protótipos não estivessem completamente conectados à lógica do sistema, foram desenvolvidos com código real, o que permitiu reaproveitamento substancial na fase de construção, conforme preconiza o modelo RAD. Além disso, sessões de feedback frequentes com o cliente garantiram validações visuais que direcionaram decisões de design e ajudaram a antecipar ajustes ainda antes da implementação técnica definitiva.

Com os fluxos validados, a equipe deu início à **Fase de Construção (OpenUP)** do sistema. O desenvolvimento foi orientado por histórias de usuário priorizadas no backlog, com entregas técnicas em ciclos curtos. A fase foi marcada por boas práticas de engenharia, como versionamento, rastreabilidade de requisitos, testes automatizados e integração contínua, garantindo qualidade e estabilidade progressiva do produto.

A **Fase de Transição (OpenUP)** foi dedicada à preparação da implantação, treinamento de usuários e ajustes finos com base nos testes operacionais. Também foi consolidada a documentação essencial, e realizada uma retrospectiva para registrar as lições aprendidas, visando o aprimoramento de futuros projetos.

Essa estrutura combinada permitiu que o projeto evoluísse de forma ágil e validada na fase de design, com o aproveitamento técnico dos protótipos, e avançasse de forma disciplinada e controlada durante o desenvolvimento e entrega, como preconiza o OpenUP. O resultado foi um processo equilibrado, capaz de unir rapidez, qualidade e alinhamento constante com o cliente.

## 3.2 Quadro Comparativo

A seguir, apresenta-se um quadro comparativo entre dois processos de desenvolvimento de software considerados para o projeto: o RAD, focado na agilidade e prototipação rápida, e a abordagem híbrida RAD + OpenUP, que combina a validação visual com desenvolvimento estruturado.

|Características|RAD|RAD + OpenUP|
|---------------|---|------------|
|Abordagem Geral|Ênfase na prototipação rápida e iterativa. Foco principal no Design Centrado no Usuário.|Mantém a prototipação rápida do RAD, com desenvolvimento incremental e estrutura leve do OpenUP.|
|Estrutura de Processos|Planejamento formal seguido de ciclos rápidos; requisitos de alto nível; protótipos iterativos.|Validação visual, por meio de prototipações (RAD), com desenvolvimento estruturado, por meio de fases de construção, elaboração e transição (OpenUP).|
|Colaboração com o Cliente|Participação ativa do cliente durante todo o processo; feedback contínuo e ajustes rápidos.|Contato contínuo com o cliente, validação de protótipos e incremento de valor em cada entrega.|
|Flexibilidade de Requisitos|Requisitos são tratados como variáveis; mudanças são facilmente incorporadas.|Flexibilidade mantida, mas com gestão de mudanças dentro de ciclos iterativos e rastreamento mais estruturado.|
|Ciclo de Vida do Projeto|Rápido e voltado à entrega funcional em pouco tempo.|Estruturado com micro-incrementos: ciclos curtos (iterações) e visão de longo prazo (ciclo de projeto).|
|Complexidade do Processo|Processo dividido em 4 fases, com foco na prototipação e no envolvimento do usuário.|Mesmas 4 fases, com maior apoio à transição e construção final, promovendo gerenciamento de risco.|
|Práticas de Desenvolvimento|Ênfase em ferramentas CASE e geração de protótipos; documentação mínima|Uso das mesmas ferramentas com organização adicional; camadas de micro-incrementos e documentação enxuta.|
|Adequação ao Cliente|Ideal para usuários com baixa familiaridade com tecnologia, pois incentiva o aprendizado prático.|RAD ajuda na familiarização inicial; OpenUP estrutura o avanço com governança leve e foco em valor contínuo|

## 3.3 Justificativa

A decisão de combinar os processos OpenUP e RAD foi tomada com base nas particularidades do projeto e nas necessidades específicas do cliente, buscando equilibrar agilidade, estrutura e colaboração contínua. Cada processo foi aplicado em momentos distintos, de forma complementar, aproveitando suas forças em fases nas quais são mais eficazes.

Iniciamos com as fases de Concepção e Elaboração do OpenUP, que forneceram uma base sólida para o projeto. Nessas etapas, foram definidos o escopo, os principais riscos, os stakeholders e a visão inicial do produto. A seguir, realizamos o refinamento dos requisitos por meio da modelagem de histórias de usuário e da definição dos critérios de aceitação, estruturando o backlog inicial e eliminando ambiguidade funcional.

Na sequência, adotamos a abordagem de Design do Usuário inspirada no RAD, priorizando a prototipação rápida e validando as interfaces diretamente com o cliente. Os protótipos foram desenvolvidos em código real de front-end e simularam os principais fluxos do sistema, mesmo antes da integração com o backend. Essa prática antecipou decisões de design e usabilidade e possibilitou um alto grau de reaproveitamento dos artefatos produzidos — alinhando-se ao princípio central do RAD de evitar retrabalho e acelerar a evolução da solução com base em feedback contínuo.

Com os fluxos validados, o projeto avançou para as fases de Construção e Transição do OpenUP. O desenvolvimento foi conduzido de forma incremental, com foco na rastreabilidade de requisitos, qualidade técnica e estabilidade do produto. Testes automatizados, versionamento e integração contínua foram utilizados para garantir robustez e facilitar eventuais ajustes ao longo da implementação. A fase de transição contemplou a preparação para a entrega final, treinamento do cliente e consolidação da documentação essencial.

Ao manter um processo iterativo mesmo após a validação dos requisitos e protótipos, conseguimos aproveitar ao máximo a disponibilidade do cliente e incorporar melhorias incrementais com segurança, sem comprometer a consistência e o planejamento da solução.

Portanto, a adoção dessa estrutura híbrida permitiu iniciar o projeto com agilidade, forte colaboração e foco na experiência do usuário, e avançar com uma abordagem disciplinada, orientada à qualidade e à entrega contínua de valor. Essa combinação reforça a adaptabilidade metodológica preconizada pela Engenharia de Software moderna, oferecendo um processo coerente com o contexto real do projeto e com as boas práticas descritas na literatura.

## Histórico de Versão

| Data | Versão | Descrição | Autor |
|---|---|---|---|
| 20/04/2025 | 1.1 | Atualização no Tópico 3.2 e 3.3 | [Vinícius Rufino](https://github.com/RufinoVfR) |
| 20/04/2025 | 1.2 | Atualização do Tópico 3.1| [Weverton Rodrigues](https://github.com/vevetin) |
| 21/04/2025 | 1.4 | Refatoração dos Tópicos 3.2 e 3.3 | [Vinícius Rufino](https://github.com/RufinoVfR) |
| 03/05/2025 | 2.0 | Refatoração do Documento | [Vinícius Rufino](https://github.com/RufinoVfR) e [Weverton Rodrigues](https://github.com/vevetin)|
| 24/05/2025| 2.1 | Atualização dos Tópicos 3.1 e 3.3 | [Weverton Rodrigues](https://github.com/vevetin) |
| 13/07/2025 | 2.2 | Atualização dos Tópicos 3.1 e 3.3 para uma melhor adequação ao que foi seguido |[Weverton Rodrigues](https://github.com/vevetin)|