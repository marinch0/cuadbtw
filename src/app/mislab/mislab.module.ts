import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MislabPageRoutingModule } from './mislab-routing.module';

import { MislabPage } from './mislab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MislabPageRoutingModule
  ],
  declarations: [MislabPage]
})
export class MislabPageModule {}
