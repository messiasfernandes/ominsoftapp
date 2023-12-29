import { NgForm } from '@angular/forms';
import { MarcaProduto } from './../../../model/marcaproduto';
import { Component, OnInit, ElementRef, Renderer2, NgZone } from '@angular/core';
import { Produto } from 'src/app/model/produto';
import { Subgrupo } from 'src/app/model/subgrupo';
import { ArquivoService } from 'src/app/services/arquivo.service';

@Component({
  selector: 'app-cadadstroproduto',
  templateUrl: './cadadstroproduto.component.html',
  styleUrls: ['./cadadstroproduto.component.css'],
})
export class CadadstroprodutoComponent implements OnInit {
  produto = new Produto();
  subgrupo= new  Subgrupo ();
   marcaProduto = new    MarcaProduto()
  inputFile: any;
  pictureImage: any;
  pictureImageTxt = "Escolha uma imagem";
   url:string='';
  constructor( private arquivoService: ArquivoService, private zone: NgZone) {}

  ngOnInit() {

  }


  upLoad() {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = (_) => {

      let arquivo: any = Array.from(input.files as any);
      const formadata = new FormData();
      formadata.append('arquivo', arquivo[0]);
      if (this.produto.imagemPrincipal) {
        this.arquivoService.removerArquivo(this.produto.imagemPrincipal);
      }
      this.produto.imagemPrincipal = arquivo[0].name;
      var reader = new FileReader();
      reader.readAsDataURL(arquivo[0]);
      reader.onload = (event: any) => {
        console.log(event);
        this.url = event.target.result;
      };
      this.arquivoService.upload(formadata).subscribe((resposta) => {
        console.log(resposta);

       this.url=this.getbuscarfoto(this.produto.imagemPrincipal)
        /// this.produto.imagemproduto = resposta.nomeArquivo;
      });

      ///  this.getbuscarfoto(this.produtoVariacao.imagemPrncipal);
    };
    input.click();
  }
  getbuscarfoto(image: string) {
    console.log(image);
    if (image) {
      this.url = this.arquivoService.buscarfoto(image);
    } else {
    ///  this.url = '/assets/no-image-icon.jpg';
    }
    return this.url;
  }
  salvar(form: NgForm){
    console.log('Método salvar chamado!');
    this.zone.run(() => {
      console.log('Método salvar chamado!');
     console.log(form.value);
      // form.reset();
    });
  }
}
