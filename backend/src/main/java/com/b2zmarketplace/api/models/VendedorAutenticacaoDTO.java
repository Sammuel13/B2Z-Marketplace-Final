package com.b2zmarketplace.api.models;

import java.sql.Date;
import java.util.List;

public record VendedorAutenticacaoDTO( Long id, String cpf, String nome, String email, String senha, Date dataNascimento) {

    public VendedorAutenticacaoDTO(Vendedor vendedor) {
        this(
            vendedor.getId(), //precisa de id?
            vendedor.getCpf(),
            vendedor.getNome(),
            vendedor.getEmail(),
            vendedor.getSenha(),
            vendedor.getDataNascimento()
            // vendedor.getProdutos()
        );
    }
}