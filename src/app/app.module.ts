import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListagemProdutosComponent } from './listadeprodutos/listagem-produtos/listagem-produtos.component';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localePt from '@angular/common/locales/pt';
import { PrimengModule } from './shared/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './shared/menu/menu.component';
import { CadadstroprodutoComponent } from './listadeprodutos/cadastroproduto/cadadstroproduto/cadadstroproduto.component';

registerLocaleData(ptBr, localePt);

registerLocaleData(localePt, 'pt-BR');
@NgModule({
  declarations: [
    AppComponent,
    ListagemProdutosComponent,
    MenuComponent,
    CadadstroprodutoComponent,



  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PrimengModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
