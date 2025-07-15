package com.vsm.gestao.repository;

import com.vsm.gestao.entity.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    // --- QUERY FINAL E CORRIGIDA ---
    // Esta versão usa a sintaxe nativa do PostgreSQL para garantir a compatibilidade.
    @Query(value = "SELECT * FROM agendamentos a WHERE a.id_usuario = :usuarioId " +
                   "AND a.data_agendamento < :novoFim " +
                   "AND (a.data_agendamento + CAST(a.duracao_minutos || ' minutes' AS interval)) > :novoInicio " +
                   "AND (:agendamentoIdExcluido IS NULL OR a.id <> :agendamentoIdExcluido)",
           nativeQuery = true) // nativeQuery = true é essencial aqui.
    List<Agendamento> findAgendamentosConflitantes(Long usuarioId, LocalDateTime novoInicio, LocalDateTime novoFim, Long agendamentoIdExcluido);

    // ================== NOVOS MÉTODOS DE BUSCA ==================
    // Substituímos os métodos "Between" por estes, que usam uma consulta explícita e mais robusta.
    
    @Query("SELECT a FROM Agendamento a WHERE a.dataAgendamento >= :inicioDoDia AND a.dataAgendamento < :fimDoDia")
    List<Agendamento> buscarTodosNoIntervalo(
        @Param("inicioDoDia") LocalDateTime inicioDoDia, 
        @Param("fimDoDia") LocalDateTime fimDoDia
    );

    @Query("SELECT a FROM Agendamento a WHERE a.usuario.id = :usuarioId AND a.dataAgendamento >= :inicioDoDia AND a.dataAgendamento < :fimDoDia")
    List<Agendamento> buscarPorUsuarioNoIntervalo(
        @Param("usuarioId") Long usuarioId, 
        @Param("inicioDoDia") LocalDateTime inicioDoDia, 
        @Param("fimDoDia") LocalDateTime fimDoDia
    );
    // =========================================================
}
