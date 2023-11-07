import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiservfinPageRoutingModule } from './miservfin-routing.module';

import { MiservfinPage } from './miservfin.page';
import { LoadComponent } from '../shared/load/load.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiservfinPageRoutingModule
  ],
  declarations: [MiservfinPage,LoadComponent]
})
export class MiservfinPageModule {}
