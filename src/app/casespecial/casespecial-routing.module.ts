import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasespecialPage } from './casespecial.page';

const routes: Routes = [
  {
    path: '',
    component: CasespecialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasespecialPageRoutingModule {}
