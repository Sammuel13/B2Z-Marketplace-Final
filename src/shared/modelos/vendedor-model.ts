import { Produto } from './produto-model';

export class Vendedor {

    id: number;
    cpf: string;
    nome: string;
    senha: string;
    email: string;
    dataNascimento: Date;
    // produtos?: Produto[];

    constructor(id: number, cpf: string, nome: string, senha: string, email: string, dataNascimento: Date) {
        this.id = id;
        this.cpf = cpf;
        this.nome = nome;
        this.senha = senha;
        this.email = email;
        this.dataNascimento = dataNascimento;
        // this.produtos = produtos;
    }
}