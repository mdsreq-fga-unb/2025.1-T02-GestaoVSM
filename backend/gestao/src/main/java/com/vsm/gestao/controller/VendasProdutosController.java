package com.vsm.gestao.controller;

import com.vsm.gestao.dto.VendaProdutoDTO;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.entity.VendasProdutos;
import com.vsm.gestao.service.VendasProdutosService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/vendas-produtos")
@RequiredArgsConstructor
public class VendasProdutosController {

    private final VendasProdutosService vendasProdutosService;

    @PostMapping
    public ResponseEntity<VendaProdutoDTO.VendaProdutoResponse> registrarVenda(
            @RequestBody VendaProdutoDTO.VendaProdutoRequest dto,
            @AuthenticationPrincipal Usuario solicitante) {

        VendasProdutos vendaSalva = vendasProdutosService.registrarVenda(dto, solicitante);
        return new ResponseEntity<>(VendaProdutoDTO.VendaProdutoResponse.fromEntity(vendaSalva), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelarVenda(
            @PathVariable("id") Long vendaId,
            @AuthenticationPrincipal Usuario solicitante) {
        vendasProdutosService.cancelarVenda(vendaId, solicitante);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<VendaProdutoDTO.VendaProdutoResponse>> listarVendas(@AuthenticationPrincipal Usuario solicitante) {
        List<VendasProdutos> vendas = vendasProdutosService.listarVendas(solicitante); 
        List<VendaProdutoDTO.VendaProdutoResponse> response = vendas.stream()
                .map(VendaProdutoDTO.VendaProdutoResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }
}