package com.vsm.gestao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private  UsuarioRepository usuarioRepository;
    private  PasswordEncoder passwordEncoder;

    public Usuario criarUsuario(Usuario admin, Usuario criado){
        if(admin.getTipoUsuario() != TipoUsuario.ADMIN){
            throw new SecurityException("Apenas admin pode realizar essa ação.");
        }

        String senhaPura = criado.getPassword();
        String senhaCriptografada = passwordEncoder.encode(senhaPura);
        criado.setPassword(senhaCriptografada);

        criado.setAtivo(true);
        return usuarioRepository.save(criado);
    }

    public Usuario atualizarUsuario(Long id, Usuario novo, Usuario admin){
        if(admin.getTipoUsuario() != TipoUsuario.ADMIN){
            throw new SecurityException("Apenas admin pode realizar essa ação.");
        }
        Usuario user = usuarioRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Usuario não encontrado."));
        user.setNome(novo.getNome());
        user.setTipoUsuario(novo.getTipoUsuario());
        user.setAtivo(novo.isAtivo());
        return usuarioRepository.save(user);
    }

    public void deletarUsuario(Long id, Usuario admin){
        if(admin.getTipoUsuario() != TipoUsuario.ADMIN){
            throw new SecurityException("Apenas admin pode realizar essa ação.");
        }
        usuarioRepository.deleteById(id);
    }

    public List<Usuario> listarUsuarios(Usuario usuario){
        if(usuario.getTipoUsuario() != TipoUsuario.ADMIN){
            throw new SecurityException("Apenas admin pode visualizar todos os usuários.");
        }
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id, Usuario usuario){
        if(usuario.getTipoUsuario() != TipoUsuario.ADMIN){
            throw new SecurityException("Apenas admin pode visualizar usuários.");
        }
        return usuarioRepository.findById(id);
    }
}