package com.vsm.gestao.controller;

import com.vsm.gestao.dto.AgendamentoDTO;
import com.vsm.gestao.entity.Agendamento;
import com.vsm.gestao.entity.Servico;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.service.AgendamentoService;
import com.vsm.gestao.repository.UsuarioRepository;
import com.vsm.gestao.repository.ServicoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    private final AgendamentoService agendamentoService;
    private final UsuarioRepository usuarioRepository; // Usado para buscar entidades a partir de IDs do DTO
    private final ServicoRepository servicoRepository;

    public AgendamentoController(AgendamentoService agendamentoService, UsuarioRepository usuarioRepository, ServicoRepository servicoRepository) {
        this.agendamentoService = agendamentoService;
        this.usuarioRepository = usuarioRepository;
        this.servicoRepository = servicoRepository;
    }

    @PostMapping
    public ResponseEntity<Agendamento> criarAgendamento(@RequestBody AgendamentoDTO dto, @AuthenticationPrincipal Usuario solicitante) {
        // Converte os IDs do DTO para as entidades JPA
        Usuario barbeiro = usuarioRepository.findById(dto.barbeiroId())
                .orElseThrow(() -> new IllegalArgumentException("Barbeiro não encontrado."));
        
        List<Servico> servicos = servicoRepository.findAllById(dto.servicoIds());
        if (servicos.size() != dto.servicoIds().size()) {
            throw new IllegalArgumentException("Um ou mais serviços não foram encontrados.");
        }

        Agendamento novoAgendamento = new Agendamento();
        novoAgendamento.setUsuario(barbeiro);
        novoAgendamento.setNomeCliente(dto.nomeCliente());
        novoAgendamento.setServicos(servicos);
        novoAgendamento.setDataAgendamento(dto.dataAgendamento());

        Agendamento agendamentoCriado = agendamentoService.criarAgendamento(novoAgendamento, solicitante);
        return new ResponseEntity<>(agendamentoCriado, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> apagarAgendamento(@PathVariable Long id, @AuthenticationPrincipal Usuario solicitante) {
        agendamentoService.apagarAgendamento(id, solicitante);
        return ResponseEntity.noContent().build();
    }
}