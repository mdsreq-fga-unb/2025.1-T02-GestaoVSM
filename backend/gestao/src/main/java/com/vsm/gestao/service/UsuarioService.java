package com.vsm.gestao.service;

import com.vsm.gestao.dto.UsuarioDTO; // Importe o DTO
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

    // Método foi alterado para receber o DTO
    public Usuario criarUsuario(Usuario admin, UsuarioDTO.UsuarioRequest dto) {
        if (admin.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas admin pode realizar essa ação.");
        }

        // 1. Cria uma nova entidade Usuario vazia
        Usuario novoUsuario = new Usuario();

        // 2. Mapeia os dados do DTO para a entidade
        novoUsuario.setNome(dto.nome());
        novoUsuario.setLogin(dto.login());
        novoUsuario.setTipoUsuario(dto.tipoUsuario());
        novoUsuario.setAtivo(true); // Define 'ativo' como true por padrão

        // 3. Aplica a lógica de negócio (criptografia da senha)
        String senhaPura = dto.password();
        String senhaCriptografada = passwordEncoder.encode(senhaPura);
        novoUsuario.setPassword(senhaCriptografada);

        // 4. Salva a entidade completa no banco de dados
        return usuarioRepository.save(novoUsuario);
    }

    // Também atualizei o método de atualização para usar o DTO, como boa prática
    public Usuario atualizarUsuario(Long id, UsuarioDTO.UsuarioRequest dto, Usuario admin) {
        if (admin.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas admin pode realizar essa ação.");
        }
        Usuario user = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario não encontrado."));
        
        user.setNome(dto.nome());
        user.setTipoUsuario(dto.tipoUsuario());
        user.setAtivo(true);

        // Se uma nova senha for fornecida no DTO, atualize-a
        if (dto.password() != null && !dto.password().isEmpty()) {
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