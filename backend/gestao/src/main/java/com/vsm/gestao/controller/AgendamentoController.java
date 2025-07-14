package com.vsm.gestao.controller;

import com.vsm.gestao.dto.AgendamentoDTO;
import com.vsm.gestao.entity.Agendamento;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.service.AgendamentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/agendamentos")
@RequiredArgsConstructor
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    @PostMapping
    public ResponseEntity<Agendamento> criarAgendamento(
            @RequestBody AgendamentoDTO agendamentoDTO,
            @AuthenticationPrincipal Usuario solicitante) {
        
        Agendamento agendamentoCriado = agendamentoService.criarAgendamento(agendamentoDTO, solicitante);
        return new ResponseEntity<>(agendamentoCriado, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Agendamento>> listarAgendamentos(
            @RequestParam("dia") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dia,
            @RequestParam(name = "barbeiroId", required = false) Long barbeiroId,
            @AuthenticationPrincipal Usuario solicitante) {

        List<Agendamento> agendamentos = agendamentoService.listarAgendamentos(dia, Optional.ofNullable(barbeiroId), solicitante);
        return ResponseEntity.ok(agendamentos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agendamento> buscarPorId(@PathVariable Long id, @AuthenticationPrincipal Usuario solicitante) {
        return agendamentoService.buscarPorId(id, solicitante)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Agendamento> atualizarAgendamento(
            @PathVariable Long id,
            @RequestBody AgendamentoDTO agendamentoDTO,
            @AuthenticationPrincipal Usuario solicitante) {

        Agendamento agendamentoAtualizado = agendamentoService.atualizarAgendamento(id, agendamentoDTO, solicitante);
        return ResponseEntity.ok(agendamentoAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> apagarAgendamento(@PathVariable Long id, @AuthenticationPrincipal Usuario solicitante) {
        agendamentoService.apagarAgendamento(id, solicitante);
        return ResponseEntity.noContent().build();
    }
}