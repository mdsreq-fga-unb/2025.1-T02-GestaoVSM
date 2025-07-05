package com.vsm.gestao.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vsm.gestao.entity.*;

@Repository
public interface GastosRepository extends JpaRepository<Gastos, Long>{
    List<Gastos> findAllByDataGastoBetween(LocalDate inicio, LocalDate fim);
}
