package com.vsm.gestao.controller;

import com.vsm.gestao.dto.ServicoDTO;
import com.vsm.gestao.entity.Servico;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.service.ServicoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/servicos")
@RequiredArgsConstructor
public class ServicoController {

    private final ServicoService servicoService;

    @PostMapping
    public ResponseEntity<ServicoDTO.ServicoResponse> criarServico(
            @RequestBody ServicoDTO.ServicoRequest requestDTO,
            @AuthenticationPrincipal Usuario solicitante) {
        Servico servicoSalvo = servicoService.criarServico(requestDTO, solicitante);
        return new ResponseEntity<>(ServicoDTO.ServicoResponse.fromEntity(servicoSalvo), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServicoDTO.ServicoResponse> atualizarServico(
            @PathVariable Long id,
            @RequestBody ServicoDTO.ServicoRequest requestDTO,
            @AuthenticationPrincipal Usuario solicitante) {
        Servico servicoAtualizado = servicoService.atualizarServico(id, requestDTO, solicitante);
        return ResponseEntity.ok(ServicoDTO.ServicoResponse.fromEntity(servicoAtualizado));
    }

    @GetMapping
    public ResponseEntity<List<ServicoDTO.ServicoResponse>> listarServicos() {
        List<ServicoDTO.ServicoResponse> servicos = servicoService.listarServicos()
                .stream()
                .map(ServicoDTO.ServicoResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(servicos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServicoDTO.ServicoResponse> buscarServicoPorId(@PathVariable Long id) {
        return servicoService.buscarPorId(id)
                .map(ServicoDTO.ServicoResponse::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarServico(
            @PathVariable Long id,
            @AuthenticationPrincipal Usuario solicitante) {
        servicoService.deletarServico(id, solicitante);
        return ResponseEntity.noContent().build();
    }
}