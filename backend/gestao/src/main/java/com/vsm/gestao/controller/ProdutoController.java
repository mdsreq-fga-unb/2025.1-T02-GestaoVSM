package com.vsm.gestao.controller;

import com.vsm.gestao.dto.ProdutoDTO;
import com.vsm.gestao.entity.Produto;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.service.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/produtos")
@RequiredArgsConstructor
public class ProdutoController {

    private final ProdutoService produtoService;

    @PostMapping
    public ResponseEntity<ProdutoDTO.ProdutoResponse> criarProduto(
            @RequestBody ProdutoDTO.ProdutoRequest requestDTO,
            @AuthenticationPrincipal Usuario solicitante) {
        Produto produtoSalvo = produtoService.criarProduto(requestDTO, solicitante);
        return new ResponseEntity<>(ProdutoDTO.ProdutoResponse.fromEntity(produtoSalvo), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProdutoDTO.ProdutoResponse> atualizarProduto(
            @PathVariable Long id,
            @RequestBody ProdutoDTO.ProdutoRequest requestDTO,
            @AuthenticationPrincipal Usuario solicitante) {
        Produto produtoAtualizado = produtoService.atualizarProduto(id, requestDTO, solicitante);
        return ResponseEntity.ok(ProdutoDTO.ProdutoResponse.fromEntity(produtoAtualizado));
    }

    @GetMapping
    public ResponseEntity<List<ProdutoDTO.ProdutoResponse>> listarProdutos() {
        List<ProdutoDTO.ProdutoResponse> produtos = produtoService.listarTodos()
                .stream()
                .map(ProdutoDTO.ProdutoResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoDTO.ProdutoResponse> buscarProdutoPorId(@PathVariable Long id) {
        return produtoService.buscarPorId(id)
                .map(ProdutoDTO.ProdutoResponse::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarProduto(
            @PathVariable Long id,
            @AuthenticationPrincipal Usuario solicitante) {
        produtoService.deletarProduto(id, solicitante);
        return ResponseEntity.noContent().build();
    }
}