package com.vsm.gestao.controller;

import com.vsm.gestao.dto.ConfirmacaoServicoDTO;
import com.vsm.gestao.dto.ServicoRealizadoDTO;
import com.vsm.gestao.entity.ServicoRealizado;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.service.ServicoRealizadoService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/servicos-realizados")
@RequiredArgsConstructor
public class ServicoRealizadoController {

    private final ServicoRealizadoService servicoRealizadoService;

    @PostMapping("/confirmar")
    public ResponseEntity<ServicoRealizadoDTO.ServicoRealizadoResponse> confirmarServico(
            @RequestBody ConfirmacaoServicoDTO dto,
            @AuthenticationPrincipal Usuario solicitante) {
        
        ServicoRealizado realizado = servicoRealizadoService.confirmarServicoAgendado(dto, solicitante);
        return ResponseEntity.ok(ServicoRealizadoDTO.ServicoRealizadoResponse.fromEntity(realizado));
    }

    @GetMapping
    public ResponseEntity<List<ServicoRealizadoDTO.ServicoRealizadoResponse>> listarServicosPorDia(
            @RequestParam("dia") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dia,
            @RequestParam(name = "barbeiroId", required = false) Long barbeiroId,
            @AuthenticationPrincipal Usuario solicitante) {
        
        List<ServicoRealizado> servicos = servicoRealizadoService.listarServicosPorDia(dia, solicitante, Optional.ofNullable(barbeiroId));
        
        List<ServicoRealizadoDTO.ServicoRealizadoResponse> response = servicos.stream()
                .map(ServicoRealizadoDTO.ServicoRealizadoResponse::fromEntity)
                .collect(Collectors.toList());
                
        return ResponseEntity.ok(response);
    }
}