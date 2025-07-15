## Verificação e Validação

### Walkthrough com usuários reais

Com o objetivo de validar o sistema em ambiente real, garantindo usabilidade e completude funcional, foi feito um walkthrough com o cliente, no intuito de apresentá-lo o incremento e buscar sua validação. Com isso, após o desenvolvimento, tivemos uma reunião com o cliente, aonde foi apresentado o [MVP](../visao_prod_proj/backlog_produto.md)  para o mesmo, que aprovou e elogiou o progresso do time. O registro do Walkthrough está disponível a seguir:

<iframe width="560" height="315" src="https://www.youtube.com/embed/5tGY-Eudyas" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Declaração

### Documentação de Escopo Entregue

**Projeto:** Sistema de Gestão para Barbearia VSM  
**Equipe:** Caio Sabino,Caio Melo, Felipe de Aquino, Felipe Henrique, Vinicius Fernandes e Weverton Rodrigues  
**Data de Entrega:** 14/07/2025

---

## 1. Objetivo do Documento

Este documento tem como finalidade registrar de forma clara o escopo funcional e não funcional entregue ao final do desenvolvimento da solução para a Barbearia VSM. Ele contempla os requisitos implementados, as alterações realizadas com base no feedback do cliente e as pendências para futuras versões.

---

## 2. Visão Geral da Solução Entregue

Foi desenvolvida uma aplicação web completa utilizando backend em **Spring Boot** e frontend em **React**, visando modernizar e automatizar a gestão administrativa da Barbearia VSM. Entre os principais recursos entregues estão:

* Módulo financeiro (faturamento, comissões e fechamento de caixa)
* Visualização e gerenciamento de agendamentos
* Geração de relatórios gerenciais
* Cadastro de serviços e produtos
* Sincronização de agenda por funcionário

---

## 3. Requisitos Funcionais Implementados (RF)

A seguir, os requisitos que compuseram o **Produto Mínimo Viável (MVP)**, agrupados por objetivo específico e organizados conforme suas respectivas User Stories.

### Objetivo: Eliminar processos manuais propensos a erro

| Código | Descrição                                                                                                                                                                                                  |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| US01   | Permitir ao administrador realizar o fechamento de caixa com base na consolidação automática de todas as vendas de produtos, serviços prestados e comissões pagas aos funcionários no período selecionado. |
| US02   | Permitir ao administrador visualizar e calcular o faturamento total da barbearia dentro de um intervalo de datas, com filtros por funcionário, tipo de serviço ou produto.                                 |

### Objetivo: Organizar e centralizar operações da barbearia

| Código | Descrição                                                                                                                                                                                                             |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| US05   | Permitir ao administrador visualizar o valor bruto do faturamento filtrado por dia, semana e mês.                                                                                                                     |
| US07   | Permitir ao administrador acessar um extrato financeiro geral com a divisão do faturamento por funcionário, contendo a soma dos serviços realizados, produtos vendidos e comissões devidas em um determinado período. |
| US17   | Permitir que administradores e barbeiros visualizem agendamentos em calendários, com filtros por data e funcionário.                                                                                                  |

### Objetivo: Automatização de agendamentos

| Código | Descrição                                                                                                            |
| ------ | -------------------------------------------------------------------------------------------------------------------- |
| US18   | Permitir que administradores e barbeiros adicionem serviços ao calendário conforme a disponibilidade do funcionário. |

---

## 4. Requisitos Não Funcionais (RNF)

| Código | Descrição                                                                        |
| ------ | -------------------------------------------------------------------------------- |
| RNF01  | Interface responsiva, adaptada a dispositivos móveis e navegadores modernos.     |
| RNF02  | Máscaras de entrada nos formulários para valores e datas, padronizando os dados. |
| RNF03  | Validação de campos obrigatórios no frontend e backend.                          |
| RNF04  | Comunicação segura entre frontend e backend via JWT.                             |
| RNF05  | Sincronização de agendamentos em tempo real.                                     |

---

## 5. Ajustes Realizados com Base no Feedback

A equipe realizou múltiplas reuniões com o cliente para apresentar protótipos e evoluções do sistema. A partir desses encontros, destacam-se os seguintes ajustes realizados:

* Inclusão do detalhamento de comissões no relatório de faturamento
* Atualização no fluxo de fechamento de caixa com regras específicas para cartões, PIX e comissões
* Simplificação das telas de visualização de agendamentos para facilitar a adoção no dia a dia dos barbeiros
* Reorganização do backlog para priorizar funcionalidades diretamente relacionadas ao MVP, com base na expansão da barbearia e entrada de um novo funcionário para atuar no caixa

---

## 6. Requisitos Não Implementados

| Descrição                                                      |
| -------------------------------------------------------------- |
| Integração com Google Calendar e WhatsApp Business API         |
| Cadastro e visualização de produtos no sistema                 |
| Cadastro de funcionários e controle de permissões de acesso    |
| Módulo para controle de estoque                                |
| Relatório completo de fluxo de caixa com categorias de despesa |

---

## 7. Artefatos Complementares

* Protótipos de alta fidelidade (figma e aplicação em React)
* Vídeo demonstrativo das principais funcionalidades implementadas
* Aplicação backend hospedada no Render (Spring Boot via Docker)
* Banco de dados PostgreSQL hospedado no Render
* Documento de User Stories (priorizadas e implementadas)
* Tabela de priorização com critérios B/U/E/R/D
* Atas de reuniões com o cliente contendo decisões, ajustes e validações

---


## Organização e Atualização

### Registro de Requisitos Não Implementados

Ao final do MVP, tiveram alguns requisitos que acabaram não sendo implementados, devido a fatores como: falta de tempo e risco de desenvolvimento. Isso fez com que 4 requisitos funcionais fossem descartados desse MVP, estes são:

- **RF03** - Registrar gasto operacional: Permitir o registro de gastos operacionais, informando categoria, valor, data e descrição, para que sejam considerados no cálculo financeiro da barbearia.

- **RF09** - Editar produto: Permitir a edição de informações dos produtos cadastrados, incluindo alterações no nome, valor ou descrição.

- **RF12** - Editar serviço: Permitir a edição dos dados de serviços cadastrados, como valores, tempo ou associação com barbeiros.

- **RF15** - Editar funcionário: Permitir a edição de funcionários para atualização de comissões, horários ou especialidades.

## Histórico de Versão

|Data|Versão|Descrição|Autor|
|---|---|---|---|
| 11/05/2025| 1.0 | Criação do documento | [Weverton Rodrigues](https://github.com/vevetin) |
| 15/07/2025| 1.1 | Atualização do documento | [Vinícius Rufino](https://github.com/RufinoVfR) |
