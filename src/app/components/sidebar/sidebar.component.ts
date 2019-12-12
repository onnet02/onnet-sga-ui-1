import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/tickets', title: 'Tickets',  icon:'fas fa-ticket-alt', class: 'ticketIcon' },
    { path: '/colaborador', title: 'Colaboradores', icon: 'fas fa-users', class: ''},
    { path: '/patrimonio', title: 'Patrimonios',  icon:'fas fa-cubes', class: '' },
    { path: '/configuracao', title: 'Configuração', icon: 'fas fa-cogs', class: ''},
    { path: '/gerenciar-cargo', title: 'Gerenciar Cargos', icon: '' , class: 'hidden-route'},
    { path: '/gerenciar-empresa', title: 'Gerenciar Empresas' , icon: '' , class: 'hidden-route'},
    { path: '/gerenciar-setor', title: 'Gerenciar Setor' , icon: '' , class: 'hidden-route'} ,
    { path: '/gerenciar-mobile-email' , title: 'Gerenciar Email Mobile' , icon : '' , class: 'hidden-route'},
    { path: '/gerenciar-chip' , title: 'Gerenciar chip' , icon : '' , class: 'hidden-route'}, 
    { path: '/gerenciar-situacao' , title: 'Gerenciar situação' , icon : '' , class: 'hidden-route'}, 
    { path: '/gerenciar-ticket-status' , title: 'Gerenciar Status Ticket' , icon : '' , class: 'hidden-route'}, 
    { path: '/gerenciar-email' , title: 'Gerenciar Email' , icon : '' , class: 'hidden-route'}, 
    { path: '/gerenciar-celular' , title: 'Gerenciar Celular' , icon : '' , class: 'hidden-route'}, 
    { path: '/gerenciar-modelos' , title: 'Gerenciar Modelos' , icon : '' , class: 'hidden-route'}, 
    { path: '/gerenciar-marcas' , title: 'Gerenciar Marcas' , icon : '' , class: 'hidden-route'}, 
    { path: '/mobile-manager' , title: 'Mobile Manager', icon: '' , class: 'hidden-route'},
    { path: '/historico-de-uso', title: 'Historico de uso' , icon: '' , class: 'hidden-route'},
    { path: '/gerenciar-equipamento' , title: 'Gerenciar Equipamentos' , icon: '' , class: 'hidden-route'},
    { path: '/gerenciar-alocacao-equipamento' , title: 'Gerenciar Alocação de equipamento', icon: '' , class: 'hidden-route'},
    { path: '/historico-equipamento' , title: 'Historicos de uso de equipamento', icon: '' , class: 'hidden-route'},
    { path: '/ticketChat', title: 'Ticket Chat' , icon: '', class: 'hidden-route'},
    { path: '/ticketMenu' , title: 'Ticket Menu', icon: '' , class: 'hidden-route' },
  ];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
