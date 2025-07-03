package com.vsm.gestao.service;

import com.vsm.gestao.entity.Servico;
import com.vsm.gestao.entity.ServicoRealizado;
import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.repository.ServicoRealizadoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

class ServicoRealizadoServiceTest {
    @Mock
    private ServicoRealizadoRepository servicoRealizadoRepository;
    @InjectMocks
    private ServicoRealizadoService servicoRealizadoService;

    private Usuario admin;
    private Usuario barbeiro;
    private Servico servico;
    private LocalDateTime dataHora;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        admin = new Usuario();
        admin.setId(1L);
        admin.setTipoUsuario(TipoUsuario.ADMIN);
        barbeiro = new Usuario();
        barbeiro.setId(2L);
        barbeiro.setTipoUsuario(TipoUsuario.BARBEIRO);
        servico = new Servico();
        servico.setId(1L);
        servico.setNome("Corte");
        servico.setPreco(new BigDecimal("50.00"));
        servico.setDuracaoEstimadaMinutos(30);
        servico.setAtivo(true);
        dataHora = LocalDateTime.now();
    }

    @Test
    void registrarServicoRealizado_comAdminParaOutroBarbeiro_sucesso() {
        when(servicoRealizadoRepository.findAllByUsuarioIdAndDataExecucao(anyLong(), any())).thenReturn(Collections.emptyList());
        when(servicoRealizadoRepository.save(any(ServicoRealizado.class))).thenAnswer(invocation -> invocation.getArgument(0));
        ServicoRealizado realizado = servicoRealizadoService.registrarServicoRealizado(admin, barbeiro, servico, dataHora, new BigDecimal("50.00"), "DINHEIRO");
        assertThat(realizado).isNotNull();
        assertThat(realizado.getUsuario()).isEqualTo(barbeiro);
    }

    @Test
    void registrarServicoRealizado_barbeiroParaOutroBarbeiro_lancaExcecao() {
        Usuario outroBarbeiro = new Usuario();
        outroBarbeiro.setId(3L);
        outroBarbeiro.setTipoUsuario(TipoUsuario.BARBEIRO);
        assertThrows(SecurityException.class, () ->
            servicoRealizadoService.registrarServicoRealizado(barbeiro, outroBarbeiro, servico, dataHora, new BigDecimal("50.00"), "DINHEIRO")
        );
    }

    @Test
    void registrarServicoRealizado_barbeiroIndisponivel_lancaExcecao() {
        when(servicoRealizadoRepository.findAllByUsuarioIdAndDataExecucao(anyLong(), any())).thenReturn(Collections.singletonList(new ServicoRealizado()));
        assertThrows(IllegalArgumentException.class, () ->
            servicoRealizadoService.registrarServicoRealizado(admin, barbeiro, servico, dataHora, new BigDecimal("50.00"), "DINHEIRO")
        );
    }

    @Test
    void confirmarServicoRealizado_comAdmin_sucesso() {
        ServicoRealizado realizado = new ServicoRealizado();
        realizado.setId(1L);
        realizado.setUsuario(barbeiro);
        when(servicoRealizadoRepository.findById(1L)).thenReturn(Optional.of(realizado));
        when(servicoRealizadoRepository.save(any(ServicoRealizado.class))).thenReturn(realizado);
        ServicoRealizado confirmado = servicoRealizadoService.confirmarServicoRealizado(1L, admin, "PIX");
        assertThat(confirmado.isConfirmado()).isTrue();
        assertThat(confirmado.getFormaPagamento()).isEqualTo("PIX");
    }

    @Test
    void confirmarServicoRealizado_barbeiroOutroServico_lancaExcecao() {
        ServicoRealizado realizado = new ServicoRealizado();
        realizado.setId(1L);
        Usuario outroBarbeiro = new Usuario();
        outroBarbeiro.setId(3L);
        outroBarbeiro.setTipoUsuario(TipoUsuario.BARBEIRO);
        realizado.setUsuario(outroBarbeiro);
        when(servicoRealizadoRepository.findById(1L)).thenReturn(Optional.of(realizado));
        assertThrows(SecurityException.class, () ->
            servicoRealizadoService.confirmarServicoRealizado(1L, barbeiro, "PIX")
        );
    }
} 