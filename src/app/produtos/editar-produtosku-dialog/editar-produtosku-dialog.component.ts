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
  imagemProduto = new Imagemproduto();
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
      if (this.produtoSku.imagens.length > 0) {
        this.getbuscarfoto();
      }
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
          this.imagemProduto.nomeArquivo = arquivos[i].name;
          this.imagemProduto.contentType = arquivos[i].type;
          this.imagemProduto.tamanho = arquivos[i].size;

          formadata.append('arquivo', arquivos[i]);
          if (this.urls.length> 0) {
            let i = 0;
            while (i < this.produtoSku.imagens.length) {
                this.arquivoService.removerArquivo(this.produtoSku.imagens[i].nomeArquivo);

                // Remover o elemento atual do array produtoSku.imagens
                this.produtoSku.imagens.splice(i, 1);

                // Limpar o array urls
                this.urls.splice(i,1);
            }
        }
        this.produtoSku.imagens.push(this.imagemProduto);
          console.log(
            `Nome do arquivo: ${this.imagemProduto.nomeArquivo}, Tipo de conteúdo: ${this.imagemProduto}`
          );
          var reader = new FileReader();
          reader.readAsDataURL(arquivos[i]);
          reader.onload = (e: any) => {
            this.uri = e.target.result;
            this.urls.push(this.uri);
          };
          console.log(this.produtoSku);
          console.log(formadata);

          this.imagemProduto = new Imagemproduto();
        }
        this.arquivoService.upload(formadata).subscribe((resposta) => {
          console.log(resposta);

          //    this.getbuscarfoto();
        });
      }
    };
    // Correção: use 'click()' em vez de 'Click()'
    input.click();
  }
  getbuscarfoto() {
    console.log(this.produtoSku.imagens);
    if (this.produtoSku.imagens.length > 0) {
      for (let i = 0; i < this.produtoSku.imagens.length; i++) {
        this.uri = this.arquivoService.buscarfoto(
          this.produtoSku.imagens[i].nomeArquivo
        );
        this.urls.push(this.uri);
        console.log(this.urls);
      }
    } else {
      ///  this.url = '/assets/no-image-icon.jpg';
    }
    return this.urls;
  }


}
