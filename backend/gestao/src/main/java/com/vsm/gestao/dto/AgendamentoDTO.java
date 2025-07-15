package com.vsm.gestao.dto;

import java.time.LocalDateTime;
import java.util.List;

// DTO para a requisição de criação de um agendamento.
public record AgendamentoDTO(
        Long barbeiroId,
        String nomeCliente,
        List<Long> servicoIds,
        LocalDateTime dataAgendamento
) {}