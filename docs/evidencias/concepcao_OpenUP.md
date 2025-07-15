## Elicitação e Descoberta

### Entrevista

As entrevistas foram conduzidas com o proprietário e membros da equipe da barbearia em conjunto com a técnica de Etnografia, com o objetivo de compreender metas, processos cotidianos e dificuldades enfrentadas nas operações. A partir desses diálogos, foram identificadas as seguintes informações:

- Fechamento de Caixa

    - Processo realizado manualmente, aos domingos.

    - A receita é dividida em 60% para a barbearia e 40% entre os barbeiros.

    - Taxas de transações: crédito (4%), débito (1%), PIX/dinheiro (sem desconto).

    - A atividade é executada exclusivamente pelo proprietário (Valdernilson), sem apoio de ferramentas digitais, o que acarreta riscos de erros, perda de controle e falta de histórico confiável.

- Agendamentos

    - São feitos manualmente via WhatsApp, ligação telefônica ou pessoalmente.

    - Os próprios barbeiros anotam o nome e horário do cliente.

    - Conflitos de horário e esquecimentos são frequentes, principalmente em dias de maior movimento.

- Controle de Produtos

    - Produtos como pomadas, balm, shampoo e óleo de barba são vendidos diretamente no balcão.

    - O controle de estoque e as comissões sobre as vendas são informais, dificultando rastreabilidade e auditorias.

Essas informações revelam diversas ineficiências operacionais, reforçando a necessidade de digitalização dos processos, especialmente nas áreas de controle financeiro, organização de agendas e gestão de produtos.

### Análise de Tarefas

A análise de tarefas constitui uma etapa essencial no projeto Gestão VSM, visando identificar e detalhar as ações realizadas pelos usuários no sistema. Para isso, foi aplicada a metodologia GOMS, que permite decompor as tarefas em seus componentes fundamentais, facilitando a compreensão dos processos e apoiando a melhoria da interação e eficiência operacional.

=== "US01 - Fechamento de Caixa"

    **GOAL 0:** Realizar o fechamento de caixa da barbearia

    **GOAL 1:** Acessar o módulo de Extrato Financeiro

    **METHOD 1.A:** Acessar via Dashboard  
    (SEL. RULE: Usuário está na tela inicial após o login)  
    - OP. 1.A.1: Tocar ou clicar no card “Fechar caixa”

    **METHOD 1.B:** Acessar via Sidebar  
    (SEL. RULE: Usuário está navegando pelo menu lateral)  
    - OP. 1.B.1: Abrir o menu lateral  
    - OP. 1.B.2: Selecionar a opção “Fechar caixa”

    **GOAL 2:** Escolher o período de fechamento

    **METHOD 2.A:** Selecionar aba de período padrão (Semana ou Mês)  
    (SEL. RULE: Se o usuário desejar consultar a semana ou o mês atual)  
    - OP. 2.A.1: Tocar ou clicar na aba “Semana Atual” ou “Mês Atual”

    **GOAL 3:** Visualizar detalhamento financeiro  
    - OP. 3.1: Analisar os totais de serviços, produtos e comissões exibidos por funcionário

    **GOAL 4:** Exportar o fechamento de caixa em PDF

    **METHOD 4.A:** Confirmar exportação  
    (SEL. RULE: Se o usuário desejar gerar o relatório em PDF)  
    - OP. 4.A.1: Tocar ou clicar no botão “Baixar extrato”  
    - OP. 4.A.2: Confirmar a exportação no modal exibido

    **METHOD 4.B:** Cancelar exportação  
    (SEL. RULE: Se o usuário quiser desistir)  
    - OP. 4.B.1: Tocar ou clicar no “X” no modal de exportação


=== "US02 - Visualizar e Calcular Faturamento Total"

    **GOAL 0:** Visualizar e calcular o faturamento total da barbearia em um período específico

    **GOAL 1:** Acessar o módulo de Extrato Financeiro

    **METHOD 1.A:** Acessar via Dashboard  
    (SEL. RULE: Usuário está na tela inicial após login)  
    - OP. 1.A.1: Tocar ou clicar no card “Fechar caixa”

    **METHOD 1.B:** Acessar via Sidebar  
    (SEL. RULE: Usuário acessando via menu lateral)  
    - OP. 1.B.1: Abrir o menu lateral  
    - OP. 1.B.2: Selecionar “Fechar caixa”

    **GOAL 2:** Escolher o período para o cálculo do faturamento

    **METHOD 2.A:** Selecionar período padrão  
    (SEL. RULE: Se o período for “Semana Atual” ou “Mês Atual”)  
    - OP. 2.A.1: Tocar ou clicar na aba correspondente

    **GOAL 3:** Aplicar filtros adicionais

    **METHOD 3.A:** Observar faturamento por funcionário  
    (SEL. RULE: O sistema apresenta cards com total de faturamento por colaborador)  
    - OP. 3.A.1: Localizar visualmente o card correspondente ao funcionário desejado  
    - OP. 3.A.2: Analisar o valor de faturamento exibido no card

    **METHOD 3.B:** Observar faturamento por tipo de serviço ou produto  
    (SEL. RULE: O sistema apresenta cards categorizados por tipo de atendimento)  
    - OP. 3.B.1: Localizar visualmente o card com as informações de faturamento de comissões, produtos, serviços e faturamento total  
    - OP. 3.B.2: Analisar o valor de faturamento exibido no card

    **GOAL 4:** Visualizar o resultado do faturamento  
    - OP. 4.1: Analisar o total de faturamento exibido na tela


=== "US03 - Registro de Gastos Operacionais"

    **GOAL 0:** Registrar um novo gasto operacional da barbearia

    **GOAL 1:** Acessar a tela de Gastos Operacionais

    **METHOD 1.A:** Acessar via Dashboard  
    (SEL. RULE: Usuário está na tela principal)  
    - OP. 1.A.1: Tocar ou clicar no card “Registrar Gasto”

    **METHOD 1.B:** Acessar via Sidebar  
    (SEL. RULE: Usuário acessando via menu lateral)  
    - OP. 1.B.1: Abrir o menu lateral  
    - OP. 1.B.2: Selecionar a opção “Registrar Gasto”

    **GOAL 2:** Visualizar lista de gastos já cadastrados  
    - OP. 2.1: Rolar a lista de gastos, se desejar consultar registros anteriores

    **GOAL 3:** Iniciar novo registro de gasto  
    - OP. 3.1: Tocar ou clicar no botão “Adicionar Gasto”

    **GOAL 4:** Preencher os campos obrigatórios no Modal de Adicionar Gasto  
    - OP. 4.1: Tocar ou clicar no campo “Categoria” e selecionar a categoria  
    - OP. 4.2: Tocar ou clicar no campo “Valor” e inserir o valor numérico  
    - OP. 4.3: Tocar ou clicar no campo “Data” e selecionar a data  
    - OP. 4.4: Tocar ou clicar no campo “Descrição” e digitar a descrição do gasto  
    - OP. 4.5: Tocar ou clicar no campo “Funcionário” e selecionar o funcionário

    **GOAL 5:** Finalizar o cadastro de gasto

    **METHOD 5.A:** Salvar o gasto  
    (SEL. RULE: Se o usuário deseja concluir o cadastro)  
    - OP. 5.A.1: Tocar ou clicar no botão “Salvar”

    **METHOD 5.B:** Cancelar o cadastro  
    (SEL. RULE: Se o usuário deseja desistir)  
    - OP. 5.B.1: Tocar ou clicar no botão “Cancelar”

=== "US05 - Visualizar o Faturamento Bruto por Dia, Semana e Mês"

    **GOAL 0:** Consultar o faturamento bruto da barbearia com base em períodos padrão

    **GOAL 1:** Acessar a Dashboard

    **METHOD 1.A:** Acessar via menu lateral  
    (SEL. RULE: O usuário está na tela Agenda após login)  
    - OP. 1.A.1: Abrir o menu lateral  
    - OP. 1.A.2: Selecionar a opção “Dashboard”  
    - OP. 1.A.3: Aguardar o carregamento da tela principal

    **GOAL 2:** Analisar o faturamento bruto por período

    **METHOD 2.A:** Observar os cards de faturamento padrão  
    (SEL. RULE: Sempre visíveis no topo da tela, acima dos atalhos)  
    - OP. 2.A.1: Observar o valor de faturamento bruto diário no card “Hoje”  
    - OP. 2.A.2: Observar o valor de faturamento bruto semanal no card “Semana”  
    - OP. 2.A.3: Observar o valor de faturamento bruto mensal no card “Mês”


=== "US07 - Visualizar Extrato Geral"

    **GOAL 0:** Acompanhar a divisão do faturamento por funcionário em um determinado período

    **GOAL 1:** Acessar o módulo de Extrato Financeiro

    **METHOD 1.A:** Acessar via Dashboard  
    (SEL. RULE: Usuário está na tela inicial após login)  
    - OP. 1.A.1: Tocar ou clicar no card “Fechar Caixa”

    **METHOD 1.B:** Acessar via Sidebar  
    (SEL. RULE: Usuário prefere navegar pelo menu)  
    - OP. 1.B.1: Abrir o menu lateral  
    - OP. 1.B.2: Selecionar “Fechar Caixa”

    **GOAL 2:** Selecionar o período desejado

    **METHOD 2.A:** Períodos padrão  
    (SEL. RULE: Se for semana ou mês atual)  
    - OP. 2.A.1: Tocar ou clicar na aba “Semana Atual” ou “Mês Atual”

    **GOAL 3:** Analisar os dados financeiros

    **METHOD 3.A:** Visualizar o resumo geral de faturamento  
    (SEL. RULE: Sempre exibido no topo da tela)  
    - OP. 3.A.1: Localizar visualmente o card de Resumo Geral de Faturamento  
    - OP. 3.A.2: Observar os seguintes dados apresentados no card:  
      - Total em serviços  
      - Total em produtos  
      - Total de comissões  
      - Faturamento total  
      - Lucro líquido

    **METHOD 3.B:** Analisar detalhamento por funcionário  
    (SEL. RULE: Sempre exibido abaixo do resumo geral)  
    - OP. 3.B.1: Localizar visualmente os cards individuais de cada funcionário  
    - OP. 3.B.2: Para cada card, observar os seguintes dados:  
      - Valor total em serviços prestados  
      - Comissão do funcionário  
      - Gastos associados (se aplicável)  
      - Total a pagar (valor líquido)


=== "US09 - Edição de Informações dos Produtos"

    **GOAL 0:** Alterar nome, valor ou descrição de um produto cadastrado

    **GOAL 1:** Acessar a tela de Produtos

    **METHOD 1.A:** Acessar via Dashboard  
    (SEL. RULE: Usuário está na tela inicial)  
    - OP. 1.A.1: Tocar ou clicar no card “Produtos”

    **METHOD 1.B:** Acessar via Sidebar  
    (SEL. RULE: Usuário prefere o menu)  
    - OP. 1.B.1: Abrir o menu lateral  
    - OP. 1.B.2: Selecionar “Produtos”

    **GOAL 2:** Localizar o produto a ser editado

    **METHOD 2.A:** Rolar a lista  
    (SEL. RULE: Poucos produtos cadastrados)  
    - OP. 2.A.1: Deslizar a tela até encontrar o produto desejado

    **METHOD 2.B:** Buscar pelo nome  
    (SEL. RULE: Muitos produtos cadastrados)  
    - OP. 2.B.1: Tocar ou clicar no campo de busca  
    - OP. 2.B.2: Digitar o nome do produto  
    - OP. 2.B.3: Selecionar o item da lista de resultados

    **GOAL 3:** Abrir o modal de edição  
    - OP. 3.1: Tocar ou clicar no item da lista de produtos

    **GOAL 4:** Modificar os dados do produto  
    - OP. 4.1: Editar o campo “Nome”, se necessário  
    - OP. 4.2: Editar o campo “Valor”, se necessário  
    - OP. 4.3: Editar o campo “Comissão”, se necessário

    **GOAL 5:** Salvar ou cancelar a edição

    **METHOD 5.A:** Salvar  
    (SEL. RULE: Se todas as alterações foram concluídas)  
    - OP. 5.A.1: Tocar ou clicar em “Salvar”

    **METHOD 5.B:** Cancelar  
    (SEL. RULE: Se o usuário não deseja aplicar mudanças)  
    - OP. 5.B.1: Tocar ou clicar em “Cancelar”

=== "US12 - Edição de Serviços"

    **GOAL 0:** Atualizar informações de um serviço cadastrado, como nome, valor, tempo de duração e profissionais habilitados

    **GOAL 1:** Acessar a tela de Serviços

    **METHOD 1.A:** Acessar via Dashboard  
    (SEL. RULE: Usuário está na tela inicial)  
    - OP. 1.A.1: Tocar ou clicar no card “Serviços”

    **METHOD 1.B:** Acessar via Sidebar  
    (SEL. RULE: Usuário prefere usar o menu lateral)  
    - OP. 1.B.1: Abrir o menu lateral  
    - OP. 1.B.2: Selecionar “Serviços”

    **GOAL 2:** Localizar o serviço a ser editado

    **METHOD 2.A:** Rolar a lista de serviços  
    (SEL. RULE: Quando o número de serviços é pequeno)  
    - OP. 2.A.1: Deslizar a tela até o serviço desejado

    **METHOD 2.B:** Buscar pelo nome  
    (SEL. RULE: Quando há muitos serviços cadastrados)  
    - OP. 2.B.1: Tocar ou clicar no campo de busca  
    - OP. 2.B.2: Digitar o nome do serviço  
    - OP. 2.B.3: Selecionar o resultado desejado

    **GOAL 3:** Abrir o modal de edição  
    - OP. 3.1: Tocar ou clicar no item da lista de serviços

    **GOAL 4:** Alterar informações do serviço  
    - OP. 4.1: Editar o campo “Nome”, se necessário  
    - OP. 4.2: Editar o campo “Valor”, se necessário  
    - OP. 4.3: Editar o campo “Tempo estimado”, se necessário

    **GOAL 5:** Finalizar a edição

    **METHOD 5.A:** Salvar  
    (SEL. RULE: Se todas as alterações foram concluídas)  
    - OP. 5.A.1: Tocar ou clicar no botão “Salvar”

    **METHOD 5.B:** Cancelar  
    (SEL. RULE: Se o usuário não quiser aplicar mudanças)  
    - OP. 5.B.1: Tocar ou clicar no botão “Cancelar”


=== "US15 - Edição de Funcionários"

    **GOAL 0:** Atualizar as informações de um funcionário, como comissão, horário e especialidades

    **GOAL 1:** Acessar a tela de Funcionários

    **METHOD 1.A:** Acessar via Dashboard  
    (SEL. RULE: Usuário está na tela principal)  
    - OP. 1.A.1: Tocar ou clicar no card “Funcionários”

    **METHOD 1.B:** Acessar via Sidebar  
    (SEL. RULE: Usuário utiliza o menu lateral)  
    - OP. 1.B.1: Abrir o menu lateral  
    - OP. 1.B.2: Selecionar “Funcionários”

    **GOAL 2:** Localizar o funcionário a ser editado

    **METHOD 2.A:** Rolar a lista  
    (SEL. RULE: Quando há poucos funcionários)  
    - OP. 2.A.1: Deslizar a tela até o funcionário desejado

    **METHOD 2.B:** Buscar pelo nome  
    (SEL. RULE: Quando há muitos funcionários)  
    - OP. 2.B.1: Tocar ou clicar no campo de busca  
    - OP. 2.B.2: Digitar o nome do funcionário  
    - OP. 2.B.3: Selecionar o resultado da busca

    **GOAL 3:** Abrir o modal de edição  
    - OP. 3.1: Tocar ou clicar no item da lista de funcionários

    **GOAL 4:** Alterar as informações  
    - OP. 4.1: Editar o campo “Nome do funcionário”, se necessário  
    - OP. 4.2: Editar o campo “Início do expediente”, se necessário  
    - OP. 4.3: Editar o campo “Fim do expediente”, se necessário  
    - OP. 4.4: Editar o campo “Email”, se necessário  
    - OP. 4.5: Editar o campo “Usuário”, se necessário  
    - OP. 4.6: Editar o campo “Senha”, se necessário

    **GOAL 5:** Finalizar a edição

    **METHOD 5.A:** Salvar  
    (SEL. RULE: Se todas as modificações foram feitas)  
    - OP. 5.A.1: Tocar ou clicar no botão “Salvar”

    **METHOD 5.B:** Cancelar  
    (SEL. RULE: Se o usuário quiser descartar as alterações)  
    - OP. 5.B.1: Tocar ou clicar no botão “Cancelar”


=== "US17 - Visualizar Agendamentos no Calendário"

    **GOAL 0:** Consultar os agendamentos no calendário da barbearia com base em filtros

    **GOAL 1:** Acessar a Agenda

    **METHOD 1.A:** Acessar via Dashboard  
    (SEL. RULE: Usuário está na tela inicial após o login)  
    - OP. 1.A.1: Tocar ou clicar no card “Agenda”

    **METHOD 1.B:** Acessar via Sidebar  
    (SEL. RULE: Usuário navega pelo menu)  
    - OP. 1.B.1: Abrir o menu lateral  
    - OP. 1.B.2: Selecionar “Agenda”

    **GOAL 2:** Selecionar o dia a ser consultado  
    - OP. 2.1: Navegar horizontalmente entre os dias da semana/mês  
    - OP. 2.2: Tocar ou clicar na data desejada

    **GOAL 3:** Aplicar filtro por barbeiro (opcional)  
    - OP. 3.1: Tocar ou clicar no campo de filtro de barbeiro  
    - OP. 3.2: Selecionar o nome do barbeiro

    **GOAL 4:** Visualizar os agendamentos  
    - OP. 4.1: Observar a lista de agendamentos exibida na tela, organizada por horário e profissional


=== "US18 - Adicionar Serviços ao Calendário"

    **GOAL 0:** Adicionar um novo agendamento à agenda da barbearia, considerando a disponibilidade do funcionário

    **GOAL 1:** Acessar a Agenda

    **METHOD 1:** Acesso automático à Agenda  
    - OP. 1.A.1: Aguardar carregamento automático da tela “Agenda” após login

    **GOAL 2:** Abrir o modal de novo agendamento  
    - OP. 2.1: Tocar ou clicar no botão de ação flutuante “Agendar” (FAB)

    **GOAL 3:** Preencher as informações do agendamento  
    - OP. 3.1: Tocar ou clicar no campo “Nome do Cliente” e digitar o nome  
    - OP. 3.2: Tocar ou clicar no campo “Selecione o horário” e selecionar a hora disponível  
    - OP. 3.3: Tocar ou clicar no campo “Selecione o barbeiro” e selecionar o profissional  
    - OP. 3.4: Tocar ou clicar no campo “Selecione os serviços” e selecionar um ou mais serviços  
    - OP. 3.5: Verificar automaticamente o “Tempo estimado” calculado  
    - OP. 3.6: Verificar automaticamente o “Subtotal” do atendimento

    **GOAL 4:** Finalizar o agendamento

    **METHOD 4.A:** Salvar o agendamento  
    (SEL. RULE: Todos os campos estão preenchidos corretamente)  
    - OP. 4.A.1: Tocar ou clicar no botão “Agendar”  
    - OP. 4.A.2: Aguardar a criação do agendamento e atualização da lista

    **METHOD 4.B:** Cancelar o agendamento  
    (SEL. RULE: O usuário decide não agendar o serviço)  
    - OP. 4.B.1: Tocar ou clicar no botão “Cancelar”  
    - OP. 4.B.2: Fechar o modal sem salvar

Para facilitar a consulta, o documento completo das análises GOMS está disponível para download no formato PDF:
[Baixar Análise de Tarefas - GOMS Detalhado (Gestão VSM)](./assets/Análise%20de%20Tarefas%20-%20GOMS%20Detalhado%20(Gestão%20VSM).pdf)

### Observação/Imersão (Etnografia)

Durante as visitas presenciais à barbearia VSM, em Rio Branco – AC, um integrante da equipe realizou a imersão no ambiente de trabalho por aproximadamente [inserir número de dias ou horas, se disponível], observando rotinas operacionais e interações informais entre os colaboradores. Essa aproximação permitiu identificar necessidades não verbalizadas e validar práticas reais do cotidiano.

A seguir, os principais achados observacionais e sua fundamentação empírica:

- **Organização dos atendimentos pelos barbeiros:** 
    Os barbeiros se organizam verbalmente e por anotações pessoais, sem registro padronizado. Em ao menos três ocasiões observadas, dois profissionais marcaram clientes em horários coincidentes, demonstrando risco de conflitos operacionais por ausência de controle centralizado.

- **Centralização de decisões operacionais e financeiras:**  
    O proprietário da barbearia foi o único a realizar o fechamento de caixa em todos os dias observados, bem como o único a realizar compras de produtos e controle de estoque, indicando concentração de responsabilidade crítica em um único ponto de falha.

- **Falta de registro estruturado de atendimentos e vendas:**  
    Durante a observação, constatou-se que os atendimentos e as vendas de produtos são registrados de forma manual, majoritariamente em um caderno físico mantido no balcão. No entanto, parte dos barbeiros adota um controle informal baseado apenas na própria memória — prática observada em um dos profissionais. Essa abordagem mista e não padronizada compromete a rastreabilidade e aumenta a probabilidade de esquecimentos ou divergências entre o que foi vendido e o que é registrado, dificultando qualquer processo de auditoria ou análise de desempenho.

- **Impacto da ausência de automação na produtividade:**  
    O fechamento de caixa observado levou, em média, entre 20 a 25 minutos por dia, exigindo o uso de máquina de cartão, celular com WhatsApp e cálculos manuais. Esse tempo representa aproximadamente 5% da jornada diária de trabalho (considerando um turno de 8 horas), o que, ao longo da semana, resulta em um tempo operacional relevante que poderia ser otimizado por meio de automação. Além disso, a execução manual aumenta a chance de erros e dificulta a análise histórica de movimentações financeiras.

- **Informalidade nos registros financeiros e de estoque:**  
    A ausência de conferência cruzada entre vendas e controle de estoque foi evidente: produtos retirados para uso ou venda não eram registrados de nenhuma forma. Isso inviabiliza qualquer tipo de auditoria ou controle de perdas.

Essa análise etnográfica forneceu dados comportamentais e contextuais que reforçam a urgência na digitalização dos processos operacionais e financeiros da barbearia, especialmente no que diz respeito à mitigação de falhas humanas, à descentralização da gestão e à confiabilidade das informações.

## Análise e Consenso

### INVEST

Ao aplicar os critérios do método INVEST no projeto Gestão VSM, garantimos que os requisitos definidos atendam a características essenciais para um desenvolvimento eficiente e alinhado às necessidades do cliente. Dessa forma, cada User Story foi estruturada para ser Independente, possibilitando o trabalho isolado; Negociável, permitindo ajustes conforme o contexto; Valiosa, assegurando entrega de valor ao negócio; Estimável, facilitando o planejamento; Pequena, garantindo fácil compreensão e execução; e Testável, possibilitando a validação objetiva das funcionalidades implementadas. Para consultar a estrutura detalhada das User Stories, acesse a página dedicada ao [backlog](../visao_prod_proj/backlog_produto.md#histórias-de-usuário-us).



### Discussões com o cliente

Após a coleta inicial de informações por meio de entrevistas, análise de tarefas e observação direta da rotina da barbearia, foram realizadas reuniões com o proprietário da VSM com o objetivo de validar o entendimento mútuo sobre os processos observados e as principais necessidades do negócio. Essas discussões permitiram esclarecer fluxos operacionais, confirmar prioridades e identificar eventuais lacunas na modelagem inicial. Além disso, foi possível definir, de forma colaborativa, os limites do escopo viável dentro do tempo disponível para o projeto, estabelecendo as funcionalidades essenciais para o [Produto Mínimo Viável (MVP)](../visao_prod_proj/backlog_produto.md#93-mvp). 

Durante as discussões, o cliente compartilhou sugestões importantes para a evolução do sistema. A integração com o WhatsApp para automação dos agendamentos foi formalmente incorporada à [lista de requisitos](../visao_prod_proj/requisitos_software.md), embora tenha sido excluída do escopo do MVP devido à complexidade e ao prazo disponível. Por outro lado, a proposta de um programa de fidelidade para clientes recorrentes ainda se encontra como uma ideia a ser avaliada futuramente, sem estar formalmente definida como requisito. Essas contribuições reforçam o compromisso com a melhoria contínua do sistema e sua adaptação às necessidades estratégicas da barbearia.

## Declaração

### Backlog inicial (Temas, Épicos e US)

A organização inicial dos requisitos para o projeto Gestão VSM está estruturada em um backlog hierarquizado, composto por Temas, Épicos e User Stories (US). Essa estruturação permite um planejamento incremental e ordenado, facilitando a priorização e o acompanhamento das entregas ao longo do desenvolvimento. Para consulta detalhada, a página dedicada ao backlog pode ser acessada [clicando aqui](../visao_prod_proj/backlog_produto.md), onde são apresentados os itens estruturados e suas respectivas descrições, alinhadas às práticas de engenharia de requisitos adotadas no projeto.


## Verificação e Validação

### Revisão com o cliente

Aqui estão presentes todas as atas de reuniões entre nossa equipe e o cliente que aconteceram durante o período do desenvolvimento do projeto:

**ATA DE REUNIÃO**  
**Data:** 09/04/2024  

**Informações coletadas:**  
- 7 anos no mercado  
- Equipe: Valder + 5 barbeiros  
- Serviços: cortes e produtos  

**Problemas atuais:**  
- Organização interna  
- Comunicação com equipe  
- Fechamento de caixa complicado  

**Funcionalidades solicitadas:**  
- Agendamento/remarcação  
- Cadastro de clientes  
- Gestão de comissões  
- Controle de caixa  
- Calendário compartilhado  

**ATA DE REUNIÃO**  
**Data:** 09/05/2024  

**Processo atual:**  
- Agendamentos por WhatsApp/celular  
- Planilha manual com: nome do cliente, serviços feitos, forma de pagamento  

<center><p>Figura 1 - Planilha de Serviços </p></center>

[![Figura 1 - Planilha de Serviços](docs\evidencias\assets\tabela_de_registros.jpeg)](docs\evidencias\assets\tabela_de_registros.jpeg)

**Requisitos:**  
- Android e iOS  
- Uso do domínio VSM  

**Dores principais:**  
- Atrasos quando lotado  
- Folgas não organizadas  
- Anotações manuais demoradas  

**Comissões:**  
- Produtos: R$5 ou R$10  
- Bebidas: sem comissão  

<center><p>Figura 2 - Tabela de Valores </p></center>

[![Figura 2 - Tabela de Valores](docs\evidencias\assets\tabela_de_valores.jpeg)](docs\evidencias\assets\tabela_de_valores.jpeg)

**ATA DE REUNIÃO**  
**Data:** 24/05/2024  

**Fechamento de caixa:**  
- Dinheiro/PIX: valor cheio  
- Cartão: desconta taxa (débito 1%, crédito 4%)  
- Comissões: 60% barbearia / 40% barbeiro  
- Descontos: consumo dos barbeiros  
- Pagamento semanal  
- Contas fixas: aluguel, luz, internet, impostos  

**ATA DE REUNIÃO**  
**Data:** 19/06/2024  

**Equipe:** Valder, Elson, Ian, Moisés, Gabriel, Eliene, Marcos  

**Preços dos serviços:**  
- Corte: R$40  
- Barba: R$35  
- Sobrancelha: R$15-R$20  
- Selagem: R$70+  
- Luzes: R$90+  
- Platinado: R$150+  

**ATA DE REUNIÃO**  
**Data:** 23/06/2024  

**Atualizações:**  
- Protótipo aprovado  
- Em expansão - novo funcionário para caixa  

**Produtos:**  
- Com R$5 comissão: Pomada (R$40), Balm (R$45), Óleo (R$35)  
- Com R$10 comissão: Máquina (R$180)  
- Sem comissão: Bebidas (cerveja R$10, refri R$5, energético R$8-R$12)  

<center><p>Figura 3 - Comissão e Porcentagens </p></center>

[![Figura 3 - Comissão e Porcentagens](docs\evidencias\assets\comissao_e_porcentagem.jpeg)](docs\evidencias\assets\comissao_e_porcentagem.jpeg)
 
## Organização e Atualização

### Aplicação do DEEP

A gestão contínua do [backlog no projeto Gestão VSM](../visao_prod_proj/backlog_produto.md) é orientada pelos princípios do método DEEP, que assegura a qualidade e a adaptabilidade dos requisitos ao longo do desenvolvimento. Os itens do backlog são mantidos detalhados na medida adequada para permitir entendimento claro e evitar ambiguidades, além de serem estimados com base em esforço e complexidade para facilitar o planejamento das entregas. O backlog é tratado como um artefato emergente, sendo constantemente revisado e atualizado conforme novas informações e feedback do cliente são incorporados. Por fim, a priorização rigorosa dos itens assegura que as funcionalidades mais valiosas e urgentes sejam abordadas primeiro, promovendo um desenvolvimento focado e alinhado aos objetivos do negócio. Na próxima fase, será aplicada a Análise Custo-Benefício (B x 2 + U - E - R - D) para refinar ainda mais a priorização dos requisitos.

## Histórico de Versão

|Data|Versão|Descrição|Autor|
|---|---|---|---|
| 11/05/2025| 1.0 | Criação do documento | [Weverton Rodrigues](https://github.com/vevetin) |