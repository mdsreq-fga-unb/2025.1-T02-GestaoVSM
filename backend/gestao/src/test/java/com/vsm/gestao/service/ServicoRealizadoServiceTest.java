package com.vsm.gestao.service;

import com.vsm.gestao.entity.*;
import com.vsm.gestao.repository.AgendamentoRepository;
import com.vsm.gestao.repository.ServicoRealizadoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class ServicoRealizadoServiceTest {

    @Mock
    private AgendamentoRepository agendamentoRepository;

    @Mock
    private ServicoRealizadoRepository servicoRealizadoRepository;

    @InjectMocks
    private ServicoRealizadoService servicoRealizadoService;

    private Usuario admin;
    private Usuario barbeiro;
    private Agendamento agendamento;
    private Servico servico;

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
        servico.setNome("Corte de Cabelo");
        servico.setPreco(new BigDecimal("100.00")); // Preço cheio para facilitar o teste de desconto
        servico.setDuracaoEstimadaMinutos(30);

        agendamento = new Agendamento();
        agendamento.setId(1L);
        agendamento.setUsuario(barbeiro);
        agendamento.setServicos(List.of(servico));
        agendamento.setDataAgendamento(LocalDateTime.now());
    }

    @Test
    void confirmarServicoAgendado_comAdmin_deveTerSucesso() {
        // Mock
        when(agendamentoRepository.findById(1L)).thenReturn(Optional.of(agendamento));
        // Captura o ServicoRealizado para verificar o valor
        when(servicoRealizadoRepository.save(any(ServicoRealizado.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Ação: pagamento com CRÉDITO para testar o desconto de 4%
        ServicoRealizado confirmado = servicoRealizadoService.confirmarServicoAgendado(1L, admin, "CREDITO");
      

        // Verificação
        assertThat(confirmado).isNotNull();
        assertThat(confirmado.isConfirmado()).isTrue();
        assertThat(confirmado.getFormaPagamento()).isEqualTo("CREDITO");
        // Verifica se o desconto de 4% foi aplicado (100.00 * 0.96 = 96.00)
        assertThat(confirmado.getValor()).isEqualByComparingTo(new BigDecimal("96.00"));
        // Verifica se o agendamento foi deletado
        verify(agendamentoRepository).deleteById(1L);
    }

    @Test
    void confirmarServicoAgendado_barbeiroConfirmaServicoDeOutro_deveLancarExcecao() {
        // Setup: um agendamento que pertence a outro barbeiro
        Usuario outroBarbeiro = new Usuario();
        outroBarbeiro.setId(3L);
        agendamento.setUsuario(outroBarbeiro);

        // Mock
        when(agendamentoRepository.findById(1L)).thenReturn(Optional.of(agendamento));

        // Ação e Verificação
        assertThrows(SecurityException.class, () -> {
            // O 'barbeiro' (ID 2) tenta confirmar um serviço do 'outroBarbeiro' (ID 3)
            servicoRealizadoService.confirmarServicoAgendado(1L, barbeiro, "PIX");
        });
    }

    @Test
    void confirmarServicoAgendado_agendamentoNaoEncontrado_deveLancarExcecao() {
        // Mock: o agendamento não é encontrado
        when(agendamentoRepository.findById(99L)).thenReturn(Optional.empty());

        // Ação e Verificação
        assertThrows(IllegalArgumentException.class, () -> {
            servicoRealizadoService.confirmarServicoAgendado(99L, admin, "DINHEIRO");
        });
    }
}