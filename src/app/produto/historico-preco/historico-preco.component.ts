import { Component, Input } from '@angular/core';
import { Produto } from '../../../shared/modelos/produto-model';



export interface P {
  preco: string;
  data: string;
}

const ELEMENT_DATA: P[] = [
  {preco: '5.000', data: '23/08/2001'},
  {preco: '4.000', data: '01/01/2025'},

];


@Component({
  selector: 'app-historico-preco',
  templateUrl: './historico-preco.component.html',
  styleUrl: './historico-preco.component.scss'
})



export class HistoricoPrecoComponent {

  @Input() produto!: Produto;
 

  displayedColumns: string[] = ['preco', 'data'];
  dataSource = ELEMENT_DATA;

}
