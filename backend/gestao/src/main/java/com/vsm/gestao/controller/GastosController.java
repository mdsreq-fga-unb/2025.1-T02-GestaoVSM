package com.vsm.gestao.controller;

import com.vsm.gestao.dto.GastoDTO;
import com.vsm.gestao.entity.Gastos;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.service.GastosService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/gastos")
@RequiredArgsConstructor
public class GastosController {

    private final GastosService gastosService;

    @PostMapping
    public ResponseEntity<GastoDTO.GastoResponse> criarGasto(
            @RequestBody GastoDTO.GastoRequest requestDTO,
            @AuthenticationPrincipal Usuario solicitante) {
        Gastos gastoSalvo = gastosService.criarGasto(requestDTO, solicitante);
        return new ResponseEntity<>(GastoDTO.GastoResponse.fromEntity(gastoSalvo), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<GastoDTO.GastoResponse>> listarGastos(@AuthenticationPrincipal Usuario solicitante) {
        List<GastoDTO.GastoResponse> gastos = gastosService.listarTodos(solicitante)
                .stream()
                .map(GastoDTO.GastoResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(gastos);
    }
}