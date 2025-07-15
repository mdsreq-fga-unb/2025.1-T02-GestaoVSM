package com.vsm.gestao.dto;

import com.vsm.gestao.entity.VendasProdutos;
import java.math.BigDecimal;
import java.time.LocalDate;

public class VendaProdutoDTO {

    public record VendaProdutoRequest(
            Long produtoId,
            Long barbeiroId,
            String formaPagamento
    ) {}

    public record VendaProdutoResponse(
            Long id,
            LocalDate dataVenda,
            BigDecimal preco,
            String formaPagamento,
            String nomeProduto,
            String nomeBarbeiro
    ) {
        public static VendaProdutoResponse fromEntity(VendasProdutos venda) {
            String nomeProduto = venda.getProduto() != null ? venda.getProduto().getNome() : "Produto não informado";
            String nomeBarbeiro = venda.getUsuario() != null ? venda.getUsuario().getNome() : "Barbeiro não informado";

            return new VendaProdutoResponse(
                    venda.getId(),
                    venda.getDataVenda(), 
                    venda.getPreco(),
                    venda.getPagamento(),
                    nomeProduto,
                    nomeBarbeiro
            );
        }
    }
}