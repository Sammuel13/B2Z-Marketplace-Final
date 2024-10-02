package com.b2zmarketplace.api.repositories;

import com.b2zmarketplace.api.models.Vendedor;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VendedorRepository extends JpaRepository<Vendedor, Long> {

    public Optional<Vendedor> findByCpf(String cpf);

    public Optional<Vendedor> findByEmail(String email);

}