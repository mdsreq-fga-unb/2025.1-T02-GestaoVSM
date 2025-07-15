## Exercício de Construção de Backlog de Produto usando USM
<img width="1975" height="506" alt="image" src="https://github.com/user-attachments/assets/b057ce11-b964-40b5-8a8a-51a3a9168f95" />





---

## Usuários (Personas)

| ID   | Descrição                                                              |
| ---- | ---------------------------------------------------------------------- |
| Us01 | Organizador do Evento                                                  |
| Us02 | Participante do Evento                                                 |
| Us03 | Parte Interessada (Participante, Voluntário, Fornecedor, Patrocinador) |

---

## Atividades

| ID   | Descrição                                     | Usuário |
| ---- | --------------------------------------------- | ------- |
| At01 | Organizar Evento                              | Us01    |
| At02 | Divulgar Evento                               | Us01    |
| At03 | Gerenciar Inscrições                          | Us01    |
| At04 | Gerenciar Colaborações                        | Us01    |
| At05 | Executar e Avaliar Evento                     | Us01    |
| At06 | Acompanhamento e Comunicação com Participante | Us02    |
| At07 | Experiência e Engajamento                     | Us03    |

---

## Backbone

| ID   | Descrição                               | Atividade |
| ---- | --------------------------------------- | --------- |
| Bb01 | Criar Evento                            | At01      |
| Bb02 | Editar Evento                           | At01      |
| Bb03 | Página do Evento                        | At02      |
| Bb04 | Compartilhar Evento                     | At02      |
| Bb05 | Inscrição de Participantes              | At03      |
| Bb06 | Pagamentos                              | At03      |
| Bb07 | Voluntários                             | At04      |
| Bb08 | Fornecedores                            | At04      |
| Bb09 | Patrocinadores                          | At04      |
| Bb10 | No Dia do Evento                        | At05      |
| Bb11 | Pós-Evento                              | At05      |
| Bb12 | Acompanhamento e Notificações do Evento | At06      |
| Bb13 | Comunicação Direta                      | At06      |
| Bb14 | Comunicações e Presença                 | At07      |
| Bb15 | Acesso à Informação                     | At07      |
| Bb16 | Reconhecimento e Feedback               | At07      |

---
## MVP

| ID    | Descrição                                                                                                                               | Backbone                    | Usuário                  |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------ |
| MVP01 | Eu, como organizador, quero criar um evento com nome, data e descrição para iniciar o planejamento.                                     | Criar Evento (Bb01)                  | Us01 – Organizador       |
| MVP02 | Eu, como organizador, quero categorizar o evento (público-alvo, gratuito/pago, visibilidade) para deixá-lo público no site.             | Criar Evento (Bb01)                  | Us01 – Organizador       |
| MVP03 | Eu, como organizador, quero cancelar evento e notificar inscritos para evitar problemas.                                                | Criar Evento (Bb01)                  | Us01 – Organizador       |
| MVP04 | Eu, como organizador, quero gerar página com detalhes do evento para facilitar a divulgação.                                            | Página do Evento (Bb03)              | Us01 – Organizador       |
| MVP05 | Eu, como organizador, quero compartilhar em redes sociais com um clique.                                                                | Compartilhar Evento (Bb04)           | Us01 – Organizador       |
| MVP06 | Eu, como organizador, quero ver lista de inscritos em tempo real para monitorar a adesão ao evento.                                     | Inscrição de Participantes (Bb05)    | Us01 – Organizador       |
| MVP07 | Eu, como organizador, quero cadastrar voluntários e suas funções para contar com apoio no evento.                                       | Voluntários (Bb07)                   | Us01 – Organizador       |
| MVP08 | Eu, como organizador, quero cadastrar fornecedor com nome, serviço e contato para formalizar parceria.                                  | Fornecedores (Bb08)                  | Us01 – Organizador       |
| MVP09 | Eu, como organizador, quero cadastrar patrocinadores e cotas de apoio para viabilizar o evento.                                         | Patrocinadores (Bb09)                | Us01 – Organizador       |
| MVP10 | Eu, como organizador, quero marcar check-in dos participantes para controlar entradas no evento.                                        | No Dia do Evento (Bb10)              | Us01 – Organizador       |
| MVP11 | Eu, como organizador, quero gerar lista de presença com QR Code para facilitar a validação.                                             | No Dia do Evento (Bb10)              | Us01 – Organizador       |
| MVP12 | Eu, como organizador, quero enviar pesquisa de satisfação para coletar feedback dos participantes.                                      | Pós-Evento (Bb11)                    | Us01 – Organizador       |
| MVP13 | Eu, como participante, quero receber confirmação de inscrição para garantir que estou registrado.                                       | Acompanhamento e Notificações (Bb12) | Us02 – Participante      |
| MVP14 | Eu, como participante, quero acessar informações detalhadas do evento (local, horário, tipo) para facilitar meu planejamento.           | Acesso à Informação (Bb15)           | Us02 – Participante      |
| MVP15 | Eu, como parte interessada, quero receber pesquisa de satisfação após o evento para opinar sobre minha experiência.                     | Reconhecimento e Feedback (Bb16)     | Us03 – Parte Interessada |
| MVP16 | Eu, como parte interessada, quero receber um e-mail lembrando de confirmar minha presença, para garantir que estarei no evento no dia.  | Comunicações e Presença (Bb14)       | Us03 – Parte Interessada |
| MVP17 | Eu, como parte interessada, quero confirmar minha presença com um clique no e-mail, para sinalizar minha participação de forma prática. | Comunicações e Presença (Bb14)       | Us03 – Parte Interessada |

## RELEASE 1
| ID  | Descrição                                                                                                                               | Backbone / Épico                     | Usuário                  |
| --- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------ |
| R01 | Eu, como organizador, quero adicionar botão de inscrição para que os participantes possam se registrar diretamente na página do evento. | Página do Evento (Bb03)              | Us01 – Organizador       |
| R02 | Eu, como organizador, quero programar publicações promocionais para manter a visibilidade constante.                                    | Compartilhar Evento (Bb04)           | Us01 – Organizador       |
| R03 | Eu, como organizador, quero integrar meio de pagamento online para aceitar inscrições pagas.                                            | Pagamentos (Bb06)                    | Us01 – Organizador       |
| R04 | Eu, como organizador, quero exportar lista de participantes para uma planilha para melhor controle.                                     | Inscrição de Participantes (Bb05)    | Us01 – Organizador       |
| R05 | Eu, como organizador, quero acompanhar dados dos participantes para gerar relatórios depois.                                            | Inscrição de Participantes (Bb05)    | Us01 – Organizador       |
| R06 | Eu, como organizador, quero limitar vagas por categoria para balancear os públicos participantes.                                       | Inscrição de Participantes (Bb05)    | Us01 – Organizador       |
| R07 | Eu, como organizador, quero permitir envio de mensagens para inscritos para que dúvidas possam ser resolvidas.                          | Comunicação Direta (Bb13)            | Us01 – Organizador       |
| R08 | Eu, como organizador, quero criar mensagens automáticas para facilitar a comunicação com os participantes.                              | Comunicação Direta (Bb13)            | Us01 – Organizador       |
| R09 | Eu, como organizador, quero notificar alterações no evento para manter os inscritos informados.                                         | Acompanhamento e Notificações (Bb12) | Us01 – Organizador       |
| R10 | Eu, como organizador, quero definir horários e tarefas para cada voluntário para organizar a equipe no dia.                             | Voluntários (Bb07)                   | Us01 – Organizador       |
| R11 | Eu, como organizador, quero confirmar presença dos voluntários para assegurar apoio no dia.                                             | Voluntários (Bb07)                   | Us01 – Organizador       |
| R12 | Eu, como organizador, quero anexar contrato ou acordo com fornecedores para garantir segurança jurídica.                                | Fornecedores (Bb08)                  | Us01 – Organizador       |
| R13 | Eu, como organizador, quero avaliar fornecedor após o evento para decisões futuras.                                                     | Fornecedores (Bb08)                  | Us01 – Organizador       |
| R14 | Eu, como organizador, quero gerar relatório de visibilidade para prestar contas aos patrocinadores.                                     | Patrocinadores (Bb09)                | Us01 – Organizador       |
| R15 | Eu, como organizador, quero enviar certificado de parceria para reconhecer os patrocinadores.                                           | Patrocinadores (Bb09)                | Us01 – Organizador       |
| R16 | Eu, como organizador, quero visualizar status das tarefas em tempo real para manter tudo sob controle.                                  | No Dia do Evento (Bb10)              | Us01 – Organizador       |
| R17 | Eu, como organizador, quero gerar relatório com métricas do evento para avaliar os resultados.                                          | Pós-Evento (Bb11)                    | Us01 – Organizador       |
| R18 | Eu, como organizador, quero compartilhar resultado com patrocinadores e comunidade para mostrar o impacto do evento.                    | Pós-Evento (Bb11)                    | Us01 – Organizador       |
| R19 | Eu, como participante, quero responder dúvidas por chat ou formulário para esclarecer informações.                                      | Comunicação Direta (Bb13)            | Us02 – Participante      |
| R20 | Eu, como participante, quero receber notificações sobre alterações no evento para me planejar.                                          | Acompanhamento e Notificações (Bb12) | Us02 – Participante      |
| R21 | Eu, como participante, quero receber lembrete automático pré-evento para não esquecer a data.                                           | Acompanhamento e Notificações (Bb12) | Us02 – Participante      |
| R22 | Eu, como participante, quero enviar mensagens para os organizadores caso tenha dúvidas.                                                 | Comunicação Direta (Bb13)            | Us02 – Participante      |
| R23 | Eu, como parte interessada, quero responder uma pesquisa de satisfação específica sobre meu papel no evento.                            | Reconhecimento e Feedback (Bb16)     | Us03 – Parte Interessada |
| R24 | Eu, como parte interessada, quero ter acesso a um comprovante de participação em PDF.                                                   | Reconhecimento e Feedback (Bb16)     | Us03 – Parte Interessada |
| R25 | Eu, como parte interessada, quero receber lembrete automático próximo ao evento para não esquecer de comparecer.                        | Comunicações e Presença (Bb14)       | Us03 – Parte Interessada |
| R26 | Eu, como parte interessada, quero ver meus dados registrados (nome, função, papel no evento) para validar se está tudo correto.         | Acesso à Informação (Bb15)           | Us03 – Parte Interessada |



