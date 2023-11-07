import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenupersonalPage } from './menupersonal.page';

const routes: Routes = [
  {
    path: '',
    component: MenupersonalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenupersonalPageRoutingModule {}
