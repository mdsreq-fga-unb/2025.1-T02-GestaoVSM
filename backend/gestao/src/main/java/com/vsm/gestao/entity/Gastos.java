package com.vsm.gestao.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "gastos")


public class Gastos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tipo", nullable = false)
    private String tipo;

    @Column(name = "preco", nullable = false)
    private BigDecimal preco;

    @CreationTimestamp
    @Column(name = "data_gasto", nullable = false, updatable = false)
    private LocalDate dataGasto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

}
