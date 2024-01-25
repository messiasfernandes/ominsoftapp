import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filtro } from '../model/filtro';
import { MarcaProduto } from '../model/marcaproduto';
import { Observable } from 'rxjs/internal/Observable';
import { config } from '../shared/config';

@Injectable({
  providedIn: 'root'
})
export class MarcaprodutoService {

   constructor(private http: HttpClient) {}

  pesquisar(filtro: Filtro): Observable<MarcaProduto> {
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
    const response = this.http.get<MarcaProduto>(`${config.baseurl}marcas`, {
      headers,
      params,
    });

    return response;
  }
  detalhar(id: number): Observable<MarcaProduto> {
    return this.http.get<MarcaProduto>(`${config.baseurl}marcas/${id}`);
  }
  salvar(objeto: MarcaProduto): Observable<MarcaProduto> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    const resposta = this.http.post<MarcaProduto>(
      `${config.baseurl}marcas`,
      objeto,
      { headers }
    );
    return resposta;
  }
  editar(objeto: MarcaProduto): Observable<any> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );

    return this.http.put<MarcaProduto>(
      `${config.baseurl}marcas/${objeto.id}`,
      objeto,
      { headers, observe: 'response' }
    );
  }
  excluir(id: number): Observable<any> {
    return this.http.delete(`${config.baseurl}marcas/${id}`);
  }

  }
