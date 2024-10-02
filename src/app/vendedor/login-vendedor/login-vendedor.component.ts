import { Component, signal } from '@angular/core';
import { VendedorService } from '../../../shared/serviços/vendedor-service';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../../shared/serviços/sweet-alert.service';
import { Vendedor } from '../../../shared/modelos/vendedor-model';

@Component({
  selector: 'app-login-vendedor',
  templateUrl: './login-vendedor.component.html',
  styleUrl: './login-vendedor.component.scss'
})
export class LoginVendedorComponent {
  email: string = '';
  logado = false;
  senha: string = '';
  hide = signal(true);
  vendedor: Vendedor = new Vendedor(0, '', '', '', '', new Date);


  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  constructor(private vendedorService: VendedorService, private roteador: Router, private SweetAlert: SweetAlertService) { }

  cadastrar() {
    this.roteador.navigate(['cadastro-vendedor'])
  }

  async login() {
    try {
      this.logado = true;
      this.vendedor = await this.vendedorService.validarLogin(this.email, this.senha);
      this.roteador.navigate(['listagem-produto'], { state: {vendedor: this.vendedor}});

    } catch (e: any) {
      this.SweetAlert.erro(e.message);

    }


  }
}
