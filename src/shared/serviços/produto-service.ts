import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Produto } from "../modelos/produto-model";

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {

    URL_PRODUTOS = 'http://localhost:3000/produtos';

    constructor(private httpClient: HttpClient) { }

    cadastrar(produto: Produto): Observable<Produto> {
        return this.httpClient.post<Produto>(this.URL_PRODUTOS, produto);
    }

    listar(): Observable<Produto[]> {
        return this.httpClient.get<Produto[]>(this.URL_PRODUTOS);
    }

    buscar(id: string): Observable<Produto> {
        return this.httpClient.get<Produto>(this.URL_PRODUTOS + '/' + id);
    }

    editar(produto: Produto): Observable<Produto> {
        return this.httpClient.put<Produto>(this.URL_PRODUTOS + '/' + produto.id, produto);
    }

    remover(produto: Produto): Observable<Produto> {
        return this.httpClient.delete<Produto>(this.URL_PRODUTOS + '/' + produto.id);
    }


}