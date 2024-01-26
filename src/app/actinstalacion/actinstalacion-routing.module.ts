import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActinstalacionPage } from './actinstalacion.page';

const routes: Routes = [
  {
    path: '',
    component: ActinstalacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActinstalacionPageRoutingModule {}
