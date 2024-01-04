import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subgrupo } from '../model/subgrupo';
import { ListasubgrupodialogComponent } from '../subgrupo/listasubgrupodialog/listasubgrupodialog.component';

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
}
