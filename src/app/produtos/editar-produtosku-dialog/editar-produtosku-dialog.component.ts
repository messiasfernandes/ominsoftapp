import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs/internal/Observable';
import { Atributo } from 'src/app/model/atributo';
import { Imagemproduto } from 'src/app/model/imagemproduto';
import { ProdutoSku } from 'src/app/model/produto-sku';
import { ArquivoService } from 'src/app/services/arquivo.service';
import { ErrohandlerService } from 'src/app/services/errohandler.service';
import { ProdutoService } from 'src/app/services/produtoservice.service';

@Component({
  selector: 'app-editar-produtosku-dialog',
  templateUrl: './editar-produtosku-dialog.component.html',
  styleUrls: ['./editar-produtosku-dialog.component.css'],
})
export class EditarProdutoskuDialogComponent {
  public produtoSku = new ProdutoSku();
  public atributo = new Atributo();
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  urls?: String[] = [];
  uri: string = '';
  previews: string[] = [];
  imageInfos?: Observable<any>;
  constructor(
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    private errorHandler: ErrohandlerService,
    private serviceProduto: ProdutoService,
    public config: DynamicDialogConfig,
    private arquivoService: ArquivoService
  ) {
    if (this.config.data && this.config.data.objetoOriginal != null) {
      this.produtoSku = this.config.data.objetoOriginal;


    }
  }
  remover(index: number) {
    this.produtoSku.atributos.splice(index, 1);
  }
  selecionarProduto() {
    this.ref.close(this.produtoSku);
  }
  addAtributo() {
    this.produtoSku.atributos.push(this.atributo);
    this.atributo = new Atributo();
  }
  upLoad() {
    let input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';

    input.onchange = () => {
      let arquivos: FileList | null = input.files;
      if (!this.produtoSku.imagens) {
        this.produtoSku.imagens = [];
      }
      if (arquivos) {
        // window.alert('Passou');
        const formadata = new FormData();

        for (let i = 0; i < arquivos.length; i++) {
          let imagemProduto = new Imagemproduto();
          imagemProduto.nomeArquivo = arquivos[i].name;
          imagemProduto.contentType = arquivos[i].type;

          this.produtoSku.imagens.push(imagemProduto);
          formadata.append('arquivo', arquivos[i]);
          console.log(
            `Nome do arquivo: ${imagemProduto.nomeArquivo}, Tipo de conteúdo: ${imagemProduto}`
          );
          var reader = new FileReader();
          reader.readAsDataURL(arquivos[i]);
          reader.onload = (e: any) => {
            this.uri = e.target.result;
            this.urls.push(this.uri);
          };
          console.log(this.produtoSku);
          console.log(formadata);


        }
        this.arquivoService.upload(formadata).subscribe((resposta) => {
          console.log(resposta);

          this.getbuscarfoto();
        });
      }
    };
    // Correção: use 'click()' em vez de 'Click()'
    input.click();
  }
  getbuscarfoto() {

    console.log(this.produtoSku.imagens);
    if (this.produtoSku.imagemPrincipal.length > 0) {
      for (let i = 0; i < this.urls.length; i++) {
        this.uri = this.arquivoService.buscarfoto(
          this.produtoSku.imagens[i].nomeArquivo
        );
        this.urls.push(this.uri);
        console.log(this.urls)
      }
    } else {
      ///  this.url = '/assets/no-image-icon.jpg';
    }
    return this.urls;
  }
  previewImages(event: any) {
    const inputImagens = document.getElementById('inputImagens');

    // Receber o seletor para enviar o preview das imagens
    const previewImagem = document.getElementById('previewImagem');

    // Aguardar alteração no campo de imagens
    inputImagens.addEventListener('change', function (e: any) {
      // Limpar o seletor que recebe o preview das imagens
      previewImagem.innerHTML = '';

      // Percorrer a lista de arquivos selecionados
      for (const arquivo of e.target.files) {
        console.log(arquivo);

        // Criar a TAG <img>, no atributo src atribuir a imagem e no atributo alt o nome
        const imagemHTML = `<img src="${URL.createObjectURL(arquivo)}" alt="${
          arquivo.name
        }" style="max-width: 200px; margin: 10px;">`;

        // Enviar para o HTML a imagem, beforeend - adicionar a image no final
        previewImagem.insertAdjacentHTML('beforeend', imagemHTML);
      }
    });
  }
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

    if (!this.produtoSku.imagens) {
      this.produtoSku.imagens = [];
      this.previews = [];
      if (this.selectedFiles && this.selectedFiles[0]) {
        const numberOfFiles = this.selectedFiles.length;
        const formadata = new FormData();
        for (let i = 0; i < numberOfFiles; i++) {
          let arquivo = this.selectedFiles[i];
          formadata.append('arquivos', arquivo);

          let imagemProduto = new Imagemproduto();
          imagemProduto.nomeArquivo = arquivo.name;
          imagemProduto.contentType = arquivo.type;
          imagemProduto.tamanho=arquivo.size;

          this.produtoSku.imagens.push(imagemProduto);
          const reader = new FileReader();

          reader.onload = (e: any) => {
            console.log(e.target.result);
            this.previews.push(e.target.result);
          };

          reader.readAsDataURL(this.selectedFiles[i]);
        }
      }
    }
  }
}
