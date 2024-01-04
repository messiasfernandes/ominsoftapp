import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Breadcrumb } from 'primeng/breadcrumb';
import { ListagemProdutosComponent } from './produtos/listagem-produtos/listagem-produtos.component';
import { CadadastroprodutoComponent } from './produtos/cadastroproduto/cadadstroproduto/cadadastroproduto.component';

const routes: Routes = [
  {
    path: 'produtos',
    component: ListagemProdutosComponent,
  },
  {
    path: 'produtos/novo',
    component: CadadastroprodutoComponent,
  },
  { path: 'produtos/:id', component: CadadastroprodutoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
