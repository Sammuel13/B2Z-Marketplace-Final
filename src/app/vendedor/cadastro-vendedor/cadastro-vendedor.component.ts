import { Component, signal } from '@angular/core';
import { Vendedor } from '../../../shared/modelos/vendedor-model';
import { Router } from '@angular/router';
import { VendedorService } from '../../../shared/serviços/vendedor-service';
import { SweetAlertService } from '../../../shared/serviços/sweet-alert.service';

@Component({
  selector: 'app-cadastro-vendedor',
  templateUrl: './cadastro-vendedor.component.html',
  styleUrl: './cadastro-vendedor.component.scss'
})
export class CadastroVendedorComponent {

  vendedor: Vendedor = new Vendedor(0,'', '', '', '', new Date);
  hide = signal(true);


  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(private roteador:Router, private vendedorService: VendedorService, private SweetAlert: SweetAlertService) {
    const navigation = this.roteador.getCurrentNavigation();
    const state = navigation?.extras.state as { vendedor: Vendedor };
    if (state) {
      this.vendedor = state.vendedor;
    }
  }

  voltar() {
    this.roteador.navigate(['']);
  }

  cadastrar(){
    this.vendedorService.cadastrar(this.vendedor).subscribe({
      next: () => {
        this.roteador.navigate(['login'])
        this.SweetAlert.sucesso('Vendedor cadastrado com sucesso!')
      },
      error: (e) => this.SweetAlert.erro(e.error.message)
    });
    
  }
}
