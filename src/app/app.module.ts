import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule}from '@angular/common/http'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ChangeColorDirective } from './change-color.directive';
import { LoadComponent } from './shared/load/load.component';

@NgModule({
  declarations: [AppComponent, ChangeColorDirective],
  imports: [HttpClientModule,
    BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
