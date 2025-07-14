package com.vsm.gestao.service;

import com.vsm.gestao.dto.ConfirmacaoServicoDTO; // Importe o DTO
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
        // Arrange
        when(agendamentoRepository.findById(1L)).thenReturn(Optional.of(agendamento));
        when(servicoRealizadoRepository.save(any(ServicoRealizado.class))).thenAnswer(invocation -> invocation.getArgument(0));
        
        // Criamos o DTO que o método do serviço espera
        ConfirmacaoServicoDTO dto = new ConfirmacaoServicoDTO(1L, "CREDITO");

        // Act: Chamamos o método passando o DTO e o solicitante
        ServicoRealizado confirmado = servicoRealizadoService.confirmarServicoAgendado(dto, admin);

        // Assert
        assertThat(confirmado).isNotNull();
        assertThat(confirmado.isConfirmado()).isTrue();
        assertThat(confirmado.getFormaPagamento()).isEqualTo("CREDITO");
        assertThat(confirmado.getValor()).isEqualByComparingTo(new BigDecimal("96.00"));
        verify(agendamentoRepository).deleteById(1L);
    }

    @Test
    void confirmarServicoAgendado_barbeiroConfirmaServicoDeOutro_deveLancarExcecao() {
        // Arrange
        Usuario outroBarbeiro = new Usuario();
        outroBarbeiro.setId(3L);
        agendamento.setUsuario(outroBarbeiro);
        when(agendamentoRepository.findById(1L)).thenReturn(Optional.of(agendamento));
        
        // Criamos o DTO para a chamada
        ConfirmacaoServicoDTO dto = new ConfirmacaoServicoDTO(1L, "PIX");

        // Act & Assert
        assertThrows(SecurityException.class, () -> {
            // O 'barbeiro' (ID 2) tenta confirmar um serviço do 'outroBarbeiro' (ID 3)
            servicoRealizadoService.confirmarServicoAgendado(dto, barbeiro);
        });
    }

    @Test
    void confirmarServicoAgendado_agendamentoNaoEncontrado_deveLancarExcecao() {
        // Arrange
        when(agendamentoRepository.findById(99L)).thenReturn(Optional.empty());
        
        // Criamos o DTO para a chamada
        ConfirmacaoServicoDTO dto = new ConfirmacaoServicoDTO(99L, "DINHEIRO");

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            servicoRealizadoService.confirmarServicoAgendado(dto, admin);
        });
    }
}