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
    PanelMenuModule
  ]


})
export class PrimengModule { }
