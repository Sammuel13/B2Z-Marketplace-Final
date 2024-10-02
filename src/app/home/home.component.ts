import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  login() {
    this.router.navigate(['/login']);
  }

  cadastro() {
    this.router.navigate(['/cadastro-vendedor']);
  }
  
  constructor(private router: Router) {
  }



}
