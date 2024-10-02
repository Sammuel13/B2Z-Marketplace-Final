import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatRadioButton } from '@angular/material/radio';
import { MatRadioModule } from '@angular/material/radio';
import { MatOption } from '@angular/material/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSelect } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {  MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatRadioModule,
    MatRadioButton,
    MatOption,
    MatCheckbox,
    MatSelect,
    MatDatepickerModule,
    MatChipsModule,
    MatTableModule

  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatRadioModule,
    MatRadioButton,
    MatRadioModule,
    MatRadioButton,
    MatRadioModule,
    MatOption,
    MatCheckbox,
    MatSelect,
    MatDatepickerModule,
    MatChipsModule,
    MatTableModule
  ]

})
export class AngularMaterialModule { }
