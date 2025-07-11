package com.vsm.gestao.dto;

// DTO para REGISTRAR a venda de um produto
public record VendaProdutoDTO(
    Long produtoId,
    Long barbeiroId,
    String formaPagamento
) {}