## 9.1 Backlog Geral

O backlog geral reúne todas as funcionalidades previstas para o sistema na forma de histórias de usuário, elaboradas com base na lista de requisitos funcionais previamente definida. Esse backlog representa a visão consolidada do produto e deve ser constantemente revisado e atualizado para refletir mudanças nas necessidades do cliente, aprendizados ao longo do projeto e ajustes nas prioridades de negócio. O documento possui uma hierarquia que separa os requisitos em: Temas Estratégicos (TE), Épicos (E) e Histórias de Usuário (US).

### Temas Específicos (TE)

|ID|Descrição|
|--|---------|
|TE01|Eliminar processos manuais propensos a erros|
|TE02|Organizar e centralizar operações da barbearia|
|TE03|Automatização de agendamentos|

### Épicos (E)

|Tema Atrelado|ID|Épico|Descrição|
|-------------|--|-----|---------|
|[**T01**](#temas-específicos-tm)|**E01**|Realizar fechamento de caixa|Permitir ao administrador realizar o fechamento de caixa com base na consolidação automática de todas as vendas de produtos, serviços prestados e comissões pagas aos funcionários no período selecionado.|
|[**T01**](#temas-específicos-tm)|**E02**|Calcular o faturamento dado um intervalo de data|Permitir ao administrador calcular o faturamento total da barbearia em um intervalo de datas, considerando receitas provenientes de serviços e vendas de produtos.|
|[**T01**](#temas-específicos-tm)|**E03**|Visualizar o faturamento dado um intervalo de data|Permitir ao administrador visualizar relatório de faturamento detalhado dentro de um intervalo de datas, com filtros por funcionário, tipo de serviço ou produto.|
|[**T01**](#temas-específicos-tm)|**E04**|Registrar gasto operacional da barbearia|Permitir o registro de gastos operacionais, informando categoria, valor, data e descrição, para que sejam considerados no cálculo financeiro da barbearia.|
|[**T02**](#temas-específicos-tm)|**E05**|Gerar relatório financeiro de faturamento|Permitir ao administrador gerar relatório financeiro com o detalhamento diário, semanal ou mensal de receitas, despesas e comissões.|
|[**T02**](#temas-específicos-tm)|**E06**|Cadastrar produto|Permitir o cadastro de novos produtos com informações como nome, descrição, preço e status de disponibilidade para venda.|
|[**T02**](#temas-específicos-tm)|**E07**|Editar produto|Permitir a edição de informações dos produtos cadastrados, incluindo alterações no nome, valor ou descrição.|
|[**T02**](#temas-específicos-tm)|**E08**|Remover produto|Permitir a remoção de produtos do sistema, com a opção de inativar para manter o histórico de vendas.|
|[**T02**](#temas-específicos-tm)|**E09**|Cadastrar serviço|Permitir o cadastro de novos serviços com nome, preço, tempo estimado de duração e profissionais habilitados para realizá-lo.|
|[**T02**](#temas-específicos-tm)|**E10**|Editar serviço|Permitir a edição dos dados de serviços cadastrados, como valores, tempo ou associação com barbeiros.|
|[**T02**](#temas-específicos-tm)|**E11**|Remover serviço|Permitir a remoção de serviços do sistema, com a possibilidade de arquivamento para preservação do histórico.|
|[**T02**](#temas-específicos-tm)|**E12**|Cadastrar perfil de funcionário|Permitir o cadastro de perfis de funcionários contendo nome, especialidade, horário de trabalho, percentual de comissão e status de atividade.|
|[**T02**](#temas-específicos-tm)|**E13**|Editar perfil de funcionário|Permitir a edição de perfis de funcionários para atualização de comissões, horários ou especialidades.|
|[**T02**](#temas-específicos-tm)|**E14**|Remover perfil de funcionário|Permitir a exclusão ou inativação de perfis de funcionários, mantendo os registros associados para consulta futura.|
|[**T02**](#temas-específicos-tm)|**E15**|Acessar o relatório de faturamento de cada funcionário|Permitir o acesso a um relatório de faturamento por funcionário, contendo a soma dos serviços realizados, produtos vendidos e comissões devidas em um determinado período.|
|[**T03**](#temas-específicos-tm)|**E16**|Visualizar serviços agendados no calendário de funcionário|Permitir que os funcionários visualizem seus agendamentos diários em um calendário pessoal, com horário, nome do cliente e serviço agendado.|
|[**T03**](#temas-específicos-tm)|**E17**|Visualizar agendamentos no calendário do administrador|Permitir que o administrador visualize em um único calendário os agendamentos de todos os funcionários, com filtros por data, serviço ou barbeiro.|
|[**T03**](#temas-específicos-tm)|**E18**|Realizar agendamentos via WhatsApp|ermitir que os clientes realizem agendamentos diretamente pelo WhatsApp, por meio de integração com um chatbot que reconhece o tipo de serviço e horários disponíveis.|
|[**T03**](#temas-específicos-tm)|**E19**| Adicionar serviço ao calendário do barbeiro|Permitir que o administrador e os barbeiros adicionem serviços ao calendário do barbeiro responsável, considerando a disponibilidade informada.|
|[**T03**](#temas-específicos-tm)|**E20**|Visualizar agendamentos no calendário por funcionário|Permitir ao administrador e barbeiros visualizar os agendamentos filtrados por funcionário, com detalhamento do serviço, data, cliente e duração estimada.|

### Histórias de Usuário (US)

### Histórias de Usuário Relacionadas aos Temas e Épicos

| ID | História de Usuário | Tema Atrelado | Épico |
|----|---------------------|---------------|-------|
| **US01** | Como administrador, eu quero realizar o fechamento de caixa com base na consolidação automática das receitas e comissões do período para que eu possa encerrar o dia de trabalho com segurança e sem erros manuais. | [**T01**](#temas-específicos-tm) | [**E01**](#épicos-e) |
| **US02** | Como administrador, eu quero calcular o faturamento total da barbearia em um intervalo de datas para que eu possa acompanhar o desempenho financeiro do negócio em diferentes períodos. | [**T01**](#temas-específicos-tm) | [**E02**](#épicos-e) |
| **US03** | Como administrador, eu quero visualizar um relatório de faturamento detalhado com filtros por funcionário, serviço ou produto para que eu possa entender melhor quais áreas geram mais receita em determinados períodos. | [**T01**](#temas-específicos-tm) | [**E03**](#épicos-e) |
| **US04** | Como administrador, eu quero registrar gastos operacionais com categoria, valor, data e descrição para que eles sejam considerados no cálculo financeiro da barbearia. | [**T01**](#temas-específicos-tm) | [**E04**](#épicos-e) |
| **US05** | Como administrador, eu quero gerar relatórios financeiros com detalhamento diário, semanal ou mensal para que eu possa acompanhar a saúde financeira da barbearia em diferentes escalas de tempo. | [**T02**](#temas-específicos-tm) | [**E05**](#épicos-e) |
| **US06** | Como administrador, eu quero cadastrar novos produtos com nome, descrição, preço e status de disponibilidade para que eles fiquem disponíveis para venda e gestão no sistema. | [**T02**](#temas-específicos-tm) | [**E06**](#épicos-e) |
| **US07** | Como administrador, eu quero editar as informações de produtos cadastrados, como nome, valor e descrição para que eu possa manter os dados atualizados conforme mudanças no estoque ou estratégia de vendas. | [**T02**](#temas-específicos-tm) | [**E07**](#épicos-e) |
| **US08** | Como administrador, eu quero remover produtos do sistema com a opção de inativá-los para que eu possa manter o histórico de vendas sem exibir itens indisponíveis para venda. | [**T02**](#temas-específicos-tm) | [**E08**](#épicos-e) |
| **US09** | Como administrador, eu quero cadastrar novos serviços com nome, preço, duração estimada e profissionais habilitados para que eu possa oferecer e gerenciar os serviços disponíveis na barbearia. | [**T02**](#temas-específicos-tm) | [**E09**](#épicos-e) |
| **US10** | Como administrador, eu quero editar os dados dos serviços cadastrados, como preço, duração e barbeiros associados para que eu possa manter as informações sempre atualizadas e condizentes com a realidade da barbearia. | [**T02**](#temas-específicos-tm) | [**E10**](#épicos-e) |
| **US11** | Como administrador, eu quero remover serviços do sistema com a opção de arquivá-los para que eu possa manter o histórico de atendimentos e relatórios mesmo após descontinuar um serviço. | [**T02**](#temas-específicos-tm) | [**E11**](#épicos-e) |
| **US12** | Como administrador, eu quero cadastrar perfis de funcionários com nome, especialidade, horário de trabalho, comissão e status para que eu possa gerenciar a equipe de forma eficiente dentro do sistema. | [**T02**](#temas-específicos-tm) | [**E12**](#épicos-e) |
| **US13** | Como administrador, eu quero editar os perfis dos funcionários, incluindo comissões, horários e especialidades para que eu possa manter os dados da equipe sempre atualizados conforme mudanças operacionais. | [**T02**](#temas-específicos-tm) | [**E13**](#épicos-e) |
| **US14** | Como administrador, eu quero excluir ou inativar perfis de funcionários sem perder os registros associados para que eu possa preservar o histórico de atendimentos e comissões mesmo após desligamentos. | [**T02**](#temas-específicos-tm) | [**E14**](#épicos-e) |
| **US15** | Como administrador, eu quero acessar relatórios de faturamento por funcionário com detalhes de serviços, vendas e comissões para que eu possa acompanhar o desempenho individual da equipe e calcular corretamente os repasses. | [**T02**](#temas-específicos-tm) | [**E15**](#épicos-e) |
| **US16** | Como funcionário, eu quero visualizar meus agendamentos diários em um calendário pessoal com horário, cliente e serviço para que eu possa me organizar melhor durante o dia de trabalho. | [**T03**](#temas-específicos-tm) | [**E16**](#épicos-e) |
| **US17** | Como administrador, eu quero visualizar em um único calendário os agendamentos de todos os funcionários, com filtros por data, serviço ou barbeiro para que eu possa ter uma visão completa da agenda da barbearia e otimizar o atendimento. | [**T03**](#temas-específicos-tm) | [**E17**](#épicos-e) |
| **US18** | Como cliente, eu quero realizar agendamentos pelo WhatsApp com um chatbot que entenda o serviço desejado e horários disponíveis para que eu possa marcar horários de forma rápida e prática, sem precisar baixar um aplicativo. | [**T03**](#temas-específicos-tm) | [**E18**](#épicos-e) |
| **US19** | Como administrador ou barbeiro, eu quero adicionar serviços ao calendário do barbeiro responsável para que eu possa organizar os atendimentos de acordo com a disponibilidade do profissional. | [**T03**](#temas-específicos-tm) | [**E19**](#épicos-e) |
| **US20** | Como administrador ou barbeiro, eu quero visualizar os agendamentos filtrados por funcionário com detalhes do serviço, data, cliente e duração para que eu possa planejar melhor os atendimentos e acompanhar a rotina de trabalho. | [**T03**](#temas-específicos-tm) | [**E20**](#épicos-e)|

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
|---|1.0|---|---|
|26/05/2025|1.1|Correção do Backlog|(Vinícius Rufino)[https://github.com/RufinoVfR]|