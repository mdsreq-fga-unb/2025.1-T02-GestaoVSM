package com.vsm.gestao.service;

import com.vsm.gestao.entity.Gastos;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.repository.GastosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class GastosService {

    @Autowired
    private GastosRepository gastosRepository;

    @Transactional
    public Gastos criarGasto(Gastos gasto, Usuario barbeiro, Usuario solicitante) {
        if (solicitante.getTipoUsuario() != TipoUsuario.ADMIN && solicitante.getId().equals(barbeiro.getId())) {
            throw new SecurityException("Barbeiro só podem criar gastos para si mesmo");
        }
        gasto.setUsuario(barbeiro);
        return gastosRepository.save(gasto);
    }

    @Transactional
    public Gastos atualizarGasto(Long id, Gastos novo, Usuario barbeiro, Usuario solicitante) {
        if (solicitante.getTipoUsuario() != TipoUsuario.ADMIN && solicitante.getId().equals(barbeiro.getId())) {
            throw new SecurityException("Barbeiro só podem atualizar os próprios gastos");
        }
        Gastos gasto = gastosRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Gasto não encontrado."));
        gasto.setTipo(novo.getTipo());
        gasto.setPreco(novo.getPreco());
        return gastosRepository.save(gasto);
    }

    @Transactional
    public void deletarGasto(Long id, Usuario barbeiro) {
        if (barbeiro.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas admin pode deletar gastos.");
        }
        gastosRepository.deleteById(id);
    }
    @Transactional
    public List<Gastos> listarGastos(Usuario barbeiro) {
        if (barbeiro.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas admin pode visualizar todos os gastos.");
        }
        return gastosRepository.findAll();
    }
    @Transactional
    public Optional<Gastos> buscarPorId(Long id, Usuario barbeiro) {
        if (barbeiro.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas admin pode visualizar gastos.");
        }
        return gastosRepository.findById(id);
    }
}