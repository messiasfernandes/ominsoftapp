import { Injectable } from '@angular/core';
import { config } from '../shared/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {


  constructor(private http: HttpClient) { }

  upload(arquivo: FormData): Observable<any> {

    return this.http
      .post(`${config.baseurl}arquivos/fotos`, arquivo);

  }
  buscarfoto(parametro: string){
    var arquivo :string;

     arquivo= `${config.baseurl}arquivos/fotos/`+ parametro;

   return arquivo;
  }

  removerArquivo(nomeArquivo: string){
    window.alert("pasou"+ nomeArquivo)
    return this.http
    .delete(`${config.baseurl}arquivos/fotos/${nomeArquivo}`,)
    .subscribe(
    () => null);
  }
  enviarNota(arquivo: FormData): Observable<any> {

    return this.http
      .post(`${config.baseurl}arquivos`, arquivo);

  }
  capitpurarImagem(file: File):any{
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (event: any) => {
      console.log(event);
     return event.target.result;

  }
}
adiconarImagem (input:any): string{
   input = document.createElement('input');
   let url=''
  input.type = 'file';
  input.onchange = (_) => {
    let arquivo: any = Array.from(input.files as any);
    const formadata = new FormData();
    formadata.append('arquivo', arquivo[0]);
 //   if (arquivo[0].name) {
 // //    this.removerArquivo(arquivo[0].name);
 //   }
 ///   this.produto.imagemPrincipal = arquivo[0].name;
    var reader = new FileReader();
    reader.readAsDataURL(arquivo[0]);
    reader.onload = (event: any) => {
      console.log(event);
       url = event.target.result;
    };
   this.upload(formadata).subscribe((resposta) => {
      console.log(resposta);

      url = this.buscarfoto(arquivo[0].name);
      /// this.produto.imagemproduto = resposta.nomeArquivo;
    });
  console.log(url)
    ///  this.getbuscarfoto(this.produtoVariacao.imagemPrncipal);
  };
  input.click();
return url
}
}
