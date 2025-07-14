package com.vsm.gestao.service;

import com.vsm.gestao.dto.ServicoDTO; // Importe o DTO
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
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

class ServicoServiceTest {
    @Mock
    private ServicoRepository servicoRepository;

    @InjectMocks
    private ServicoService servicoService;

    private Usuario admin;
    private Usuario barbeiro;
    private Servico servicoEntidade; // Representa a entidade que seria salva no banco
    private ServicoDTO.ServicoRequest servicoRequest; // Representa o DTO que chega pela API

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        admin = new Usuario();
        admin.setTipoUsuario(TipoUsuario.ADMIN);

        barbeiro = new Usuario();
        barbeiro.setTipoUsuario(TipoUsuario.BARBEIRO);

        // DTO usado como entrada para os métodos de criar e atualizar
        servicoRequest = new ServicoDTO.ServicoRequest(
                "Corte Moderno",
                new BigDecimal("50.00"),
                30,
                true
        );

        // Entidade usada como retorno simulado do banco de dados
        servicoEntidade = new Servico();
        servicoEntidade.setId(1L);
        servicoEntidade.setNome("Corte Moderno");
        servicoEntidade.setPreco(new BigDecimal("50.00"));
        servicoEntidade.setDuracaoEstimadaMinutos(30);
        servicoEntidade.setAtivo(true);
    }

    @Test
    void criarServico_comAdmin_sucesso() {
        // Arrange: Quando o repositório salvar, retorne a entidade simulada
        when(servicoRepository.save(any(Servico.class))).thenReturn(servicoEntidade);

        // Act: Chama o serviço passando o DTO de requisição
        Servico criado = servicoService.criarServico(servicoRequest, admin);

        // Assert: Verifica se o resultado não é nulo e se os dados foram mapeados corretamente
        assertThat(criado).isNotNull();
        assertThat(criado.getNome()).isEqualTo(servicoRequest.nome());
        verify(servicoRepository, times(1)).save(any(Servico.class));
    }

    @Test
    void criarServico_comBarbeiro_lancaExcecao() {
        // Act & Assert: Verifica se a exceção de segurança é lançada e se o 'save' nunca é chamado
        assertThrows(SecurityException.class, () -> servicoService.criarServico(servicoRequest, barbeiro));
        verify(servicoRepository, never()).save(any(Servico.class));
    }

    @Test
    void atualizarServico_comAdmin_sucesso() {
        // Arrange
        when(servicoRepository.findById(1L)).thenReturn(Optional.of(servicoEntidade));
        when(servicoRepository.save(any(Servico.class))).thenReturn(servicoEntidade);

        // Act: Chama o serviço de atualização passando o DTO com os novos dados
        Servico atualizado = servicoService.atualizarServico(1L, servicoRequest, admin);

        // Assert
        assertThat(atualizado).isNotNull();
        verify(servicoRepository, times(1)).save(any(Servico.class));
    }

    @Test
    void atualizarServico_comBarbeiro_lancaExcecao() {
        // Act & Assert
        assertThrows(SecurityException.class, () -> servicoService.atualizarServico(1L, servicoRequest, barbeiro));
        verify(servicoRepository, never()).save(any(Servico.class));
    }

    @Test
    void deletarServico_comAdmin_sucesso() {
        // Arrange: Não faça nada quando o delete for chamado
        doNothing().when(servicoRepository).deleteById(1L);

        // Act
        servicoService.deletarServico(1L, admin);

        // Assert: Verifica se o método deleteById foi chamado exatamente uma vez
        verify(servicoRepository, times(1)).deleteById(1L);
    }

    @Test
    void deletarServico_comBarbeiro_lancaExcecao() {
        // Act & Assert
        assertThrows(SecurityException.class, () -> servicoService.deletarServico(1L, barbeiro));
        verify(servicoRepository, never()).deleteById(anyLong());
    }
}