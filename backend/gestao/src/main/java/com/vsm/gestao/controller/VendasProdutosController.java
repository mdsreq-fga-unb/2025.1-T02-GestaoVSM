package com.vsm.gestao.controller;

import com.vsm.gestao.dto.VendaProdutoDTO;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.entity.VendasProdutos;
import com.vsm.gestao.service.VendasProdutosService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vendas-produtos")
public class VendasProdutosController {

    private final VendasProdutosService vendasProdutosService;

    public VendasProdutosController(VendasProdutosService vendasProdutosService) {
        this.vendasProdutosService = vendasProdutosService;
    }

    @PostMapping
    public ResponseEntity<VendasProdutos> registrarVenda(@RequestBody VendaProdutoDTO dto, @AuthenticationPrincipal Usuario solicitante) {
        VendasProdutos vendaRegistrada = vendasProdutosService.registrarVenda(
                dto.produtoId(),
                dto.barbeiroId(),
                dto.formaPagamento(),
                solicitante
        );
        return new ResponseEntity<>(vendaRegistrada, HttpStatus.CREATED);
    }
}