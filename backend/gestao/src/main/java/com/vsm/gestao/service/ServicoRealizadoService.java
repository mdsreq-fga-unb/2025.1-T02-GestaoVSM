package com.vsm.gestao.service;

import com.vsm.gestao.entity.ServicoRealizado;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.entity.Servico;
import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.repository.ServicoRealizadoRepository;
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

    // Registrar/agendar serviço realizado (admin pode agendar para qualquer barbeiro, barbeiro só para si mesmo)
    public ServicoRealizado registrarServicoRealizado(
            Usuario solicitante,
            Usuario barbeiro,
            Servico servico,
            LocalDateTime dataHora,
            BigDecimal valor,
            String formaPagamento
    ) {
        if (solicitante.getTipoUsuario() == TipoUsuario.BARBEIRO && !solicitante.getId().equals(barbeiro.getId())) {
            throw new SecurityException("Barbeiro só pode agendar para si mesmo.");
        }
        if (!disponibilidadeBarbeiro(barbeiro, dataHora)) {
            throw new IllegalArgumentException("Barbeiro não está disponível neste horário.");
        }
        ServicoRealizado realizado = new ServicoRealizado();
        realizado.setUsuario(barbeiro);
        realizado.setServico(servico);
        realizado.setDataExecucao(dataHora);
        realizado.setValor(valor);
        realizado.setFormaPagamento(formaPagamento);
        realizado.setConfirmado(false);
        return servicoRealizadoRepository.save(realizado);
    }

    // Checa se o barbeiro está disponível no horário
    private boolean disponibilidadeBarbeiro(Usuario barbeiro, LocalDateTime dataHora) {
        // Considera que não pode haver dois serviços para o mesmo barbeiro no mesmo horário exato
        List<ServicoRealizado> conflitos = servicoRealizadoRepository
                .findAllByUsuarioIdAndDataExecucao(barbeiro.getId(), dataHora);
        return conflitos.isEmpty();
    }

    // Confirmar serviço realizado (admin ou barbeiro)
    public ServicoRealizado confirmarServicoRealizado(Long id, Usuario usuario, String formaPagamento) {
        if (usuario.getTipoUsuario() != TipoUsuario.ADMIN && usuario.getTipoUsuario() != TipoUsuario.BARBEIRO) {
            throw new SecurityException("Apenas admin ou barbeiro pode confirmar serviço realizado.");
        }
        ServicoRealizado realizado = servicoRealizadoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Serviço realizado não encontrado."));
        if (usuario.getTipoUsuario() == TipoUsuario.BARBEIRO && !realizado.getUsuario().getId().equals(usuario.getId())) {
            throw new SecurityException("Barbeiro só pode confirmar seus próprios serviços.");
        }
        realizado.setConfirmado(true);
        realizado.setFormaPagamento(formaPagamento);
        return servicoRealizadoRepository.save(realizado);
    }

    // Admin vê todos, barbeiro vê só os seus serviços realizados por dia
    public List<ServicoRealizado> listarServicosPorDia(LocalDate dia, Usuario usuario, Optional<Long> barbeiroId) {
        if (usuario.getTipoUsuario() != TipoUsuario.ADMIN && usuario.getTipoUsuario() != TipoUsuario.BARBEIRO) {
            throw new SecurityException("Acesso negado.");
        }
        LocalDateTime inicio = dia.atStartOfDay();
        LocalDateTime fim = dia.atTime(LocalTime.MAX);

        if (usuario.getTipoUsuario() == TipoUsuario.ADMIN) {
            if (barbeiroId.isPresent()) {
                return servicoRealizadoRepository.findAllByUsuarioIdAndDataExecucaoBetween(barbeiroId.get(), inicio, fim);
            } else {
                return servicoRealizadoRepository.findAllByDataExecucaoBetween(inicio, fim);
            }
        } else {
            return servicoRealizadoRepository.findAllByUsuarioIdAndDataExecucaoBetween(usuario.getId(), inicio, fim);
        }
    }

    public Optional<ServicoRealizado> buscarPorId(Long id, Usuario usuario) {
        return servicoRealizadoRepository.findById(id);
    }
}