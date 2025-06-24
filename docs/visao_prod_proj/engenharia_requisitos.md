##  4.1 Atividades e Técnicas de Engenharia de Requisitos

### **Concepção (OpenUP)**

#### *Elicitação e Descoberta*

* **Entrevista**: Conversar com o proprietário e equipe da barbearia para entender metas, processos e dores relacionadas a agendamentos, vendas, finanças e organização.
* **Análise de Tarefas**: Mapear o passo a passo de atividades como fechamento de caixa, agendamentos e controle de estoque, identificando ineficiências.
* **Observação / Imersão (Etnografia)**: Acompanhar a rotina da barbearia para identificar necessidades contextuais, não verbalizadas, e validar a realidade de uso.

#### *Análise e Consenso*

* **INVEST**: Aplicar os critérios para garantir que as User Stories iniciais sejam independentes, negociáveis, valiosas, estimáveis, pequenas e testáveis.
* **Discussões com o cliente**: Validar entendimento mútuo das tarefas e necessidades antes de organizar requisitos.

#### *Declaração*

* **User Story (Temas, Épicos e User Stories)**: Estruturar o backlog em níveis hierárquicos para facilitar organização e planejamento incremental.

#### *Verificação e Validação*

* **Revisão com o cliente**: Validar se os requisitos identificados realmente correspondem ao contexto da barbearia.

#### *Organização e Atualização*

* **DEEP**: Aplicado para garantir que o backlog esteja bem detalhado, estimado, emergente e priorizado desde a fase inicial.

---

### **Elaboração (OpenUP)**

#### *Elicitação e Descoberta*

* **Entrevistas complementares**: Coletar novos requisitos e atualizações conforme o projeto evolui.

#### *Análise e Consenso*

* **Análise Custo-Benefício (B x 2 + U - E - R - D)**: Classificação dos requisitos por benefício, urgência, esforço, risco e dependência.
* **Análise de Risco**: Identificação de barreiras técnicas, operacionais ou humanas.

#### *Declaração*

* **Refinamento de User Stories**: Detalhamento contínuo do backlog com base nas decisões tomadas nas análises.

#### *Verificação e Validação*

* **Definition of Ready (DoR)**: Garantir que as User Stories estejam completas, compreensíveis e prontas antes de passarem ao User Design.
* **Critérios de Aceitação**: Definidos para cada User Story, permitindo validação objetiva da entrega.

#### *Organização e Atualização*

* **DEEP contínuo**: Manutenção da qualidade do backlog.
* **Repriorização com base em mudanças de contexto ou novas descobertas**.

---

### **User Design (RAD)**

#### *Representação*

* **Mockups**: Criação de esboços visuais para representar telas e interações.
* **Protótipos de Alta Fidelidade**: Simulações visuais interativas com maior realismo para validação com o cliente.

#### *Declaração*

* **User Stories derivadas de feedback**: Criação ou refinamento de requisitos com base em interações com os protótipos.

#### *Verificação e Validação*

* **Feedback com o cliente**: Validação contínua durante os ciclos de prototipação e ajuste.

#### *Organização e Atualização*

* **Repriorização do backlog com base em feedback real**.

---

### **Construção (OpenUP)**

#### *Declaração*

* **Refinamento final das User Stories**: Baseadas em tudo que foi ajustado após os protótipos.

#### *Verificação e Validação*

* **Aplicação do DoD**: Validação de que as funcionalidades estão concluídas, documentadas, testadas e alinhadas com o escopo aprovado.
* **Walkthroughs internos**: Para verificar se as entregas estão prontas para produção antes da transição.

---

### **Transição (OpenUP)**

#### *Verificação e Validação*

* **Walkthrough com usuários reais**: Validação do sistema em ambiente real, garantindo usabilidade e completude funcional.

#### *Declaração*

* **Documentação de Escopo Entregue**: Registro de todos os requisitos implementados com observações finais.

#### *Organização e Atualização*

* **Registro de requisitos não implementados**: Criação de backlog complementar para versões futuras.

---

##  4.2 Tabela – Engenharia de Requisitos aplicada ao Processo

| **Fase do Processo**    | **Atividade ER**          | **Prática**                                       | **Técnica**                                             | **Resultado Esperado**                                                                |
| ----------------------- | ------------------------- | ------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **Concepção (OpenUP)**  | Elicitação e Descoberta   | Levantamento inicial de requisitos                | Entrevista, Análise de Tarefas, Observação (Etnografia) | Compreensão profunda dos processos e necessidades da barbearia                        |
|                         | Análise e Consenso        | Revisão e refinamento inicial                     | INVEST, Conversas com o cliente                         | Requisitos bem definidos, claros e compreendidos pelas partes envolvidas              |
|                         | Declaração                | Estruturação do backlog                           | User Story (Temas, Épicos, US)                  | Backlog organizado em níveis estratégicos e operacionais                              |
|                         | Verificação e Validação   | Validação inicial com cliente                     | Revisão de Requisitos                                   | Confirmação de que os requisitos estão alinhados com a realidade                      |
|                         | Organização e Atualização | Estruturação e manutenção do backlog              | DEEP                                                    | Backlog bem mantido desde o início                                                    |
| **Elaboração (OpenUP)** | Elicitação e Descoberta   | Coleta de novos dados com base em descobertas     | Entrevista, reuniões                                    | Ajustes nos requisitos com base em evolução de entendimento                           |
|                         | Análise e Consenso        | Priorização e avaliação de riscos                 | Custo-Benefício, Análise de Risco                       | Backlog priorizado com base em valor, urgência e viabilidade                          |
|                         | Declaração                | Refinamento do backlog                            | Framework de User Story                                 | User Stories mais claras e direcionadas para execução                                 |
|                         | Verificação e Validação   | Checagem da completude de requisitos              | DoR, Critérios de Aceitação                             | Garantia de que as US estão prontas para serem representadas                          |
|                         | Organização e Atualização | Repriorização e detalhamento                      | DEEP, Análise contínua                                  | Backlog vivo e ajustado conforme decisões estratégicas                                |
| **User Design (RAD)**   | Representação             | Construção visual das soluções                    | Mockups, Protótipos de Alta Fidelidade                  | Validação de fluxos e interfaces com o cliente                                        |
|                         | Declaração                | Ajustes ou criação de US com base no feedback     | Framework de User Story                                 | User Stories atualizadas conforme necessidades visuais e de usabilidade               |
|                         | Verificação e Validação   | Validação do que está pronto para desenvolvimento | Feedback                                           | Garantia de que o protótipo reflete os requisitos esperados e pode seguir para código |
|                         | Organização e Atualização | Repriorização pós-feedback                        | Ajuste manual, DEEP                                     | Backlog reordenado com base nas decisões reais do cliente                             |
| **Construção (OpenUP)** | Declaração                | Finalização das US para desenvolvimento           | Framework de User Story                                 | Requisitos 100% preparados para implementação                                         |
|                         | Verificação e Validação   | Confirmação da completude antes da entrega        | DoD, Walkthroughs                                       | Funcionalidades testadas, validadas e prontas para produção                           |
| **Transição (OpenUP)**  | Verificação e Validação   | Validação real no ambiente da barbearia           | Walkthrough com usuários reais                          | Confirmação de que o sistema atende às expectativas e está pronto para uso            |
|                         | Declaração                | Registro da entrega final                         | Documentação de Escopo Entregue                         | Registro formal de tudo que foi entregue                                              |
|                         | Organização e Atualização | Mapeamento de requisitos não implementados        | Registro de Backlog para futuras versões                | Continuidade planejada para novas iterações                                           |

## Histórico de Versão

|Data|Versão|Descrição|Autor|
|---|---|---|---|
|23/05/2025|1.0|Criação do documento|[Caio Melo](https://github.com/CaioMelo25)|
|26/05/2025|1.1|Finalização do Documento|[Vinícius Rufino](https://github.com/RufinoVfR)|
|19/06/2025|1.2|Atualização do documento (issue #15)|[Caio Melo](https://github.com/CaioMelo25)|
|24/06/2025|1.3|Correção do documento|[Vinícius Rufino](https://github.com/RufinoVfR)|