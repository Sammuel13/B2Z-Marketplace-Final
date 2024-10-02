import { Component } from '@angular/core';
import { Produto, Categorias } from '../../../shared/modelos/produto-model';
import { Vendedor } from '../../../shared/modelos/vendedor-model';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertService } from '../../../shared/serviços/sweet-alert.service';
import { ProdutoFirebaseService } from '../../../shared/serviços/produto-firebase.service';


@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrl: './cadastrar-produto.component.scss'

})
export class CadastrarProdutoComponent {

  vendedor!: Vendedor;
  produto: Produto = new Produto();
  isEdicao: boolean = false;
  produtos: Produto[] = [];
  titulo: string = 'Cadastrar Produto';

  categorias = Object.values(Categorias);

  constructor(private roteador: Router, private rotaAtual: ActivatedRoute, private produtoService: ProdutoFirebaseService, private SweetAlert: SweetAlertService) {
    const navigation = this.roteador.getCurrentNavigation();
    const state = navigation?.extras.state as { vendedor: Vendedor };
    
    if (state) {
      this.vendedor = state.vendedor;
    }
    const idEdicao = this.rotaAtual.snapshot.paramMap.get('id');
    if (idEdicao) {
      this.titulo = 'Editar Produto';
      this.isEdicao = true;
      produtoService.buscarPorId(idEdicao).subscribe({
        next: produtoRetorno => {
          this.produto = produtoRetorno;
        }
      });
    }
  }

  inserir() {
      this.produto.vendedor = this.vendedor.id;
      if (!this.isEdicao && this.produto.hist_preco && this.produto.preco !== undefined ) {
        this.produto.hist_preco.push(this.produto.preco,new Date());
      }
      if (this.isEdicao && this.produto.hist_preco !== undefined && this.produto.preco !== undefined) {
        let ultimopreco:number = this.produto.hist_preco[this.produto.hist_preco.length - 1];
        if(this.produto.preco !== ultimopreco){
          let novopreco:number = this.produto.preco;
          this.produto.hist_preco.push(novopreco, new Date());
          
        }
        this.produtoService.atualizar(this.produto).subscribe({
          next: () => {
            this.roteador.navigate(['listagem-produto'], { state: { vendedor: this.vendedor } });
            this.SweetAlert.sucesso('Produto atualizado com sucesso!');
          },
          error: (err) => {
            this.SweetAlert.erro('Erro ao atualizar produto: ' + err.message);
          }
    
        });
        console.log(this.produto.hist_preco);
        
      } else {
        this.produtoService.inserir(this.produto).subscribe({
          next: () => {
            this.roteador.navigate(['listagem-produto'], { state: { vendedor: this.vendedor } });
            this.SweetAlert.sucesso('Produto cadastrado com sucesso!');
          },
          error: (err) => {
            this.SweetAlert.erro('Erro ao cadastrar produto: ' + err.message);
          }
        });
      }
    }
  voltar() {
    this.roteador.navigate(['listagem-produto'], { state: { vendedor: this.vendedor } });
  }
}

