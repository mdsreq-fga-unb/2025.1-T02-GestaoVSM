package com.vsm.gestao.service;

import com.vsm.gestao.entity.*;
import com.vsm.gestao.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FechamentoCaixaService {

    private final FechamentoCaixaRepository fechamentoCaixaRepository;
    private final ServicoRealizadoRepository servicoRealizadoRepository;
    private final VendasProdutosRepository vendasProdutosRepository;
    private final GastosRepository gastosRepository;
    private final UsuarioRepository usuarioRepository;

    private static final BigDecimal PERCENTUAL_BARBEIRO = new BigDecimal("0.40");
    private static final BigDecimal PERCENTUAL_BARBEARIA = new BigDecimal("0.60");

    /**
     * Calcula o pagamento individual de cada barbeiro para um período.
     * Fórmula: (40% do Valor Líquido dos Serviços) + (Comissões de Produtos) - (Gastos Atribuídos)
     */
    public Map<Long, BigDecimal> calcularPagamentoBarbeiros(LocalDateTime inicio, LocalDateTime fim) {
        List<Usuario> barbeiros = usuarioRepository.findAll().stream()
                .filter(u -> u.getTipoUsuario() == TipoUsuario.BARBEIRO && u.isAtivo())
                .collect(Collectors.toList());

        Map<Long, BigDecimal> pagamentos = new HashMap<>();

        for (Usuario barbeiro : barbeiros) {
            // 1. Pega 40% do valor LÍQUIDO dos serviços
            BigDecimal faturamentoLiquidoServicos = servicoRealizadoRepository
                    .findAllByUsuarioIdAndDataExecucaoBetween(barbeiro.getId(), inicio, fim).stream()
                    .map(ServicoRealizado::getValor) // Usa o valor já com desconto
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            BigDecimal pagamentoServicos = faturamentoLiquidoServicos.multiply(PERCENTUAL_BARBEIRO);

            // 2. Adiciona as comissões de produtos
            BigDecimal comissoesProdutos = vendasProdutosRepository
                    .findAllByUsuarioIdAndDataGastoBetween(barbeiro.getId(), inicio.toLocalDate(), fim.toLocalDate()).stream()
                    .map(VendasProdutos::getProduto)
                    .map(Produto::getComissaoProduto)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            // 3. Subtrai os gastos atribuídos ao barbeiro
            BigDecimal gastosBarbeiro = gastosRepository
                    .findAllByUsuarioIdAndDataGastoBetween(barbeiro.getId(), inicio.toLocalDate(), fim.toLocalDate()).stream()
                    .map(Gastos::getPreco)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            BigDecimal pagamentoFinal = pagamentoServicos.add(comissoesProdutos).subtract(gastosBarbeiro);
            pagamentos.put(barbeiro.getId(), pagamentoFinal);
        }
        return pagamentos;
    }

    /**
     * Gera o relatório financeiro completo da semana para a barbearia.
     */
    @Transactional
    public FechamentoCaixa gerarFechamentoSemanal(Usuario responsavel) {
        if (responsavel.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas Admin pode fechar o caixa.");
        }

        LocalDate hoje = LocalDate.now();
        LocalDate inicioSemana = hoje.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate fimSemana = hoje.with(TemporalAdjusters.nextOrSame(DayOfWeek.SATURDAY));

        LocalDateTime dataInicio = inicioSemana.atStartOfDay();
        LocalDateTime dataFim = fimSemana.atTime(LocalTime.MAX);

        // --- Cálculos Globais ---
        List<ServicoRealizado> todosServicosRealizados = servicoRealizadoRepository.findAllByDataExecucaoBetween(dataInicio, dataFim);
        List<VendasProdutos> todasAsVendas = vendasProdutosRepository.findAllByDataGastoBetween(dataInicio.toLocalDate(), dataFim.toLocalDate());
        List<Gastos> todosOsGastos = gastosRepository.findAllByDataGastoBetween(dataInicio.toLocalDate(), dataFim.toLocalDate());

        // Faturamento LÍQUIDO dos serviços (soma dos valores já com desconto)
        BigDecimal faturamentoLiquidoServicos = todosServicosRealizados.stream()
                .map(ServicoRealizado::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Faturamento BRUTO dos serviços (soma dos preços originais)
        BigDecimal faturamentoBrutoServicos = todosServicosRealizados.stream()
                .flatMap(sr -> sr.getServicos().stream())
                .map(Servico::getPreco)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Faturamento total de produtos
        BigDecimal faturamentoProdutos = todasAsVendas.stream()
                .map(VendasProdutos::getPreco)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Total de despesas/gastos
        BigDecimal totalDespesas = todosOsGastos.stream()
                .map(Gastos::getPreco)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        // Total de comissões de produto pagas
        BigDecimal totalComissoesProduto = todasAsVendas.stream()
                .map(v -> v.getProduto().getComissaoProduto())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // --- Cálculo do Lucro da Barbearia ---
        // 1. A barbearia fica com 60% do valor LÍQUIDO dos serviços
        BigDecimal lucroServicosBarbearia = faturamentoLiquidoServicos.multiply(PERCENTUAL_BARBEARIA);
        
        // 2. A barbearia fica com o valor dos produtos MENOS as comissões
        BigDecimal lucroProdutosBarbearia = faturamentoProdutos.subtract(totalComissoesProduto);

        // 3. A barbearia arca com todas as despesas
        BigDecimal lucroFinalBarbearia = lucroServicosBarbearia.add(lucroProdutosBarbearia).subtract(totalDespesas);

        // --- Cálculo do Total Pago aos Barbeiros ---
        // (40% do líquido dos serviços) + (comissões) - (gastos específicos)
        Map<Long, BigDecimal> pagamentosIndividuais = calcularPagamentoBarbeiros(dataInicio, dataFim);
        BigDecimal totalPagoBarbeiros = pagamentosIndividuais.values().stream().reduce(BigDecimal.ZERO, BigDecimal::add);

        // --- Montando o Relatório Final ---
        FechamentoCaixa fechamento = new FechamentoCaixa();
        fechamento.setDataInicio(dataInicio);
        fechamento.setDataFim(dataFim);
        fechamento.setFaturamentoBrutoServicos(faturamentoBrutoServicos);
        fechamento.setFaturamentoLiquidoServicos(faturamentoLiquidoServicos);
        fechamento.setFaturamentoProdutos(faturamentoProdutos);
        fechamento.setTotalDespesas(totalDespesas);
        fechamento.setTotalComissoesProduto(totalComissoesProduto);
        fechamento.setTotalPagoBarbeiros(totalPagoBarbeiros);
        fechamento.setLucroFinalBarbearia(lucroFinalBarbearia);
        fechamento.setResponsavel(responsavel);

        return fechamentoCaixaRepository.save(fechamento);
    }
}