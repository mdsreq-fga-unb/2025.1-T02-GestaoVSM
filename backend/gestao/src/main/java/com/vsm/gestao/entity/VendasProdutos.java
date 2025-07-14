package com.vsm.gestao.entity;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;
import java.math.BigDecimal;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "vendas_produtos")


public class VendasProdutos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    @Column(name = "data_gasto", nullable = false, updatable = false)
    private LocalDate dataGasto;

    @Column(name = "preco", nullable = false)
    private BigDecimal preco;

    @Column(name = "forma_pagamento", nullable = false)
    private String pagamento;

    @ManyToOne
    @JoinColumn(name = "id_produto")
    private Produto produto;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

     @PrePersist
    protected void onCreate() {
        this.dataGasto = LocalDate.now();
    }
}