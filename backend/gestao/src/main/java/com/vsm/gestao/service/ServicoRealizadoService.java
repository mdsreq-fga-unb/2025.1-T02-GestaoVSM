package com.vsm.gestao.service;

import com.vsm.gestao.dto.ConfirmacaoServicoDTO;
import com.vsm.gestao.entity.Agendamento;
import com.vsm.gestao.entity.Servico;
import com.vsm.gestao.entity.ServicoRealizado;
import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.repository.AgendamentoRepository;
import com.vsm.gestao.repository.ServicoRealizadoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ServicoRealizadoService {

    private final ServicoRealizadoRepository servicoRealizadoRepository;
    private final AgendamentoRepository agendamentoRepository;

    @Transactional
    public ServicoRealizado confirmarServicoAgendado(ConfirmacaoServicoDTO dto, Usuario solicitante) {
        Agendamento agendamento = agendamentoRepository.findById(dto.agendamentoId())
                .orElseThrow(() -> new IllegalArgumentException("Agendamento não encontrado."));

        if (solicitante.getTipoUsuario() == TipoUsuario.BARBEIRO && !agendamento.getUsuario().getId().equals(solicitante.getId())) {
            throw new SecurityException("Barbeiro só pode confirmar seus próprios agendamentos.");
        }

        BigDecimal valorBruto = agendamento.getServicos().stream()
                .map(Servico::getPreco)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal valorFinal = calcularValorComDesconto(valorBruto, dto.formaPagamento());

        ServicoRealizado realizado = new ServicoRealizado();
        realizado.setUsuario(agendamento.getUsuario());
        realizado.setServicos(agendamento.getServicos());
        realizado.setDataExecucao(agendamento.getDataAgendamento());
        realizado.setValor(valorFinal);
        realizado.setFormaPagamento(dto.formaPagamento().toUpperCase());
        realizado.setConfirmado(true);

        servicoRealizadoRepository.save(realizado);
        agendamentoRepository.deleteById(dto.agendamentoId());

        return realizado;
    }

    private BigDecimal calcularValorComDesconto(BigDecimal valorBruto, String formaPagamento) {
        return switch (formaPagamento.toUpperCase()) {
            case "CREDITO" -> valorBruto.multiply(new BigDecimal("0.96"));
            case "DEBITO" -> valorBruto.multiply(new BigDecimal("0.99"));
            default -> valorBruto;
        };
    }

    public List<ServicoRealizado> listarServicosPorDia(LocalDate dia, Usuario usuario, Optional<Long> barbeiroId) {
        LocalDateTime inicio = dia.atStartOfDay();
        LocalDateTime fim = dia.atTime(LocalTime.MAX);

        if (usuario.getTipoUsuario() == TipoUsuario.ADMIN) {
            return barbeiroId.map(id -> servicoRealizadoRepository.findAllByUsuarioIdAndDataExecucaoBetween(id, inicio, fim))
                    .orElseGet(() -> servicoRealizadoRepository.findAllByDataExecucaoBetween(inicio, fim));
        } else if (usuario.getTipoUsuario() == TipoUsuario.BARBEIRO) {
            return servicoRealizadoRepository.findAllByUsuarioIdAndDataExecucaoBetween(usuario.getId(), inicio, fim);
        } else {
            return List.of();
        }
    }

    public Optional<ServicoRealizado> buscarPorId(Long id) {
        return servicoRealizadoRepository.findById(id);
    }
}