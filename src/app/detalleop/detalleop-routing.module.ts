import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleopPage } from './detalleop.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleopPageRoutingModule {}
