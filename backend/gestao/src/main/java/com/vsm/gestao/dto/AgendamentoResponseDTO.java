package com.vsm.gestao.dto;

import com.vsm.gestao.entity.Agendamento;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

// Este DTO vai formatar a resposta final da sua API de agendamentos
public record AgendamentoResponseDTO(
    Long id,
    String nomeCliente,
    LocalDateTime dataAgendamento,
    Integer duracaoMinutos,
    Long barbeiroId,
    String nomeBarbeiro,
    List<ServicoDTO.ServicoResponse> servicos // A lista de serviços agora é de DTOs
) {
    public static AgendamentoResponseDTO fromEntity(Agendamento agendamento) {
        // Converte a lista de entidades Servico para uma lista de DTOs de Serviço
        // Esta conversão força o carregamento dos dados ANTES de enviar o JSON
        List<ServicoDTO.ServicoResponse> servicosDto = agendamento.getServicos() != null ?
                agendamento.getServicos().stream()
                    .map(ServicoDTO.ServicoResponse::fromEntity)
                    .collect(Collectors.toList())
                : Collections.emptyList();

        return new AgendamentoResponseDTO(
            agendamento.getId(),
            agendamento.getNomeCliente(),
            agendamento.getDataAgendamento(),
            agendamento.getDuracaoMinutos(),
            agendamento.getUsuario().getId(),
            agendamento.getUsuario().getNome(),
            servicosDto
        );
    }
}