import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsumosPageRoutingModule } from './consumos-routing.module';

import { ConsumosPage } from './consumos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsumosPageRoutingModule
  ],
  declarations: [ConsumosPage]
})
export class ConsumosPageModule {}
