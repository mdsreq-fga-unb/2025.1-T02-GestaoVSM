package com.vsm.gestao.repository;

import com.vsm.gestao.entity.Agendamento;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    // Query nativa para encontrar agendamentos conflitantes (mantida igual)
    @Query(value = "SELECT * FROM agendamentos a WHERE a.id_usuario = :usuarioId " +
                   "AND a.data_agendamento < :novoFim " +
                   "AND (a.data_agendamento + CAST(a.duracao_minutos || ' minutes' AS interval)) > :novoInicio " +
                   "AND (:agendamentoIdExcluido IS NULL OR a.id <> :agendamentoIdExcluido)",
           nativeQuery = true)
    List<Agendamento> findAgendamentosConflitantes(Long usuarioId, LocalDateTime novoInicio, LocalDateTime novoFim, Long agendamentoIdExcluido);

    // Métodos para buscar agendamentos com serviços carregados via EntityGraph
    @EntityGraph(attributePaths = {"servicos"})
    List<Agendamento> findAllByDataAgendamentoBetween(LocalDateTime inicio, LocalDateTime fim);

    @EntityGraph(attributePaths = {"servicos"})
    List<Agendamento> findAllByUsuarioIdAndDataAgendamentoBetween(Long usuarioId, LocalDateTime inicio, LocalDateTime fim);
}
