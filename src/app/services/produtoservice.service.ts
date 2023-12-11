import { Injectable } from '@angular/core';
import { Filtro } from '../model/filtro';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Produto } from '../model/produto';
import { Observable } from 'rxjs';
import { config } from '../shared/config';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  constructor(private http: HttpClient) {}

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
}
