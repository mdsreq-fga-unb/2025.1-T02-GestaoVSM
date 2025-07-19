package com.vsm.gestao.dto;

import com.vsm.gestao.entity.Servico;
import java.math.BigDecimal;

public class ServicoDTO {

    // --- ESTA PARTE ESTAVA FALTANDO ---
    // DTO para RECEBER os dados ao criar ou atualizar um serviço.
    public record ServicoRequest(
            String nome,
            BigDecimal preco,
            Integer duracaoEstimadaMinutos,
            Boolean ativo
    ) {}

    // DTO para ENVIAR a resposta da API, com o ID do serviço.
    public record ServicoResponse(
            Long id,
            String nome,
            BigDecimal preco,
            Integer duracaoEstimadaMinutos,
            Boolean ativo
    ) {
        public static ServicoResponse fromEntity(Servico servico) {
            return new ServicoResponse(
                    servico.getId(),
                    servico.getNome(),
                    servico.getPreco(),
                    servico.getDuracaoEstimadaMinutos(),
                    servico.getAtivo()
            );
        }
    }
}