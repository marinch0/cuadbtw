import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesplnewPageRoutingModule } from './desplnew-routing.module';

import { DesplnewPage } from './desplnew.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesplnewPageRoutingModule
  ],
  declarations: [DesplnewPage]
})
export class DesplnewPageModule {}
