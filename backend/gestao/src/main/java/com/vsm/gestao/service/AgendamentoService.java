package com.vsm.gestao.service;

import com.vsm.gestao.entity.Agendamento;
import com.vsm.gestao.entity.Servico;
import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.repository.AgendamentoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Transactional
    public Agendamento criarAgendamento(Agendamento agendamento, Usuario solicitante) {
        // O barbeiro do agendamento é o 'agendamento.getUsuario()'
        Usuario barbeiroAgendado = agendamento.getUsuario();

        if (solicitante.getTipoUsuario() != TipoUsuario.ADMIN && !solicitante.getId().equals(barbeiroAgendado.getId())) {
            throw new SecurityException("Barbeiro só pode agendar para si mesmo.");
        }

        // Calcula a duração total e o horário de término
        int duracaoTotalMinutos = agendamento.getServicos().stream()
                .mapToInt(Servico::getDuracaoEstimadaMinutos)
                .sum();
        agendamento.setDuracaoMinutos(duracaoTotalMinutos);
        LocalDateTime dataFim = agendamento.getDataAgendamento().plusMinutes(duracaoTotalMinutos);

        // Lógica de disponibilidade aprimorada
        if (!isHorarioDisponivel(barbeiroAgendado, agendamento.getDataAgendamento(), dataFim, null)) {
            throw new IllegalArgumentException("Barbeiro não está disponível neste horário (considerando a duração do serviço).");
        }

        return agendamentoRepository.save(agendamento);
    }

    @Transactional
    public void apagarAgendamento(Long agendamentoId, Usuario solicitante) {
        Agendamento agendamento = agendamentoRepository.findById(agendamentoId)
                .orElseThrow(() -> new IllegalArgumentException("Agendamento não encontrado."));

        // Corrigido: Admin pode apagar qualquer um, Barbeiro só o seu.
        if (solicitante.getTipoUsuario() != TipoUsuario.ADMIN && !solicitante.getId().equals(agendamento.getUsuario().getId())) {
            throw new SecurityException("Usuário não tem permissão para apagar este agendamento.");
        }

        agendamentoRepository.delete(agendamento);
    }

    // Lógica aprimorada para verificar conflitos de horário
    private boolean isHorarioDisponivel(Usuario barbeiro, LocalDateTime novoInicio, LocalDateTime novoFim, Long agendamentoIdExcluido) {
        // Encontra agendamentos que terminam depois que o novo começa E começam antes que o novo termine.
        List<Agendamento> agendamentosConflitantes = agendamentoRepository.findAgendamentosConflitantes(barbeiro.getId(), novoInicio, novoFim, agendamentoIdExcluido);
        return agendamentosConflitantes.isEmpty();
    }
    
   
}