import { Filtro } from 'src/app/model/filtro';
import { Component, ViewChild } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { MarcaProduto } from 'src/app/model/marcaproduto';
import { MarcaprodutoService } from 'src/app/services/marcaproduto.service';
import { ErrohandlerService } from 'src/app/services/errohandler.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { FormdialogService } from 'src/app/services/formdialog.service';

@Component({
  selector: 'app-marcaproduto-dialog',
  templateUrl: './marcaproduto-dialog.component.html',
  styleUrls: ['./marcaproduto-dialog.component.css']
})
export class MarcaprodutoDialogComponent {
  public marca = new MarcaProduto();
  @ViewChild('tabela') grid: any;
   public marcafiltro= new Filtro();
  public marcas: any[] = [];
  public totalRegistros = 0;
  constructor(
    public ref: DynamicDialogRef,
    private marcaprodutoService: MarcaprodutoService,
   private erroService :ErrohandlerService,
   private formDiaologService: FormdialogService,
   private confirmacao: ConfirmationService,
   private messageService: MessageService
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
  showMarca() {
    this.formDiaologService.cadastroMarcaiadialog();
  }
  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.buscar(pagina);
  }
 async editaMarca(marca: any) {
    this.formDiaologService.showdialogMarcaEdit(marca);

  }

  excluir(produto: any) {
    this.marcaprodutoService.excluir(produto.id)
    .pipe(
      catchError((erro: any) => {
        return throwError(() => this.erroService.erroHandler(erro));
      })
    )
    .subscribe(() => {
      this.buscar();
      this.grid.first = 0;
      this.messageService.add({
        severity: 'success',
        detail: ' Excluida com sucesso!',
      });
    });
  }
  confirmarExclusao(produto: any) {
    this.confirmacao.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(produto);
      },
    });
  }
}
