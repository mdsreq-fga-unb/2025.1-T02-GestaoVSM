package com.vsm.gestao.entity;

import java.math.BigDecimal;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@NoArgsConstructor
@Getter
@Data
@Entity
@Table(name = "produtos")
public class Produto {  

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "preco", nullable = false)
    private BigDecimal preco;

    @Column(name = "comissao_produto", nullable = false)
    private BigDecimal comissaoProduto;

    @Column(name = "disponivel", nullable = false)
    private boolean disponivel;
}
