package com.vsm.gestao.dto;

// DTO para CONFIRMAR um serviço que foi realizado
public record ConfirmacaoServicoDTO(
    Long agendamentoId,
    String formaPagamento
) {}