import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginVendedorComponent } from './login-vendedor/login-vendedor.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { TelaPrincipalComponent } from './tela-principal/tela-principal.component';
import { ProdutoModule } from '../produto/produto.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';
import { CadastroVendedorComponent } from './cadastro-vendedor/cadastro-vendedor.component';



@NgModule({
  declarations: [
    TelaPrincipalComponent,
    LoginVendedorComponent,
    CadastroVendedorComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ProdutoModule,
    SharedModule
    

  ]
})
export class VendedorModule { }
