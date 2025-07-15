package com.vsm.gestao.service;

import com.vsm.gestao.dto.FechamentoDTO;
import com.vsm.gestao.dto.RelatorioRequestDTO;
import com.vsm.gestao.entity.*;
import com.vsm.gestao.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FechamentoCaixaService {

    private final ServicoRealizadoRepository servicoRealizadoRepository;
    private final VendasProdutosRepository vendasProdutosRepository;
    private final GastosRepository gastosRepository;
    private final UsuarioRepository usuarioRepository;

    private static final BigDecimal PERCENTUAL_BARBEIRO = new BigDecimal("0.40");
    private static final BigDecimal PERCENTUAL_BARBEARIA = new BigDecimal("0.60");

    /**
     * Método principal que gera o relatório financeiro com base no tipo solicitado.
     */
    public FechamentoDTO.RelatorioFinanceiro gerarRelatorioFinanceiro(RelatorioRequestDTO.Request request) {
        LocalDateTime dataInicio;
        LocalDateTime dataFim;

        if (request.tipo() == RelatorioRequestDTO.TipoRelatorio.SEMANAL) {
            // Lógica para relatório semanal
            LocalDate hoje = LocalDate.now();
            LocalDate inicioSemana = hoje.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
            LocalDate fimSemana = hoje.with(TemporalAdjusters.nextOrSame(DayOfWeek.SATURDAY));
            dataInicio = inicioSemana.atStartOfDay();
            dataFim = fimSemana.atTime(LocalTime.MAX);
        } else { // Lógica para relatório MENSAL
            YearMonth mesAlvo = determinarMesAlvo(request.mes().orElse(null));
            dataInicio = mesAlvo.atDay(1).atStartOfDay();
            dataFim = mesAlvo.atEndOfMonth().atTime(LocalTime.MAX);
        }

        return gerarRelatorioPorPeriodo(dataInicio, dataFim);
    }

    /**
     * Implementa a sua regra de negócio para determinar qual mês deve ser usado para o relatório mensal.
     */
    private YearMonth determinarMesAlvo(String mesRequest) {
        LocalDate hoje = LocalDate.now();
        LocalDate ultimoDiaMesAnterior = hoje.minusMonths(1).with(TemporalAdjusters.lastDayOfMonth());

        // Se hoje for DEPOIS do último dia do mês anterior, o relatório é do mês ATUAL.
        if (hoje.isAfter(ultimoDiaMesAnterior)) {
            return YearMonth.from(hoje);
        } else {
            // Se não, o relatório ainda é referente ao mês ANTERIOR.
            return YearMonth.from(hoje.minusMonths(1));
        }
    }

    /**
     * Lógica de cálculo que gera o relatório para um período de tempo definido.
     */
    private FechamentoDTO.RelatorioFinanceiro gerarRelatorioPorPeriodo(LocalDateTime dataInicio, LocalDateTime dataFim) {
        // 1. CALCULAR DETALHAMENTO POR FUNCIONÁRIO
        List<Usuario> barbeiros = usuarioRepository.findAll().stream()
                .filter(u -> u.getTipoUsuario() == TipoUsuario.BARBEIRO && u.isAtivo())
                .collect(Collectors.toList());

        List<FechamentoDTO.RelatorioFuncionario> detalhamentoFuncionarios = new ArrayList<>();

        for (Usuario barbeiro : barbeiros) {
            List<ServicoRealizado> servicosDoBarbeiro = servicoRealizadoRepository.findAllByUsuarioIdAndDataExecucaoBetween(barbeiro.getId(), dataInicio, dataFim);
            List<VendasProdutos> vendasDoBarbeiro = vendasProdutosRepository.findAllByUsuarioIdAndDataVendaBetween(barbeiro.getId(), dataInicio.toLocalDate(), dataFim.toLocalDate());
            List<Gastos> gastosDoBarbeiro = gastosRepository.findAllByUsuarioIdAndDataGastoBetween(barbeiro.getId(), dataInicio.toLocalDate(), dataFim.toLocalDate());

            BigDecimal totalLiquidoServicos = servicosDoBarbeiro.stream().map(ServicoRealizado::getValor).reduce(BigDecimal.ZERO, BigDecimal::add);
            BigDecimal totalBrutoServicos = servicosDoBarbeiro.stream().flatMap(sr -> sr.getServicos().stream()).map(Servico::getPreco).reduce(BigDecimal.ZERO, BigDecimal::add);
            BigDecimal totalComissoes = vendasDoBarbeiro.stream().map(v -> v.getProduto().getComissaoProduto()).reduce(BigDecimal.ZERO, BigDecimal::add);
            BigDecimal totalGastos = gastosDoBarbeiro.stream().map(Gastos::getPreco).reduce(BigDecimal.ZERO, BigDecimal::add);

            BigDecimal pagamentoBase = totalLiquidoServicos.multiply(PERCENTUAL_BARBEIRO);
            BigDecimal totalAReceber = pagamentoBase.add(totalComissoes).subtract(totalGastos);

            detalhamentoFuncionarios.add(FechamentoDTO.RelatorioFuncionario.builder()
                    .funcionarioId(barbeiro.getId())
                    .funcionarioNome(barbeiro.getNome())
                    .totalBrutoServicos(totalBrutoServicos)
                    .totalLiquidoServicos(totalLiquidoServicos)
                    .totalComissoesProdutos(totalComissoes)
                    .totalGastos(totalGastos)
                    .totalAReceber(totalAReceber)
                    .build());
        }

        // 2. CALCULAR TOTAIS DA BARBEARIA
        BigDecimal faturamentoTotalLiquidoServicos = detalhamentoFuncionarios.stream().map(FechamentoDTO.RelatorioFuncionario::getTotalLiquidoServicos).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal faturamentoTotalBrutoServicos = detalhamentoFuncionarios.stream().map(FechamentoDTO.RelatorioFuncionario::getTotalBrutoServicos).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal faturamentoTotalProdutos = vendasProdutosRepository.findAllByDataVendaBetween(dataInicio.toLocalDate(), dataFim.toLocalDate()).stream().map(VendasProdutos::getPreco).reduce(BigDecimal.ZERO, BigDecimal::add);
        
        BigDecimal totalComissoesPago = detalhamentoFuncionarios.stream().map(FechamentoDTO.RelatorioFuncionario::getTotalComissoesProdutos).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalGastosBarbearia = gastosRepository.findAllByDataGastoBetween(dataInicio.toLocalDate(), dataFim.toLocalDate()).stream().map(Gastos::getPreco).reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal lucroServicos = faturamentoTotalLiquidoServicos.multiply(PERCENTUAL_BARBEARIA);
        BigDecimal lucroProdutos = faturamentoTotalProdutos.subtract(totalComissoesPago);
        BigDecimal lucroFinalBarbearia = lucroServicos.add(lucroProdutos).subtract(totalGastosBarbearia);
        
        // 3. MONTAR O RELATÓRIO FINAL
        return FechamentoDTO.RelatorioFinanceiro.builder()
                .dataInicio(dataInicio)
                .dataFim(dataFim)
                .faturamentoTotalBruto(faturamentoTotalBrutoServicos.add(faturamentoTotalProdutos))
                .faturamentoTotalLiquido(faturamentoTotalLiquidoServicos.add(faturamentoTotalProdutos))
                .lucroFinalBarbearia(lucroFinalBarbearia)
                .detalhamentoFuncionarios(detalhamentoFuncionarios)
                .build();
    }
}
