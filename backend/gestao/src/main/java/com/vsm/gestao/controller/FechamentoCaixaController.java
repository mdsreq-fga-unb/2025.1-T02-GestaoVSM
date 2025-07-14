package com.vsm.gestao.controller;

import com.vsm.gestao.entity.FechamentoCaixa;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.service.FechamentoCaixaService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/fechamentos-caixa")
@RequiredArgsConstructor
public class FechamentoCaixaController {

    private final FechamentoCaixaService fechamentoCaixaService;

    @PostMapping("/gerar-semanal")
    public ResponseEntity<FechamentoCaixa> gerarFechamentoSemanal(@AuthenticationPrincipal Usuario responsavel) {
        FechamentoCaixa fechamento = fechamentoCaixaService.gerarFechamentoSemanal(responsavel);
        return ResponseEntity.ok(fechamento);
    }

    @GetMapping("/pagamentos")
    public ResponseEntity<Map<Long, BigDecimal>> calcularPagamentos(
            @RequestParam("inicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,
            @RequestParam("fim") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fim) {
        
        Map<Long, BigDecimal> pagamentos = fechamentoCaixaService.calcularPagamentoBarbeiros(inicio, fim);
        return ResponseEntity.ok(pagamentos);
    }
}