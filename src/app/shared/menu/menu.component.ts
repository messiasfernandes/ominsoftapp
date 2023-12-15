import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ width: '250px' })),
      state('out', style({ width: '0' })),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out'))
    ])
  ]
})

export class MenuComponent {
  exibindoMenu = false;
  sidebarVisible: boolean = false;
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  constructor(private router: Router) {}
  menu: MenuItem[] = [];
  menuOpen = true
  menuState = 'in';
  mostrarMenu() {
    this.exibindoMenu = !this.exibindoMenu;
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
  closeSidebar() {
    this.exibindoMenu = !this.exibindoMenu;
    console.log(this.exibindoMenu);
  }
  checkActiveState(givenLink: any) {
    console.log(this.router.url);
    if (this.router.url.indexOf(givenLink) === -1) {
      return false;
    } else {
      return true;
    }
  }
  ngOnInit(): void {
    this.menu = [
      {
        label: 'Cadastro',
        icon: PrimeIcons.FILE,

        items: [
          {
            label: 'Clientes',
            icon: PrimeIcons.USER_PLUS,

          },
          {
            separator: true

           },
          {
            label: 'Fornecedores',
            icon: PrimeIcons.USER_MINUS,

            routerLink: ['/produtos'],
            routerLinkActiveOptions: { exact: true },

          },
          {
            separator: true

           },
          {
            label: 'Funicionários',
            icon: PrimeIcons.USER,
            routerLinkActiveOptions: { exact: true },
          },
          {
            separator: true

           },
          {
            label: 'Produtos',
            icon: ' fa-solid fa-boxes-packing fa-xl"',
            routerLink: ['/produtos'],

            command: () => this.closeSidebar(),
          },

        ],

      },


      {
        label: 'Estoque',
        icon: PrimeIcons.ANGLE_DOUBLE_DOWN,
        items: [
          {
            label: 'Estoque Movimento',
            icon: 'fa-solid fa-warehouse fa-xl',
          },
          {
            separator: true

           },
          {
            label: 'Importar Nota fiscal',
            icon: 'fa-solid fa-file-invoice fa-xl',
            expanded: true,
            routerLink: ['/importarnotalfiscal'],
            command: () => this.closeSidebar(),
          },
          {
            separator: true

           },
          {
            label: 'Kits/Combos',
            icon: PrimeIcons.TICKET,
          },
          {
            separator: true

           },
        ],
      },

      {
        label: 'Financeiro',
        icon: PrimeIcons.DOLLAR,
        items: [
          {
            label: 'Condições de Pagamento',
            icon: 'pi pi-tablet',
            //      routerLink: ['/contaspagar'],
          },
          {
            label: 'Contas Receber',
            icon: PrimeIcons.MONEY_BILL,
            // routerLink: ['/contasreceber'],
          },
          {
            separator: true

           },
          {
            label: 'Contas Pagar',
            icon: 'pi pi-calculator',
            //      routerLink: ['/contaspagar'],
          },
          {
            separator: true

           },
          {
            label: 'Caixa',
            icon: 'fa-solid fa-cash-register fa-xl',
            //      routerLink: ['/contaspagar'],
          },
        ],
      },
      {
        label: 'Vendas',
        icon: ' fa-solid fa-cart-shopping fa-xl',
        items: [
          {
            label: 'Vendas',
            icon: 'fa-solid fa-cart-plus fa-xl',
            routerLink: ['/vendas'],
          },
          {
            label: 'Compras',
            icon: 'pi pi-shopping-bag',
            routerLink: ['/compras'],
          },
        ],
      },
    ];
  }
  toggleMenu() {
    console.log("clicou")
    this.menuOpen = !this.menuOpen;
  }
  closeCallback(e:any): void {
    this.sidebarRef.close(e);
}

}
