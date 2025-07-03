package com.vsm.gestao.service;

import com.vsm.gestao.entity.Servico;
import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.repository.ServicoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ServicoServiceTest {
    @Mock
    private ServicoRepository servicoRepository;
    @InjectMocks
    private ServicoService servicoService;

    private Usuario admin;
    private Usuario barbeiro;
    private Servico servico;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        admin = new Usuario();
        admin.setTipoUsuario(TipoUsuario.ADMIN);
        barbeiro = new Usuario();
        barbeiro.setTipoUsuario(TipoUsuario.BARBEIRO);
        servico = new Servico();
        servico.setNome("Corte");
        servico.setPreco(new BigDecimal("50.00"));
        servico.setDuracaoEstimadaMinutos(30);
        servico.setAtivo(true);
    }

    @Test
    void criarServico_comAdmin_sucesso() {
        when(servicoRepository.save(any(Servico.class))).thenReturn(servico);
        Servico criado = servicoService.criarServico(servico, admin);
        assertThat(criado).isNotNull();
        verify(servicoRepository, times(1)).save(any(Servico.class));
    }

    @Test
    void criarServico_comBarbeiro_lancaExcecao() {
        assertThrows(SecurityException.class, () -> servicoService.criarServico(servico, barbeiro));
        verify(servicoRepository, never()).save(any(Servico.class));
    }

    @Test
    void atualizarServico_comAdmin_sucesso() {
        when(servicoRepository.findById(1L)).thenReturn(Optional.of(servico));
        when(servicoRepository.save(any(Servico.class))).thenReturn(servico);
        Servico atualizado = servicoService.atualizarServico(1L, servico, admin);
        assertThat(atualizado).isNotNull();
        verify(servicoRepository, times(1)).save(any(Servico.class));
    }

    @Test
    void atualizarServico_comBarbeiro_lancaExcecao() {
        assertThrows(SecurityException.class, () -> servicoService.atualizarServico(1L, servico, barbeiro));
        verify(servicoRepository, never()).save(any(Servico.class));
    }

    @Test
    void deletarServico_comAdmin_sucesso() {
        doNothing().when(servicoRepository).deleteById(1L);
        servicoService.deletarServico(1L, admin);
        verify(servicoRepository, times(1)).deleteById(1L);
    }

    @Test
    void deletarServico_comBarbeiro_lancaExcecao() {
        assertThrows(SecurityException.class, () -> servicoService.deletarServico(1L, barbeiro));
        verify(servicoRepository, never()).deleteById(anyLong());
    }
} 