import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { initializeApp } from 'firebase/app';
import { Produto } from '../modelos/produto-model';
import { from, identity, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoFirebaseService {

  colecaoProdutos: AngularFirestoreCollection<Produto>;
  NOME_COLECAO = 'produtos';

  constructor(private afs: AngularFirestore) {
    this.colecaoProdutos = afs.collection<Produto>(this.NOME_COLECAO);
  }

  listar(idVendedor: number): Observable<Produto[]> {
    return this.afs.collection<Produto>(this.NOME_COLECAO, ref => ref.where('vendedor', '==', idVendedor)).valueChanges({ idField: 'id' });
  }

  inserir(produto: Produto): Observable<Object> {
    const erroValidacao = this.validarProduto(produto);
    produto.hist_preco = [];
    if (erroValidacao) {
      return from(Promise.reject(new Error(erroValidacao)));
    }
    delete produto.id;
    return from(this.colecaoProdutos.add(Object.assign({}, produto)));
  }

  atualizar(produto: Produto): Observable<void> {
    const id = produto.id;
    const erroValidacao = this.validarProduto(produto);
    if (erroValidacao) {
      return from(Promise.reject(new Error(erroValidacao)));
    }
    delete produto.id;
    return from(this.colecaoProdutos.doc(id).update(Object.assign({}, produto)));
  }

  apagar(produto: Produto): Observable<void> {
    return from(this.colecaoProdutos.doc(produto.id).delete());
  }

  buscarPorId(id: string): Observable<Produto> {
    return this.colecaoProdutos.doc(id).get().pipe(map(document => new Produto(document.id, document.data())));
  }

  private validarProduto(produto: Produto): string | null {
    if (!produto.nome) {
      return 'Nome do produto é obrigatório';
    }
    if (!produto.preco) {
      return 'Preço do produto é obrigatório';
    }
    if (isNaN(produto.preco) || produto.preco <= 0) {
      return 'Preço do produto deve ser maior que zero';
    }
    if (produto.quantidade && produto.quantidade < 0) {
      return 'Quantidade do produto deve ser maior ou igual a zero';
    }
    if (!produto.categoria) {
      return 'Categoria do produto é obrigatória';
    }
    if (!produto.imagem) {
      return 'Foto do produto é obrigatória';
    }
    return null;
  }
}
