import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActinstalacionPageRoutingModule } from './actinstalacion-routing.module';

import { ActinstalacionPage } from './actinstalacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActinstalacionPageRoutingModule
  ],
  declarations: [ActinstalacionPage]
})
export class ActinstalacionPageModule {}
