import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesplnewPage } from './desplnew.page';

const routes: Routes = [
  {
    path: '',
    component: DesplnewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesplnewPageRoutingModule {}
