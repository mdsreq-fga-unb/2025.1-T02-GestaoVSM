package com.vsm.gestao.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.vsm.gestao.entity.*;
@Repository
public interface ServicoRealizadoRepository extends JpaRepository<ServicoRealizado, Long>{
    List<ServicoRealizado> findAllByDataExecucaoBetween(LocalDateTime inicio, LocalDateTime fim);
    List<ServicoRealizado> findAllByUsuarioIdAndDataExecucaoBetween(Long usuarioId, LocalDateTime inicio, LocalDateTime fim);
    List<ServicoRealizado> findAllByUsuarioIdAndDataExecucao(Long usuarioId, LocalDateTime dataExecucao);
}
