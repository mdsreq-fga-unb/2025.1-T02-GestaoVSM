package com.vsm.gestao.entity;

import java.time.LocalDate;
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

    // CORRIGIDO: Nome da coluna e do campo ajustado para "data_venda"
    @Column(name = "data_venda", nullable = false, updatable = false)
    private LocalDate dataVenda;

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
        this.dataVenda = LocalDate.now();
    }
}