import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CasespecialPageRoutingModule } from './casespecial-routing.module';

import { CasespecialPage } from './casespecial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CasespecialPageRoutingModule
  ],
  declarations: [CasespecialPage]
})
export class CasespecialPageModule {}
