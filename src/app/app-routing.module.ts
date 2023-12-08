
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Breadcrumb } from 'primeng/breadcrumb';
import { ListagemProdutosComponent } from './listadeprodutos/listagem-produtos/listagem-produtos.component';



const routes: Routes = [
  {
    path: 'produtos', component: ListagemProdutosComponent,
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
