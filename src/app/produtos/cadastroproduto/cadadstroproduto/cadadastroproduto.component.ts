import { Produto } from './../../../model/produto';
import { Atributo } from './../../../model/atributo';
import { Subgrupo } from '../../../model/subgrupo';
import { ProdutoI, Grupo } from '../../../modelo/modelo-dto';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MarcaProduto } from '../../../model/marcaproduto';
import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
} from '@angular/core';

import { SubgrupoI } from '../../../modelo/modelo-dto';
import { ArquivoService } from 'src/app/services/arquivo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produtoservice.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListasubgrupodialogComponent } from 'src/app/subgrupo/listasubgrupodialog/listasubgrupodialog.component';
import { FormdialogService } from 'src/app/services/formdialog.service';
import { ProdutoSku } from 'src/app/model/produto-sku';
import { Medida } from 'src/app/model/medida';
import { MessageService, SelectItem } from 'primeng/api';
import { HttpResponse } from '@angular/common/http';
import { ErrohandlerService } from 'src/app/services/errohandler.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-cadadstroproduto',
  templateUrl: './cadadstroproduto.component.html',
  styleUrls: ['./cadadstroproduto.component.css'],
})
export class CadadastroprodutoComponent implements OnInit {
  produto = new Produto();

  subgrupo = new Subgrupo();
  marcaProduto = new MarcaProduto();
  inputFile: any;
  pictureImage: any;
  pictureImageTxt = 'Escolha uma imagem';
  ref: DynamicDialogRef;
  url: string = '';

  novoTipo: string = '';
  novoValor: string = '';

  produtosksu: any[] = [];
  produtosku = new ProdutoSku();
  atributo = new Atributo();
  atributos: any[] = [];
  medidas: SelectItem[];

  novoItem: string = '';
  valoresEnum = Object.values(Medida);
  valorSelecionado: Medida;
  @ViewChild('tempDataTable') tempDataTable: any;
  bloqueiaboatao = false;
  constructor(
    private arquivoService: ArquivoService,
    private zone: NgZone,
    private router: Router,
    private produtoService: ProdutoService,
    public dialogService: DialogService,
    private form: FormBuilder,
    private idParametro: ActivatedRoute,
    private formDialog: FormdialogService,
    private errorHandler: ErrohandlerService,
    private messageService: MessageService
  ) {
    this.medidas = Object.keys(Medida).map((key) => ({
      label: Medida[key],
      value: key,
    }));
  }

  ngOnInit() {
    let codigoproduto = this.idParametro.snapshot.params['id'];

    if (codigoproduto) {
      console.log(codigoproduto);

      this.carregarProduto(codigoproduto);
    }
  }
  acdiconarAtributo() {
    this.tempDataTable?.initRowEdit({});
    this.produto.proutos_skus = this.produtoService.adicionarAtrituto(
      this.novoTipo,
      this.produto
    );
    this.limpavalores();
  }

  removerLinha(index: number) {
    this.produto.proutos_skus.splice(index, 1);
  }

  limpavalores() {
    //  this.atributos.splice(0, this.atributos.length);
    this.novoValor = '';
    this.novoTipo = '';
  }

  carregarProduto(codigoproduto: number) {

    this.produtoService.detalhar(codigoproduto).subscribe((data) => {
      console.log(data);
      if (data.subgrupo != null) {
        this.subgrupo = data.subgrupo;
      }
      if (data.marcaProduto != null) {
        this.marcaProduto = data.marcaProduto;
      }
      if (data.proutos_skus.length > 0) {
      }
      this.tempDataTable?.initRowEdit({});
      this.produto = data;
      console.log(this.produto)
      this.getbuscarfoto(this.produto.imagemPrincipal);
    });
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
        this.url = this.arquivoService.capitpurarImagem(arquivo)

      this.arquivoService.upload(formadata).subscribe((resposta) => {
        console.log(resposta);

        this.url = this.getbuscarfoto(this.produto.imagemPrincipal);
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

  salvar(form: NgForm) {
    console.log(this.produto);
    this.produto.subgrupo = this.subgrupo;
    this.produto.marcaProduto = this.marcaProduto;

    if (this.produto.id != null) {
      this.produtoService
        .editar(this.produto)
        .pipe(
          catchError((erro: any) => {
            return throwError(() => this.errorHandler.erroHandler(erro));
          })
        )
        .subscribe((response: HttpResponse<any>) => {
          const statusCode = response.status;
          console.log(statusCode);
          if (statusCode === 200) {
            this.messageService.add({
              severity: 'info',
              detail: 'Produto editado com sucesso!',
            });
          }
        });
    } else {
      console.log(this.produto);
      this.produtoService.salvar(this.produto).subscribe();
      this.messageService.add({
        severity: 'success',
        detail: 'Produto salvo com sucesso!',
      });
    }
    form.reset();
    this.router.navigate(['/produtos']);
  }
  async showEditarProdutoSlu(indice: number, produtosku: any) {
    const editedProdutoSku = await this.formDialog.showdialogProdutoSkuEditar(
      produtosku
    );



    editedProdutoSku.caracteristica = editedProdutoSku.atributos
      .map((atributo: any) => `${atributo.tipo}:${atributo.valor}`)
      .join(' | ');

    this.produto.proutos_skus[indice] = editedProdutoSku;

    console.log(this.produto.proutos_skus[indice]);
  }

  async showSubgrupo() {
    try {
      this.subgrupo = await this.formDialog.openSubgrupoDialog();
      console.log('Subgrupo Selecionado:', this.subgrupo);
      // Agora você pode usar o subgrupoSelecionado como necessário.
    } catch (error) {
      console.log('Operação cancelada ou ocorreu um erro.');
    }
  }

  async shoMarca() {
    try {
      this.marcaProduto = await this.formDialog.openMarcaProdutoDiagoialog();
      console.log('Subgrupo Selecionado:', this.marcaProduto);
      // Agora você pode usar o subgrupoSelecionado como necessário.
    } catch (error) {
      console.log('Operação cancelada ou ocorreu um erro.');
    }
  }
  gerarEan13(indice: number) {
    this.produtoService.GerarEn13().subscribe((codigoean: any) => {
      console.log(codigoean.ean13 + 'meu codigo');
      this.produto.proutos_skus[indice].codigoEan13Sku = codigoean.ean13;
    });
  }
}
