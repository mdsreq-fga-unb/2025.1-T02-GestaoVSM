## 4.1 Atividades e Técnicas de ER

### Concepção (OpenUP)
**Elicitação e Descoberta**  

- **Entrevista:** Conversar com proprietários e equipe da barbearia para entender metas, processos de agendamento, vendas, finanças e identificar dores e necessidades para o sistema. Buscar clareza sobre os fluxos de valor atuais e os resultados esperados com a nova ferramenta de gestão.

- **Análise de Tarefas:** Detalhar os passos de atividades chave como fechar o caixa, agendar clientes ou gerir estoque para mapear os fluxos de trabalho. Identificar ineficiências e requisitos funcionais para otimizar estas operações no novo sistema de gestão.

- **Observação / Imersão (Etnografia):** Acompanhar o dia a dia da barbearia para entender na prática os processos de atendimento, vendas e gestão e captar necessidades não ditas. Observar as interações reais e o uso de ferramentas atuais para identificar requisitos contextuais e de usabilidade para o sistema.

### Elaboração (OpenUP)

**Análise e Consenso**  

- **Priorização a partir de uma Análise de Custo / Benefício:** A priorização dos requisitos foi feita a partir de uma análise dos seguintes critérios: Benefício (B), Urgência (U), Esforço (E), Risco (R) e Dependência (D). O cálculo foi feito a partir da seguinte fórmula: (B x 2 + U) - (E + R + D).

- **Análise de Risco:** Identificar potenciais problemas técnicos, operacionais ou de aceitação do novo sistema de gestão pela equipe da barbearia.

**Declaração**  

- **Framework de User Story (Temas, Épicos e User Stories):** Os requisitos  serão organizados em Temas estratégicos (ex: Organizar e centralizar operações da barbearia), detalhados em Épicos (grandes funcionalidades como “Cadastro de produtos”). Estes Épicos serão decompostos em User Stories específicas (ações e valor para o usuário), facilitando o planejamento e desenvolvimento incremental.

### User Design (RAD)
**Verificação e Validação**  

- **Critérios de Aceitação e DoR (Definition of Ready):** Para cada User Story serão definidos Critérios de Aceitação claros e testáveis, que validam a entrega de valor para a barbearia. A Definition of Ready (DoR) garantirá que as User Stories possuam toda a informação necessária antes de iniciar o desenvolvimento.

- **Definition of Done (DoD):** Estabelecer uma Definition of Done clara, com todos os critérios que uma funcionalidade do sistema deve atender para ser considerada completa. Isso verificará a qualidade das entregas, garantindo que testes foram feitos, o código está em conformidade e a documentação pertinente foi criada.

- **Feedback:** Coletar continuamente as percepções dos proprietários e equipe da barbearia sobre o sistema durante o desenvolvimento dos protótipos. Isso validará se as funcionalidades entregues atendem às necessidades reais e expectativas do negócio.

- **INVEST:** Aplicar os critérios INVEST para revisar as User Stories do sistema, assegurando que sejam claras, independentes e testáveis. Isso verificará a qualidade dos requisitos, facilitando o desenvolvimento e a entrega de valor para a barbearia.

- **DEEP:** Gerenciar o backlog de User Stories do projeto utilizando os atributos DEEP, garantindo detalhamento, estimativa, emergência e priorização adequados. Isso validará que o trabalho esteja bem organizado e que o time se concentre nos itens de maior impacto para a gestão da barbearia.

### Construção (OpenUP)

**Declaração**
- **Framework de User Story** (Temas, Épicos e User Stories): Continuidade da decomposição de épicos em User Stories refinadas.

**Verificação e Validação**
- **Revisão**: Aplicação de Code Review, Integração Contínua e testes automatizados para garantir que os requisitos estejam corretamente implementados.
- **Definition of Ready** (DoR): Durante a fase de construção, os requisitos refinados a partir dos protótipos e do feedback dos usuários deverão ser reavaliados com base na Definition of Ready (DoR). Essa prática garantirá que qualquer ajuste ou nova User Story esteja completa, compreensível e validada antes de ser encaminhada para desenvolvimento, mantendo a qualidade e o alinhamento.

### Transição (OpenUP)

**Verificação e Validação**
- **Walkthrough**: Apresentação do produto para validação de alguns usuários finais. (funcionários da barbearia).

**Organização e Atualização**
- **Registro de requisitos não implementados**: Documentar requisitos que não foram entregues nesta versão, mas que surgiram ou evoluíram durante o projeto, como uma base para futuras versões.

**Declaração**
- **Documentação de escopo entregue**: Gerar um artefato final que consolide todos os requisitos implementados, suas versões finais e observações sobre ajustes realizados.

## 4.2 Engenharia de Requisitos e RAD + OpenUP

Aqui, as atividades da ER, suas práticas e técnicas devem ser mapeadas, a partir das fases (etapas) do processo estabelecido pela equipe, para a condução do projeto. Essas informações devem ser apresentadas em uma tabela conforme indicado, a seguir (exemplo).

| Fases do Processo         | Atividades ER               | Prática                                    | Técnica                                                                 | Resultado Esperado                                                                                      |
|--------------------------|-----------------------------|--------------------------------------------|------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| **Concepção (OpenUP)**   | *Elicitação e Descoberta*   | Levantamento de requisitos                 | Entrevista, Análise de Tarefas, Observação                             | Levantar necessidades e dores do cliente com base em processos reais da barbearia                       |
| **Elaboração (OpenUP)**                   | *Análise e Consenso*        | Priorização e mitigação de riscos          | Análise Custo/Benefício, Análise de Risco                              | Requisitos priorizados com base em impacto, esforço e riscos                                            |
|                          | Declaração                  | Organização inicial dos requisitos         | Framework de User Story (Temas, Épicos, US)                            | Backlog estruturado e alinhado aos objetivos do negócio                                                 |
| **User Design (RAD)**    | Verificação e Validação     | Validação do que será desenvolvido         | Critérios de Aceitação, INVEST, Feedback, [DoD](https://en.wikipedia.org/wiki/Definition_of_done)         | Requisitos validados com usuários e preparados com clareza para desenvolvimento                         |
|                          | Declaração                  | Atualização e detalhamento de novos requisitos | Framework de User Story (para novos requisitos)                     | User Stories coerentes com os protótipos e necessidades emergentes                                      |
|                          | Representação               | Esboço e simulação do sistema              | Mockups, Protótipos de Alta Fidelidade                                 | Representações visuais das interfaces para facilitar validação e refinamento com usuários               |
|                          | Organização e Atualização   | Ajustes no backlog após feedback           | DEEP, Repriorização com base em Feedback                               | Backlog atualizado e priorizado de acordo com necessidades reais e feedbacks coletados                  |
| **Construção (OpenUP)**  | Declaração                  | Continuidade do detalhamento               | Framework de User Story                                                | User Stories refinadas para orientar o desenvolvimento incremental                                      |
|                          | Verificação e Validação     | Garantia de qualidade na entrega           | Code Review, Testes Automatizados, Integração Contínua, DoR            | Funcionalidades implementadas corretamente, testadas e validadas                                       |
| **Transição (OpenUP)**   | Verificação e Validação     | Validação final com usuários               | Walkthrough com usuários finais                                        | Confirmação de que o sistema atende às expectativas e ao uso real no ambiente da barbearia             |
|                          | Organização e Atualização   | Encerramento e rastreamento de pendências  | Registro de requisitos não implementados                               | Base registrada para versões futuras, mantendo histórico e continuidade evolutiva do sistema            |
|                          | Declaração                  | Formalização da entrega final              | Documentação de escopo entregue                                        | Artefato consolidado com todos os requisitos implementados e ajustes registrados para auditoria         |



## Histórico de Versão

|Data|Versão|Descrição|Autor|
|---|---|---|---|
|23/05/2025|1.0|Criação do documento|[Caio Melo](https://github.com/CaioMelo25)|
|26/05/2025|1.1|Finalização do Documento|[Vinícius Rufino](https://github.com/RufinoVfR)|