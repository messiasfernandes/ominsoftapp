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
  atributosdigitados: string = '';
  coresDigitadas: string = '';
  coresArray: string[] = [];
  novoTipo: string = '';
  novoValor: string = '';
  linhasArray: string[] = [];
  produtosksu: any[] = [];
  produtosku = new ProdutoSku();
  atributo = new Atributo();
  atributos: any[] = [];

  novoItem: string = '';
  @ViewChild('tempDataTable') tempDataTable: any;
  constructor(
    private arquivoService: ArquivoService,
    private zone: NgZone,
    private router: Router,
    private produtoService: ProdutoService,
    public dialogService: DialogService,
    private form: FormBuilder,
    private idParametro: ActivatedRoute,
    private formDialog: FormdialogService
  ) {}

  ngOnInit() {
    let codigoproduto = this.idParametro.snapshot.params['id'];

    if (codigoproduto) {
      console.log(codigoproduto);

      this.carregarProduto(codigoproduto);
    }
  }
  acdiconarAtributo() {
    this.tempDataTable?.initRowEdit({});
    this.atributos = this.novoValor.split(',').map((at) => at.trim());
    console.log(this.novoValor);

    if (this.produto.proutos_skus.length === 0) {
      // Execute este bloco de código apenas se proutos_skus estiver vazio
      for (var x in this.atributos) {
        this.produtosku.caracteristica = this.atributos[x];
        this.atributo.valor = this.produtosku.caracteristica;
        console.log(this.produtosku.caracteristica);
        this.produtosku.atributos.push(this.atributo);
        this.produto.proutos_skus.push(this.produtosku);
        console.log(this.atributo);
        this.produtosku = new ProdutoSku();
        this.atributo = new Atributo();
      }

    } else {
      this.atributos = this.novoValor.split(',').map((at) => at.trim());
      for (let x = 0; x < this.atributos.length; x++) {
        // Verifica se há um valor existente, se sim, concatena com o novo valor usando "|"
        this.atributo.valor = this.atributos[x];
        this.produto.proutos_skus[x].caracteristica =
          this.produto.proutos_skus[x].caracteristica
          ? this.produto.proutos_skus[x].caracteristica + ' | ' + this.atributos[x]
          : this.atributos[x];
          this.produto.proutos_skus[x].atributos.push(this.atributo)


          console.log(this.atributo)

          console.log(this.produtosku);
          this.produtosku = new ProdutoSku();
        this.atributo = new Atributo();
      }

      console.log("Já existem objetos em proutos_skus. Não foi adicionado nada.");

  }

  console.log(this.produto.proutos_skus);
  this.limpavalores();
}

removerLinha(index: number){
  this.produto.proutos_skus.splice(index, 1);
}
  adicionarLinha() {
    // Concatenar tipo e valor e adicionar ao array
    const linha = `${this.novoTipo}-${this.novoValor}`;
    this.novoValor.split(',').map((cor) => cor.trim());
    this.linhasArray.push(linha);

    // Limpar os campos de entrada
    this.novoTipo = '';
    this.novoValor = '';
  }
  limpavalores() {
    this.atributos. splice(0, this.atributos.length);
    this.novoValor='';
  }
  adicionarCores() {
    // Dividir a string de cores e adicionar ao array
    const novasCores = this.coresDigitadas.split(',').map((cor) => cor.trim());
    console.log(novasCores);
    // Adicionar ao array existente
    this.coresArray = this.coresArray.concat(novasCores);

    // Limpar a entrada
    this.coresDigitadas = '';
  }

  carregarProduto(codigoproduto: number) {
    console.log('inicou');
    this.produtoService.detalhar(codigoproduto).subscribe((data) => {
      console.log(data);
      if (data.subgrupo != null) {
        this.subgrupo = data.subgrupo;
      }
      if (data.marcaProduto != null) {
        this.marcaProduto = data.marcaProduto;
      }
      this.produto = data;
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
      var reader = new FileReader();
      reader.readAsDataURL(arquivo[0]);
      reader.onload = (event: any) => {
        console.log(event);
        this.url = event.target.result;
      };
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
  criarFormulario() {}
  geraform() {}
  salvar(form: NgForm) {
    console.log('Método salvar chamado!');
    this.zone.run(() => {
      console.log('Método salvar chamado!');
      console.log(form.value);
    });
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
  gerarEan13(produtosku: any, indice :number){


    this.produtoService.GerarEn13().subscribe(
    (codigoean: any)=>{
      console.log(codigoean.ean13+ "meu codigo")
      this.produto.proutos_skus[indice].codigoEan13Sku = codigoean.ean13

    }
  )
  }
}