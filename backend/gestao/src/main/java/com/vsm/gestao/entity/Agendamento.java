package com.vsm.gestao.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "agendamentos")
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // LAZY é uma boa prática para performance
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_servico", nullable = false)
    private Servico servico;

    @Column(name = "nome_cliente")
    private String nomeCliente;

    @Column(name = "data_agendamento")
    private LocalDateTime dataAgendamento;

    @Column(name = "duracao_minutos")
    private Integer duracaoMinutos;
    
    // Um status é sempre útil
    private String status; // Ex: "AGENDADO", "CONCLUIDO", "CANCELADO"
}