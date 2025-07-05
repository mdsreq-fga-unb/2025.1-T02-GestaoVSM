package com.vsm.gestao.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "agendamentos")
@Getter
@Setter
@NoArgsConstructor
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

   @ManyToMany
    @JoinTable(
    name = "agendamento_servicos", // Nome da tabela de ligação
    joinColumns = @JoinColumn(name = "agendamento_id"),
    inverseJoinColumns = @JoinColumn(name = "servico_id")
)
    private List<Servico> servicos;
    
    @Column(name = "nome_cliente", nullable = false)
    private String nomeCliente;

    @Column(name = "data_agendamento", nullable = false)
    private LocalDateTime dataAgendamento;

    @Column(name = "duracao_minutos")
    private Integer duracaoMinutos;
}