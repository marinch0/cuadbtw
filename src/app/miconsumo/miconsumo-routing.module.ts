import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiconsumoPage } from './miconsumo.page';

const routes: Routes = [
  {
    path: '',
    component: MiconsumoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiconsumoPageRoutingModule {}
