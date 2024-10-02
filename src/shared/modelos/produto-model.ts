import { Vendedor } from './vendedor-model';

export enum Categorias {
    Eletronicos = "Eletrônicos",
    Eletrodomesticos = "Eletrodomésticos",
    Cozinha = "Cozinha",
    Moveis = "Móveis",
    Roupas = "Roupas",
    Livros = "Livros",
    Brinquedos = "Brinquedos",
    Outros = "Outros",
}

export class Produto {

    id?: string;
    nome = '';
    descricao = '';
    preco?: number;
    imagem = '';
    categoria?: string[];
    dataCriacao?: Date;
    quantidade?: number;
    novo?: boolean;
    ativo?: boolean;
    vendedor?: number;
    hist_preco?: any[];
  

    constructor(id?: string, produto: Produto = {nome: '', descricao: '', imagem: '', preco:0 , categoria: [], dataCriacao: new Date, quantidade: 0, novo: false, ativo: false, vendedor: 0}) {
        this.id = id;
        this.nome = produto.nome;
        this.descricao = produto.descricao;
        this.preco = produto.preco;
        this.imagem = produto.imagem;
        this.categoria = produto.categoria;
        this.dataCriacao = produto.dataCriacao;
        this.quantidade = produto.quantidade;
        this.novo = produto.novo;
        this.ativo = produto.ativo;
        this.vendedor = produto.vendedor;
        this.hist_preco = produto.hist_preco;
        
    }
}

// export class Produto {

//     id?: string;
//     nome: string;
//     descricao: string;
//     preco: number;
//     imagem: string;
//     categoria: string[];
//     dataCriacao: Date;
//     quantidade: number;
//     novo: boolean;
//     ativo: boolean;
//     vendedor: Vendedor;


//     constructor(nome: string, descricao: string, preco: number, imagem: string, categoria: string[], dataCriacao: Date, quantidade: number, novo: boolean, ativo: boolean, vendedor: Vendedor, id?: string) {
//         this.id = id;
//         this.descricao = descricao;
//         this.nome = nome;
//         this.preco = preco;
//         this.imagem = imagem;
//         this.categoria = categoria;
//         this.dataCriacao = dataCriacao;
//         this.quantidade = quantidade;
//         this.novo = novo;
//         this.ativo = ativo;
//         this.vendedor = vendedor;
//     }
// }