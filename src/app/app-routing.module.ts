
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Breadcrumb } from 'primeng/breadcrumb';
import { ListagemProdutosComponent } from './produtos/listagem-produtos/listagem-produtos.component';
import { CadadstroprodutoComponent } from './produtos/cadastroproduto/cadadstroproduto/cadadstroproduto.component';



const routes: Routes = [
  {
    path: 'produtos', component: ListagemProdutosComponent,

 },
 {
  path: 'produtos/novo', component: CadadstroprodutoComponent
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
