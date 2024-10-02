import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginVendedorComponent } from './vendedor/login-vendedor/login-vendedor.component';
import { HomeComponent } from './home/home.component';
import { CadastrarProdutoComponent } from './produto/cadastrar-produto/cadastrar-produto.component';
import { TelaPrincipalComponent } from './vendedor/tela-principal/tela-principal.component';
import { CadastroVendedorComponent } from './vendedor/cadastro-vendedor/cadastro-vendedor.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'listagem-produto',
  component: TelaPrincipalComponent
},
{
  path: 'login',
  component: LoginVendedorComponent
},
{
  path: 'cadastro-produto',
  component: CadastrarProdutoComponent
},
{
  path: 'edicao-produto/:id',
  component: CadastrarProdutoComponent
},
{
  path: 'cadastro-vendedor',
  component: CadastroVendedorComponent
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
