package com.vsm.gestao.repository;

import com.vsm.gestao.entity.ServicoRealizado;
import com.vsm.gestao.entity.Servico;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.entity.TipoUsuario;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.math.BigDecimal;
import java.util.List;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class ServicoRealizadoRepositoryTest {

    @Autowired
    private ServicoRealizadoRepository servicoRealizadoRepository;
    @Autowired
    private com.vsm.gestao.repository.UsuarioRepository usuarioRepository;
    @Autowired
    private com.vsm.gestao.repository.ServicoRepository servicoRepository;

    @Test
    void testSalvarEBuscarServicoRealizado() {
        Usuario barbeiro = new Usuario();
        barbeiro.setNome("Barbeiro Teste");
        barbeiro.setTipoUsuario(TipoUsuario.BARBEIRO);
        barbeiro.setAtivo(true);
        barbeiro.setLogin("barbeiro.teste");
        barbeiro.setPassword("senha_de_teste");
        barbeiro = usuarioRepository.save(barbeiro);

        Servico servico = new Servico();
        servico.setNome("Corte");
        servico.setPreco(new BigDecimal("50.00"));
        servico.setDuracaoEstimadaMinutos(30);
        servico.setAtivo(true);
        servico = servicoRepository.save(servico);

        ServicoRealizado realizado = new ServicoRealizado();
        List<Servico> servicos = List.of(servico);
        realizado.setUsuario(barbeiro);
        realizado.setServicos(servicos);
        realizado.setDataExecucao(LocalDateTime.now());
        realizado.setValor(new BigDecimal("50.00"));
        realizado.setFormaPagamento("DINHEIRO");
        realizado.setConfirmado(false);

        realizado = servicoRealizadoRepository.save(realizado);
        assertThat(realizado.getId()).isNotNull();
        assertThat(servicoRealizadoRepository.findById(realizado.getId())).isPresent();
    }
} 