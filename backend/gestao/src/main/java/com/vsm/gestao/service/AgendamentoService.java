package com.vsm.gestao.service;

import com.vsm.gestao.dto.AgendamentoDTO;
import com.vsm.gestao.dto.AgendamentoResponseDTO;
import com.vsm.gestao.entity.Agendamento;
import com.vsm.gestao.entity.Servico;
import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.repository.AgendamentoRepository;
import com.vsm.gestao.repository.ServicoRepository;
import com.vsm.gestao.repository.UsuarioRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ServicoRepository servicoRepository;

   @Transactional
    public AgendamentoResponseDTO criarAgendamento(AgendamentoDTO dto, Usuario solicitante) {
        // ... (lógica de criação que você já tem)
        // ...
        Agendamento novoAgendamento = new Agendamento(); // Exemplo
        // ... Mapeie o DTO para a entidade ...
        
        // No final, converta a entidade salva para DTO antes de retornar
        Agendamento agendamentoSalvo = agendamentoRepository.save(novoAgendamento);
        return AgendamentoResponseDTO.fromEntity(agendamentoSalvo);
    }
    
    // --- MÉTODO PRINCIPAL DA MUDANÇA ---
    @Transactional(readOnly = true) // Garante que a transação fique aberta durante a conversão
    public List<AgendamentoResponseDTO> listarAgendamentos(LocalDate dia, Optional<Long> barbeiroId, Usuario solicitante) {
        LocalDateTime inicioDoDia = dia.atStartOfDay();
        LocalDateTime fimDoDia = dia.atTime(LocalTime.MAX);
        
        List<Agendamento> agendamentos;

        if (solicitante.getTipoUsuario() == TipoUsuario.ADMIN) {
            agendamentos = barbeiroId.map(id -> agendamentoRepository.findAllByUsuarioIdAndDataAgendamentoBetween(id, inicioDoDia, fimDoDia))
                    .orElseGet(() -> agendamentoRepository.findAllByDataAgendamentoBetween(inicioDoDia, fimDoDia));
        } else if (solicitante.getTipoUsuario() == TipoUsuario.BARBEIRO) {
            agendamentos = agendamentoRepository.findAllByUsuarioIdAndDataAgendamentoBetween(solicitante.getId(), inicioDoDia, fimDoDia);
        } else {
             agendamentos = Collections.emptyList();
        }

        // Converte a lista de entidades para uma lista de DTOs AQUI DENTRO DO SERVIÇO
        return agendamentos.stream()
                .map(AgendamentoResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public Optional<Agendamento> buscarPorId(Long id, Usuario solicitante) {
        return agendamentoRepository.findById(id)
                .filter(agendamento -> temPermissaoParaAcessar(solicitante, agendamento.getUsuario()));
    }

    @Transactional
    public Agendamento atualizarAgendamento(Long id, AgendamentoDTO dto, Usuario solicitante) {
        Agendamento agendamentoExistente = agendamentoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Agendamento com ID " + id + " não encontrado."));
        validarPermissao(solicitante, agendamentoExistente.getUsuario());

        Usuario barbeiroAgendado = getBarbeiroFromDto(dto.barbeiroId());
        List<Servico> servicos = getServicosFromDto(dto.servicoIds());

        mapearDtoParaEntidade(dto, agendamentoExistente, barbeiroAgendado, servicos);
        validarDisponibilidade(agendamentoExistente, id);

        return agendamentoRepository.save(agendamentoExistente);
    }

    @Transactional
    public void apagarAgendamento(Long id, Usuario solicitante) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Agendamento com ID " + id + " não encontrado."));
        validarPermissao(solicitante, agendamento.getUsuario());
        agendamentoRepository.deleteById(id);
    }

    private void mapearDtoParaEntidade(AgendamentoDTO dto, Agendamento agendamento, Usuario barbeiro, List<Servico> servicos) {
        agendamento.setUsuario(barbeiro);
        agendamento.setNomeCliente(dto.nomeCliente());
        agendamento.setServicos(servicos);
        agendamento.setDataAgendamento(dto.dataAgendamento());
        int duracaoTotalMinutos = servicos.stream().mapToInt(Servico::getDuracaoEstimadaMinutos).sum();
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