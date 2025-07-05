package com.vsm.gestao.repository;

import com.vsm.gestao.entity.Agendamento;

import com.vsm.gestao.entity.Usuario;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
   Agendamento findByUsuarioAndDataAgendamento(Usuario usuario, LocalDateTime dataAgendamento);
    @Query("SELECT a FROM Agendamento a WHERE a.usuario.id = :usuarioId " +
           "AND a.dataAgendamento < :novoFim AND a.dataAgendamento.plusMinutes(a.duracaoMinutos) > :novoInicio " +
           "AND (:agendamentoIdExcluido IS NULL OR a.id <> :agendamentoIdExcluido)")
    List<Agendamento> findAgendamentosConflitantes(Long usuarioId, LocalDateTime novoInicio, LocalDateTime novoFim, Long agendamentoIdExcluido);
}