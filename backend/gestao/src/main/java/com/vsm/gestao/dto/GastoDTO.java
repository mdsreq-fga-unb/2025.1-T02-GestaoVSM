package com.vsm.gestao.dto;

import com.vsm.gestao.entity.Gastos;
import java.math.BigDecimal;
import java.time.LocalDate;

public class GastoDTO {

    public record GastoRequest(
            String tipo,
            BigDecimal preco
    ) {}

    public record GastoResponse(
            Long id,
            String tipo,
            BigDecimal preco,
            LocalDate dataGasto,
            Long usuarioId
    ) {
        public static GastoResponse fromEntity(Gastos gasto) {
            return new GastoResponse(
                    gasto.getId(),
                    gasto.getTipo(),
                    gasto.getPreco(),
                    gasto.getDataGasto(),
                    gasto.getUsuario() != null ? gasto.getUsuario().getId() : null
            );
        }
    }
}