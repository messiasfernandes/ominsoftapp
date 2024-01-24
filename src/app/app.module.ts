import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListagemProdutosComponent } from './produtos/listagem-produtos/listagem-produtos.component';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localePt from '@angular/common/locales/pt';
import { PrimengModule } from './shared/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './shared/menu/menu.component';
import { CadadastroprodutoComponent } from './produtos/cadastroproduto/cadadstroproduto/cadadastroproduto.component';
import { MessageComponent } from './shared/message/message.component';
import { ProdutoService } from './services/produtoservice.service';
import { MessageService } from 'primeng/api';
import { ListasubgrupodialogComponent } from './subgrupo/listasubgrupodialog/listasubgrupodialog.component';
import { SubgrupoService } from './services/subgrupo.service';
import { MarcaprodutoDialogComponent } from './marcaproduto/marcaproduto-dialog/marcaproduto-dialog.component';



registerLocaleData(ptBr, localePt);

registerLocaleData(localePt, 'pt-BR');
@NgModule({
  declarations: [
    AppComponent,
    ListagemProdutosComponent,
    MenuComponent,
    CadadastroprodutoComponent,
    MessageComponent,
    ListasubgrupodialogComponent,
    MarcaprodutoDialogComponent,




  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PrimengModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    ProdutoService,    MessageService,SubgrupoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
