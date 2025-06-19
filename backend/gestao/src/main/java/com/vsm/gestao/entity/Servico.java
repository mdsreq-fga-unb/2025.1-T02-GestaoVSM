package com.vsm.gestao.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "servicos")
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private BigDecimal preco;

    @Column(name = "duracao_estimada_minutos")
    private Integer duracaoEstimadaMinutos;

    private Boolean ativo;
}