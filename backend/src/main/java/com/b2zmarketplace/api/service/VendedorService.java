package com.b2zmarketplace.api.service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.b2zmarketplace.api.models.LoginDTO;
import com.b2zmarketplace.api.models.Vendedor;
import com.b2zmarketplace.api.models.VendedorAutenticacaoDTO;
import com.b2zmarketplace.api.models.VendedorDTO;
import com.b2zmarketplace.api.repositories.VendedorRepository;

@Service
public class VendedorService {

    private final VendedorRepository repositorio;

    public VendedorService(VendedorRepository repositorio) {
        this.repositorio = repositorio;
    }

    public List<VendedorDTO> getVendedors() {
        return this.repositorio.findAll().stream().map(VendedorDTO::new).toList();
    }

    public VendedorDTO getVendedorById(Long id) {
        return this.repositorio.findById(id).map(VendedorDTO::new).orElse(null);
    }

    public VendedorDTO getVendedorByCpf(String cpf) {
        return this.repositorio.findByCpf(cpf).map(VendedorDTO::new).orElse(null);
    }

    public VendedorDTO getVendedorByEmail(String email) {
        return this.repositorio.findByEmail(email).map(VendedorDTO::new).orElse(null);
    }

    @Transactional
    public VendedorDTO cadastrar(VendedorAutenticacaoDTO vendedorCadastroDTO) {
        if (repositorio.findByCpf(vendedorCadastroDTO.cpf()).isPresent()) {
            throw new RuntimeException("CPF já cadastrado");
        }
    
        if (repositorio.findByEmail(vendedorCadastroDTO.email()).isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }

        validarVendedor(new VendedorDTO(vendedorCadastroDTO));
        validarSenha(vendedorCadastroDTO.senha());

        Vendedor vendedor = new Vendedor();

        vendedor.setCpf(vendedorCadastroDTO.cpf());
        vendedor.setNome(vendedorCadastroDTO.nome());
        vendedor.setEmail(vendedorCadastroDTO.email());
        vendedor.setSenha(vendedorCadastroDTO.senha());
        vendedor.setDataNascimento(vendedorCadastroDTO.dataNascimento());

        Vendedor savedVendedor = this.repositorio.save(vendedor);
        return new VendedorDTO(savedVendedor);
    }
        
    @Transactional
    public VendedorDTO atualizar(VendedorDTO vendedorDTO) {
        Vendedor vendedor = this.repositorio.findById(vendedorDTO.id()).orElseThrow(
            () -> new RuntimeException("Vendedor não encontrado")
        );

        validarVendedor(vendedorDTO);

        vendedor.setCpf(vendedorDTO.cpf());
        vendedor.setNome(vendedorDTO.nome());
        vendedor.setEmail(vendedorDTO.email());
        // vendedor.setSenha(vendedorDTO.senha());
        vendedor.setDataNascimento(vendedorDTO.dataNascimento());
        // vendedor.setProdutos(vendedorDTO.produtos());

        Vendedor savedVendedor = this.repositorio.save(vendedor);
        return new VendedorDTO(savedVendedor);
    }

    public void deletar(Long id) {
        if (!this.repositorio.existsById(id)) {
            throw new RuntimeException("Vendedor não encontrado");
        }
        this.repositorio.deleteById(id);
    }

    public Vendedor validarAutenticacao(LoginDTO vendedor) {
        Vendedor vendedorAutenticado = this.repositorio.findByEmail(vendedor.email()).orElseThrow(
            () -> new RuntimeException("Vendedor não encontrado")
        );
        if (vendedorAutenticado.getSenha().equals(vendedor.senha())) {
            return vendedorAutenticado;
        }
        return null;
    }

    private void validarVendedor(VendedorDTO vendedor) {
        if (vendedor == null) {
            throw new RuntimeException("Vendedor não encontrado");
        }

        if (vendedor.cpf() == null || vendedor.cpf().isBlank()) {
            throw new RuntimeException("CPF não pode ser vazio");
        }

        // regex cpf "^(\\d{3}\\.\\d{3}\\.\\d{3}\\-\\d{2})|(\\d{11})$"

        if (!Pattern.matches("^(\\d{3}\\.\\d{3}\\.\\d{3}\\-\\d{2})|(\\d{11})$", vendedor.cpf())) {
            throw new RuntimeException("CPF inválido");
        }

        if (vendedor.nome() == null || vendedor.nome().isBlank()) {
            throw new RuntimeException("Nome não pode ser vazio");
        }

        if (vendedor.email() == null || vendedor.email().isBlank()) {
            throw new RuntimeException("Email não pode ser vazio");
        }

        // regex email "/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i"

        if (!Pattern.matches("^[a-z0-9.]+@[a-z0-9]+\\.[a-z]+(\\.[a-z]+)?$", vendedor.email())) {
            throw new RuntimeException("Email inválido");
        }  

        if (vendedor.dataNascimento() == null) {
            throw new RuntimeException("Data de nascimento não pode ser vazia");
        }

        LocalDate dataNascimento = vendedor.dataNascimento().toLocalDate();
        LocalDate hoje = LocalDate.now();

        if (dataNascimento.isAfter(hoje)) {
            throw new RuntimeException("A data de nascimento não pode estar no futuro");
        }

        int idade = Period.between(dataNascimento, hoje).getYears();

        if (idade < 18) {
            throw new RuntimeException("Vendedor deve ter pelo menos 18 anos.");
        }

        if (idade > 100) {
            throw new RuntimeException("Vendedor não pode ter mais de 100 anos.");
        }
    }

    private void validarSenha(String senha) {
        if (senha == null || senha.isBlank()) {
            throw new RuntimeException("Senha não pode ser vazia");
        }

        // regex senha "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"

        if (!Pattern.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", senha)) {
            throw new RuntimeException("Senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial");
        }
    }
}
