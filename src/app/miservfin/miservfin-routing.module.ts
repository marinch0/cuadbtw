import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiservfinPage } from './miservfin.page';

const routes: Routes = [
  {
    path: '',
    component: MiservfinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiservfinPageRoutingModule {}
