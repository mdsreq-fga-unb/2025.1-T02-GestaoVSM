package com.vsm.gestao.service;

import com.vsm.gestao.dto.UsuarioDTO;
import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

      public Usuario criarUsuario(Usuario admin, UsuarioDTO.UsuarioRequest dto) {
        if (admin.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas admin pode realizar essa ação.");
        }

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(dto.nome());
        novoUsuario.setLogin(dto.login());
        novoUsuario.setTipoUsuario(dto.tipoUsuario());
        novoUsuario.setPassword(passwordEncoder.encode(dto.password()));
        novoUsuario.setAtivo(true); 

        return usuarioRepository.save(novoUsuario);
    }

    public Usuario atualizarUsuario(Long id, UsuarioDTO.UsuarioRequest dto, Usuario admin) {
        if (admin.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas admin pode realizar essa ação.");
        }
        Usuario user = usuarioRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Usuario não encontrado."));
        user.setNome(dto.nome());
        user.setTipoUsuario(dto.tipoUsuario());
        user.setAtivo(true);
        if (dto.password() != null && !dto.password().isBlank()) {
            user.setPassword(passwordEncoder.encode(dto.password()));
        }
        return usuarioRepository.save(user);
    }

    public void deletarUsuario(Long id, Usuario admin) {
        if (admin.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas admin pode realizar essa ação.");
        }
        usuarioRepository.deleteById(id);
    }

    public List<Usuario> listarUsuarios(Usuario admin) {
        if (admin.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas admin pode visualizar todos os usuários.");
        }
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id, Usuario admin) {
        if (admin.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas admin pode visualizar usuários.");
        }
        return usuarioRepository.findById(id);
    }
}