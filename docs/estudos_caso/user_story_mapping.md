## Exercício de Construção de Backlog de Produto usando USM - ComunEventos


<iframe width="768" height="432" src="https://miro.com/app/live-embed/uXjVIqVC20c=/?embedMode=view_only_without_ui&moveToViewport=5335,-2280,13846,5467&embedId=934228893915" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>

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


