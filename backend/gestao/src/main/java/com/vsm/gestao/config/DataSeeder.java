package com.vsm.gestao.config;

import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (usuarioRepository.findByLogin("admin").isEmpty()) {
            System.out.println("Criando usuário 'admin' padrão...");
            Usuario admin = new Usuario();
            admin.setNome("Admin Principal");
            admin.setLogin("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setTipoUsuario(TipoUsuario.ADMIN);
            admin.setAtivo(true);
            usuarioRepository.save(admin);
            System.out.println("Usuário 'admin' criado com sucesso!");
        }
    }
}