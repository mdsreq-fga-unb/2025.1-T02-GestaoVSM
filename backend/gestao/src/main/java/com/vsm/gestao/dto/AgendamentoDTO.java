package com.vsm.gestao.dto;

import java.time.LocalDateTime;
import java.util.List;

// DTO para CRIAR um novo agendamento
public record AgendamentoDTO(
    Long barbeiroId,
    String nomeCliente,
    List<Long> servicoIds,
    LocalDateTime dataAgendamento
) {}