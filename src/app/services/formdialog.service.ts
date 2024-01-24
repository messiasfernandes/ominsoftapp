import { MarcaProduto } from './../model/marcaproduto';
import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subgrupo } from '../model/subgrupo';
import { ListasubgrupodialogComponent } from '../subgrupo/listasubgrupodialog/listasubgrupodialog.component';

import { MarcaprodutoDialogComponent } from '../marcaproduto/marcaproduto-dialog/marcaproduto-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class FormdialogService {
private ref: DynamicDialogRef;
  constructor( public dialogService: DialogService) { }
  async
  openSubgrupoDialog(): Promise<Subgrupo> {
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
      const marca = new MarcaProduto();

      const ref = this.dialogService.open(MarcaprodutoDialogComponent, {
        header: 'Lista de SubCategorias',
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
}
