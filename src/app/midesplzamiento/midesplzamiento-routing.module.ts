import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MidesplzamientoPage } from './midesplzamiento.page';

const routes: Routes = [
  {
    path: '',
    component: MidesplzamientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MidesplzamientoPageRoutingModule {}
