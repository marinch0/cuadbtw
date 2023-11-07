import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsumosPage } from './consumos.page';

const routes: Routes = [
  {
    path: '',
    component: ConsumosPage
  },
  { path: 'desp', loadChildren: () => import('../desp/desp.module').then( m => m.DespPageModule)},
  { path: 'casespecial', loadChildren: () => import('../casespecial/casespecial.module').then( m => m.CasespecialPageModule)},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsumosPageRoutingModule {}
