package com.vsm.gestao.service;

import com.vsm.gestao.dto.GastoDTO;
import com.vsm.gestao.entity.Gastos;
import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.repository.GastosRepository;
import com.vsm.gestao.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GastosService {

    private final GastosRepository gastosRepository;
    private final UsuarioRepository usuarioRepository; 
    @Transactional
    public Gastos criarGasto(GastoDTO.GastoRequest dto, Usuario solicitante) {
        Usuario usuarioDoGasto = usuarioRepository.findById(dto.usuarioId())
                .orElseThrow(() -> new IllegalArgumentException("Usuário com ID " + dto.usuarioId() + " não encontrado."));

        // Regra de permissão
        if (solicitante.getTipoUsuario() == TipoUsuario.BARBEIRO && !solicitante.getId().equals(dto.usuarioId())) {
            throw new SecurityException("Barbeiros só podem registrar gastos para si mesmos.");
        }

        Gastos gasto = new Gastos();
        gasto.setTipo(dto.tipo());
        gasto.setPreco(dto.preco());
        gasto.setUsuario(usuarioDoGasto); // Atribui o gasto ao usuário correto
        
        return gastosRepository.save(gasto);
    }

    public List<Gastos> listarGastos(Usuario solicitante) {
        if (solicitante.getTipoUsuario() == TipoUsuario.ADMIN) {
            return gastosRepository.findAll();
        }
        return gastosRepository.findAllByUsuarioId(solicitante.getId());
    }
}