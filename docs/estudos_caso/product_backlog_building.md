## Exercício de Construção de Backlog de Produto usando PBB - TechFix

Este documento apresenta o detalhamento do Product Backlog referente ao sistema de gestão de serviços de campo da empresa fictícia TechFix, com base no estudo de caso proposto. Abaixo estão listadas todas as funcionalidades, suas respectivas User Stories (US), os critérios de aceitação e, para algumas delas, exemplos de cenários em Behavior-Driven Development (BDD).

<iframe width="768" height="432" src="https://miro.com/app/live-embed/uXjVIqWZSOg=/?embedMode=view_only_without_ui&moveToViewport=-11677,-10633,21578,9205&embedId=616245545460" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>

### User Stories e BDDs

### Funcionalidade 1: Gerenciar registros de serviços de campo

**US1.1 - Registrar serviço de campo com anexos**  
**Como** Técnico de campo  
**Quero** Registrar serviço de campo com anexos  
**Para** garantir um registro digital, integrado e em tempo real.  

Critérios de Aceitação:

- O sistema deve permitir preencher campos obrigatórios do serviço (cliente, data, tipo de serviço).

- Deve ser possível anexar evidências (fotos ou vídeos) ao registro.

- O sistema deve funcionar em modo offline, permitindo salvar o registro localmente.

- Os dados devem ser sincronizados automaticamente quando houver conexão.

- O sistema deve impedir o envio de registros incompletos (campos obrigatórios não preenchidos).


**BDD1:**

Cenário: Registrar serviço com campos obrigatórios preenchidos e 2 anexos em modo offline  
**Dado que** o técnico esteja sem conexão de internet  
**Quando** ele preencher cliente="Empresa Alfa", data="2025-06-23", tipo de serviço="Manutenção Preventiva"
E anexar 2 fotos nos formatos JPG e PNG, cada uma com menos de 5MB  
E clicar em "Salvar"  
**Então** o sistema deve armazenar o registro localmente com status "Pendente sincronização"

**BDD2:**

Cenário: Sincronizar automaticamente registro salvo offline após restabelecer conexão  
**Dado que** o técnico tenha registrado serviço offline com status "Pendente sincronização"  
E a conexão com a internet seja restabelecida  
**Quando** o sistema detectar a conexão ativa  
**Então** o registro deve ser enviado automaticamente ao servidor central  
E o status do registro deve ser atualizado para "Sincronizado"

**US1.2 - Editar registros de serviços realizados**  
**Como** Técnico de campo  
**Quero** Editar registros de serviços realizados  
**Para** garantir um registro digital, integrado e em tempo real.  

Critérios de Aceitação:

- O técnico deve conseguir localizar o registro de serviço já realizado.

- O sistema deve permitir editar campos como: descrição, anexos e data de realização.

- Todas as alterações devem ser salvas e sincronizadas com o sistema central.

**US1.3 - Visualizar o histórico de serviços registrados**  
**Como** Técnico de campo  
**Quero** Visualizar o histórico de serviços registrados  
**Para** redução de retrabalho e perda de informações.  

Critérios de Aceitação:

- O técnico deve conseguir buscar por cliente ou por data.

- O sistema deve exibir uma lista com os registros de serviço anteriores.

- Cada item da lista deve mostrar: data, cliente, tipo de serviço e status de sincronização.

- O sistema deve apresentar resumo do serviço ao selecionar um registro.

**BDD:**

Cenário: Buscar e listar histórico de serviços do cliente "Empresa Beta"  
**Dado que** existam 3 registros de serviços para "Empresa Beta"  
**Quando** o técnico buscar registros pelo nome do cliente "Empresa Beta"  
**Então** o sistema deve listar exatamente 3 registros  
E mostrar para cada registro: data, tipo de serviço, cliente e status de sincronização

### Funcionalidade 2: Acessar guias técnicos e histórico de equipamentos

**US2.1 - Localizar informações de equipamentos pelo aplicativo móvel**  
**Como** Técnico de campo  
**Quero** Localizar informações de equipamentos pelo aplicativo móvel  
**Para** realizar um diagnóstico mais rápido.  

Critérios de Aceitação:

- O sistema deve permitir buscar equipamentos pelo número de série, nome ou tipo.

- As informações exibidas devem incluir: modelo, fabricante, data de instalação e status atual.

- Deve haver link direto para o histórico de manutenção e guias técnicos relacionados ao equipamento.

**BDD:**

Cenário: Localizar equipamento com número de série "EQ-987654"  
**Dado que** o equipamento com número de série "EQ-987654" esteja cadastrado  
**Quando** o técnico buscar pelo número de série "EQ-987654"  
**Então** o sistema deve mostrar modelo, fabricante, data de instalação e status atual do equipamento  
E apresentar links para histórico de manutenção e guias técnicos

**US2.2 - Consultar histórico de manutenção dos equipamentos**  
**Como** Técnico de campo  
**Quero** Consultar o histórico de manutenção dos equipamentos  
**Para** realizar um diagnóstico mais rápido.  

Critérios de Aceitação:

- O sistema deve listar todas as manutenções realizadas no equipamento, com data, tipo de serviço e nome do técnico responsável.

- Deve ser possível visualizar detalhes de cada manutenção.

- As informações devem estar disponíveis também em modo offline, caso o técnico tenha feito o download prévio.

- Deve haver opção para exportar o histórico para PDF.

**BDD:**

Cenário: Visualizar histórico de manutenção em modo offline após download prévio  
**Dado que** o técnico tenha feito download prévio do histórico do equipamento "EQ-12345"  
E esteja sem conexão de internet  
**Quando** ele acessar o histórico de manutenção do equipamento "EQ-12345"  
**Então** o sistema deve exibir todas as manutenções anteriores com data, tipo e técnico responsável

### Funcionalidade 3: Acompanhar solicitações de serviço

**US3.1 - Visualizar todas as solicitações de serviço em andamento**  
**Como** Atendente  
**Quero** Visualizar todas as solicitações de serviço em andamento  
**Para** garantir integração com o sistema central para evitar redundâncias e erros.  

Critérios de Aceitação:

- O sistema deve exibir uma lista com todas as solicitações de serviço que estão com status diferente de "Concluído" ou "Cancelado".

- A lista deve permitir ordenar por data de abertura ou por status.

- Cada item da lista deve exibir: número da solicitação, cliente, status atual e técnico responsável (se houver).

- Deve mostrar um indicador visual para solicitações com prioridade alta.

**BDD:**

Cenário: Listar solicitações com status em andamento e indicador de prioridade alta  
**Dado que** existam 10 solicitações em andamento, 3 delas com prioridade alta  
**Quando** a atendente acessar a lista de solicitações em andamento  
**Então** o sistema deve exibir as 10 solicitações  
E destacar visualmente as 3 solicitações de prioridade alta

**US3.2 - Atualizar o status de uma solicitação**  
**Como** Atendente  
**Quero** Atualizar o status de uma solicitação  
**Para** garantir integração com o sistema central para evitar redundâncias e erros.  

Critérios de Aceitação:

- O sistema deve permitir alterar o status de qualquer solicitação que não esteja finalizada ou cancelada.

- Todas as alterações de status devem ser registradas com data, hora e responsável.

- Apenas usuários com permissão de atendente podem realizar a alteração.

**BDD:**

Cenário: Atendente altera status de solicitação para "Em andamento" com permissão autorizada  
**Dado que** a atendente tenha permissão para alterar status  
E a solicitação 123 esteja com status "Aberta"  
**Quando** ela atualizar o status para "Em andamento"  
**Então** o sistema deve registrar a alteração com data, hora e usuário responsável  
E o status da solicitação deve ser atualizado para "Em andamento"

**US3.3 - Consultar o histórico completo de interações de cada solicitação**  
**Como** Atendente  
**Quero** Consultar o histórico completo de interações de cada solicitação  
**Para** garantir integração com o sistema central para evitar redundâncias e erros.  

Critérios de Aceitação:

- O histórico deve exibir todas as alterações de status, com data, hora e responsável.

- Também deve incluir anotações internas feitas pela equipe, se houver.

- O sistema deve apresentar o histórico de forma cronológica.

### Funcionalidade 4: Gerenciar agendamento de visitas

**US4.1 - Visualizar a agenda de disponibilidade dos técnicos em tempo real**  
**Como** Atendente  
**Quero** Visualizar a agenda de disponibilidade dos técnicos em tempo real  
**Para** garantir uma visualização centralizada da agenda e reduzir conflitos de horário.  

Critérios de Aceitação:

- O sistema deve exibir a agenda de todos os técnicos, com indicação dos horários livres e ocupados.

- A visualização deve permitir filtragem por técnico e por data.

- As atualizações na agenda devem refletir imediatamente novas marcações, alterações ou cancelamentos.

**US4.2 - Criar agendamentos de visitas técnicas**  
**Como** Atendente  
**Quero** Criar agendamentos de visitas técnicas  
**Para** garantir uma visualização centralizada da agenda e reduzir conflitos de horário.  

Critérios de Aceitação:

- O sistema deve permitir selecionar o cliente, o técnico, o serviço e o horário.

- Deve impedir a criação de agendamentos em horários já ocupados pelo técnico.

- O sistema deve notificar automaticamente o técnico após a criação.

- Deve validar conflito com outras agendas do cliente.

**BDD:**

Cenário: Criar agendamento para técnico disponível sem conflito de horário  
**Dado que** o técnico João Silva esteja disponível em 25/06/2025 das 14h às 16h  
**Quando** a atendente criar um agendamento para 25/06/2025 às 15h para cliente "Empresa Delta"  
**Então** o sistema deve salvar o agendamento  
E enviar notificação para João Silva por e-mail e aplicativo móvel

**US4.3 - Alterar agendamentos de visitas técnicas**  
**Como** Atendente  
**Quero** Alterar agendamentos de visitas técnicas  
**Para** garantir uma visualização centralizada da agenda e reduzir conflitos de horário.  

Critérios de Aceitação:

- Só é possível alterar agendamentos que ainda não foram iniciados.

- O sistema deve verificar se o novo horário está disponível.

- O técnico deve ser notificado automaticamente sobre a alteração.

- O sistema deve bloquear alterações que causem conflito de agenda.

**BDD:**

Cenário: Impedir alteração de agendamento para horário já ocupado  
**Dado que** o técnico João Silva tenha um agendamento marcado para 25/06/2025 às 15h  
**Quando** a atendente tentar alterar outro agendamento para o mesmo horário  
**Então** o sistema deve impedir a alteração  
E mostrar mensagem de erro informando conflito de agenda

**US4.4 - Cancelar agendamentos de visitas técnicas**  
**Como** Atendente  
**Quero** Cancelar agendamentos de visitas técnicas  
**Para** garantir uma visualização centralizada da agenda e reduzir conflitos de horário.  

Critérios de Aceitação:

- O sistema deve exigir o motivo do cancelamento.

- O técnico responsável deve ser notificado automaticamente.

- O horário cancelado deve ficar disponível para novas marcações.

**US4.5 - Notificar automaticamente os técnicos sobre agendamentos**  
**Como** Atendente  
**Quero** Notificar automaticamente os técnicos sobre agendamentos  
**Para** garantir uma visualização centralizada da agenda e reduzir conflitos de horário.  

Critérios de Aceitação:

- O sistema deve enviar notificações para o técnico sempre que houver criação, alteração ou cancelamento de agendamento.

- As notificações devem ser enviadas por e-mail ou pelo aplicativo móvel.

### Funcionalidade 5: Acompanhar solicitações de serviço

**US5.1 - Visualizar status das solicitações**  
**Como** Cliente corporativo  
**Quero** Visualizar o status das minhas solicitações de serviço  
**Para** me manter informado sobre o progresso do atendimento e receber notificações sobre o andamento.  

Critérios de Aceitação:

- O sistema deve exibir a lista de todas as solicitações feitas pelo cliente.

- Cada solicitação deve mostrar o status atual, como: "Aberta", "Em andamento", "Concluída" ou "Cancelada".

- O cliente só pode visualizar as solicitações vinculadas ao seu próprio cadastro.

- O cliente deve poder filtrar solicitações por status e data.

**US5.2 - Consultar histórico de interações da solicitação**  
**Como** Cliente corporativo  
**Quero** Consultar o histórico de interações da minha solicitação  
**Para** me manter informado sobre o progresso do atendimento.  

Critérios de Aceitação:

- O histórico deve mostrar todas as atualizações de status da solicitação, com data e hora.

- Também deve exibir registros de comentários ou notificações enviados pela equipe.

- O cliente só pode consultar o histórico das solicitações vinculadas ao seu cadastro.

**US5.3 - Receber notificações sobre atualizações de status**  
**Como** Cliente corporativo  
**Quero** Receber notificações sobre atualizações de status da minha solicitação  
**Para** me manter informado sobre o progresso do atendimento.  

Critérios de Aceitação:

- O sistema deve enviar uma notificação ao cliente sempre que houver uma alteração de status na solicitação.

- As notificações podem ser enviadas por e-mail ou pelo aplicativo móvel.

- A notificação deve conter o número da solicitação, o novo status e a data/hora da atualização.

### Funcionalidade 6: Administrar procedimentos internos e desempenho

**US6.1 - Visualizar dashboard de desempenho operacional e SLA**  
**Como** Diretora  
**Quero** Visualizar um dashboard de desempenho operacional e SLA  
**Para** melhorar a eficiência operacional e tomar decisões baseadas em dados.  

Critérios de Aceitação:

- O dashboard deve exibir, no mínimo: quantidade de atendimentos realizados, taxa de cumprimento de SLA e tempo médio de atendimento.

- Deve ser possível aplicar filtros por período (ex.: dia, semana, mês).

- Os dados devem ser atualizados automaticamente a cada 15 minutos.

- O dashboard deve permitir comparação entre períodos diferentes.

- Os indicadores devem apresentar gráficos visuais para melhor interpretação.

**BDD:**

Cenário: Diretora acessa dashboard com dados atualizados e gráficos comparativos  
**Dado que** existam dados de atendimentos dos últimos 3 meses  
**Quando** a diretora acessar o dashboard e filtrar por período "Últimos 30 dias"  
**Então** o sistema deve mostrar quantidade de atendimentos, taxa de SLA cumprido e tempo médio de atendimento  
E apresentar gráficos comparativos do período selecionado

**US6.2 - Gerar relatórios de produtividade e SLA por período**  
**Como** Diretora  
**Quero** Gerar relatórios de produtividade e SLA por período  
**Para** melhorar a eficiência operacional e tomar decisões baseadas em dados.  

Critérios de Aceitação:

- O sistema deve permitir selecionar o período desejado (dia, semana, mês).

- O relatório deve apresentar: número de atendimentos por técnico, percentual de SLA cumprido e tempo médio de atendimento por período.

- Deve ser possível exportar o relatório em PDF ou Excel.

**US6.3 - Configurar alertas para monitoramento de indicadores críticos**  
**Como** Diretora  
**Quero** Configurar alertas para monitoramento de indicadores de desempenho críticos  
**Para** melhorar a eficiência operacional e tomar decisões baseadas em dados.  

Critérios de Aceitação:

- O sistema deve permitir definir limites para indicadores como: taxa de SLA, número de atendimentos pendentes e tempo médio de atendimento.

- Quando um indicador ultrapassar o limite configurado, o sistema deve gerar um alerta automático.

- Os alertas devem ser enviados por e-mail ou exibidos no painel de controle da diretoria.

## Histórico de Versão

|Data|Versão|Descrição|Autor|
|---|---|---|---|
| 23/06/2025 | 0.1 | Criação do documento | [Weverton Rodrigues](https://github.com/vevetin) |