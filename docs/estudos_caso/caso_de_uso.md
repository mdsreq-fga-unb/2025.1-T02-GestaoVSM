## Exercício de Construção de Diagrama e Especificação de UC

Este documento apresenta o diagrama de casos de uso do aplicativo ConnectCare desenvolvido pela equipe como parte do exercício proposto. Cada integrante da equipe foi responsável por elaborar a especificação de um dos casos de uso identificados.

### Diagrama de Casos de Uso

<center><p>Figura 1 - Diagrama de Casos de Uso do Aplicativo ConnectCare</p></center>

[![Figura 1 - Diagrama de Casos de Uso do Aplicativo ConnectCare](../images/Caso%20de%20Uso%20-%20ConnectCare.png)](../images/Caso%20de%20Uso%20-%20ConnectCare.png)

### Especificações dos Casos de Uso

=== "UC02 - Realizar Agendamento Médico"

    |Data|Versão|Descrição|Autor|
    |---|---|---|---|
    |04/07/2025|1.0|Criação do documento|Weverton Rodrigues|
    |05/07/2025|1.1|Adição das regras de negócio |Weverton Rodrigues|
    |11/07/2025|1.2|Atualização pós feedback|Weverton Rodrigues|

    **1. Realizar Agendamento Médico** 

    **1.1 Breve Descrição**  
     
    Este caso de uso permite que pacientes realizem agendamentos médicos por meio da plataforma ConnectCare, localizando serviços de saúde disponíveis, escolhendo entre datas e horários sugeridos, e confirmando o agendamento de forma prática e digital.

    **1.2 Atores**
    
    - Paciente

    **2. Fluxo Básico de Eventos (FB)**

    **2.1** FB01 - O paciente seleciona a opção “Agendar Consulta”.  

    **2.2** FB02 - O sistema apresenta um formulário de busca de serviços de saúde, permitindo selecionar especialidade, localização e período desejado. [FA01] [RN02]    

    **2.3** FB03 - O paciente preenche os critérios de busca e confirma a solicitação. [FE01] [RN01] [RN04]

    **2.4** FB04 - O sistema valida os dados informados e exibe uma lista de unidades de saúde com horários disponíveis compatíveis. [FE02] [FE03] [FE04] [RN01]   

    **2.5** FB05 - O paciente seleciona a unidade, a data e o horário desejado.   

    **2.6** FB06 - O sistema exibe um resumo do agendamento, com as informações selecionadas. [RN03]  

    **2.7** FB07 - O paciente confirma o agendamento.     

    **2.8** FB08 - O sistema registra o agendamento, associa-o ao perfil do paciente e envia uma confirmação.  

    **2.9** FB09 - O caso de uso é encerrado.  

    **3. Fluxos Alternativos (FA)**

    **3.1** FA01 - Busca por especialidade  

    Este fluxo ocorre quando o paciente decide buscar apenas por especialidade (FB02), sem filtrar por localização ou período.  

    FA01.1 O paciente seleciona apenas a especialidade, deixando os demais campos em branco.  

    FA01.2 O sistema aplica a busca com base apenas na especialidade selecionada e retorna os serviços disponíveis em qualquer local e data. [RN04]

    **4. Fluxos de Exceção (FE)**

    **4.1** FE01 - Filtros obrigatórios não preenchidos

    Este fluxo ocorre em FB03, caso o paciente tente buscar sem preencher a especialidade. O sistema não executa a ação, mantendo o botão inativo. O fluxo permanece em FB03 até o preenchimento correto.

    **4.2** FE02 - Data anterior à data atual  

    Este fluxo ocorre em FB04, quando o paciente informa uma data anterior à atual. O sistema exibe a mensagem “A data informada não pode ser anterior à data de hoje” e o fluxo retorna para FB03 para correção.

    **4.3** FE03 - Data superior a 1 ano a partir da data atual

    Este fluxo ocorre em FB04, quando o paciente informa uma data além de um ano à frente. O sistema exibe a mensagem “A data informada deve estar dentro do período de um ano a partir da data atual” e o fluxo retorna para FB03 para correção.

    **4.4** FE04 - Nenhum resultado encontrado

    Este fluxo ocorre em FB04, quando a busca é realizada com filtros válidos, mas não há horários disponíveis. O sistema exibe a mensagem “Nenhum horário disponível encontrado com os critérios selecionados” e o fluxo retorna para FB02 para novatentativa.

    **5. Regras de Negócio (RN)**

    **5.1** RN01 - Período de busca limitado

    As datas informadas na busca devem estar dentro do intervalo de 0 a 365 dias a partir da data atual. Datas anteriores ao dia atual não são aceitas.

    **5.2** RN02 - Exibição de resultados disponíveis 
    
    A busca por agendamentos exige, no mínimo, a seleção de uma especialidade médica (Clínica Geral, Pediatria, Ginecologia e Obstetrícia, Psiquiatria ou Psicologia). O sistema deve exibir apenas horários efetivamente disponíveis, desconsiderando horários bloqueados, indisponibilidade do profissional ou da unidade, e eventuais conflitos com agendamentos já confirmados.

    **5.3** RN03 - Informações obrigatórias no resumo

    O resumo do agendamento exibido ao paciente deve conter, obrigatoriamente, as seguintes informações: especialidade, data, horário, nome da unidade de saúde e orientações para comparecimento.

    **5.4** RN04 - Permitir busca com critérios parciais

    Caso o paciente preencha apenas a especialidade, o sistema deve permitir a busca e exibir resultados de qualquer unidade e data que correspondam à especialidade selecionada, informando que os critérios foram ampliados.

    **6. Pré-Condições**

    **6.1** Login realizado

    O paciente deve estar logado na plataforma ConnectCare.

    **6.2** Perfil básico preenchido

    O paciente deve ter um perfil cadastrado contendo, no mínimo, CPF, nome completo, data de nascimento, contato principal e email.

    **7. Pós-Condições**

    **7.1** Agendamento registrado com sucesso

    O paciente recebe a confirmação do agendamento por meio de notificação no sistema e/ou canal configurado (e-mail ou SMS), com todos os detalhes necessários, como data, horário, especialidade, unidade de saúde e orientações para comparecimento. [RN02]

    **8. Requisitos Especiais (organizados pelo modelo URPS+)**

    **8.1** Usabilidade (Usability)

    8.1.1 Acessibilidade: A interface deve seguir as diretrizes WCAG, garantindo que pessoas com deficiência visual, motora ou cognitiva consigam realizar o agendamento sem barreiras.

    8.1.2 Compatibilidade mobile-first: A interface de agendamento deve ser responsiva e priorizar a experiência em dispositivos móveis (mobile-first), adaptando-se a diferentes tamanhos de tela - smartphones pequenos (≤ 480px) e smartphones médios e tablets em modo retrato (481px a 768px).

    **8.2** Desempenho (Performance)

    8.2.1 Tempo de resposta da busca: O sistema deve retornar os resultados de busca em até 5 segundos.

=== "UC04 - Acessar Alerta Sobre Campanhas"

    |Data|Versão|Descrição|Autor|
    |---|---|---|---|
    |07/07/2025|1.0|Criação do documento|Felipe Campelo|

    **1. Acessar Alerta Sobre Campanhas** 

    **1.1 Breve Descrição** 

    Este caso de uso permite que o paciente visualize notificações e alertas sobre campanhas de saúde disponíveis em sua região, como campanhas de vacinação, mutirões de atendimento ou palestras educativas. O sistema oferece alertas personalizados para manter o paciente informado sobre ações comunitárias relevantes para sua saúde.

    **1.2 Atores**

    - Paciente

    **2. Fluxo Básico de Eventos (FB)**

    2.1 FB01 - O Paciente acessa a plataforma ConnectCare.

    2.2 FB02 - O Paciente seleciona a opção "Acessar alertas sobre campanhas" na interface principal do sistema.

    2.3 FB03 - O sistema exibe uma lista de alertas personalizados sobre campanhas de saúde na região, que podem incluir mutirões de vacinação e informações sobre medidas preventivas.

    2.4 FB04 - O Paciente pode selecionar um alerta da lista para obter mais detalhes.

    2.5 FB05 - O sistema exibe os detalhes completos do alerta selecionado (ex: data, local, público-alvo, descrição da campanha). 

    2.6 FB06 - O caso de uso é encerrado. 

    **3. Fluxos Alternativos (FA)**

    **3.1** FA01 - Filtrar alertas por critério

    Este fluxo ocorre no passo FB03.

    FA01.1 - O Paciente pode optar por aplicar filtros (ex: por tipo de campanha, por data, por proximidade, por especialidade se aplicável) para refinar a lista de alertas.

    FA01.2 - O sistema atualiza a lista de alertas exibida com base nos filtros aplicados.

    FA01.3 - O fluxo retorna ao passo FB03.

    **3.2** FA02 - Marcar alerta como lido

    Este fluxo pode ser ativado a partir do passo FB03 ou FB05.

    FA02.1 - O Paciente seleciona a opção "Marcar como lido" para um alerta específico.

    FA02.2 - O sistema atualiza o status do alerta para "lido" e o oculta ou o move para uma seção de "alertas lidos", se aplicável.

    FA02.3 - O fluxo retorna ao passo FB03.

    **4. Fluxos de Exceção (FE)**

    **4.1** FE1 –Falha na comunicação/sistema ao carregar alertas

    Este fluxo ocorre em FB03, caso haja falha na comunicação com o servidor ou banco de dados ao buscar os alertas. O sistema exibe a mensagem: “Não foi possível carregar os alertas no momento. Verifique sua conexão e tente novamente.”.

    **4.2** FE2 – Nenhum alerta relevante encontrado

    Este fluxo ocorre em FB03, quando a busca por alertas (mesmo sem filtros) não retorna nenhum resultado para o perfil do Paciente ou região. O sistema exibe a mensagem: “Não há alertas de campanhas disponíveis para você no momento.”.

    **5. Regras de Negócio (RN)**

    **5.1** RN01 - Personalização e relevância dos alertas: O sistema deve exibir alertas personalizados com base na localização geográfica do Paciente, faixa etária e condições de saúde específicas (se aplicável), conforme o perfil básico do paciente.

    **5.2** RN02 - Atualização de alertas: O sistema deve atualizar os alertas exibidos regularmente, removendo campanhas finalizadas e adicionando novas, para garantir a relevância das informações.

    **5.3** RN03 - Priorização de alertas: Alertas mais urgentes ou com prazos próximos devem ser priorizados na exibição na lista de alertas.

    **6. Pré-Condições**

    **6.1** Login realizado
    
    O Paciente deve estar logado na plataforma ConnectCare.

    **6.2** Perfil básico preenchido

    O Paciente deve ter um perfil cadastrado contendo, no mínimo, nome e localização para a personalização de alertas.

    **7. Pós-Condições**

    **7.1** Lista de alertas exibida com sucesso
    
    O Paciente visualiza uma lista de alertas de campanhas relevantes.

    **7.2** Status do alerta atualizado
    
    Se o Paciente marcou um alerta como lido, o status correspondente é atualizado no sistema.

    **7.3** Nenhuma alteração no sistema
    
    Caso o caso de uso seja encerrado por falha (FE01) ou abandono pelo Paciente (similar a FA02 do "Realizar Agendamento Médico"), nenhum novo dado é salvo ou alterado no sistema, exceto o status "lido", se aplicável.

    **8. Requisitos Especiais (organizados pelo modelo URPS+)**

    **8.1** Desempenho (Performance):
    
    8.1.1 Tempo de carregamento: A lista de alertas deve ser carregada em até 3 segundos em condições normais de operação


=== "UC08 - Gerenciar Prontuário de Paciente"

    |Data|Versão|Descrição|Autor|
    |---|---|---|---|
    |05/07/2025|1.0|Criação do documento|Caio Sabino|

    **1. Gerenciar Prontuário de Paciente** 

    **1.1 Breve Descrição** 

    Este caso de uso permite que Profissionais de Saúde, como médicos e enfermeiros, acessem, visualizem e atualizem o prontuário digital dos pacientes na plataforma ConnectCare. O objetivo é garantir um atendimento mais preciso e eficiente, centralizando o histórico de saúde do paciente em um único local.

    **1.2 Atores**

    - Profissional da saúde (Enfermeiro e Médico)

    **2. Fluxo Básico de Eventos (FB)**

    **2.1** FB01 - O profissional de saúde, após o login, seleciona a opção "Buscar Paciente" ou acessa o prontuário a partir de sua agenda de atendimentos.

    **2.2** FB02 - O sistema exibe uma interface de busca, solicitando o nome ou CPF do paciente.

    **2.3** FB03 - O profissional insere os dados de identificação do paciente e confirma a busca.

    **2.4** FB04 - O sistema localiza e exibe o perfil do paciente.

    **2.5** FB05 - O profissional seleciona a opção para visualizar o prontuário eletrônico.

    **2.6** FB06 - O sistema exibe o histórico médico completo do paciente, incluindo consultas anteriores, resultados de exames e outros dados relevantes.

    **2.7** FB07 - O profissional seleciona a opção para adicionar um novo registro ao prontuário.

    **2.8** FB08 - O sistema apresenta um formulário para registro de novas informações, como diagnóstico, prescrições, orientações, resultados de exames ou notas de evolução.

    **2.9** FB09 - O profissional preenche as informações do atendimento atual.

    **2.10** FB10 - O profissional salva as informações.

    **2.11** FB11 - O sistema valida os dados e atualiza o prontuário do paciente em tempo real, associando o novo registro ao perfil do profissional e à data do atendimento.

    **2.12** FB12 - O caso de uso é encerrado. 

    **3. Fluxos Alternativos (FA)**

    **3.1** FA01 - Acesso via Agenda de Atendimentos
    
    Este fluxo ocorre em FB01, quando o profissional acessa o prontuário diretamente de um agendamento.

    FA01.1 - O profissional clica em um paciente agendado em sua agenda de atendimentos.

    FA01.2 - O sistema abre diretamente o perfil do paciente correspondente, pulando para a etapa FB05.

    **4. Fluxos de Exceção (FE)**

    **4.1** FE01 - Paciente não encontrado

    Ocorre em FB04 se nenhum paciente corresponde aos critérios de busca. O sistema exibe a mensagem: "Paciente não localizado. Verifique os dados e tente novamente." O fluxo retorna para FB03.

    **4.2** FE02 - Acesso não autorizado

    Ocorre em FB05 se o profissional tenta acessar um prontuário ao qual não tem permissão (ex: paciente não vinculado à sua unidade ou especialidade, se houver tal regra). O sistema exibe a mensagem: "Você não tem permissão para acessar este prontuário." O caso de uso é encerrado.

    **4.3** FE03 - Falha ao salvar o registro

    Ocorre em FB11 se houver uma falha de comunicação com o servidor ou banco de dados. O sistema exibe a mensagem: "Não foi possível salvar as informações. Verifique sua conexão e tente novamente." O caso de uso é encerrado sem salvar os dados.

    **5. Regras de Negócio (RN)**

    **5.1** RN01 - Integridade do Prontuário
    
    As informações registradas no prontuário não podem ser excluídas, apenas complementadas ou retificadas por um novo registro, garantindo a rastreabilidade e o histórico completo.

    **5.2** RN02 - Acesso à Informação
    
    Profissionais de saúde só podem acessar o histórico médico de pacientes que estão sob seus cuidados ou vinculados à sua unidade de atendimento, para garantir a privacidade e segurança dos dados.

    **5.3** RN03 - Assinatura Digital

    Cada novo registro no prontuário deve ser associado ao profissional que o realizou, com data e hora, funcionando como uma assinatura digital.

    **5.4** RN04 - Atualização em Tempo Real
    
    As atualizações no prontuário devem ser visíveis para outros profissionais autorizados imediatamente após serem salvas.

    **6. Pré-Condições**

    **6.1** Login Realizado

    O profissional de saúde deve estar autenticado na plataforma ConnectCare.

    **6.2** Perfil Profissional Ativo
    
    O profissional deve ter um perfil profissional válido e verificado no sistema.

    **7. Pós-Condições**

    **7.1** Prontuário Atualizado com Sucesso 

    O prontuário do paciente é atualizado com as novas informações, que ficam disponíveis para consultas futuras por profissionais autorizados.

    **7.2** Nenhuma Alteração no Sistema

    Caso o caso de uso seja encerrado por uma falha (FE03) ou cancelamento, nenhuma alteração é salva no prontuário do paciente.

    **8. Requisitos Especiais (organizados pelo modelo URPS+)**

    **8.1** Usabilidade (Usability):
    
    8.1.1 A interface de visualização do prontuário deve ser clara e organizada, permitindo uma rápida identificação de informações críticas como alergias e condições preexistentes.

    8.1.2 O formulário de registro deve ser simples e adaptado para uso em dispositivos móveis, considerando que os profissionais podem precisar fazer atualizações durante o atendimento.

    **8.2** Segurança (Security):
    
    8.2.1 O sistema deve estar em conformidade com as regulamentações de proteção de dados de saúde para garantir a confidencialidade e segurança das informações dos pacientes.

    **8.3** Desempenho (Performance):
    
    8.3.1 O tempo para carregar o histórico de um paciente não deve exceder 5 segundos.

    8.3.2 O tempo para salvar um novo registro no prontuário não deve exceder 3 segundos.

=== "UC14 - Gerenciar Informações de Parceiros"

    |Data|Versão|Descrição|Autor|
    |---|---|---|---|
    |07/07/2025|1.0|Criação do documento|Felipe Henrique|
    |08/07/2025|1.1|Refatoração do documento |Felipe Henrique|

    **1. Gerenciar Informações de Parceiros** 

    **1.1 Breve Descrição** 

    Este caso de uso permite que as organizações parceiras do ConnectCare, como ONGs, hospitais e instituições governamentais, divulguem e gerenciem suas iniciativas de saúde, registrando campanhas, detalhando público-alvo, localização e duração, e monitorando o impacto de suas ações através de relatórios.

    **1.2 Atores**

    - Administrador do sistema

    **2. Fluxo Básico de Eventos (FB)**

    Este caso de uso é iniciado quando o administrador do sistema seleciona a opção "Gerenciar informações de parceiros".

    **2.1** FB01 - O sistema apresenta as seguintes opções ao administrador do sistema:

    - Registrar nova campanha

    - Consultar campanhas existentes

    - Atualizar informações de campanha [FA01]

    - Visualizar relatórios de impacto [FA02]

    **2.2** FB02 - O administrador do sistema seleciona a opção para registrar uma nova campanha.

    **2.3** FB03 - O sistema apresenta um formulário para preenchimento das informações da campanha.

    **2.4** FB04 - O administrador do sistema preenche os detalhes da campanha, incluindo:

    - Nome da campanha

    - Organização parceira (ONG, hospital, instituição governamental)

    - Público-alvo

    - Localização

    - Duração (data de início e fim)

    - Descrição da iniciativa de saúde

    **2.5** FB05 - O administrador do sistema solicita o registro da campanha.

    **2.6** FB06 - O sistema valida as informações preenchidas [FE01].

    **2.7** FB07 - O sistema registra a nova campanha e exibe uma mensagem de sucesso.

    **2.8** FB08 - O caso de uso é encerrado.

    **3. Fluxos Alternativos (FA)**

    **3.1** FA01 - Atualizar informações de campanha

    No passo FB01 do fluxo principal, o administrador do sistema seleciona a opção "Atualizar informações de campanha".

    3.1.1 O sistema apresenta uma lista de campanhas existentes para o administrador do sistema selecionar.

    3.1.2 O administrador do sistema seleciona a campanha que deseja atualizar.

    3.1.3 O sistema exibe o formulário de campanha com as informações preenchidas da campanha selecionada.

    3.1.4 O administrador do sistema modifica as informações necessárias da campanha.

    3.1.5 O administrador do sistema solicita a atualização da campanha.

    3.1.6 O sistema valida as informações atualizadas.

    3.1.7 O sistema atualiza a campanha e exibe uma mensagem de sucesso.

    3.1.8 O caso de uso é encerrado.

    **3.2** FA02 - Visualizar relatórios de impacto

    No passo FB01 do fluxo principal, o administrador do sistemas seleciona a opção "Visualizar relatórios de impacto".

    3.2.1 O sistema solicita ao administrador do sistema que selecione o período para o relatório (ex: semanal, mensal, anual).

    3.2.2 O administrador do sistema seleciona o período desejado.

    3.2.3 O sistema gera e exibe um relatório de impacto das campanhas, contendo métricas como número de participantes, resultados de saúde alcançados e engajamento da comunidade.

    3.2.4 O administrador do sistema pode optar por exportar o relatório (ex: PDF, CSV).

    3.2.5 O caso de uso é encerrado.

    **4. Fluxos de Exceção (FE)**

    4.1 FE01 – Validação de Informações
    
    Nos passos FB06 do fluxo principal, o sistema verifica que uma ou mais informações fornecidas para o registro da campanha não foram validadas (formato e/ou obrigatoriedade) e exibe uma mensagem informando ao administrador do sistema sobre os campos que precisam ser corrigidos. O sistema retorna ao passo FB04 do fluxo principal, permitindo que o administrador do sistema corrija as informações e tente o registro novamente.

    **5. Pré-Condições**

    **5.1** Login do Administrador do Sistema

    Para utilizar este caso de uso, é necessário que o administrador do sistema esteja "logado" na aplicação ConnectCare.

    **6. Pós-Condições**

    6.1 Campanha Registrada e Acessível
    
    Após a conclusão bem-sucedida do caso de uso, uma nova campanha de saúde é registrada no sistema e está disponível para consulta e visualização por usuários relevantes e organizações parceiras.

    6.2 Informações da Campanha Atualizadas
    
    Após a conclusão bem-sucedida do fluxo alternativo de atualização, as informações da campanha selecionada são devidamente modificadas e refletem os dados mais recentes no sistema.

    6.3 Relatórios de Impacto Gerados
    
    Após a conclusão bem-sucedida do fluxo alternativo de visualização de relatórios, o sistema exibiu ou permitiu a exportação de um relatório de impacto das campanhas, conforme o período selecionado.

    **7. Pontos de Extensão**

    **7.1** Divulgar Eventos de Saúde
 
    No passo FB04 do fluxo principal, o sistema pode estender o caso de uso "Divulgar Eventos de Saúde" para permitir que as organizações parceiras divulguem eventos específicos (ex: palestras, workshops) relacionados às suas campanhas.

    **8. Requisitos Especiais (organizados pelo modelo URPS+)**

    8.1 Acessibilidade Móvel
    
    Este caso de uso deve ser acessível via dispositivo móvel, com foco em otimização para uso em ambientes com infraestrutura de internet limitada e dispositivos simples, conforme a realidade da Vila Esperança.
    

=== "UC16 - Gerenciar Campanha"

    |Data|Versão|Descrição|Autor|
    |---|---|---|---|
    |08/07/2025|1.0|Criação do documento|Vinícius Rufino|

    **1. Gerenciar Campanha** 

    **1.1 Breve Descrição** 

    Este caso de uso permite que organizações parceiras, como ONGs, hospitais e instituições governamentais, cadastrem, editem e publiquem campanhas de saúde comunitária na plataforma ConnectCare. As campanhas podem incluir ações como vacinação, mutirões de atendimento e palestras educativas, detalhando o público-alvo, a localização e a duração da iniciativa.

    **1.2 Atores**

    - Organização Parceira (ONG, Hospital e Instituição Governamental)

    **2. Fluxo Básico de Eventos (FB)**

    **2.1** FB01 - O representante da organização acessa a funcionalidade “Gerenciar Campanha”.

    **2.2** FB02 - O sistema exibe uma lista com as campanhas cadastradas pela organização, com opções para criar nova campanha ou editar/excluir campanhas existentes.

    **2.3** FB03 - O representante seleciona “Criar Nova Campanha”.

    **2.4** FB04 - O sistema exibe um formulário para preenchimento de dados da campanha, incluindo título, descrição, público-alvo, localização, data de início e fim, e tipo da ação (vacinação, palestra, etc.).

    **2.5** FB05 - O representante preenche o formulário e seleciona “Salvar”.

    **2.6** FB06 - O sistema valida os dados e exibe um resumo da campanha.

    **2.7** FB07 - O representante confirma a publicação da campanha.

    **2.8** FB08 - O sistema publica a campanha e a torna visível para os usuários do app, enviando uma notificação para os públicos-alvo se aplicável.

    **2.9** FB09 - O caso de uso é encerrado.

    **3. Fluxos Alternativos (FA)**

    **3.1** FA01 - Edição de campanha existente

    Este fluxo ocorre quando o representante opta por editar uma campanha existente (FB02).

    FA01.1 - O representante seleciona a campanha e escolhe a opção “Editar”.

    FA01.2 - O sistema carrega os dados da campanha e permite modificações.

    FA01.3 - O fluxo segue para FB05.

    **3.2** FA02 - Exclusão de campanha

    Este fluxo ocorre quando o representante opta por excluir uma campanha (FB02).

    FA02.1 - O representante seleciona a campanha e escolhe a opção “Excluir”.

    FA02.2 - O sistema solicita confirmação da exclusão.

    FA02.3 - Após confirmação, o sistema remove a campanha da lista e do aplicativo.

    **3.3** FA03 - Salvar rascunho

    Este fluxo ocorre se o representante não quiser publicar imediatamente.

    FA03.1 - No FB05, o representante escolhe “Salvar como rascunho”.

    FA03.2 - O sistema armazena os dados, mas não publica a campanha.

    **4. Fluxos de Exceção (FE)**

    **4.1** FE01 - Campos obrigatórios não preenchidos

    Ocorre no FB05. O sistema impede o envio e destaca os campos obrigatórios que não foram preenchidos.

    **4.2** FE02 - Data final anterior à data inicial

    Ocorre no FB05. O sistema emite a mensagem de erro e bloqueia o salvamento até correção.

    **4.3** FE03 - Falha na publicação da campanha

    Ocorre no FB08. Em caso de falha de rede ou servidor, o sistema informa o erro e orienta a tentar novamente mais tarde.

    **5. Regras de Negócio (RN)**

    **5.1** RN01 - Validação de datas

    A data de término deve ser igual ou posterior à data de início.

    **5.2** RN02 - Notificações direcionadas

    Se o público-alvo for definido por localidade e faixa etária, o sistema enviará notificações apenas aos usuários correspondentes.

    **5.3** RN03 - Campos obrigatórios

    Título, descrição, localização, datas e tipo da ação são campos obrigatórios para publicação.

    **6. Pré-Condições**

    **6.1** O representante da organização está logado na plataforma ConnectCare.

    **6.2** A organização está previamente cadastrada e validada no sistema.

    **7. Pós-Condições**

    **7.1** Campanha cadastrada ou atualizada com sucesso e visível aos usuários.

    **7.2** Caso o fluxo seja interrompido ou ocorra falha, nenhuma campanha será publicada.

    **8. Requisitos Especiais (organizados pelo modelo URPS+)**

    **8.1** Usabilidade (Usability)

    8.1.1 Interface adaptável para dispositivos móveis (mobile-first).

    8.1.2 Suporte à acessibilidade conforme diretrizes WCAG.

    **8.2** Desempenho (Performance)

    8.2.1 Resposta do sistema em até 3 segundos para carregamento de campanhas e formulários.

    8.2.2 Publicação da campanha em até 2 segundos após confirmação