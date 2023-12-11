import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], exports : [
    InputTextModule,
    TableModule,
    ButtonModule
  ]


})
export class PrimengModule { }
