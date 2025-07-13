package com.vsm.gestao.repository;

import com.vsm.gestao.entity.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {


    @Query(value = "SELECT * FROM agendamentos a WHERE a.id_usuario = :usuarioId " +
                   "AND a.data_agendamento < :novoFim " +
                   "AND (a.data_agendamento + CAST(a.duracao_minutos || ' minutes' AS interval)) > :novoInicio " +
                   "AND (:agendamentoIdExcluido IS NULL OR a.id <> :agendamentoIdExcluido)",
           nativeQuery = true) // Usamos nativeQuery = true para garantir que a sintaxe do PostgreSQL seja usada.
    List<Agendamento> findAgendamentosConflitantes(Long usuarioId, LocalDateTime novoInicio, LocalDateTime novoFim, Long agendamentoIdExcluido);

    // Métodos de busca por período
    List<Agendamento> findAllByDataAgendamentoBetween(LocalDateTime inicio, LocalDateTime fim);
    List<Agendamento> findAllByUsuarioIdAndDataAgendamentoBetween(Long usuarioId, LocalDateTime inicio, LocalDateTime fim);
}