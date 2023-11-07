import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DespPageRoutingModule } from './desp-routing.module';

import { DespPage } from './desp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DespPageRoutingModule
  ],
  declarations: [DespPage]
})
export class DespPageModule {}
