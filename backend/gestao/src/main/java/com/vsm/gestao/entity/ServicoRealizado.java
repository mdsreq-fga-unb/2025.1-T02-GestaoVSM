package com.vsm.gestao.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "servicos_realizados")
public class ServicoRealizado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_servico", nullable = false)
    private Servico servico;

    @CreationTimestamp
    @Column(name = "data_execucao", nullable = false, updatable = false)
    private LocalDateTime dataExecucao;

    @Column(nullable = false)
    private BigDecimal valor;

    @Column(name = "forma_pagamento", nullable = false)
    private String formaPagamento;

    @Column(name = "confirmado")
    private boolean confirmado = false;
}