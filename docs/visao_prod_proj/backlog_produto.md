## 9.1 Backlog Geral

O backlog geral reúne todas as funcionalidades previstas para o sistema na forma de histórias de usuário, elaboradas com base na lista de requisitos funcionais previamente definida. Esse backlog representa a visão consolidada do produto e deve ser constantemente revisado e atualizado para refletir mudanças nas necessidades do cliente, aprendizados ao longo do projeto e ajustes nas prioridades de negócio. O documento possui uma hierarquia que separa os requisitos em: Temas Estratégicos (TE), Épicos (E) e Histórias de Usuário (US).

### Temas Específicos (TE)

|ID|Descrição|
|--|---------|
|TE01|Eliminar processos manuais propensos a erros|
|TE02|Organizar e centralizar operações da barbearia|
|TE03|Automatização de agendamentos|

### Épicos (E)

| Tema Atrelado | ID    | Épico                                           | Descrição                                                                                                                                             |
|---------------|-------|-------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| [**T01**](#temas-específicos-te) | **E01** | Gestão Financeira da Barbearia                   | Criar um módulo financeiro robusto que permita controle completo sobre receitas, despesas, comissões e fechamento de caixa, com recursos para análise.|
| [**T01**](#temas-específicos-te) | **E02** | Relatórios Detalhados e Análises de Desempenho   | Desenvolver funcionalidades para visualização de relatórios com filtros variados, permitindo entender o desempenho por funcionário ou serviço.        |
| [**T02**](#temas-específicos-te) | **E03** | Gestão de Produtos                                | Permitir o gerenciamento completo do catálogo de produtos da barbearia, desde o cadastro até edição e inativação.                                     |
| [**T02**](#temas-específicos-te) | **E04** | Gestão de Serviços                                | Gerenciar os serviços da barbearia com dados como duração, preço e barbeiros habilitados, com controle de alterações e arquivamento.                  |
| [**T02**](#temas-específicos-te) | **E05** | Gestão de Equipe e Perfis de Funcionários         | Implementar um sistema de controle de equipe com cadastro, edição e inativação de funcionários sem perder o histórico de atendimentos e comissões.    |
| [**T03**](#temas-específicos-te) | **E06** | Gestão de Agendamentos e Calendário               | Fornecer visão clara da agenda da barbearia para administradores e funcionários, com filtros e inclusão manual de atendimentos.                        |
| [**T03**](#temas-específicos-te) | **E07** | Agendamento Automatizado via WhatsApp               | Automatizar agendamentos por meio de um chatbot integrado ao WhatsApp, oferecendo praticidade para os clientes e integração com o calendário.                        |

### Histórias de Usuário (US)

| ID     | História de Usuário | Tema Atrelado | Épico |
|--------|---------------------|---------------|-------|
| **US01** | Como administrador, eu quero realizar o fechamento de caixa com base na consolidação automática das receitas e comissões do período para que eu possa encerrar o dia de trabalho com segurança e sem erros manuais. | [**T01**](#temas-especificos-te) | [**E01**](#epicos-e) |
| **US02** | Como administrador, eu quero calcular e visualizar o faturamento total da barbearia em um intervalo de datas, com filtros para funcionário, serviço e produto para que eu possa acompanhar o desempenho financeiro do negócio de forma abrangente. | [**T01**](#temas-especificos-te) | [**E01**](#epicos-e) |
| **US03** | Como administrador, eu quero registrar gastos operacionais com categoria, valor, data e descrição para que eles sejam considerados no cálculo financeiro da barbearia. | [**T01**](#temas-especificos-te) | [**E01**](#epicos-e) |
| **US04** | Como administrador, eu quero poder visualizar um resumo financeiro global com a distribuição percentual do faturamento entre serviços e consumíveis. | [**T01**](#temas-especificos-te) | [**E02**](#epicos-e) |
| **US05** | Como administrador, eu quero visualizar o valor bruto do faturamento com detalhamento diário, semanal ou mensal para que eu possa acompanhar a saúde financeira da barbearia em diferentes escalas de tempo. | [**T01**](#temas-especificos-te) | [**E02**](#epicos-e) |
| **US06** | Como administrador, eu quero visualizar um gráfico com a consolidação do faturamento diário, semanal e mensal, com a possibilidade de filtrar dados por funcionários. | [**T01**](#temas-especificos-te) | [**E02**](#epicos-e) |
| **US07** | Como administrador, eu quero acessar relatórios de faturamento por funcionário com detalhes de serviços, vendas e comissões para que eu possa acompanhar o desempenho individual da equipe e calcular corretamente os repasses. | [**T01**](#temas-especificos-te) | [**E02**](#epicos-e) |
| **US08** | Como administrador, eu quero cadastrar novos produtos com nome, descrição, preço e status de disponibilidade para que eles fiquem disponíveis para venda e gestão no sistema. | [**T02**](#temas-especificos-te) | [**E03**](#epicos-e) |
| **US09** | Como administrador, eu quero editar as informações de produtos cadastrados, como nome, valor e descrição para que eu possa manter os dados atualizados conforme mudanças no estoque ou estratégia de vendas. | [**T02**](#temas-especificos-te) | [**E03**](#epicos-e) |
| **US10** | Como administrador, eu quero remover produtos do sistema com a opção de inativá-los para que eu possa manter o histórico de vendas sem exibir itens indisponíveis para venda. | [**T02**](#temas-especificos-te) | [**E03**](#epicos-e) |
| **US11** | Como administrador, eu quero cadastrar novos serviços com nome, preço, duração estimada e profissionais habilitados para que eu possa oferecer e gerenciar os serviços disponíveis na barbearia. | [**T02**](#temas-especificos-te) | [**E04**](#epicos-e) |
| **US12** | Como administrador, eu quero editar os dados dos serviços cadastrados, como preço, duração e barbeiros associados para que eu possa manter as informações sempre atualizadas e condizentes com a realidade da barbearia. | [**T02**](#temas-especificos-te) | [**E04**](#epicos-e) |
| **US13** | Como administrador, eu quero remover serviços do sistema com a opção de arquivá-los para que eu possa manter o histórico de atendimentos e relatórios mesmo após descontinuar um serviço. | [**T02**](#temas-especificos-te) | [**E04**](#epicos-e) |
| **US14** | Como administrador, eu quero cadastrar funcionários com nome, especialidade, horário de trabalho, comissão e status para que eu possa gerenciar a equipe de forma eficiente dentro do sistema. | [**T02**](#temas-especificos-te) | [**E05**](#epicos-e) |
| **US15** | Como administrador, eu quero editar dados dos funcionários, incluindo comissões, horários e especialidades para que eu possa manter os dados da equipe sempre atualizados conforme mudanças operacionais. | [**T02**](#temas-especificos-te) | [**E05**](#epicos-e) |
| **US16** | Como administrador, eu quero excluir ou inativar funcionários sem perder os registros associados para que eu possa preservar o histórico de atendimentos e comissões mesmo após desligamentos. | [**T02**](#temas-especificos-te) | [**E05**](#epicos-e) |
| **US17** | Como administrador ou barbeiro, eu quero visualizar o calendário com os agendamentos filtrados por serviço, data, cliente e duração para que eu possa planejar melhor os atendimentos e acompanhar a rotina de trabalho.  | [**T03**](#temas-especificos-te) | [**E06**](#epicos-e) |
| **US18** | Como administrador ou barbeiro, eu quero adicionar serviços ao calendário do barbeiro responsável para que eu possa organizar os atendimentos de acordo com a disponibilidade do profissional. | [**T03**](#temas-especificos-te) | [**E06**](#epicos-e) |
| **US19** | Como chatbot, eu quero enviar uma confirmação automática do agendamento no WhatsApp do cliente, para que ele tenha certeza de que o horário foi reservado corretamente. | [**T03**](#temas-especificos-te) | [**E07**](#epicos-e) |
| **US20** | Como chatbot, eu quero dar a opção para o cliente escolher o profissional desejado, para que eu possa ser atendido por quem eu prefiro. | [**T03**](#temas-especificos-te) | [**E07**](#epicos-e) |
| **US21** | Como chatbot, eu quero permitir que meu cliente visualize os horários disponíveis diretamente no chat, para que ele possa escolher rapidamente o melhor horário. | [**T03**](#temas-especificos-te) | [**E07**](#epicos-e) |

## 9.2 Priorização do Backlog Geral

A priorização do backlog foi conduzida com base em uma análise de custo-benefício, utilizando os critérios de **Benefício (B)**, **Urgência (U)**, **Esforço (E)**, **Risco (R)** e **Dependência (D)**. Para estabelecer uma ordenação objetiva dos requisitos, foi empregada a fórmula:
**(B × 2 + U) − (E + R + D)**.
Esse cálculo permitiu identificar os itens que oferecem maior valor ao sistema com menor custo e complexidade de implementação. Essa abordagem guiou o planejamento das entregas, assegurando que funcionalidades mais estratégicas fossem priorizadas.

Cada critério foi avaliado em uma escala de 1 a 5. O Benefício considera a relevância do requisito para o funcionamento do sistema e o valor que agrega ao usuário final. A Urgência refere-se à necessidade de entrega imediata, variando entre itens críticos e aqueles que podem ser adiados. O Esforço representa a estimativa de complexidade técnica da implementação, incluindo fatores como número de telas, validações e integrações com sistemas externos. O Risco, por sua vez, envolve o potencial de falhas, incertezas técnicas, dependências externas e também o grau de familiaridade e experiência prévia da equipe com o tipo de funcionalidade em questão — quanto menor a experiência, maior o risco percebido. Já a Dependência avalia o quanto a entrega de um requisito depende da implementação de outros.

Após a atribuição das notas, os requisitos foram organizados por objetivo e ranqueados com base na pontuação obtida pela fórmula. Aqueles que apresentaram as maiores pontuações em cada grupo foram selecionados para compor o Produto Mínimo Viável (MVP). Adicionalmente, os requisitos classificados em segundo lugar também foram analisados e, considerando sua relevância estratégica, alguns foram incluídos no escopo inicial do projeto.

## 9.3 MVP

Com base na priorização realizada, foi possível identificar o conjunto de funcionalidades essenciais para a primeira entrega do sistema. A partir dessa análise, definiu-se o Produto Mínimo Viável (MVP), composto pelas histórias de usuário que oferecem maior valor imediato ao cliente com o menor esforço de implementação.

| US | Descrição | Objetivo Específico | Pontuação | Rank | MVP |
|:---:|---|---|:---:|:---:|:---:|
|US01|Permitir ao administrador realizar o fechamento de caixa com base na consolidação automática de todas as vendas de produtos, serviços prestados e comissões pagas aos funcionários no período selecionado.|Eliminar processos manuais propensos a erros|6|1|X|
|US02|Permitir ao administrador visualizar e calcular o faturamento total da barbearia dentro de um intervalo de datas, com filtros por funcionário, tipo de serviço ou produto.|Eliminar processos manuais propensos a erros|3|2|X|
|US03|Permitir o registro de gastos operacionais, informando categoria, valor, data e descrição, para que sejam considerados no cálculo financeiro da barbearia.|Organizar e centralizar operações da barbearia|4|1|X|
|US05|Permitir ao administrador visualizar o valor bruto do faturamento filtrado por dia, semana e mês.|Organizar e centralizar operações da barbearia|4|1|X|
|US07|Permitir ao administrador acessar um extrato financeiro geral com a divisão do faturamento por funcionário, contendo a soma dos serviços realizados, produtos vendidos e comissões devidas em um determinado período.|Organizar e centralizar operações da barbearia|4|1|X|
|US09|Permitir a edição de informações dos produtos cadastrados, incluindo alterações no nome, valor ou descrição.|Organizar e centralizar operações da barbearia|4|1|X|
|US12|Permitir a edição dos dados de serviços cadastrados, como valores, tempo ou associação com barbeiros.|Organizar e centralizar operações da barbearia|4|1|X|
|US15|Permitir a edição de funcionários para atualização de comissões, horários ou especialidades.|Organizar e centralizar operações da barbearia|4|1|X|
|US17|Permitir que administradores e barbeiros visualizem agendamentos em calendários, com filtros por data, funcionário, cliente e tipo de serviço.|Organizar e centralizar operações da barbearia|4|1|X|
|US18|Permitir que administradores e barbeiros adicionem serviços ao calendário conforme a disponibilidade do funcionário.|Automatização de agendamentos|6|2|X|

## Histórico de Versão

|Data|Versão|Descrição|Autor|
|---|---|---|---|
| 23/05/2025| 1.0 | Criação do documento | [Weverton Rodrigues](https://github.com/vevetin) |
|26/05/2025|1.1|Correção do Backlog|[Vinícius Rufino](https://github.com/RufinoVfR)|
| 05/06/2025 |1.2| Atualização do Backlog do produto | [Caio Sabino](https://github.com/caiomsabino), [Caio Melo](https://github.com/CaioMelo25), [Felipe Campelo](https://github.com/felipeacampelo), [Felipe Henrique](https://github.com/fhenrique77), [Vinícius Rufino](https://github.com/RufinoVfR) e [Weverton Rodrigues](https://github.com/vevetin) |
