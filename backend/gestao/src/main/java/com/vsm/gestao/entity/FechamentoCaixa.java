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

    // --- NOVOS CAMPOS PARA DETALHAMENTO ---

    @Column(name = "faturamento_bruto_servicos", nullable = false)
    private BigDecimal faturamentoBrutoServicos; // Valor total sem descontos

    @Column(name = "faturamento_liquido_servicos", nullable = false)
    private BigDecimal faturamentoLiquidoServicos; // Valor com descontos de pagamento

    @Column(name = "faturamento_produtos", nullable = false)
    private BigDecimal faturamentoProdutos; // Valor total das vendas de produtos

    @Column(name = "total_despesas", nullable = false)
    private BigDecimal totalDespesas; // Soma de todos os gastos

    @Column(name = "total_comissoes_produto", nullable = false)
    private BigDecimal totalComissoesProduto; // Soma de todas as comissões de produto

    @Column(name = "total_pago_barbeiros", nullable = false)
    private BigDecimal totalPagoBarbeiros; // O valor total que a barbearia pagou aos barbeiros

    @Column(name = "lucro_final_barbearia", nullable = false)
    private BigDecimal lucroFinalBarbearia; // O que sobrou para a barbearia

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_responsavel", nullable = false)
    private Usuario responsavel;
}