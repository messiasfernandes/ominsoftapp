import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ImageModule } from 'primeng/image';
import {DialogService, DynamicDialogConfig, DynamicDialogModule} from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {MessageModule} from 'primeng/message';
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], exports : [
    InputTextModule,
    TableModule,
    ButtonModule,
    TableModule,
    MenuModule,
    PanelMenuModule,
    ToolbarModule,
    SidebarModule,
    SplitButtonModule,
    CardModule,
    PanelModule,
    ImageModule,
    InputNumberModule,
    TabViewModule,
     DropdownModule,
     MessageModule,
     ToastModule

  ],
  providers:[MessageService, ConfirmationService,DialogService,DynamicDialogConfig]


})
export class PrimengModule { }
