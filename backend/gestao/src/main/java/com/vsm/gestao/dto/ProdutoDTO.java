package com.vsm.gestao.dto;

import com.vsm.gestao.entity.Produto;
import java.math.BigDecimal;

public class ProdutoDTO {

    public record ProdutoRequest(
            String nome,
            BigDecimal preco,
            BigDecimal comissaoProduto,
            boolean disponivel
    ) {}

    public record ProdutoResponse(
            Long id,
            String nome,
            BigDecimal preco,
            BigDecimal comissaoProduto,
            boolean disponivel
    ) {
        public static ProdutoResponse fromEntity(Produto produto) {
            return new ProdutoResponse(
                    produto.getId(),
                    produto.getNome(),
                    produto.getPreco(),
                    produto.getComissaoProduto(),
                    produto.isDisponivel()
            );
        }
    }
}