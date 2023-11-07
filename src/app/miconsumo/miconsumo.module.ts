import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiconsumoPageRoutingModule } from './miconsumo-routing.module';

import { MiconsumoPage } from './miconsumo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiconsumoPageRoutingModule
  ],
  declarations: [MiconsumoPage]
})
export class MiconsumoPageModule {}
