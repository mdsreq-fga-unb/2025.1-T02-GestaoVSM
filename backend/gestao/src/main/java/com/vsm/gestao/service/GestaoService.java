package com.vsm.gestao.service;

import com.vsm.gestao.entity.Agendamento;
import com.vsm.gestao.entity.Servico;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.repository.AgendamentoRepository;
import com.vsm.gestao.repository.ServicoRepository;
import com.vsm.gestao.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class GestaoService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Transactional
    public Usuario criarUsuario(Usuario usuario) {
        usuario.setAtivo(true); // Exemplo de regra de negócio
        return usuarioRepository.save(usuario);
    }

    @Transactional
    public Servico criarServico(Servico servico) {
        servico.setAtivo(true); // Exemplo de regra de negócio
        return servicoRepository.save(servico);
    }

    @Transactional
    public Agendamento criarAgendamento(Long usuarioId, Long servicoId, String nomeCliente, LocalDateTime dataAgendamento) {
        // Busca as entidades relacionadas para garantir que elas existem
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário (barbeiro) não encontrado com o id: " + usuarioId));

        Servico servico = servicoRepository.findById(servicoId)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado com o id: " + servicoId));

        // Cria a nova entidade Agendamento
        Agendamento novoAgendamento = new Agendamento();
        novoAgendamento.setUsuario(usuario);
        novoAgendamento.setServico(servico);
        novoAgendamento.setNomeCliente(nomeCliente);
        novoAgendamento.setDataAgendamento(dataAgendamento);
        novoAgendamento.setDuracaoMinutos(servico.getDuracaoEstimadaMinutos());

        return agendamentoRepository.save(novoAgendamento);
    }
}