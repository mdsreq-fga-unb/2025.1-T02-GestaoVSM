package com.vsm.gestao.entity;

import jakarta.persistence.*;
import lombok.Data; 
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String especialidade;

    @Column(name = "horario_trabalho")
    private String horarioTrabalho;

    @Column(name = "percentual_comissao")
    private BigDecimal percentualComissao;

    @Column(name = "tipo_usuario")
    private String tipoUsuario; // Ex: "BARBEIRO", "ADMIN"

    private Boolean ativo;
}