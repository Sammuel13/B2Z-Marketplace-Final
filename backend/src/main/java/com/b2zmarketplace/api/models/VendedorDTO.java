package com.b2zmarketplace.api.models;

import java.sql.Date;
import java.util.List;

public record VendedorDTO( Long id, String cpf, String nome, String email/*, String senha*/, Date dataNascimento /*, List<Produto> produtos*/) {

    public VendedorDTO(Vendedor vendedor) {
        this(
            vendedor.getId(),
            vendedor.getCpf(),
            vendedor.getNome(),
            vendedor.getEmail(),
            // vendedor.getSenha(),
            vendedor.getDataNascimento()
            // vendedor.getProdutos()
        );
    }

    public VendedorDTO(VendedorAutenticacaoDTO vendedor) {
        this(
            vendedor.id(),
            vendedor.cpf(),
            vendedor.nome(),
            vendedor.email(),
            // vendedor.senha(),
            vendedor.dataNascimento()
        );
    }
}