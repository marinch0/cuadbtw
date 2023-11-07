import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { InicioPage } from './inicio.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPage
  },
  { path: 'home', loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)},
  { path: 'agenda', loadChildren: () => import('../agenda/agenda.module').then( m => m.AgendaPageModule)},
  { path: 'detalleop', loadChildren: () => import('../detalleop/detalleop.module').then( m => m.DetalleopPageModule)},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
