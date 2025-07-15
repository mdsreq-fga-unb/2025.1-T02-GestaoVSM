## Elicitação e Descoberta

### Entrevistas Complementares

Durante o desenvolvimento do projeto, tivemos reuniões com o cliente em que foram apresentados novos requisitos e atualizações sobre a barbearia e seus membros. Por conta do nossa facilidade de contato, tivemos o cliente bastante presente durante a fase de elaboração, o que fez com que nós frequentemente fossemos avisados de algum detalhe importante do sistema de gestão interna que eles usam e também que tivessemos sempre o Valder a disposição na hora de tirar uma dúvida. 

## Análise e Consenso

### Análise Custo-Benefício (B x 2 + U - E - R - D)

A priorização dos requisitos na fase de Elaboração do projeto Gestão VSM foi realizada por meio da aplicação da Análise Custo-Benefício, utilizando os critérios de Benefício (B), Urgência (U), Esforço (E), Risco (R) e Dependência (D). Essa metodologia, fundamentada na fórmula (B × 2 + U) − (E + R + D), permitiu estabelecer uma ordenação objetiva e estratégica dos itens do backlog, destacando aqueles que oferecem maior valor ao sistema com menor complexidade e risco de implementação. Para uma compreensão detalhada dos critérios e do processo de priorização adotado, consulte a página específica sobre [Priorização do Backlog Geral](../visao_prod_proj/backlog_produto.md#92-priorização-do-backlog-geral).


### Análise de Risco
Durante a fase de Elaboração, a equipe realizou uma análise sistemática de riscos com o objetivo de identificar fatores que poderiam comprometer o andamento do projeto ou a entrega de funcionalidades críticas. Essa atividade teve como foco antecipar obstáculos técnicos, operacionais e organizacionais, permitindo o planejamento de ações mitigadoras ainda nas etapas iniciais do desenvolvimento.

**1. Riscos Humanos**

| **Risco**                                          | **Probabilidade** | **Impacto** | **Mitigação**                                                                |
| -------------------------------------------------- | ----------------- | ----------- | ---------------------------------------------------------------------------- |
| Queda de engajamento do cliente nas etapas finais  | Média             | Alta        | Manter comunicação ativa via WhatsApp e validar entregas em reuniões curtas. |
| Sobrecarga dos membros da equipe | Média              | Alta       | Reorganizar tarefas e priorizar funcionalidades mais críticas.      |

**2. Riscos de Cronograma**

| **Risco**                                                             | **Probabilidade** | **Impacto** | **Mitigação**                                                                     |
| --------------------------------------------------------------------- | ----------------- | ----------- | --------------------------------------------------------------------------------- |
| Atraso na finalização de User Stories | Alta              | Alta        | Focar nas US validadas e mover as demais para backlog futuro.                     |
| Tempo insuficiente para testes e validação com o cliente              | Média             | Alta        | Antecipar testes em incrementos menores e definir critérios mínimos de aprovação. |

**3. Riscos Técnicos**

| **Risco**                                                              | **Probabilidade** | **Impacto** | **Mitigação**                                                             |
| ---------------------------------------------------------------------- | ----------------- | ----------- | ------------------------------------------------------------------------- |
| Falhas na integração entre frontend e backend                          | Média             | Alta        | Realizar testes de integração constantes e manter comunicação entre devs. |
| Inconsistência nos cálculos financeiros (fechamento de caixa, extrato) | Alta              | Alta        | Criar casos de teste com dados reais e revisar com o cliente.             |
| Comportamentos imprevistos na navegação dos protótipos                 | Baixa             | Média       | Realizar walkthroughs com cliente e testes exploratórios.                 |

**Plano de Monitoramento**

1. Revisão periódica: os riscos foram revistos semanalmente em conjunto com a equipe;

2. Indicadores de atenção:

- Atrasos repetidos em entregas técnicas;

- Sinais de confusão ou dúvidas frequentes por parte do cliente e equipe;

## Declaração

### Refinamento de User Stories

Durante o processo de Elabolação, foi alterada a **US 07** - Como administrador, quero acessar um extrato financeiro geral com divisão por funcionário, contendo serviços realizados, comissões e total a pagar por período, para acompanhar o desempenho da equipe e calcular repasses corretamente, que foi melhorada, no intuito de alinhá-la com o seu devido Requisito Funcional, trazer uma maior precisão nos dados, maior foco no objetivo financeiro e uma linguagem mais técnica. 

## Verificação e Validação

### Definition of Ready (DoR)

Com o intuito de garantir que as User Stories estejam completas, compreensíveis e prontas antes de passarem ao User Design, é feito um checklist para validar se elas estão prontas para serem iniciadas. Esse checklist é o DoR, e esteve presente antes do desenvolvimento de todas as User Stories desse projeto. A evidência do DoR está representada por meio do print a seguir:

<center><p>Figura 1 - Definition of Ready </p></center>

[![Figura 1 - Definition of Ready](../evidencias/assets/DoR.png)](../evidencias/assets/DoR.png)

### Critérios de Aceitação

Já os Critérios de Aceitação, que servem para validar a entrega de uma User Story, também foram representados pela equipe e estão disponíveis a seguir:

**US 01 ** - Como administrador, eu quero realizar o fechamento de caixa com base na consolidação automática das receitas e comissões do período para que eu possa encerrar o dia de trabalho com segurança e sem erros manuais.

<center><p>Figura 2 - Critérios de Aceitação US 01 </p></center>

[![Figura 2 - Critérios de Aceitação US 01](../evidencias/assets/Crit_Aceita_01.png)](../evidencias/assets/Crit_Aceita_01.png)

**US 02** - Como administrador, eu quero calcular e visualizar o faturamento total da barbearia em um intervalo de datas, com filtros para funcionário para que eu possa acompanhar o desempenho financeiro do negócio de forma abrangente.

<center><p>Figura 3 - Critérios de Aceitação US 02 </p></center>

[![Figura 3 - Critérios de Aceitação US 02](../evidencias/assets/Crit_Aceita_02.png)](../evidencias/assets/Crit_Aceita_02.png)

**US 05** - Como administrador, eu quero visualizar o valor bruto do faturamento com detalhamento diário, semanal ou mensal para que eu possa acompanhar a saúde financeira da barbearia em diferentes escalas de tempo.

<center><p>Figura 4 - Critérios de Aceitação US 05 </p></center>

[![Figura 4 - Critérios de Aceitação US 05](../evidencias/assets/Crit_Aceita_05.png)](../evidencias/assets/Crit_Aceita_05.png)

**US 07** - Como administrador, quero acessar um extrato financeiro geral com divisão por funcionário, contendo serviços realizados, comissões e total a pagar por período, para acompanhar o desempenho da equipe e calcular repasses corretamente.

<center><p>Figura 5 - Critérios de Aceitação US 07 </p></center>

[![Figura 5 - Critérios de Aceitação US 07](../evidencias/assets/Crit_Aceita_07.png)](../evidencias/assets/Crit_Aceita_07.png)

**US 15** - Como administrador, eu quero editar dados dos funcionários, incluindo comissões, horários e especialidades para que eu possa manter os dados da equipe sempre atualizados conforme mudanças operacionais.

<center><p>Figura 6 - Critérios de Aceitação US 15 </p></center>

[![Figura 6 - Critérios de Aceitação US 15](../evidencias/assets/Crit_Aceita_15.png)](../evidencias/assets/Crit_Aceita_15.png)

**US 17** - Como administrador ou barbeiro, eu quero visualizar o calendário com os agendamentos filtrados por data, cliente e duração para que eu possa planejar melhor os atendimentos e acompanhar a rotina de trabalho.

<center><p>Figura 7 - Critérios de Aceitação US 17 </p></center>

[![Figura 7 - Critérios de Aceitação US 17](../evidencias/assets/Crit_Aceita_17.png)](../evidencias/assets/Crit_Aceita_17.png)

**US 18** - Como administrador ou barbeiro, eu quero adicionar serviços ao calendário do barbeiro responsável para que eu possa organizar os atendimentos de acordo com a disponibilidade do profissional.

<center><p>Figura 8 - Critérios de Aceitação US 18 </p></center>

[![Figura 8 - Critérios de Aceitação US 18](../evidencias/assets/Crit_Aceita_18.png)](../evidencias/assets/Crit_Aceita_18.png)

## Organização e Atualização

### DEEP contínuo
Durante a fase de Elaboração, o backlog foi continuamente revisado com base nos princípios DEEP — Detalhado adequadamente, Estimado, Emergente e Priorizado. As histórias próximas da implementação foram refinadas com maior nível de detalhe, incluindo critérios de aceitação claros e descrição de fluxos específicos.

As estimativas foram realizadas com base na complexidade técnica percebida, apoiando a priorização e a análise de custo-benefício. O backlog também evoluiu com o surgimento de novos entendimentos e feedbacks do cliente, mantendo-se emergente e alinhado ao contexto real do projeto.

A priorização foi ajustada ao longo do tempo, considerando valor para o cliente, urgência, esforço e riscos técnicos. Essa aplicação contínua do DEEP garantiu que o backlog permanecesse organizado, relevante e pronto para orientar as fases seguintes com eficiência.

### Repriorizações
Ao longo da fase de Elaboração, o backlog passou por repriorizações pontuais, motivadas tanto por novos entendimentos obtidos em entrevistas complementares e validações com o cliente, quanto por limitações técnicas e ajustes de escopo identificados pela equipe. Essas revisões garantiram que as funcionalidades mais relevantes fossem antecipadas e que demandas de menor impacto ou com maior complexidade fossem realocadas para ciclos futuros.

A definição do escopo do MVP também exigiu ajustes na ordem de desenvolvimento das User Stories, priorizando funcionalidades essenciais para o uso inicial do sistema. O processo de priorização seguiu critérios objetivos baseados em valor de negócio, urgência, esforço técnico e risco, preservando a coerência com a análise de custo-benefício previamente aplicada.

## Histórico de Versão

|Data|Versão|Descrição|Autor|
|---|---|---|---|
| 11/05/2025| 1.0 | Criação do documento | [Weverton Rodrigues](https://github.com/vevetin) |
| 15/07/2025| 1.1 | Atualização do documento | [Vinícius Rufino](https://github.com/RufinoVfR) |
