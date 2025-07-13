## 7.1 Lista de Requisitos Funcionais

Os requisitos funcionais descrevem as funcionalidades específicas que o sistema deve implementar para atender às necessidades da Barbearia VSM. Eles incluem integrações, processos e interações do usuário com o sistema.

### Objetivo específico 1: Eliminar processos manuais propensos a erros

**RF01** - Realizar fechamento de caixa: Permitir ao administrador realizar o fechamento de caixa com base na consolidação automática de todas as vendas de produtos, serviços prestados e comissões pagas aos funcionários no período selecionado.

**RF02** - Consultar faturamento por período: Permitir ao administrador visualizar e calcular o faturamento total da barbearia dentro de um intervalo de datas, com filtros por funcionário, tipo de serviço ou produto.

**RF03** - Registrar gasto operacional: Permitir o registro de gastos operacionais, informando categoria, valor, data e descrição, para que sejam considerados no cálculo financeiro da barbearia.

**RF04** - Visualizar resumo financeiro consolidado: Permitir ao administrador visualizar um resumo financeiro global com a distribuição percentual do faturamento entre serviços, produtos e consumíveis.

**RF05** - Visualizar resumo financeiro diário e semanal: Permitir ao administrador visualizar o valor bruto do faturamento do dia, semana e mês.

**RF06** - Visualizar gráfico de faturamento:  Permitir ao administrador visualizar um gráfico com a consolidação do faturamento por dia, semana e mês, com a possibilidade de filtrar os dados por funcionário.

**RF07** - Acessar extrato geral de faturamento por funcionário: Permitir ao administrador acessar um extrato financeiro geral com a divisão do faturamento por funcionário, contendo a soma dos serviços realizados, produtos vendidos e comissões devidas em um determinado período.

### Objetivo específico 2: Organizar e centralizar operações da barbearia

**RF08** - Cadastrar produto: Permitir o cadastro de novos produtos com informações como nome, descrição, preço e status de disponibilidade para venda.

**RF09** - Editar produto: Permitir a edição de informações dos produtos cadastrados, incluindo alterações no nome, valor ou descrição.

**RF10** - Remover produto: Permitir a remoção de produtos do sistema, com a opção de inativar para manter o histórico de vendas.

**RF11** - Cadastrar serviço: Permitir o cadastro de novos serviços com nome, preço, tempo estimado de duração e profissionais habilitados para realizá-lo.

**RF12** - Editar serviço: Permitir a edição dos dados de serviços cadastrados, como valores, tempo ou associação com barbeiros.

**RF13** - Remover serviço: Permitir a remoção de serviços do sistema, com a possibilidade de arquivamento para preservação do histórico.

**RF14** - Cadastrar funcionário: Permitir o cadastro de funcionários contendo nome, especialidade, horário de trabalho, percentual de comissão e status de atividade.

**RF15** - Editar funcionário: Permitir a edição de funcionários para atualização de comissões, horários ou especialidades.

**RF16** - Remover funcionário: Permitir a exclusão ou inativação de funcionários, mantendo os registros associados para consulta futura.

### Objetivo específico 3: Objetivo: Automatização de agendamentos

**RF17** - Visualizar agendamentos em calendário: Permitir que administradores e barbeiros visualizem agendamentos em calendários, com filtros por data e funcionário.

**RF18** - Adicionar agendamento ao calendário: Permitir que administradores e barbeiros adicionem serviços ao calendário conforme a disponibilidade do funcionário.

**RF19** - Realizar agendamentos via WhatsApp: Permitir que os clientes agendem serviços diretamente pelo WhatsApp, por meio de chatbot que reconhece o tipo de serviço e horários disponíveis.

## 7.2 Lista de Requisitos Não Funcionais

### Usabilidade

**RNF01** - A interface do sistema deve ajustar automaticamente sua exibição para diferentes tamanhos de tela - smartphones (481-768px), tablets (835-1024px) e desktops (1367-1440px) -, sem prejuízo das funcionalidades.

**RNF02** - As funcionalidades de agendamento, visualização de agenda e registro de vendas devem estar acessíveis em, no máximo, dois cliques a partir da tela inicial.

**RNF03** - O sistema deve aplicar contrastes de cor adequados, utilizar fontes legíveis e adotar um vocabulário claro e objetivo, em conformidade com as diretrizes WCAG 2.1, ePWG e a norma ISO/IEC 25010.

**RNF04** - Todos os campos de formulário devem utilizar máscaras de entrada, como: R$ para valores monetários, dd/mm/aaaa para datas, e máscaras específicas para CPF, telefone e horário.

**RNF05** - A interface do chatbot deve fornecer respostas em português brasileiro, com mensagens claras e sem ambiguidades, adaptadas ao contexto do usuário.

### Desempenho

**RNF06** - A navegação entre telas não deve ultrapassar 3 segundos.

**RNF07** - A sincronização entre o WhatsApp e o calendário interno do sistema deve ocorrer em até 4 segundos após a confirmação do agendamento.

### Suportabilidade

**RNF08** - O sistema deve funcionar corretamente nas versões estáveis mais recentes dos navegadores Google Chrome (versão 137 ou superior), Mozilla Firefox (versão 139 ou superior) e Safari (versão 18 ou superior).

### Requisitos de Interface

**RNF09** - O sistema deve utilizar a API oficial do WhatsApp Business (Cloud API) para registrar agendamentos automaticamente por meio de chatbot.

**RNF10** - A comunicação entre o site e o backend deve ser autenticada via tokens JWT, transmitidos no cabeçalho das requisições HTTP.

## Histórico de Versão

|Data|Versão|Descrição|Autor|
|---|---|---|---|
| 20/05/2025| 1.0 | Criação do documento | [Weverton Rodrigues](https://github.com/vevetin) |
| 03/06/2025 | 1.1 | Atualização dos RFs e RNFs |[Caio Sabino](https://github.com/caiomsabino), [Caio Melo](https://github.com/CaioMelo25), [Felipe Campelo](https://github.com/felipeacampelo), [Felipe Henrique](https://github.com/fhenrique77), [Vinícius Rufino](https://github.com/RufinoVfR) e [Weverton Rodrigues](https://github.com/vevetin)|