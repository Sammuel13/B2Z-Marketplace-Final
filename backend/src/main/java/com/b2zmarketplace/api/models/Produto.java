package com.b2zmarketplace.api.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String descricao;
    private double preco; // futuramente lista
    private String imagem;
    private List<String> categoria;
    private Date dataCriacao;
    private Integer quantidade;
    private boolean novo;
    private boolean ativo;

    @ManyToOne
    @JoinColumn(name = "vendedor_id")
    private Vendedor vendedor;

}
