package com.b2zmarketplace.api.service;

import com.b2zmarketplace.api.models.Produto;
import com.b2zmarketplace.api.repositories.ProdutoRepository;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProdutoService {

    // @Autowired
    private ProdutoRepository repositorio;

    public ProdutoService(ProdutoRepository repositorio) {
        this.repositorio = repositorio;
    }

    public List<Produto> getProdutos() {
        return this.repositorio.findAll(); //
    }

    public Produto getProdutoById(Long id) {
        return this.repositorio.findById(id).orElse(null);
    }
    
    @Transactional
    public Produto manter(Produto produto) {
        return this.repositorio.save(produto);
    }

    public void deletar(Long id) {
        this.repositorio.deleteById(id);
    }
  
}
