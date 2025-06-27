package com.vsm.gestao.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "fechamentos_caixa")
public class FechamentoCaixa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_inicio", nullable = false)
    private LocalDateTime dataInicio;

    @Column(name = "data_fim", nullable = false)
    private LocalDateTime dataFim;

    @Column(name = "receitas_servicos", nullable = false)
    private BigDecimal receitasServicos;

    @Column(name = "receitas_produtos", nullable = false)
    private BigDecimal receitasProdutos;

    @Column(nullable = false)
    private BigDecimal despesas;

    @Column(name = "comissoes_pagas", nullable = false)
    private BigDecimal comissoesPagas;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_responsavel", nullable = false)
    private Usuario responsavel;
}