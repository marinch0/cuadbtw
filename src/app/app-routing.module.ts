import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)},
  //{path:'inicio',component:InicioComponent},
  //{path:'menu',component:MenuComponent},
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'agenda',
    loadChildren: () => import('./agenda/agenda.module').then( m => m.AgendaPageModule)
  },
  {
    path: 'labores',
    loadChildren: () => import('./labores/labores.module').then( m => m.LaboresPageModule)
  },
  {
    path: 'consumos',
    loadChildren: () => import('./consumos/consumos.module').then( m => m.ConsumosPageModule)
  },
  {
    path: 'desp',
    loadChildren: () => import('./desp/desp.module').then( m => m.DespPageModule)
  },
  {
    path: 'casespecial',
    loadChildren: () => import('./casespecial/casespecial.module').then( m => m.CasespecialPageModule)
  },
  {
    path: 'detalleop',
    loadChildren: () => import('./detalleop/detalleop.module').then( m => m.DetalleopPageModule)
  },
  {
    path: 'menupersonal',
    loadChildren: () => import('./menupersonal/menupersonal.module').then( m => m.MenupersonalPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'midesplzamiento',
    loadChildren: () => import('./midesplzamiento/midesplzamiento.module').then( m => m.MidesplzamientoPageModule)
  },
  {
    path: 'miconsumo',
    loadChildren: () => import('./miconsumo/miconsumo.module').then( m => m.MiconsumoPageModule)
  },
  {
    path: 'miservfin',
    loadChildren: () => import('./miservfin/miservfin.module').then( m => m.MiservfinPageModule)
  },
  {
    path: 'micasoesp',
    loadChildren: () => import('./micasoesp/micasoesp.module').then( m => m.MicasoespPageModule)
  },
  {
    path: 'mislab',
    loadChildren: () => import('./mislab/mislab.module').then( m => m.MislabPageModule)
  },
  {
    path: 'desplnew',
    loadChildren: () => import('./desplnew/desplnew.module').then( m => m.DesplnewPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
