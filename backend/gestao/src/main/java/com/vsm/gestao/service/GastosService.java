package com.vsm.gestao.service;

import com.vsm.gestao.dto.GastoDTO;
import com.vsm.gestao.entity.Gastos;
import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.repository.GastosRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GastosService {

    private final GastosRepository gastosRepository;

    @Transactional
    public Gastos criarGasto(GastoDTO.GastoRequest dto, Usuario solicitante) {
        // A regra aqui é que apenas um Admin pode registrar gastos.
        if (solicitante.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas administradores podem registrar gastos.");
        }
        Gastos gasto = new Gastos();
        gasto.setTipo(dto.tipo());
        gasto.setPreco(dto.preco());
        gasto.setUsuario(solicitante); // O usuário que registrou o gasto é o solicitante.
        // A data é gerada automaticamente pela entidade.
        return gastosRepository.save(gasto);
    }

    public List<Gastos> listarTodos(Usuario solicitante) {
        if (solicitante.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas administradores podem listar os gastos.");
        }
        return gastosRepository.findAll();
    }
    
    // Adicione métodos de update e delete se necessário.
}