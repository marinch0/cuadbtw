import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MislabPage } from './mislab.page';

const routes: Routes = [
  {
    path: '',
    component: MislabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MislabPageRoutingModule {}
