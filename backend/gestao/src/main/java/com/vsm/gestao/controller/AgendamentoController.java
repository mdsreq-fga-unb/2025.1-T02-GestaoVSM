package com.vsm.gestao.controller;

import com.vsm.gestao.dto.AgendamentoDTO;
import com.vsm.gestao.dto.AgendamentoResponseDTO; // Importe o novo DTO
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
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/agendamentos")
@RequiredArgsConstructor
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

   @PostMapping
    public ResponseEntity<AgendamentoResponseDTO> criarAgendamento(
            @RequestBody AgendamentoDTO agendamentoDTO,
            @AuthenticationPrincipal Usuario solicitante) {
        // O serviço agora retorna o DTO diretamente
        AgendamentoResponseDTO responseDto = agendamentoService.criarAgendamento(agendamentoDTO, solicitante);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<AgendamentoResponseDTO>> listarAgendamentos(
            @RequestParam("dia") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dia,
            @RequestParam(name = "barbeiroId", required = false) Long barbeiroId,
            @AuthenticationPrincipal Usuario solicitante) {

        // A lógica de conversão foi para o Service. O Controller fica mais limpo.
        List<AgendamentoResponseDTO> response = agendamentoService.listarAgendamentos(dia, Optional.ofNullable(barbeiroId), solicitante);

        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<AgendamentoResponseDTO> buscarPorId(@PathVariable Long id, @AuthenticationPrincipal Usuario solicitante) {
        return agendamentoService.buscarPorId(id, solicitante)
                // Converta a entidade para DTO
                .map(agendamento -> ResponseEntity.ok(AgendamentoResponseDTO.fromEntity(agendamento)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AgendamentoResponseDTO> atualizarAgendamento(
            @PathVariable Long id,
            @RequestBody AgendamentoDTO agendamentoDTO,
            @AuthenticationPrincipal Usuario solicitante) {

        Agendamento agendamentoAtualizado = agendamentoService.atualizarAgendamento(id, agendamentoDTO, solicitante);
        // Converta a entidade para DTO
        return ResponseEntity.ok(AgendamentoResponseDTO.fromEntity(agendamentoAtualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> apagarAgendamento(@PathVariable Long id, @AuthenticationPrincipal Usuario solicitante) {
        agendamentoService.apagarAgendamento(id, solicitante);
        return ResponseEntity.noContent().build();
    }

}