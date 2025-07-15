package com.vsm.gestao.dto;

import com.vsm.gestao.entity.Agendamento;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

// DTO para a resposta da API de agendamentos
public record AgendamentoResponseDTO(
    Long id,
    String nomeCliente,
    LocalDateTime dataAgendamento,
    Integer duracaoMinutos,
    Long barbeiroId,
    String nomeBarbeiro,
    List<ServicoDTO.ServicoResponse> servicos // Reutilizando seu ServicoDTO
) {
    public static AgendamentoResponseDTO fromEntity(Agendamento agendamento) {
        return new AgendamentoResponseDTO(
            agendamento.getId(),
            agendamento.getNomeCliente(),
            agendamento.getDataAgendamento(),
            agendamento.getDuracaoMinutos(),
            agendamento.getUsuario().getId(),
            agendamento.getUsuario().getNome(),
            agendamento.getServicos().stream()
                // Aqui usamos o fromEntity do seu ServicoDTO
                .map(ServicoDTO.ServicoResponse::fromEntity)
                .collect(Collectors.toList())
        );
    }
}