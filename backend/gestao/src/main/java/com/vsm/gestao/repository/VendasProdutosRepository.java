package com.vsm.gestao.repository;

import com.vsm.gestao.entity.VendasProdutos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface VendasProdutosRepository extends JpaRepository<VendasProdutos, Long> {
    List<VendasProdutos> findAllByDataVendaBetween(LocalDate inicio, LocalDate fim);
    List<VendasProdutos> findAllByUsuarioIdAndDataVendaBetween(Long usuarioId, LocalDate inicio, LocalDate fim);
    List<VendasProdutos> findAllByUsuarioId(Long usuarioId);
}