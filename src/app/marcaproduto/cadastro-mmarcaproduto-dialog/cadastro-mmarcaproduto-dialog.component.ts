import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { MarcaProduto } from 'src/app/model/marcaproduto';
import { ErrohandlerService } from 'src/app/services/errohandler.service';
import { MarcaprodutoService } from 'src/app/services/marcaproduto.service';

@Component({
  selector: 'app-cadastro-mmarcaproduto-dialog',
  templateUrl: './cadastro-mmarcaproduto-dialog.component.html',
  styleUrls: ['./cadastro-mmarcaproduto-dialog.component.css'],
})
export class CadastroMmarcaprodutoDialogComponent {
  public marcaProduto = new MarcaProduto();
  constructor(
    private marcaProdutoservice: MarcaprodutoService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    private errorHandler: ErrohandlerService,

    public config: DynamicDialogConfig
  ) {

    if (this.config.data && this.config.data.objetoOriginal != null) {
      this.marcaProduto = this.config.data.objetoOriginal;
    }
  }

  salvar(form: NgForm) {
    let erroOcorrido= false;
    if (this.marcaProduto.id != null) {

     this.marcaProdutoservice
       .editar(this.marcaProduto)
       .pipe(
         catchError((erro: any) => {
           return throwError(() => this.errorHandler.erroHandler(erro));
         })
       )
       .subscribe((response: MarcaProduto) => {
             console.log(response)
      {
           this.messageService.add({
             severity: 'info',
             detail: 'subcategoria editado com sucesso!',
           });
          // form.reset();
         this.selecionarMarca()
         }
       });
     }else
     this.marcaProdutoservice.salvar(this.marcaProduto)
     .pipe(
       catchError((erro: any) => {
         erroOcorrido = true;
         this.errorHandler.erroHandler(erro);
         return throwError(() => erro);
       })
     )
     .subscribe(() => {
       if (!erroOcorrido) {
         this.messageService.add({
           severity: 'success',
           detail: 'Subcategoria salva com sucesso!',
         });

       }
     });;
    // form.reset();
     this.ref.close();
   }
   selecionarMarca() {
    this.ref.close(this.marcaProduto);
  }
}
