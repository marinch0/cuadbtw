import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleopPageRoutingModule } from './detalleop-routing.module';

import { DetalleopPage } from './detalleop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleopPageRoutingModule
  ],
  declarations: [DetalleopPage]
})
export class DetalleopPageModule {}
