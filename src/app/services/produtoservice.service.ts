import { ProdutoSku } from './../model/produto-sku';
import { Injectable } from '@angular/core';
import { Filtro } from '../model/filtro';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Produto } from '../model/produto';
import { Observable, map, single } from 'rxjs';
import { config } from '../shared/config';
import { DialogService } from 'primeng/dynamicdialog';

import { Atributo } from '../model/atributo';
@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  produtosku = new ProdutoSku();
  atributo = new Atributo();
  atributos: any[] = [];
  constructor(private http: HttpClient, public dialogService: DialogService) {}
 adicionarAtrituto(chaveValor:string, produto:Produto): ProdutoSku[]{
  this.atributos = chaveValor.split(';').map((at) => at.trim());
    console.log(chaveValor);
    let caracteristicaConcatenada = '';

      for (let i = 0; i < this.atributos.length; i++) {


        // Dividir cada atributo em chave e valor
        const partes = this.atributos[i].split(':');
        if (partes.length === 2) {
          console.log(partes)
          // Atribuir valores ao objeto Atributo
         this. atributo.tipo = partes[0].trim();
     this.atributo.valor    = partes[1].trim();
          console.log(this.atributo);

          // Atribuir valores ao objeto ProdutoSku

          if (caracteristicaConcatenada !== '') {
            caracteristicaConcatenada += ' | ';
          }
          caracteristicaConcatenada  += `${this.atributo.tipo}: ${this.atributo.valor} `;
         this. produtosku.atributos.push(this.atributo);
        this.atributo = new Atributo();
          // Adicionar à lista de proutos_skus

        }
      this.produtosku.caracteristica= caracteristicaConcatenada;
      }

      produto.proutos_skus.push(this.produtosku);

  // }
    console.log(this.produtosku);
    this.produtosku = new ProdutoSku();
    console.log(produto)
    this.limpavalores(chaveValor);
    return produto.proutos_skus
 }
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
  limpavalores(valor:string) {
    this.atributos.splice(0, this.atributos.length);
    valor='';
 //   this.novoValor = '';
  //  this.novoTipo = '';
  }
}
