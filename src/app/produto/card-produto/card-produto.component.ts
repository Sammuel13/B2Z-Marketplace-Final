import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Produto } from '../../../shared/modelos/produto-model';
import { Router } from '@angular/router';
import { ProdutoFirebaseService } from '../../../shared/serviços/produto-firebase.service';
import { Vendedor } from '../../../shared/modelos/vendedor-model';

@Component({
  selector: 'app-card-produto',
  templateUrl: './card-produto.component.html',
  styleUrl: './card-produto.component.scss'
})
export class CardProdutoComponent implements OnInit {
  @Input() vendedor!: Vendedor;
  @Input() produto!: Produto;
  @Output() produtoRemovido = new EventEmitter<string>();
  @Output() historicoPreco = new EventEmitter<string>();
  abrirHistorico = false;

  produtos: Produto[] = [];

  ngOnInit(): void {

  }
  constructor(private produtoService: ProdutoFirebaseService, private roteador: Router) {
    // this.produtoService.listar(this.vendedor.id).subscribe({
    //   next: produtosDevolvidos => {
    //     this.produtos = produtosDevolvidos;
    //   }
    // });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['vendedor'] && this.vendedor) {
      this.produtoService.listar(this.vendedor.id).subscribe({
        next: produtos => {
          this.produtos = produtos;
        }
      });
    }
  }

  editar(produtoAEditar: Produto) {
    this.roteador.navigate(['edicao-produto', produtoAEditar.id], { state: { vendedor: this.vendedor } });
  }

  excluir(produtoRemovido: Produto) {
    this.produtoService.apagar(produtoRemovido).subscribe({
      next: produto => this.produtoRemovido.emit(produtoRemovido.id)
    }
    );
  }

  verHistorico() {
    this.abrirHistorico = true;

  }
}
