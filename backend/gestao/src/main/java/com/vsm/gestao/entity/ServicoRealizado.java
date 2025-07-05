package com.vsm.gestao.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "servicos_realizados")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServicoRealizado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToMany
    @JoinTable(
        name = "servicorealizado_servicos",
        joinColumns = @JoinColumn(name = "servicorealizado_id"),
        inverseJoinColumns = @JoinColumn(name = "servico_id")
    )
    private List<Servico> servicos;

    @Column(name = "data_execucao", nullable = false)
    private LocalDateTime dataExecucao;

    @Column(name = "valor" ,nullable = false)
    private BigDecimal valor;

    @Column(name = "forma_pagamento", nullable = false)
    private String formaPagamento;

    @Column(name = "confirmado")
    private boolean confirmado = false;
}