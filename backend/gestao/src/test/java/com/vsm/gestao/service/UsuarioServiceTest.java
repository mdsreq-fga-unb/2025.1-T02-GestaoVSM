package com.vsm.gestao.service;

import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

class UsuarioServiceTest {
    @Mock
    private UsuarioRepository usuarioRepository;
    @InjectMocks
    private UsuarioService usuarioService;

    private Usuario admin;
    private Usuario barbeiro;
    private Usuario usuarioNovo;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        admin = new Usuario();
        admin.setTipoUsuario(TipoUsuario.ADMIN);
        admin.setAtivo(true);
        barbeiro = new Usuario();
        barbeiro.setTipoUsuario(TipoUsuario.BARBEIRO);
        barbeiro.setAtivo(true);
        usuarioNovo = new Usuario();
        usuarioNovo.setTipoUsuario(TipoUsuario.BARBEIRO);
        usuarioNovo.setAtivo(true);
        usuarioNovo.setNome("Novo Usuário");
    }

    @Test
    void criarUsuario_comAdmin_sucesso() {
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuarioNovo);
        Usuario criado = usuarioService.criarUsuario(admin, usuarioNovo);
        assertThat(criado).isNotNull();
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
    }

    @Test
    void criarUsuario_comBarbeiro_lancaExcecao() {
        assertThrows(SecurityException.class, () -> usuarioService.criarUsuario(barbeiro, usuarioNovo));
        verify(usuarioRepository, never()).save(any(Usuario.class));
    }

    @Test
    void atualizarUsuario_comAdmin_sucesso() {
        when(usuarioRepository.findById(anyLong())).thenReturn(Optional.of(usuarioNovo));
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuarioNovo);
        Usuario atualizado = usuarioService.atualizarUsuario(1L, usuarioNovo, admin);
        assertThat(atualizado).isNotNull();
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
    }

    @Test
    void atualizarUsuario_comBarbeiro_lancaExcecao() {
        assertThrows(SecurityException.class, () -> usuarioService.atualizarUsuario(1L, usuarioNovo, barbeiro));
        verify(usuarioRepository, never()).save(any(Usuario.class));
    }

    @Test
    void deletarUsuario_comAdmin_sucesso() {
        doNothing().when(usuarioRepository).deleteById(1L);
        usuarioService.deletarUsuario(1L, admin);
        verify(usuarioRepository, times(1)).deleteById(1L);
    }

    @Test
    void deletarUsuario_comBarbeiro_lancaExcecao() {
        assertThrows(SecurityException.class, () -> usuarioService.deletarUsuario(1L, barbeiro));
        verify(usuarioRepository, never()).deleteById(anyLong());
    }
} 