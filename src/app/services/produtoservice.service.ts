import { Injectable } from '@angular/core';
import { Filtro } from '../model/filtro';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Produto } from '../model/produto';
import { Observable, map, single } from 'rxjs';
import { config } from '../shared/config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListasubgrupodialogComponent } from '../subgrupo/listasubgrupodialog/listasubgrupodialog.component';
import { Subgrupo } from '../model/subgrupo';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  ref: DynamicDialogRef;
  constructor(private http: HttpClient, public dialogService: DialogService) {}

  pesquisar(filtro: Filtro): Observable<Produto> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if (filtro.parametro) {
      params = params.set('parametro', filtro.parametro);
    }
    const response = this.http.get<Produto>(`${config.baseurl}produtos`, {
      headers,
      params,
    });

    return response;
  }
  detalhar(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${config.baseurl}produtos/${id}`);
  }
  salvar(objeto: Produto): Observable<Produto> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    const resposta = this.http.post<Produto>(
      `${config.baseurl}produtos`,
      objeto,
      { headers }
    );
    return resposta;
  }
  editar(objeto: Produto): Observable<any> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );

    return this.http.put<Produto>(
      `${config.baseurl}produtos/${objeto.id}`,
      objeto,
      { headers, observe: 'response' }
    );
  }

  GerarEn13(): Observable<string> {
    return this.http.post<string>(
      `${config.baseurl}produtos/gerarean13`,
      {},
      {
        observe: 'response',
      }
    ).pipe(
      map(response => response.body as string) // Extrair o corpo da resposta e convertê-lo em string
    );
  }
}
