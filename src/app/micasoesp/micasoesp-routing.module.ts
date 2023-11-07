import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MicasoespPage } from './micasoesp.page';

const routes: Routes = [
  {
    path: '',
    component: MicasoespPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MicasoespPageRoutingModule {}
