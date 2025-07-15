## Representação

### Mockups

Durante o início da fase de User Design, a equipe produziu mockups em baixa e média fidelidade utilizando a ferramenta Excalidraw, por sua leveza, foco na estrutura e agilidade na iteração. Esses mockups foram utilizados para representar visualmente as ideias discutidas nas fases de concepção e elaboração, com o objetivo de transformar requisitos abstratos em estruturas tangíveis, facilitando a comunicação entre a equipe e o cliente.

<center><p>Figura 1 - Conjunto de mockups principais elaborados no Excalidraw</p></center>

[![Figura 1 - Conjunto de mockups principais elaborados no Excalidraw](./assets/mockups-gestaovsm.png)](./assets/mockups-gestaovsm.png)

Os mockups incluíram telas como agendamento de clientes, fechamento de caixa, visualização de extratos e fluxo de navegação básico do sistema. Cada esboço foi pensado para representar a organização da informação, disposição dos elementos principais e fluxo esperado de interação. Foram exploradas opções de layout, agrupamento de ações, menus e chamadas para ações principais.

A aplicação dos mockups foi fundamental para antecipar dúvidas e para o alinhamento visual inicial. Eles foram apresentados em reuniões presenciais e discutidos com o cliente em tempo real, permitindo que feedbacks fossem registrados de forma imediata. A simplicidade da ferramenta também facilitou a colaboração durante os encontros, com ajustes feitos diretamente sobre os esboços.

Essa etapa também teve impacto direto na fase de análise e consenso da Engenharia de Requisitos: ao visualizar os mockups, tanto cliente quanto a equipe foram capazes de identificar elementos ausentes ou mal compreendidos, o que levou à criação e reformulação de algumas User Stories e critérios de aceitação.

### Protótipos de Alta Fidelidade

Com base nos fluxos validados pelos mockups, a equipe desenvolveu protótipos de alta fidelidade diretamente em HTML, CSS e React, simulando a navegação do sistema sem integração com backend. Essa abordagem permitiu validar a interface e a usabilidade, além de possibilitar o reaproveitamento parcial do código na fase de construção, reduzindo retrabalho.

Os protótipos foram estruturados como uma aplicação front-end navegável, incluindo telas como agenda interativa, visualização de faturamento diário, extrato por funcionário e cadastros simulados. Durante reuniões de demonstração, a navegação em tempo real possibilitou a coleta imediata de feedback do cliente, gerando ajustes como reorganização de campos, reposicionamento de botões e redesenho de hierarquias de informação.

O desenvolvimento seguiu princípios de design centrado no usuário, fundamentados nas práticas recomendadas por Barbosa e Silva (2021)<sup>[1]</sup> e nas diretrizes do Material Design 3<sup>[2]</sup>, que orientaram a identidade visual e o guia de estilo, assegurando consistência no produto. 


| [![protótipo de agendamento](./assets/prototipo-agendamento.gif){ style="width: 100%; max-width: 230px;" }](./assets/prototipo-agendamento.gif) | [![protótipo de fechamento](./assets/prototipo-fechamento.gif){ style="width: 100%; max-width: 230px;" }](./assets/prototipo-fechamento.gif) |
|:--:|:--:|

## Declaração

### Criação/refinamento de US com base em feedback

Durante os ciclos de validação dos mockups e protótipos, diversos feedbacks do cliente resultaram na criação, ajuste ou reformulação de User Stories. Essas mudanças refletiram melhor as necessidades reais da rotina da barbearia, incluindo ajustes em fluxos de agendamento, reorganização de informações financeiras e inclusão de elementos visuais para facilitar o entendimento do usuário final.

A interação constante com o cliente permitiu detectar pontos que, até então, não estavam formalmente documentados nos requisitos. A partir disso, novas histórias foram registradas, e histórias existentes foram reescritas para incorporar aspectos como reorganização de campos, melhoria na navegabilidade e alterações nos critérios de aceitação.

Esse processo de refinamento contribuiu para manter o backlog atualizado e alinhado à realidade de uso do sistema, além de reforçar o vínculo entre representação visual e documentação funcional.


## Verificação e Validação

### Feedback com o cliente

A validação dos protótipos foi realizada diretamente com o cliente por meio de sessões de demonstração, reuniões presenciais e troca de mensagens assíncronas. Esses encontros possibilitaram a coleta de feedback contínuo e direcionado, com foco na usabilidade das interfaces e na aderência dos fluxos propostos às necessidades do negócio.

A cada ciclo de validação, foram registrados comentários sobre pontos positivos e sugestões de melhoria, que foram analisados pela equipe e resultaram em ajustes rápidos nos protótipos ou em alterações no backlog. Esse mecanismo de validação iterativa reduziu significativamente o risco de retrabalho na fase de construção e fortaleceu a confiança do cliente nas decisões tomadas ao longo do projeto.

A prática constante de feedback também possibilitou validar hipóteses de design e orientar a priorização de funcionalidades com base em valor percebido e clareza de uso.

## Organização e Atualização

### Repriorização do Backlog

Com base nas validações visuais e nas interações com o cliente, o backlog foi reorganizado para refletir as novas percepções de valor, esforço e prioridade. Funcionalidades inicialmente previstas para ciclos posteriores foram antecipadas, enquanto outras, consideradas menos críticas, foram postergadas ou realocadas para versões futuras.

Essa repriorização foi fundamental para ajustar o escopo de forma realista e estratégica, especialmente diante da definição do MVP e dos prazos disponíveis. A reorganização contínua garantiu que os ciclos seguintes se concentrassem nas entregas de maior impacto para o cliente e naquelas com melhor custo-benefício, respeitando os recursos disponíveis.

## Referências Bibliográficas

- [1] BARBOSA, Simone; SILVA, Bruno. Interação Humano-Computador e Experiência do Usuário. 1. ed. Rio de Janeiro: Elsevier, 2021.

- [2] GOOGLE. Material Design 3. Disponível em: https://m3.material.io. Acesso em: [data de acesso].


## Histórico de Versão

|Data|Versão|Descrição|Autor|
|---|---|---|---|
| 11/05/2025| 1.0 | Criação do documento | [Weverton Rodrigues](https://github.com/vevetin) |