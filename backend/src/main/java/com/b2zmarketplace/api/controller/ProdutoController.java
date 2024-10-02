package com.b2zmarketplace.api.controller;

import com.b2zmarketplace.api.models.Produto;
import com.b2zmarketplace.api.service.ProdutoService;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController { // https://www.baeldung.com/spring-response-entity

    // @Autowired
    private final ProdutoService service;

    public ProdutoController(ProdutoService service) {
        this.service = service;
    }

    @GetMapping("")
    public List<Produto> getProdutos() {
        return this.service.getProdutos();
    }

    @GetMapping("/{id}")
    public Produto getProdutoById(@PathVariable("id") Long id) {
        return this.service.getProdutoById(id);
    }

    @PostMapping("")
    public Produto inserirProduto(@RequestBody Produto produto) {
        return this.service.manter(produto);
    }

    @PutMapping("/{id}") // requestbody msm?
    public Produto atualizarProduto(@RequestBody Produto produto) {
        return this.service.manter(produto);
    }

    @DeleteMapping("/{id}")
    public void deletarProduto(@PathVariable("id") Long id) {
        this.service.deletar(id);
    }

}
