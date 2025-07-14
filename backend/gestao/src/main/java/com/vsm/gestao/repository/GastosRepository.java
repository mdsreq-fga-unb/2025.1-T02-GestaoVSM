package com.vsm.gestao.repository;

import com.vsm.gestao.entity.Gastos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface GastosRepository extends JpaRepository<Gastos, Long> {
    List<Gastos> findAllByDataGastoBetween(LocalDate inicio, LocalDate fim);
    List<Gastos> findAllByUsuarioId(Long usuarioId);
    List<Gastos> findAllByUsuarioIdAndDataGastoBetween(Long usuarioId, LocalDate inicio, LocalDate fim);
}