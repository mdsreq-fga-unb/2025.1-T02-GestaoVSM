## 9.1 Backlog Geral

O backlog geral reúne todas as funcionalidades previstas para o sistema na forma de histórias de usuário, elaboradas com base na lista de requisitos funcionais previamente definida. Esse backlog representa a visão consolidada do produto e deve ser constantemente revisado e atualizado para refletir mudanças nas necessidades do cliente, aprendizados ao longo do projeto e ajustes nas prioridades de negócio.

**US01** - Como administrador, eu quero realizar o fechamento de caixa com base na consolidação automática das receitas e comissões do período para que eu possa encerrar o dia de trabalho com segurança e sem erros manuais.

**US02** - Como administrador, eu quero calcular o faturamento total da barbearia em um intervalo de datas para que eu possa acompanhar o desempenho financeiro do negócio em diferentes períodos.

**US03** - Como administrador, eu quero visualizar um relatório de faturamento detalhado com filtros por funcionário, serviço ou produto para que eu possa entender melhor quais áreas geram mais receita em determinados períodos.

**US04** - Como administrador, eu quero registrar gastos operacionais com categoria, valor, data e descrição para que eles sejam considerados no cálculo financeiro da barbearia.

**US05** - Como administrador, eu quero gerar relatórios financeiros com detalhamento diário, semanal ou mensal para que eu possa acompanhar a saúde financeira da barbearia em diferentes escalas de tempo.

**US06** - Como administrador, eu quero cadastrar novos produtos com nome, descrição, preço e status de disponibilidade para que eles fiquem disponíveis para venda e gestão no sistema.

**US07** - Como administrador, eu quero editar as informações de produtos cadastrados, como nome, valor e descrição para que eu possa manter os dados atualizados conforme mudanças no estoque ou estratégia de vendas.

**US08** - Como administrador, eu quero remover produtos do sistema com a opção de inativá-los para que eu possa manter o histórico de vendas sem exibir itens indisponíveis para venda.

**US09** - Como administrador, eu quero cadastrar novos serviços com nome, preço, duração estimada e profissionais habilitados para que eu possa oferecer e gerenciar os serviços disponíveis na barbearia.

**US10** - Como administrador, eu quero editar os dados dos serviços cadastrados, como preço, duração e barbeiros associados para que eu possa manter as informações sempre atualizadas e condizentes com a realidade da barbearia.

**US11** - Como administrador, eu quero remover serviços do sistema com a opção de arquivá-los para que eu possa manter o histórico de atendimentos e relatórios mesmo após descontinuar um serviço.

**US12** - Como administrador, eu quero cadastrar perfis de funcionários com nome, especialidade, horário de trabalho, comissão e status para que eu possa gerenciar a equipe de forma eficiente dentro do sistema.

**US13** - Como administrador, eu quero editar os perfis dos funcionários, incluindo comissões, horários e especialidades para que eu possa manter os dados da equipe sempre atualizados conforme mudanças operacionais.

**US14** - Como administrador, eu quero excluir ou inativar perfis de funcionários sem perder os registros associados para que eu possa preservar o histórico de atendimentos e comissões mesmo após desligamentos.

**US15** - Como administrador, eu quero acessar relatórios de faturamento por funcionário com detalhes de serviços, vendas e comissões para que eu possa acompanhar o desempenho individual da equipe e calcular corretamente os repasses.

**US16** - Como funcionário, eu quero visualizar meus agendamentos diários em um calendário pessoal com horário, cliente e serviço para que eu possa me organizar melhor durante o dia de trabalho.

**US17** - Como administrador, eu quero visualizar em um único calendário os agendamentos de todos os funcionários, com filtros por data, serviço ou barbeiro para que eu possa ter uma visão completa da agenda da barbearia e otimizar o atendimento.

**US18** - Como cliente, eu quero realizar agendamentos pelo WhatsApp com um chatbot que entenda o serviço desejado e horários disponíveis para que eu possa marcar horários de forma rápida e prática, sem precisar baixar um aplicativo.

**US19** - Como administrador ou barbeiro, eu quero adicionar serviços ao calendário do barbeiro responsável para que eu possa organizar os atendimentos de acordo com a disponibilidade do profissional.

**US20** - Como administrador ou barbeiro, eu quero visualizar os agendamentos filtrados por funcionário com detalhes do serviço, data, cliente e duração para que eu possa planejar melhor os atendimentos e acompanhar a rotina de trabalho.

## 9.2 Priorização do Backlog Geral

A priorização do backlog foi realizada com base em uma **Análise de Custo / Benefício**, considerando os critérios de *Benefício (B)*, *Urgência (U)*, *Esforço (E)*, *Risco (R)* e *Dependência (D)*. Para classificar os requisitos de forma objetiva, foi aplicada a fórmula:  
**(B × 2 + U) − (E + R + D)**,  
permitindo identificar quais itens entregam maior valor com menor custo e complexidade. Essa abordagem orienta o planejamento das entregas, garantindo que funcionalidades mais relevantes e estratégicas sejam desenvolvidas primeiro.

A escala utilizada para cada critério variou de 1 a 5, conforme a seguinte descrição:

|Critério| Escala| Descrição|
|---|:---:|---|
|Benefício (B)|1-5|Quanto esse requisito resolve dores, agrega valor ou é essencial ao funcionamento do sistema.|
|Urgência (U)|1-5|O quão rapidamente isso precisa ser entregue para não prejudicar a operação ou valor da solução.|
|Esforço (E)|1-5|Estimativa de complexidade técnica, tempo de entrega, número de telas, validações, integrações etc.|
|Risco (R)|1-5|Potencial de falhas, dificuldade técnica, dependência de terceiros, margem de erro, impacto do erro.|
|Dependência (D)|1-5|Quanto o requisito depende de outros estarem prontos para funcionar corretamente.|

## 9.3 MVP

Com base na priorização realizada, foi possível identificar o conjunto de funcionalidades essenciais para a primeira entrega do sistema. A partir dessa análise, definiu-se o Produto Mínimo Viável (MVP), composto pelas histórias de usuário que oferecem maior valor imediato ao cliente com o menor esforço de implementação.

| US | Descrição | Objetivo Específico | Pontuação | Rank | MVP |
|:---:|---|---|:---:|:---:|:---:|
|US01|Realizar fechamento de caixa|Eliminar processos manuais propensos a erros|6|1|X|
|US02|Calcular o faturamento dado um intervalo de data|Eliminar processos manuais propensos a erros|3|2|X|
|US05|Gerar relatório financeiro de faturamento|Organizar e centralizar operações da barbearia|4|1|X|
|US07|Editar produto|Organizar e centralizar operações da barbearia|4|1|X|
|US10|Editar serviço|Organizar e centralizar operações da barbearia|4|1|X|
|US13|Editar perfil de funcionário|Organizar e centralizar operações da barbearia|4|1|X|
|US15|Acessar o relatório de faturamento de cada funcionário|Organizar e centralizar operações da barbearia|4|1|X|
|US16|Visualizar serviços agendados no calendário de funcionário|Automatização de agendamentos|6|2|X|
|US17|Visualizar agendamentos no calendário do administrador|Automatização de agendamentos|6|2|X|
|US18|Realizar agendamentos via WhatsApp|Automatização de agendamentos|6|2|X|
|US19|Adicionar serviço ao calendário do barbeiro|Automatização de agendamentos|8|1|X|
|US03|Visualizar o faturamento dado um intervalo de data|Eliminar processos manuais propensos a erros|2|3||
|US04|Registrar gasto operacional da barbearia|Eliminar processos manuais propensos a erros|1|4||
|US06|Cadastrar produto|Organizar e centralizar operações da barbearia|3|6||
|US08|Remover produto|Organizar e centralizar operações da barbearia|3|6||
|US09|Cadastrar serviço|Organizar e centralizar operações da barbearia|3|6||
|US11|Remover serviço|Organizar e centralizar operações da barbearia|3|6||
|US12|Cadastrar perfil de funcionário|Organizar e centralizar operações da barbearia|3|6||
|US14|Remover perfil de funcionário|Organizar e centralizar operações da barbearia|3|6||
|US20|Visualizar agendamentos no calendário por funcionário|Automatização de agendamentos|3|5||

## Histórico de Versão

|Data|Versão|Descrição|Autor|
|---|---|---|---|