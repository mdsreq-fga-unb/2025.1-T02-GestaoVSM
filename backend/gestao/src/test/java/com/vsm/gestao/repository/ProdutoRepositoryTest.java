package com.vsm.gestao.repository;

import com.vsm.gestao.entity.Produto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class ProdutoRepositoryTest {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Test
    void testSalvarEBuscarProduto() {
        Produto produto = new Produto();
        produto.setNome("Shampoo");
        produto.setPreco(new BigDecimal("25.00"));
        produto.setDisponivel(true);
        produto.setComissaoProduto(new BigDecimal("2.50"));

        produto = produtoRepository.save(produto);
        assertThat(produto.getId()).isNotNull();
        assertThat(produtoRepository.findById(produto.getId())).isPresent();
    }
} 