package com.vsm.gestao.controller;

import com.vsm.gestao.dto.FechamentoDTO;
import com.vsm.gestao.dto.RelatorioRequestDTO;
import com.vsm.gestao.service.FechamentoCaixaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fechamentos-caixa")
@RequiredArgsConstructor
public class FechamentoCaixaController {

    private final FechamentoCaixaService fechamentoCaixaService;

    /**
     * Endpoint unificado para gerar relatórios financeiros.
     * Recebe um corpo JSON especificando o tipo de relatório (SEMANAL ou MENSAL)
     * e, opcionalmente, o mês desejado para relatórios mensais.
     */
    @PostMapping("/gerar-relatorio")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<FechamentoDTO.RelatorioFinanceiro> gerarRelatorio(
            @RequestBody RelatorioRequestDTO.Request request) {
        
        FechamentoDTO.RelatorioFinanceiro relatorio = fechamentoCaixaService.gerarRelatorioFinanceiro(request);
        return ResponseEntity.ok(relatorio);
    }
}
