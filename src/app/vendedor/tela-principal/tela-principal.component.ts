import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Categorias } from '../../../shared/modelos/produto-model';
import { Vendedor } from '../../../shared/modelos/vendedor-model';


@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  styleUrl: './tela-principal.component.scss'
})
export class TelaPrincipalComponent {

  vendedor: Vendedor | null = null;
  categorias = Object.values(Categorias);
  categoriaSelecionada: string | null = null;

  selecionarCategoria(categ: string) {
    this.categoriaSelecionada = this.categoriaSelecionada === categ ? null : categ;
  }

  cadastrar() {
    this.roteador.navigate(['/cadastro-produto'], { state: { vendedor: this.vendedor}});
  }

  constructor(private roteador: Router) {
    const navigation = this.roteador.getCurrentNavigation();
    const state = navigation?.extras.state as { vendedor: Vendedor };
    if (state) {
      this.vendedor = state.vendedor;
    }
  }

}
