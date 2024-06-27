import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';



@NgModule({
  
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,

    IonicModule.forRoot(),
    
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  exports:[
    MenuComponent
  ]
})
export class ComponentesModule { }
