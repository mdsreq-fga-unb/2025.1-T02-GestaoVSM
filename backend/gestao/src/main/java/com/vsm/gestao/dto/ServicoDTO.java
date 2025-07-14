package com.vsm.gestao.dto;

import com.vsm.gestao.entity.Servico;
import java.math.BigDecimal;

public class ServicoDTO {

    public record ServicoRequest(
            String nome,
            BigDecimal preco,
            Integer duracaoEstimadaMinutos,
            Boolean ativo
    ) {}

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