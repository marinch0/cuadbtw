import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObservPageRoutingModule } from './observ-routing.module';

import { ObservPage } from './observ.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObservPageRoutingModule
  ],
  declarations: [ObservPage]
})
export class ObservPageModule {}
