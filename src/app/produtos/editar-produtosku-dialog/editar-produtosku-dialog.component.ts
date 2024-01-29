import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs/internal/Observable';
import { Atributo } from 'src/app/model/atributo';
import { Imagemproduto } from 'src/app/model/imagemproduto';
import { ProdutoSku } from 'src/app/model/produto-sku';
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

  previews: string[] = [];
  imageInfos?: Observable<any>;
  constructor(
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    private errorHandler: ErrohandlerService,
    private serviceProduto: ProdutoService,
    public config: DynamicDialogConfig
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
    input.accept = "image/*";

    input.onchange = () => {
        let arquivos: FileList | null = input.files;
        if (!this.produtoSku.imagemsproduto) {
          this.produtoSku.imagemsproduto = [];
      }
        if (arquivos) {
            window.alert('Passou');
            const formadata = new FormData();

            for (let i = 0; i < arquivos.length; i++) {
                let arquivo = arquivos[i];

                formadata.append('arquivos', arquivo);

                let imagemProduto = new Imagemproduto();
                imagemProduto.nomeArquivo = arquivo.name;
                imagemProduto.contentType = arquivo.type;

                this.produtoSku.imagemsproduto.push(imagemProduto);

                console.log(`Nome do arquivo: ${imagemProduto.nomeArquivo}, Tipo de conteúdo: ${imagemProduto.url}`);
                var reader = new FileReader();
                reader.readAsDataURL(arquivo);
                reader.onload = (e: any) => {
                    imagemProduto.url = e.target.result;

            }

            console.log(this.produtoSku);

            // Agora você pode enviar formadata para o servidor usando um serviço HTTP
            // Exemplo fictício:
            // this.http.post('sua_url_de_upload', formadata).subscribe(response => {
            //     console.log(response);
            // });
        }
    };
  }
    // Correção: use 'click()' em vez de 'Click()'
    input.click();
  }

  previewImages(event: any) {
    const inputImagens = document.getElementById("inputImagens");

    // Receber o seletor para enviar o preview das imagens
    const previewImagem = document.getElementById("previewImagem");

    // Aguardar alteração no campo de imagens
    inputImagens.addEventListener("change", function (e:any) {

        // Limpar o seletor que recebe o preview das imagens
        previewImagem.innerHTML = "";

        // Percorrer a lista de arquivos selecionados
        for (const arquivo of e.target.files) {
            console.log(arquivo);

            // Criar a TAG <img>, no atributo src atribuir a imagem e no atributo alt o nome
            const imagemHTML = `<img src="${URL.createObjectURL(arquivo)}" alt="${arquivo.name}" style="max-width: 200px; margin: 10px;">`;

            // Enviar para o HTML a imagem, beforeend - adicionar a image no final
            previewImagem.insertAdjacentHTML("beforeend", imagemHTML);
        }

    });
  }
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
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
