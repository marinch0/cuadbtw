import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MidesplzamientoPageRoutingModule } from './midesplzamiento-routing.module';

import { MidesplzamientoPage } from './midesplzamiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MidesplzamientoPageRoutingModule
  ],
  declarations: [MidesplzamientoPage]
})
export class MidesplzamientoPageModule {}
