import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Atributo } from 'src/app/model/atributo';
import { ProdutoSku } from 'src/app/model/produto-sku';
import { ErrohandlerService } from 'src/app/services/errohandler.service';

@Component({
  selector: 'app-editar-produtosku-dialog',
  templateUrl: './editar-produtosku-dialog.component.html',
  styleUrls: ['./editar-produtosku-dialog.component.css']
})
export class EditarProdutoskuDialogComponent {
  public produtoSku = new ProdutoSku();
  public atributo = new Atributo();
  constructor(

    private messageService: MessageService,
    public ref: DynamicDialogRef,
    private errorHandler: ErrohandlerService,

    public config: DynamicDialogConfig
  ) {

    if (this.config.data && this.config.data.objetoOriginal != null) {
      this.produtoSku = this.config.data.objetoOriginal;
    }
  }
  remover(index:number){
    this.produtoSku.atributos.splice(index, 1);
  }
  selecionarProduto() {
    this.ref.close(this.produtoSku);
  }
  addAtributo() {
    this.produtoSku.atributos.push(this.atributo);
    this.atributo = new Atributo();
  }
}
