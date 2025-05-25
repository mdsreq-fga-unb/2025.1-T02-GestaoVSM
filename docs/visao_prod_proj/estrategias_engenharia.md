## 3.1 Estratégia Priorizada

*Abordagem de Desenvolvimento de Software*   
A abordagem escolhida para o desenvolvimento da solução será a **Híbrida**, combinando elementos das filosofias dirigida por plano (como a definição antecipada de requisitos e a ênfase na previsibilidade do escopo) e ágil (como a adaptação contínua e a colaboração direta com o cliente). Essa escolha se alinha às particularidades do projeto da Barbearia VSM, que conta com requisitos iniciais bem definidos, mas também com a forte disponibilidade do cliente, o que permite um ciclo constante de validação e de adaptação contínua às necessidades identificadas ao longo do desenvolvimento.
A previsibilidade é alcançada pela organização dos requisitos desde o início, o que viabiliza um planejamento claro e estruturado. A flexibilidade, por sua vez, será assegurada pela abertura a ajustes ao longo do desenvolvimento, baseada em interações frequentes com o cliente, além da priorização de funcionalidades em entregas incrementais.

*Ciclo de Vida*  
O ciclo de vida selecionado é o **Iterativo e Incremental**, pois permite o desenvolvimento gradual da solução por meio de entregas parciais, funcionais e evolutivas. Cada incremento será validado junto ao cliente, permitindo a identificação prévia de desvios, a correção contínua de problemas e a adaptação do produto às reais necessidades do negócio.
Esse modelo favorece o alinhamento entre a solução desenvolvida e as expectativas do usuário final, ao mesmo tempo em que reduz o risco de retrabalho por falhas de entendimento.

*Processo de Engenharia de Software*  
O processo será conduzido por uma abordagem híbrida entre RAD e OpenUP, reorganizada em quatro fases sequenciais para melhor atender às necessidades do projeto.

Na **Fase de Concepção (OpenUP)**, serão estabelecidos os fundamentos do projeto, com a definição do escopo inicial, identificação de stakeholders e riscos principais, e a elaboração da visão do produto. Esta etapa preparará o terreno para o trabalho de prototipação, garantindo que todos os participantes compartilhem uma compreensão comum dos objetivos antes da fase seguinte.

A **Fase de User Design (RAD)** concentrar-se-á na prototipação rápida de interfaces e fluxos críticos, com validação visual direta junto ao cliente. Através de iterações ágeis e sessões frequentes de feedback, os requisitos serão refinados continuamente, antecipando decisões de design e assegurando que a solução atenda às expectativas de usabilidade antes do desenvolvimento em si.

Com os fluxos principais validados, o projeto avançará para a **Fase de Construção (OpenUP)**, onde o desenvolvimento ocorrerá de forma incremental, orientado por histórias de usuário priorizadas. Esta fase manterá ciclos curtos de entrega (2 semanas), com ênfase na qualidade do código e rastreabilidade dos requisitos, enquanto incorpora mudanças pontuais quando necessário. Testes automatizados e integração contínua assegurarão a estabilidade do produto durante sua evolução.

Por fim, a **Fase de Transição (OpenUP)** preparará a implantação final, com treinamento dos usuários, ajustes baseados em feedbacks operacionais e consolidação da documentação. O encerramento do projeto incluirá uma revisão das lições aprendidas, garantindo que insights valiosos sejam capturados para iniciativas futuras.

Esta estrutura combinada preserva a agilidade do RAD na fase crítica de definição da experiência do usuário, enquanto aproveita a disciplina e organização do OpenUP para garantir um desenvolvimento controlado e adaptável. O resultado será um processo que equilibra velocidade com qualidade, mantendo o foco na entrega de valor contínuo ao cliente.

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

A escolha pela combinação entre os processos RAD e OpenUP foi feita de forma estratégica, considerando as características do cliente e a natureza do projeto. Cada processo será utilizado em fases específicas, de acordo com seus pontos fortes e a necessidade de equilíbrio entre agilidade, estrutura e colaboração contínua.
Iniciamos com a fase de Concepção do OpenUP, voltada para a definição da visão do sistema, delimitação do escopo e entendimento do contexto da barbearia. Em seguida, adotamos a fase de Design do Usuário do RAD, priorizando a prototipação rápida e interativa com o cliente. Essa abordagem permite validar visualmente os fluxos principais e ajustar os requisitos de forma colaborativa e eficaz, especialmente considerando o baixo grau de familiaridade técnica do cliente.
Com os fluxos validados, o projeto segue para as fases de Construção e Transição do OpenUP, nas quais o desenvolvimento será conduzido de forma incremental, com entregas funcionais, testes automatizados e documentação enxuta. A escolha do OpenUP neste ponto parte da necessidade de organizar o desenvolvimento técnico com qualidade, rastreabilidade e flexibilidade suficiente para incorporar ajustes pontuais.
Optamos por manter um processo iterativo mesmo após a validação dos requisitos, justamente para aproveitar ao máximo a disponibilidade do cliente ao longo de todo o projeto. Essa colaboração contínua poderá trazer melhorias incrementais durante a execução, sem comprometer o planejamento e a consistência do produto final.
Assim, a junção entre RAD e OpenUP permite iniciar com velocidade e envolvimento direto do cliente, garantindo clareza nos requisitos, e avançar com uma abordagem estruturada, que favorece entregas de valor contínuas, com controle de qualidade e adaptabilidade.

## Histórico de Versão

| Data | Versão | Descrição | Autor |
|---|---|---|---|
| 20/04/2025 | 1.1 | Atualização no Tópico 3.2 e 3.3 | [Vinícius Rufino](https://github.com/RufinoVfR) |
| 20/04/2025 | 1.2 | Atualização do Tópico 3.1| [Weverton Rodrigues](https://github.com/vevetin) |
| 21/04/2025 | 1.4 | Refatoração dos Tópicos 3.2 e 3.3 | [Vinícius Rufino](https://github.com/RufinoVfR) |
| 03/05/2025 | 2.0 | Refatoração do Documento | [Vinícius Rufino](https://github.com/RufinoVfR) e [Weverton Rodrigues](https://github.com/vevetin)|