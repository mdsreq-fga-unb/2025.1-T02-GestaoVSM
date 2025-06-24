package com.vsm.gestao.controller;

import com.vsm.gestao.entity.Agendamento;
import com.vsm.gestao.entity.Servico;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.service.GestaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class GestaoController {

    @Autowired
    private GestaoService gestaoService;

    @PostMapping("/usuarios")
    public ResponseEntity<Usuario> criarUsuario(@RequestBody Usuario usuario) {
        Usuario novoUsuario = gestaoService.criarUsuario(usuario);
        return new ResponseEntity<>(novoUsuario, HttpStatus.CREATED);
    }

    @PostMapping("/servicos")
    public ResponseEntity<Servico> criarServico(@RequestBody Servico servico) {
        Servico novoServico = gestaoService.criarServico(servico);
        return new ResponseEntity<>(novoServico, HttpStatus.CREATED);
    }

    @PostMapping("/agendamentos")
    public ResponseEntity<Agendamento> criarAgendamento(@RequestBody Map<String, Object> payload) {
        // Extrai os dados do corpo da requisição
        Long usuarioId = Long.parseLong(payload.get("usuarioId").toString());
        Long servicoId = Long.parseLong(payload.get("servicoId").toString());
        String nomeCliente = payload.get("nomeCliente").toString();
        LocalDateTime dataAgendamento = LocalDateTime.parse(payload.get("dataAgendamento").toString());

        // Chama o serviço com os dados extraídos
        Agendamento novoAgendamento = gestaoService.criarAgendamento(usuarioId, servicoId, nomeCliente, dataAgendamento);
        return new ResponseEntity<>(novoAgendamento, HttpStatus.CREATED);
    }
}