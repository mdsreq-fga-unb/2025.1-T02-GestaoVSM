package com.vsm.gestao.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@Setter
@NoArgsConstructor
@Data
@Entity
@Table(name = "servicos")
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "preco", nullable = false)
    private BigDecimal preco;

    @Column(name = "duracao_estimada_minutos")
    private Integer duracaoEstimadaMinutos;

    @Column(name = "ativo")
    private Boolean ativo;

    @ManyToMany(mappedBy = "servicos")
    @JsonIgnore
    private List<Agendamento> agendamentos;
}