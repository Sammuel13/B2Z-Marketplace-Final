package com.b2zmarketplace.api.controller;

import com.b2zmarketplace.api.models.LoginDTO;
import com.b2zmarketplace.api.models.Vendedor;
import com.b2zmarketplace.api.models.VendedorAutenticacaoDTO;
import com.b2zmarketplace.api.models.VendedorDTO;
import com.b2zmarketplace.api.service.VendedorService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/vendedores")
public class VendedorController {

    private final VendedorService service;

    public VendedorController(VendedorService service) {
        this.service = service;
    }

    @GetMapping("")
    public ResponseEntity<List<VendedorDTO>> getVendedors(@RequestParam(required = false) String email) {

        if (email != null) {
            VendedorDTO vendedor = this.service.getVendedorByEmail(email);
            if (vendedor != null) {
                return new ResponseEntity<>(List.of(vendedor), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<>(this.service.getVendedors(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendedorDTO> getVendedorById(@PathVariable("id") Long id) {
        VendedorDTO vendedor = this.service.getVendedorById(id);
        if (vendedor != null) {
            return new ResponseEntity<>(vendedor, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<VendedorDTO> cadastrarVendedor(@RequestBody VendedorAutenticacaoDTO vendedor) {
        VendedorDTO novoVendedor = this.service.cadastrar(vendedor);
        return new ResponseEntity<>(novoVendedor, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VendedorDTO> atualizarVendedor(@RequestBody VendedorDTO vendedor) {  // mudar pra autenticado pq senha
        try {
            VendedorDTO vendedorAtualizado = this.service.atualizar(vendedor);
            return new ResponseEntity<>(vendedorAtualizado, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarVendedor(@PathVariable("id") Long id) {
        try {
            this.service.deletar(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // metodo que verifica o objeto vendedordto e o parametro senha passado e retorna um boolean
    @PostMapping("/login")
    public ResponseEntity<VendedorDTO> validarAutenticacao(@RequestBody LoginDTO vendedor) {
        VendedorDTO vendedorDTO = new VendedorDTO (this.service.validarAutenticacao(vendedor));
        return new ResponseEntity<>(vendedorDTO, HttpStatus.OK);
    }
    
}
