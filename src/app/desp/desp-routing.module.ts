import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DespPage } from './desp.page';

const routes: Routes = [
  {
    path: '',
    component: DespPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DespPageRoutingModule {}
