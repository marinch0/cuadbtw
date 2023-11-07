import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenupersonalPageRoutingModule } from './menupersonal-routing.module';

import { MenupersonalPage } from './menupersonal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenupersonalPageRoutingModule
  ],
  declarations: [MenupersonalPage]
})
export class MenupersonalPageModule {}
