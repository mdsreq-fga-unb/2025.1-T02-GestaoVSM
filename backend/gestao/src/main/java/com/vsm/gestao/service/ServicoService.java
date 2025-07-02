package com.vsm.gestao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vsm.gestao.entity.Servico;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.repository.ServicoRepository;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ServicoService {

    @Autowired
    private ServicoRepository servicoRepository;

    @Transactional
    public Servico criarServico(Servico servico, Usuario usuario){
        if (usuario.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas admin pode criar serviços.");
        }
        servico.setAtivo(true);
        return servicoRepository.save(servico);
    }

    @Transactional
    public Servico atualizarServico(Long id, Servico servicoAtualizado, Usuario usuario){
        if (usuario.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas admin pode atualizar serviços.");
        }
        Servico servico = servicoRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Serviço não encontrado"));
        servico.setNome(servicoAtualizado.getNome());
        servico.setPreco(servicoAtualizado.getPreco());
        servico.setDuracaoEstimadaMinutos(servicoAtualizado.getDuracaoEstimadaMinutos());
        servico.setAtivo(servicoAtualizado.getAtivo());
        return servicoRepository.save(servico);
    }

    @Transactional
    public void deletarServico(Long id, Usuario usuario){
        if (usuario.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas admin pode deletar serviços.");
        }
        servicoRepository.deleteById(id);
    }

    public List<Servico> listarServicos(Usuario usuario){
        // Ambos podem listar
        return servicoRepository.findAll();
    }

    public Optional<Servico> buscarPorId(Long id, Usuario usuario){
        // Ambos podem visualizar
        return servicoRepository.findById(id);
    }

    // Aqui você pode adicionar métodos para o barbeiro confirmar que realizou um serviço, se necessário.
}