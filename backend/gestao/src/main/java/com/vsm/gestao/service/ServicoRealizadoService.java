package com.vsm.gestao.service;

import com.vsm.gestao.entity.ServicoRealizado;
import com.vsm.gestao.entity.Agendamento;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.entity.Servico;
import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.repository.ServicoRealizadoRepository;

import jakarta.transaction.Transactional;

import com.vsm.gestao.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class ServicoRealizadoService {

    @Autowired
    private ServicoRealizadoRepository servicoRealizadoRepository;

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Transactional
    public ServicoRealizado confirmarServicoAgendado(Long agendamentoId, Usuario usuario, String formaPagamento) {
        Agendamento agendamento = agendamentoRepository.findById(agendamentoId)
            .orElseThrow(() -> new IllegalArgumentException("Agendamento não encontrado."));

        if (usuario.getTipoUsuario() == TipoUsuario.BARBEIRO && !agendamento.getUsuario().getId().equals(usuario.getId())) {
            throw new SecurityException("Barbeiro só pode confirmar seus próprios agendamentos.");
        }

        // Soma o valor bruto dos serviços
        BigDecimal valorBruto = agendamento.getServicos().stream()
                .map(Servico::getPreco)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // *** NOVA LÓGICA DE DESCONTO ***
        BigDecimal valorFinal = calcularValorComDesconto(valorBruto, formaPagamento);

        ServicoRealizado realizado = new ServicoRealizado();
        realizado.setUsuario(agendamento.getUsuario());
        realizado.setServicos(agendamento.getServicos());
        realizado.setDataExecucao(agendamento.getDataAgendamento());
        realizado.setValor(valorFinal); // Salva o valor líquido (com desconto)
        realizado.setFormaPagamento(formaPagamento.toUpperCase());
        realizado.setConfirmado(true);

        servicoRealizadoRepository.save(realizado);
        agendamentoRepository.deleteById(agendamentoId);

        return realizado;
    }

    private BigDecimal calcularValorComDesconto(BigDecimal valorBruto, String formaPagamento) {
        return switch (formaPagamento.toUpperCase()) {
            case "CREDITO" -> valorBruto.multiply(new BigDecimal("0.96")); // 4% de desconto
            case "DEBITO" -> valorBruto.multiply(new BigDecimal("0.99"));  // 1% de desconto
            default -> valorBruto; // PIX, DINHEIRO, etc.
        };
    }


    // Listar serviços realizados por dia (admin vê todos, barbeiro só os seus)
    public List<ServicoRealizado> listarServicosPorDia(LocalDate dia, Usuario usuario, Optional<Long> barbeiroId) {
        LocalDateTime inicio = dia.atStartOfDay();
        LocalDateTime fim = dia.atTime(LocalTime.MAX);

        if (usuario.getTipoUsuario() == TipoUsuario.ADMIN) {
            if (barbeiroId.isPresent()) {
                return servicoRealizadoRepository.findAllByUsuarioIdAndDataExecucaoBetween(barbeiroId.get(), inicio, fim);
            } else {
                return servicoRealizadoRepository.findAllByDataExecucaoBetween(inicio, fim);
            }
        } else if (usuario.getTipoUsuario() == TipoUsuario.BARBEIRO) {
            return servicoRealizadoRepository.findAllByUsuarioIdAndDataExecucaoBetween(usuario.getId(), inicio, fim);
        } else {
            throw new SecurityException("Acesso negado.");
        }
    }

    public Optional<ServicoRealizado> buscarPorId(Long id, Usuario usuario) {
        return servicoRealizadoRepository.findById(id);
    }
}