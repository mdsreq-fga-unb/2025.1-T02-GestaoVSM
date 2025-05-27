## 7.1 Lista de Requisitos Funcionais

Os requisitos funcionais descrevem as funcionalidades específicas que o sistema deve implementar para atender às necessidades da Barbearia VSM. Eles incluem integrações, processos e interações do usuário com o sistema.

### Objetivo específico 1: Eliminar processos manuais propensos a erros

**RF01** - Realizar fechamento de caixa: Permitir ao administrador realizar o fechamento de caixa com base na consolidação automática de todas as vendas de produtos, serviços prestados e comissões pagas aos funcionários no período selecionado.

**RF02** - Calcular o faturamento dado um intervalo de data: Permitir ao administrador calcular o faturamento total da barbearia em um intervalo de datas, considerando receitas provenientes de serviços e vendas de produtos.

**RF03** - Visualizar o faturamento dado um intervalo de data: Permitir ao administrador visualizar relatório de faturamento detalhado dentro de um intervalo de datas, com filtros por funcionário, tipo de serviço ou produto.

**RF04** - Registrar gasto operacional da barbearia: Permitir o registro de gastos operacionais, informando categoria, valor, data e descrição, para que sejam considerados no cálculo financeiro da barbearia.

### Objetivo específico 2: Organizar e centralizar operações da barbearia

**RF05** - Gerar relatório financeiro de faturamento: Permitir ao administrador gerar relatório financeiro com o detalhamento diário, semanal ou mensal de receitas, despesas e comissões.

**RF06** - Cadastrar produto: Permitir o cadastro de novos produtos com informações como nome, descrição, preço e status de disponibilidade para venda.

**RF07** - Editar produto: Permitir a edição de informações dos produtos cadastrados, incluindo alterações no nome, valor ou descrição.

**RF08** - Remover produto: Permitir a remoção de produtos do sistema, com a opção de inativar para manter o histórico de vendas.

**RF09** - Cadastrar serviço: Permitir o cadastro de novos serviços com nome, preço, tempo estimado de duração e profissionais habilitados para realizá-lo.

**RF10** - Editar serviço: Permitir a edição dos dados de serviços cadastrados, como valores, tempo ou associação com barbeiros.

**RF11** - Remover serviço: Permitir a remoção de serviços do sistema, com a possibilidade de arquivamento para preservação do histórico.

**RF12** - Cadastrar perfil de funcionário: Permitir o cadastro de perfis de funcionários contendo nome, especialidade, horário de trabalho, percentual de comissão e status de atividade.

**RF13** - Editar perfil de funcionário: Permitir a edição de perfis de funcionários para atualização de comissões, horários ou especialidades.

**RF14** - Remover perfil de funcionário: Permitir a exclusão ou inativação de perfis de funcionários, mantendo os registros associados para consulta futura.

**RF15** - Acessar o relatório de faturamento de cada funcionário: Permitir o acesso a um relatório de faturamento por funcionário, contendo a soma dos serviços realizados, produtos vendidos e comissões devidas em um determinado período.

### Objetivo específico 3: Objetivo: Automatização de agendamentos

**RF16** - Visualizar serviços agendados no calendário de funcionário: Permitir que os funcionários visualizem seus agendamentos diários em um calendário pessoal, com horário, nome do cliente e serviço agendado.

**RF17** - Visualizar agendamentos no calendário do administrador: Permitir que o administrador visualize em um único calendário os agendamentos de todos os funcionários, com filtros por data, serviço ou barbeiro.

**RF18** - Realizar agendamentos via WhatsApp: Permitir que os clientes realizem agendamentos diretamente pelo WhatsApp, por meio de integração com um chatbot que reconhece o tipo de serviço e horários disponíveis.

**RF19** - Adicionar serviço ao calendário do barbeiro: Permitir que o administrador e os barbeiros adicionem serviços ao calendário do barbeiro responsável, considerando a disponibilidade informada.

**RF20** - Visualizar agendamentos no calendário por funcionário: Permitir ao administrador e barbeiros visualizar os agendamentos filtrados por funcionário, com detalhamento do serviço, data, cliente e duração estimada.

## 7.2 Lista de Requisitos Não Funcionais

### Usabilidade

**RNF01** - O sistema deverá fornecer um treinamento rápido e objetivo (onboarding) para facilitar a familiarização inicial dos usuários com a plataforma.

**RNF02** - Deve haver um botão de ajuda disponível em todas as abas, que ao ser acionado exiba um pop-up explicativo sobre a funcionalidade em questão, garantindo suporte contextual imediato.

**RNF03** - A interface deve ser responsiva, adaptando-se de forma adequada a diferentes tamanhos e resoluções de tela, assegurando uma experiência consistente em dispositivos variados.

**RNF04** - A navegação deve ser intuitiva, permitindo que as principais funcionalidades sejam acessadas em no máximo dois cliques.

**RNF05** - A escolha de cores, tipografia e terminologia deve seguir os princípios estabelecidos pela WCAG 2.1, promovendo acessibilidade e uma experiência familiar e confortável para o usuário.


### Confiabilidade

**RNF06** - O sistema deve impedir o salvamento de lançamentos financeiros ou agendamentos que não estejam devidamente preenchidos, garantindo a validação completa dos campos obrigatórios antes da conclusão.

**RNF07** - Deve haver mecanismos automáticos para evitar o registro duplicado de clientes, barbeiros ou serviços, assegurando a integridade dos dados cadastrados.

**RNF08** - O sistema deve garantir uma disponibilidade mínima de 99% durante o horário de funcionamento da barbearia, compreendido entre 9h e 19h.

### Desempenho

**RNF09** - O tempo máximo permitido para navegação entre telas é de 3 segundos, assegurando uma experiência ágil e fluida.

**RNF10** - A sincronização de agendamentos provenientes do WhatsApp com o calendário do aplicativo deve ocorrer em até 4 segundos, mantendo a atualização em tempo próximo ao real.

### Suportabilidade

**RNF11** - A arquitetura do sistema deverá ser modular e flexível, permitindo a implementação de novas funcionalidades com impacto mínimo na operabilidade existente.

**RNF12** - O sistema deverá manter um registro detalhado (log) das atividades administrativas, tais como fechamento de caixa e alterações em comissões, com retenção dos dados por no mínimo 6 meses, para fins de auditoria.

**RNF13** - A solução deverá ser compatível com os navegadores Safari, Firefox e Google Chrome, garantindo ampla cobertura para os usuários.

### Requisitos de Interface

**RNF14** - A agenda do sistema deverá ser integrada ao Google Calendar por meio da API oficial, permitindo a sincronização automática dos agendamentos dos barbeiros.

**RNF15** - O sistema deverá utilizar a API do WhatsApp Business (Cloud API) para registrar agendamentos automaticamente via chatbot.

**RNF16** - Os campos de formulário deverão possuir máscaras de entrada apropriadas, como prefixos monetários (ex.: R$) para valores e formatação dd/mm/aaaa para datas, garantindo a padronização e validade dos dados.

**RNF17** - A interface do chatbot deverá fornecer feedback em linguagem natural, utilizando o português brasileiro, com mensagens claras e objetivas que facilitem a compreensão do usuário.

**RNF18** - A autenticação entre o aplicativo móvel e o backend deverá ser realizada utilizando tokens JWT, transmitidos nos cabeçalhos das requisições HTTP, garantindo segurança nas comunicações.

## Histórico de Versão

|Data|Versão|Descrição|Autor|
|---|---|---|---|
| 20/05/2025| 1.0 | Criação do documento | [Weverton Rodrigues](https://github.com/vevetin) |