import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarProdutoComponent } from './cadastrar-produto/cadastrar-produto.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ListagemProdutoComponent } from './listagem-produto/listagem-produto.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { CardProdutoComponent } from './card-produto/card-produto.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { HistoricoPrecoComponent } from './historico-preco/historico-preco.component';




@NgModule({
  declarations: [
    CadastrarProdutoComponent,
    ListagemProdutoComponent,
    CardProdutoComponent,
    HistoricoPrecoComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [
    CadastrarProdutoComponent,
    ListagemProdutoComponent
  ],
  providers:[
    [provideNativeDateAdapter()]
  ]
})
export class ProdutoModule { }
