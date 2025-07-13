package com.vsm.gestao.service;

import com.vsm.gestao.dto.ServicoDTO;
import com.vsm.gestao.entity.Servico;
import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.repository.ServicoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ServicoService {

    private final ServicoRepository servicoRepository;

    @Transactional
    public Servico criarServico(ServicoDTO.ServicoRequest dto, Usuario solicitante) {
        if (solicitante.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas administradores podem criar serviços.");
        }
        Servico servico = new Servico();
        servico.setNome(dto.nome());
        servico.setPreco(dto.preco());
        servico.setDuracaoEstimadaMinutos(dto.duracaoEstimadaMinutos());
        servico.setAtivo(dto.ativo());
        return servicoRepository.save(servico);
    }

    @Transactional
    public Servico atualizarServico(Long id, ServicoDTO.ServicoRequest dto, Usuario solicitante) {
        if (solicitante.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas administradores podem atualizar serviços.");
        }
        Servico servico = servicoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Serviço com ID " + id + " não encontrado."));

        servico.setNome(dto.nome());
        servico.setPreco(dto.preco());
        servico.setDuracaoEstimadaMinutos(dto.duracaoEstimadaMinutos());
        servico.setAtivo(dto.ativo());
        return servicoRepository.save(servico);
    }

    public List<Servico> listarServicos() {
        return servicoRepository.findAll();
    }

    public Optional<Servico> buscarPorId(Long id) {
        return servicoRepository.findById(id);
    }

    @Transactional
    public void deletarServico(Long id, Usuario solicitante) {
        if (solicitante.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas administradores podem deletar serviços.");
        }
        servicoRepository.deleteById(id);
    }
}