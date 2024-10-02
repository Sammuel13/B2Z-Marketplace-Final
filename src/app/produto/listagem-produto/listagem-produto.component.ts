import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoFirebaseService } from '../../../shared/serviços/produto-firebase.service';
import { Produto } from '../../../shared/modelos/produto-model';
import { SweetAlertService } from '../../../shared/serviços/sweet-alert.service';
import { Vendedor } from '../../../shared/modelos/vendedor-model';

@Component({
  selector: 'app-listagem-produto',
  templateUrl: './listagem-produto.component.html',
  styleUrl: './listagem-produto.component.scss'
})

export class ListagemProdutoComponent implements OnChanges {

  @Input() categoria!: string;
  @Input() vendedor!: Vendedor;
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];

  constructor(private produtoService: ProdutoFirebaseService) {
    // produtoService.listar(this.vendedor.id).subscribe({
    //   next: produtos => {
    //     this.produtos = produtos;
    //     this.filtrarProdutos();
    //   }
    // });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoria']) {
      this.filtrarProdutos();
    }
    if (changes['vendedor'] && this.vendedor) {
      this.produtoService.listar(this.vendedor.id).subscribe({
        next: produtos => {
          this.produtos = produtos;
          this.filtrarProdutos();
        }
      });
    }
  }

  filtrarProdutos() {
    if (this.categoria) {
      this.produtosFiltrados = this.produtos.filter(produto =>
        produto.categoria && produto.categoria.includes(this.categoria as string)
      );
    } else {
      this.produtosFiltrados = this.produtos;
    }
  }

  excluir(IDProduto: string) {
    this.produtos = this.produtos.filter((p) => p.id !== IDProduto);
    this.filtrarProdutos(); // Atualiza a lista filtrada
  }



}