package com.vsm.gestao.service;

import com.vsm.gestao.entity.*;
import com.vsm.gestao.repository.*;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
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
public class FechamentoCaixaService {

    @Autowired private FechamentoCaixaRepository fechamentoCaixaRepository;
    @Autowired private ServicoRealizadoRepository servicoRealizadoRepository;
    @Autowired private VendasProdutosRepository vendasProdutosRepository;
    @Autowired private GastosRepository gastosRepository;
    @Autowired private UsuarioRepository usuarioRepository;

    // Constante para a porcentagem do barbeiro
    private static final BigDecimal PERCENTUAL_BARBEIRO = new BigDecimal("0.40");

    /**
     * Calcula o pagamento devido a cada barbeiro em um período específico.
     * Este método é ideal para o relatório de pagamento.
     * @return Um mapa com o ID do barbeiro e o valor a ser pago.
     */
    public Map<Long, BigDecimal> calcularPagamentoBarbeiros(LocalDateTime inicio, LocalDateTime fim) {
        // Encontra todos os barbeiros ativos
        List<Usuario> barbeiros = usuarioRepository.findAll().stream()
                .filter(u -> u.getTipoUsuario() == TipoUsuario.BARBEIRO && u.isAtivo())
                .collect(Collectors.toList());

        Map<Long, BigDecimal> pagamentos = new HashMap<>();

        for (Usuario barbeiro : barbeiros) {
            // 1. Calcular o valor bruto dos serviços realizados pelo barbeiro
            List<ServicoRealizado> servicosDoBarbeiro = servicoRealizadoRepository
                    .findAllByUsuarioIdAndDataExecucaoBetween(barbeiro.getId(), inicio, fim);
            
            BigDecimal valorBrutoServicos = BigDecimal.ZERO;
            for(ServicoRealizado sr : servicosDoBarbeiro) {
                // Soma o preço original dos serviços, IGNORANDO o desconto para o cálculo do barbeiro
                BigDecimal valorBrutoDoServicoRealizado = sr.getServicos().stream()
                    .map(Servico::getPreco)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
                valorBrutoServicos = valorBrutoServicos.add(valorBrutoDoServicoRealizado);
            }
            
            BigDecimal pagamentoServicos = valorBrutoServicos.multiply(PERCENTUAL_BARBEIRO);

            // 2. Calcular o total de comissões de produtos vendidos pelo barbeiro
            List<VendasProdutos> vendasDoBarbeiro = vendasProdutosRepository
                    .findAllByUsuarioIdAndDataGastoBetween(barbeiro.getId(), inicio.toLocalDate(), fim.toLocalDate()); // **Adicionar este método ao Repository**
            
            BigDecimal comissoesProdutos = vendasDoBarbeiro.stream()
                .map(venda -> venda.getProduto().getComissaoProduto())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

            // 3. Pagamento total do barbeiro = 40% dos serviços + comissões de produtos
            pagamentos.put(barbeiro.getId(), pagamentoServicos.add(comissoesProdutos));
        }

        return pagamentos;
    }

    /**
     * Gera e salva um relatório consolidado do fechamento de caixa da barbearia
     * para a semana anterior (Segunda a Sábado).
     */
    @Transactional
    public FechamentoCaixa gerarFechamentoSemanal(Usuario responsavel) {
        if (responsavel.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas Admin pode fechar o caixa.");
        }

        // Define o período: da segunda-feira da semana passada até o sábado da semana passada
        LocalDate hoje = LocalDate.now();
        LocalDate inicioSemana = hoje.with(TemporalAdjusters.previous(DayOfWeek.MONDAY));
        LocalDate fimSemana = inicioSemana.plusDays(5); // Sábado

        LocalDateTime dataInicio = inicioSemana.atStartOfDay();
        LocalDateTime dataFim = fimSemana.atTime(LocalTime.MAX);

        // 1. Calcular receitas de serviços (valor líquido, após descontos)
        BigDecimal receitasServicos = servicoRealizadoRepository.findAllByDataExecucaoBetween(dataInicio, dataFim)
                .stream()
                .map(ServicoRealizado::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        // 2. Calcular receitas de produtos
        List<VendasProdutos> todasAsVendas = vendasProdutosRepository.findAllByDataGastoBetween(dataInicio.toLocalDate(), dataFim.toLocalDate());
        BigDecimal receitasProdutos = todasAsVendas.stream()
                .map(VendasProdutos::getPreco)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // 3. Calcular comissões totais (de produtos) a serem pagas
         BigDecimal comissoesPagas = todasAsVendas.stream()
                .map(venda -> venda.getProduto().getComissaoProduto())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        // O pagamento de 40% sobre serviços é um cálculo de RH/Pagamento, não necessariamente uma "comissão" no mesmo sentido.
        // O campo "comissoes_pagas" da entidade FechamentoCaixa parece mais adequado para comissões de produtos.

        // 4. Calcular despesas totais
        BigDecimal despesas = gastosRepository.findAllByDataGastoBetween(dataInicio.toLocalDate(), dataFim.toLocalDate()) // **Adicionar este método ao Repository**
                .stream()
                .map(Gastos::getPreco)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        // 5. Criar e salvar a entidade de fechamento
        FechamentoCaixa fechamento = new FechamentoCaixa();
        fechamento.setDataInicio(dataInicio);
        fechamento.setDataFim(dataFim);
        fechamento.setReceitasServicos(receitasServicos);
        fechamento.setReceitasProdutos(receitasProdutos);
        fechamento.setDespesas(despesas);
        fechamento.setComissoesPagas(comissoesPagas);
        fechamento.setResponsavel(responsavel);

        return fechamentoCaixaRepository.save(fechamento);
    }
}

