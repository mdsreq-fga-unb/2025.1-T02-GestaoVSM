package com.vsm.gestao.dto;

import java.util.Optional;

public class RelatorioRequestDTO {

    // Enum para definir os tipos de relatório de forma segura.
    public enum TipoRelatorio {
        SEMANAL,
        MENSAL
    }

    /**
     * DTO para a requisição. O cliente envia o tipo de relatório.
     * O campo 'mes' é opcional, usado apenas para o relatório mensal.
     * O formato esperado para o mês é "AAAA-MM", por exemplo: "2025-07".
     */
    public record Request(
            TipoRelatorio tipo,
            Optional<String> mes
    ) {}
}
