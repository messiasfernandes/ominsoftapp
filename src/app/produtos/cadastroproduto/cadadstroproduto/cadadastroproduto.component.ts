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
} from '@angular/core';
import { Produto } from 'src/app/model/produto';
import { SubgrupoI } from '../../../modelo/modelo-dto';
import { ArquivoService } from 'src/app/services/arquivo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produtoservice.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListasubgrupodialogComponent } from 'src/app/subgrupo/listasubgrupodialog/listasubgrupodialog.component';
import { FormdialogService } from 'src/app/services/formdialog.service';

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

  constructor(
    private arquivoService: ArquivoService,
    private zone: NgZone,
    private router: Router,
    private produtoService: ProdutoService,
    public dialogService: DialogService,
    private form: FormBuilder,
    private idParametro: ActivatedRoute,
    private formDialog :FormdialogService
  ) {}

  ngOnInit() {
    let codigoproduto = this.idParametro.snapshot.params['id'];

    if (codigoproduto) {
      console.log(codigoproduto);

      this.carregarProduto(codigoproduto);
    }
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
  async   showSubgrupo() {

    try {
      this.subgrupo = await this.formDialog.openSubgrupoDialog();
      console.log('Subgrupo Selecionado:', this.subgrupo);
      // Agora você pode usar o subgrupoSelecionado como necessário.
    } catch (error) {
      console.log('Operação cancelada ou ocorreu um erro.');
    }

  }
}
