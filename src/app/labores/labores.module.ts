import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { LaboresPageRoutingModule } from './labores-routing.module';

import { LaboresPage } from './labores.page';
import { ComponentesModule } from '../componentes/componentes.module';


@NgModule({
  imports: [
    ComponentesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    LaboresPageRoutingModule
  ],
  declarations: [LaboresPage]
})
export class LaboresPageModule {}
