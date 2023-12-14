import { Component } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ominiSoftApp';
  items:  MenuItem[] = [];
  menuOpen = true
  constructor() {
    this.items = [
      {
        label: 'Item 1',
        icon: 'pi pi-fw pi-home',
        items: [
          { label: 'Item 1.1' },
          { label: 'Item 1.2' },
          { label: 'Item 1.3' },
        ],
      },
      {
        label: 'Item 2',
        icon: 'pi pi-fw pi-calendar',
        items: [
          { label: 'Item 2.1' },
          { label: 'Item 2.2' },
        ],
      },
    ];
  }
  toggleMenu() {
    console.log("clicou")
    this.menuOpen = !this.menuOpen;
  }
}

