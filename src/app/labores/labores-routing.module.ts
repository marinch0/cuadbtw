import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaboresPage } from './labores.page';

const routes: Routes = [
  {
    path: '',
    component: LaboresPage
  },
  { path: 'consumos', loadChildren: () => import('../consumos/consumos.module').then( m => m.ConsumosPageModule)},
  { path: 'desp', loadChildren: () => import('../desp/desp.module').then( m => m.DespPageModule)},
  { path: 'casespecial', loadChildren: () => import('../casespecial/casespecial.module').then( m => m.CasespecialPageModule)},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaboresPageRoutingModule {}
