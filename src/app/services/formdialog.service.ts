import { MarcaProduto } from './../model/marcaproduto';
import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subgrupo } from '../model/subgrupo';
import { ListasubgrupodialogComponent } from '../subgrupo/listasubgrupodialog/listasubgrupodialog.component';

import { MarcaprodutoDialogComponent } from '../marcaproduto/marcaproduto-dialog/marcaproduto-dialog.component';
import { CadastroMmarcaprodutoDialogComponent } from '../marcaproduto/cadastro-mmarcaproduto-dialog/cadastro-mmarcaproduto-dialog.component';
import { ProdutoSku } from '../model/produto-sku';
import { EditarProdutoskuDialogComponent } from '../produtos/editar-produtosku-dialog/editar-produtosku-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class FormdialogService {
private ref: DynamicDialogRef;
  constructor( public dialogService: DialogService) { }
  async openSubgrupoDialog(): Promise<Subgrupo> {
    return new Promise<Subgrupo>((resolve, reject) => {
      const sub = new Subgrupo();

      const ref = this.dialogService.open(ListasubgrupodialogComponent, {
        header: 'Lista de SubCategorias',
        width: '90%',
        modal: true,
        styleClass: "{'960px': '70vw'}",
        contentStyle: { overflow: 'hidden' },
        resizable: false,
        baseZIndex: 10000,
      });

      ref.onClose.subscribe((subgrupo: Subgrupo) => {
        if (subgrupo) {
          console.log(subgrupo);
          resolve(subgrupo);
        } else {
          reject(); // ou resolve(null) se preferir
        }
      });
    });
  }

  async openMarcaProdutoDiagoialog(): Promise<MarcaProduto> {
    return new Promise<MarcaProduto>((resolve, reject) => {


      const ref = this.dialogService.open(MarcaprodutoDialogComponent, {
        header: 'Lista de Marcas',
        width: '50%',
        modal: true,
        styleClass: "{'460px': '70vw'}",
        contentStyle: { overflow: 'hidden' },
        resizable: false,
        baseZIndex: 10000,
      });

      ref.onClose.subscribe((marca: MarcaProduto) => {
        if (marca) {
          console.log(marca);
          resolve(marca);
        } else {
          reject(); // ou resolve(null) se preferir
        }
      });
    });
  }
  cadastroMarcaiadialog(){

    this.ref = this.dialogService.open(CadastroMmarcaprodutoDialogComponent, {
        header: ' Adicionar Marca',
        width: '40%', modal:true,
     //   maximizable: true,

     //  styleClass: "{'960px': '70vw'}",
//      contentStyle: { 'max-height': '800px', overflow: 'auto' },

       // resizable: false,

       // baseZIndex: 10000,
        // style:"width:55vw!important; height:70% !important; top:25% !important; left: 30% !important;"
      });
      this.ref.onClose.subscribe((marca: MarcaProduto) => {
        if (marca) {
         this.addMarca(marca)
        }
      });

    }
    addMarca( marca: MarcaProduto){
      return marca
    }
 async showdialogMarcaEdit(marca:any): Promise<MarcaProduto>{
  return new Promise<MarcaProduto>((resolve, reject) => {
    this.ref = this.dialogService.open(CadastroMmarcaprodutoDialogComponent, {
       data: {
         objetoOriginal: marca
       },
       modal: true,
       header: 'Editar Marca',
       width: '70%'
     });

    this. ref.onClose.subscribe((objetoEditado:MarcaProduto) => {
      if (objetoEditado) {
        console.log(objetoEditado);
        resolve(objetoEditado);
      } else {
        reject(); // ou resolve(null) se preferir
      }
    });


  });
 }
 async showdialogProdutoSkuEditar(produtoSku:any): Promise<ProdutoSku>{
  return new Promise<ProdutoSku>((resolve, reject) => {
    this.ref = this.dialogService.open(EditarProdutoskuDialogComponent, {
       data: {
         objetoOriginal: produtoSku
       },
       modal: true,
       header: 'Editar Marca',
       width: '70%'
     });

    this. ref.onClose.subscribe((objetoEditado:ProdutoSku) => {
      if (objetoEditado) {
        console.log(objetoEditado);
        resolve(objetoEditado);
      } else {
        reject(); // ou resolve(null) se preferir
      }
    });


  });
 }
}
