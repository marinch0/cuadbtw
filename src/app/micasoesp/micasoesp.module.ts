import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MicasoespPageRoutingModule } from './micasoesp-routing.module';

import { MicasoespPage } from './micasoesp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MicasoespPageRoutingModule
  ],
  declarations: [MicasoespPage]
})
export class MicasoespPageModule {}
