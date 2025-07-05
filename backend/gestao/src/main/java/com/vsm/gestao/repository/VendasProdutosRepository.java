package com.vsm.gestao.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vsm.gestao.entity.*;

@Repository
public interface VendasProdutosRepository extends JpaRepository<VendasProdutos, Long> {
    List<VendasProdutos> findAllByUsuarioIdAndDataVendaBetween(Long usuarioId, LocalDate inicio, LocalDate fim);
    List<VendasProdutos> findAllByDataVendaBetween(LocalDate inicio, LocalDate fim);
}
