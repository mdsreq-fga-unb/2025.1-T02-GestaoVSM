package com.vsm.gestao.service;

import com.vsm.gestao.dto.UsuarioDTO;
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
    // --- MUDANÇA 1: A variável agora é do tipo do nosso DTO de requisição ---
    private UsuarioDTO.UsuarioRequest novoBarbeiroRequest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        admin = new Usuario();
        admin.setId(1L);
        admin.setTipoUsuario(TipoUsuario.ADMIN);

        // --- MUDANÇA 2: Criamos o DTO usando o construtor, pois records não têm setters ---
        novoBarbeiroRequest = new UsuarioDTO.UsuarioRequest(
                "Novo Barbeiro",
                "novo.barbeiro",
                "senha123",
                TipoUsuario.BARBEIRO
        );
    }

    @Test
    void criarUsuario_comAdmin_deveTerSucesso() {
        // Preparação (Arrange)
        when(passwordEncoder.encode(anyString())).thenReturn("senha_criptografada_pelo_mock");
        
        // Mock do repositório para retornar o usuário que foi passado para ele
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // --- MUDANÇA 3: Ação (Act) - Chamamos o serviço passando o DTO de requisição ---
        Usuario usuarioCriado = usuarioService.criarUsuario(admin, novoBarbeiroRequest);

        // Verificação (Assert)
        assertThat(usuarioCriado).isNotNull();
        // Verifica se os dados do DTO foram mapeados corretamente para a entidade
        assertThat(usuarioCriado.getNome()).isEqualTo("Novo Barbeiro");
        assertThat(usuarioCriado.getLogin()).isEqualTo("novo.barbeiro");
        // Verifica se a senha salva é a versão "criptografada" pelo mock
        assertThat(usuarioCriado.getPassword()).isEqualTo("senha_criptografada_pelo_mock");
    }
}