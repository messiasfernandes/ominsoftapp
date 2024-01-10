import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Filtro } from 'src/app/model/filtro';
import { ProdutoService } from 'src/app/services/produtoservice.service';

@Component({
  selector: 'app-listagem-produtos',
  templateUrl: './listagem-produtos.component.html',
  styleUrls: ['./listagem-produtos.component.css']
})
export class ListagemProdutosComponent implements OnInit {
  produtofiltro = new Filtro();
  produtos: any[] = [];

  numeros : number[]=[1, 2, 3 ,4, 5 ,6]
  totalRegistros = 0;
  constructor(private produtoServcice : ProdutoService){

  }
  ngOnInit(): void {
    this.buscar();
  }

  buscar(pagina: number = 0): void {
    this.produtofiltro.pagina = pagina;
    this.produtoServcice
      .pesquisar(this.produtofiltro)
     // .pipe(
     //   catchError((erro: any) => {
        //  return throwError(() => this.erroService.erroHandler(erro));
      //  })
    //  )
      .subscribe((dados: any) => {
        console.log(dados.content);
        this.produtos = dados.content;

        this.totalRegistros = dados.totalElements;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.buscar(pagina);
  }

}
