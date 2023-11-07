import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaboresPageRoutingModule } from './labores-routing.module';

import { LaboresPage } from './labores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaboresPageRoutingModule
  ],
  declarations: [LaboresPage]
})
export class LaboresPageModule {}
