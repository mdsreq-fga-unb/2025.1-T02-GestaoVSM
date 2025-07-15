package com.vsm.gestao.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class FechamentoDTO {

    /**
     * O DTO principal que será retornado pela API.
     * Contém o resumo da barbearia e a lista com o detalhamento de cada funcionário.
     */
    @Getter
    @Setter
    @Builder // Padrão de construção para facilitar a criação do objeto
    public static class RelatorioFinanceiro {
        @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime dataInicio;
        @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime dataFim;
        private BigDecimal faturamentoTotalBruto; // Soma dos serviços (sem desconto) + produtos
        private BigDecimal faturamentoTotalLiquido; // Soma dos serviços (com desconto) + produtos
        private BigDecimal lucroFinalBarbearia;
        private List<RelatorioFuncionario> detalhamentoFuncionarios;
    }

    /**
     * DTO que representa o detalhamento de um único funcionário.
     */
    @Getter
    @Setter
    @Builder
    public static class RelatorioFuncionario {
        private Long funcionarioId;
        private String funcionarioNome;
        private BigDecimal totalBrutoServicos; // Valor original dos serviços que ele fez
        private BigDecimal totalLiquidoServicos; // Valor com desconto dos serviços que ele fez
        private BigDecimal totalComissoesProdutos;
        private BigDecimal totalGastos;
        private BigDecimal totalAReceber; // O pagamento final do funcionário
    }
}