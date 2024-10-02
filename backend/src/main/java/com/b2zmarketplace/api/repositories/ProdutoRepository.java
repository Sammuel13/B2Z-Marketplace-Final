package com.b2zmarketplace.api.repositories;

import com.b2zmarketplace.api.models.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}