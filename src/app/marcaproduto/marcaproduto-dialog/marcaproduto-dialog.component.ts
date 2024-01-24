import { Filtro } from 'src/app/model/filtro';
import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MarcaProduto } from 'src/app/model/marcaproduto';
import { MarcaprodutoService } from 'src/app/services/marcaproduto.service';
import { ErrohandlerService } from 'src/app/services/errohandler.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-marcaproduto-dialog',
  templateUrl: './marcaproduto-dialog.component.html',
  styleUrls: ['./marcaproduto-dialog.component.css']
})
export class MarcaprodutoDialogComponent {
  public marca = new MarcaProduto();
   public marcafiltro= new Filtro();
  public marcas: any[] = [];
  public totalRegistros = 0;
  constructor(
    public ref: DynamicDialogRef,
    private marcaprodutoService: MarcaprodutoService,
   private erroService :ErrohandlerService
  ) {}
  selecionarMarca(marca: any) {
    console.log(marca);
    this.ref.close(marca);
  }
  buscar(pagina: number = 0): void {
    this.marcafiltro.pagina = pagina;
    this.marcaprodutoService
      .pesquisar(this.marcafiltro)
       .pipe(
          catchError((erro: any) => {
             return throwError(() => this.erroService.erroHandler(erro));
           })
           )
      .subscribe((dados: any) => {
        console.log(dados.content);
        this.marcas = dados.content;
''
        this.totalRegistros = dados.totalElements;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.buscar(pagina);
  }
}
