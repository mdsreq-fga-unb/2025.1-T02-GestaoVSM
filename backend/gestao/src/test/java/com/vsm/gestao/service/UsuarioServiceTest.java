package com.vsm.gestao.service;

import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

class UsuarioServiceTest {


    @Mock
    private UsuarioRepository usuarioRepository;


    @Mock
    private PasswordEncoder passwordEncoder;


    @InjectMocks
    private UsuarioService usuarioService;

    private Usuario admin;
    private Usuario novoBarbeiro;

    @BeforeEach
    void setUp() {
  
        MockitoAnnotations.openMocks(this);

        admin = new Usuario();
        admin.setId(1L);
        admin.setTipoUsuario(TipoUsuario.ADMIN);

        novoBarbeiro = new Usuario();
        novoBarbeiro.setId(2L);
        novoBarbeiro.setNome("Novo Barbeiro");
        novoBarbeiro.setLogin("novo.barbeiro");
        novoBarbeiro.setPassword("senha123");
        novoBarbeiro.setTipoUsuario(TipoUsuario.BARBEIRO);
    }

    @Test
    void criarUsuario_comAdmin_deveTerSucesso() {
        // Preparação: Damos um "roteiro" para o nosso dublê do PasswordEncoder
        when(passwordEncoder.encode(anyString())).thenReturn("senha_criptografada_pelo_mock");

        // Preparação: Damos um "roteiro" para o nosso dublê do Repository
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Ação: Chamamos o método que queremos testar
        Usuario usuarioCriado = usuarioService.criarUsuario(admin, novoBarbeiro);

        // Verificação: Checamos se o resultado foi o esperado
        assertThat(usuarioCriado).isNotNull();
        assertThat(usuarioCriado.getPassword()).isEqualTo("senha_criptografada_pelo_mock");
    }
}