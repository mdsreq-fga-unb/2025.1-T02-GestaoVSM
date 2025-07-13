package com.vsm.gestao.service;

import com.vsm.gestao.dto.AgendamentoDTO;
import com.vsm.gestao.entity.Agendamento;
import com.vsm.gestao.entity.Servico;
import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.repository.AgendamentoRepository;
import com.vsm.gestao.repository.ServicoRepository;
import com.vsm.gestao.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ServicoRepository servicoRepository;

    /**
     * Cria um novo agendamento a partir de um DTO.
     * Valida permissões e disponibilidade de horário.
     */
    @Transactional
    public Agendamento criarAgendamento(AgendamentoDTO dto, Usuario solicitante) {
        Usuario barbeiroAgendado = getBarbeiroFromDto(dto.barbeiroId());
        validarPermissao(solicitante, barbeiroAgendado);

        List<Servico> servicos = getServicosFromDto(dto.servicoIds());

        Agendamento novoAgendamento = new Agendamento();
        mapearDtoParaEntidade(dto, novoAgendamento, barbeiroAgendado, servicos);
        
        validarDisponibilidade(novoAgendamento, null);

        return agendamentoRepository.save(novoAgendamento);
    }

    /**
     * Lista agendamentos. Se o solicitante for ADMIN, pode filtrar por barbeiro.
     * Se for BARBEIRO, vê apenas os seus próprios agendamentos para o dia.
     */
    public List<Agendamento> listarAgendamentos(LocalDate dia, Optional<Long> barbeiroId, Usuario solicitante) {
        LocalDateTime inicioDoDia = dia.atStartOfDay();
        LocalDateTime fimDoDia = dia.atTime(LocalTime.MAX);

        if (solicitante.getTipoUsuario() == TipoUsuario.ADMIN) {
            return barbeiroId.map(id -> agendamentoRepository.findAllByUsuarioIdAndDataAgendamentoBetween(id, inicioDoDia, fimDoDia))
                    .orElseGet(() -> agendamentoRepository.findAllByDataAgendamentoBetween(inicioDoDia, fimDoDia));
        } else if (solicitante.getTipoUsuario() == TipoUsuario.BARBEIRO) {
            return agendamentoRepository.findAllByUsuarioIdAndDataAgendamentoBetween(solicitante.getId(), inicioDoDia, fimDoDia);
        }
        return Collections.emptyList();
    }

    /**
     * Busca um agendamento por ID, validando a permissão do solicitante.
     */
    public Optional<Agendamento> buscarPorId(Long id, Usuario solicitante) {
        return agendamentoRepository.findById(id)
                .filter(agendamento -> temPermissaoParaAcessar(solicitante, agendamento.getUsuario()));
    }

    /**
     * Atualiza um agendamento existente.
     * Revalida permissões e disponibilidade de horário.
     */
    @Transactional
    public Agendamento atualizarAgendamento(Long id, AgendamentoDTO dto, Usuario solicitante) {
        Agendamento agendamentoExistente = agendamentoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Agendamento com ID " + id + " não encontrado."));

        validarPermissao(solicitante, agendamentoExistente.getUsuario());

        Usuario barbeiroAgendado = getBarbeiroFromDto(dto.barbeiroId());
        List<Servico> servicos = getServicosFromDto(dto.servicoIds());

        mapearDtoParaEntidade(dto, agendamentoExistente, barbeiroAgendado, servicos);
        
        // Ao validar disponibilidade, ignoramos o próprio agendamento que está sendo atualizado.
        validarDisponibilidade(agendamentoExistente, id);

        return agendamentoRepository.save(agendamentoExistente);
    }

    /**
     * Apaga um agendamento, validando a permissão do solicitante.
     */
    @Transactional
    public void apagarAgendamento(Long id, Usuario solicitante) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Agendamento com ID " + id + " não encontrado."));
        
        validarPermissao(solicitante, agendamento.getUsuario());

        agendamentoRepository.deleteById(id);
    }

    // --- Métodos de Apoio ---

    private void mapearDtoParaEntidade(AgendamentoDTO dto, Agendamento agendamento, Usuario barbeiro, List<Servico> servicos) {
        agendamento.setUsuario(barbeiro);
        agendamento.setNomeCliente(dto.nomeCliente());
        agendamento.setServicos(servicos);
        agendamento.setDataAgendamento(dto.dataAgendamento());
        
        int duracaoTotalMinutos = servicos.stream()
                .mapToInt(Servico::getDuracaoEstimadaMinutos)
                .sum();
        agendamento.setDuracaoMinutos(duracaoTotalMinutos);
    }

    private void validarDisponibilidade(Agendamento agendamento, Long idExcluido) {
        LocalDateTime inicio = agendamento.getDataAgendamento();
        LocalDateTime fim = inicio.plusMinutes(agendamento.getDuracaoMinutos());
        List<Agendamento> conflitos = agendamentoRepository.findAgendamentosConflitantes(
                agendamento.getUsuario().getId(), inicio, fim, idExcluido);
        
        if (!conflitos.isEmpty()) {
            throw new IllegalStateException("O barbeiro já possui um agendamento neste horário.");
        }
    }

    private Usuario getBarbeiroFromDto(Long barbeiroId) {
        return usuarioRepository.findById(barbeiroId)
                .orElseThrow(() -> new IllegalArgumentException("Barbeiro com ID " + barbeiroId + " não encontrado."));
    }

    private List<Servico> getServicosFromDto(List<Long> servicoIds) {
        List<Servico> servicos = servicoRepository.findAllById(servicoIds);
        if (servicos.size() != servicoIds.size()) {
            throw new IllegalArgumentException("Um ou mais IDs de serviço são inválidos.");
        }
        return servicos;
    }

    private void validarPermissao(Usuario solicitante, Usuario barbeiroDoAgendamento) {
        if (solicitante.getTipoUsuario() == TipoUsuario.BARBEIRO && !solicitante.getId().equals(barbeiroDoAgendamento.getId())) {
            throw new SecurityException("Barbeiros só podem gerenciar os próprios agendamentos.");
        }
    }

    private boolean temPermissaoParaAcessar(Usuario solicitante, Usuario barbeiroDoAgendamento) {
        return solicitante.getTipoUsuario() == TipoUsuario.ADMIN || solicitante.getId().equals(barbeiroDoAgendamento.getId());
    }
}