package com.vsm.gestao.repository;

import com.vsm.gestao.entity.FechamentoCaixa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FechamentoCaixaRepository extends JpaRepository<FechamentoCaixa, Long> {}