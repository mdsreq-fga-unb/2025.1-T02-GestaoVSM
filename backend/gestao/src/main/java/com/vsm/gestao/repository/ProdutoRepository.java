package com.vsm.gestao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.vsm.gestao.entity.Produto;;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {}
