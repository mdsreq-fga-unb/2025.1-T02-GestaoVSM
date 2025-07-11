package com.vsm.gestao.controller;

import com.vsm.gestao.dto.ConfirmacaoServicoDTO;
import com.vsm.gestao.entity.ServicoRealizado;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.service.ServicoRealizadoService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/servicos-realizados")
public class ServicoRealizadoController {

    private final ServicoRealizadoService servicoRealizadoService;

    public ServicoRealizadoController(ServicoRealizadoService servicoRealizadoService) {
        this.servicoRealizadoService = servicoRealizadoService;
    }

    @PostMapping("/confirmar")
    public ResponseEntity<ServicoRealizado> confirmarServico(@RequestBody ConfirmacaoServicoDTO dto, @AuthenticationPrincipal Usuario solicitante) {
        ServicoRealizado realizado = servicoRealizadoService.confirmarServicoAgendado(
                dto.agendamentoId(),
                solicitante,
                dto.formaPagamento()
        );
        return ResponseEntity.ok(realizado);
    }

    @GetMapping
    public ResponseEntity<List<ServicoRealizado>> listarServicosPorDia(
            @RequestParam("dia") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dia,
            @RequestParam("barbeiroId") Optional<Long> barbeiroId,
            @AuthenticationPrincipal Usuario solicitante) {
        
        List<ServicoRealizado> servicos = servicoRealizadoService.listarServicosPorDia(dia, solicitante, barbeiroId);
        return ResponseEntity.ok(servicos);
    }
}