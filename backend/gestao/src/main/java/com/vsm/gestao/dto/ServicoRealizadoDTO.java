package com.vsm.gestao.dto;

import com.vsm.gestao.entity.Servico;
import com.vsm.gestao.entity.ServicoRealizado;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class ServicoRealizadoDTO {

    // DTO para a resposta da API, com informações úteis para o frontend.
    public record ServicoRealizadoResponse(
            Long id,
            String nomeBarbeiro,
            List<String> nomesServicos,
            LocalDateTime dataExecucao,
            BigDecimal valor,
            String formaPagamento,
            boolean confirmado
    ) {
        public static ServicoRealizadoResponse fromEntity(ServicoRealizado servicoRealizado) {
            String nomeBarbeiro = servicoRealizado.getUsuario() != null ? servicoRealizado.getUsuario().getNome() : "N/A";
            
            List<String> nomesServicos = servicoRealizado.getServicos() != null ?
                    servicoRealizado.getServicos().stream().map(Servico::getNome).collect(Collectors.toList()) :
                    List.of();

            return new ServicoRealizadoResponse(
                    servicoRealizado.getId(),
                    nomeBarbeiro,
                    nomesServicos,
                    servicoRealizado.getDataExecucao(),
                    servicoRealizado.getValor(),
                    servicoRealizado.getFormaPagamento(),
                    servicoRealizado.isConfirmado()
            );
        }
    }
}