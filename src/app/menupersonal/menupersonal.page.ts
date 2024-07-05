import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService} from '../api.service';
import * as moment from 'moment';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menupersonal',
  templateUrl: './menupersonal.page.html',
  styleUrls: ['./menupersonal.page.scss'],
})
export class MenupersonalPage implements OnInit {
  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'Home' },
    { title: 'Dashboard', url: '/dashboard', icon: 'paper-plane' },
    { title: 'Mis Servicios', url: '/menupersonal', icon: 'archive' },
    { title: 'Excépciones', url: '/mislab', icon: 'warning' },
    { title: 'Desplazamiento', url: '/desplnew', icon: 'car' },
    { title: 'Cerrar Sesión', url: '/home', icon: 'warning' },
  ];


  constructor(private router:Router, private apiService: ApiService, private menuCtrl: MenuController) { }

  openMenu() {
    this.menuCtrl.open('menupersonal');
  }
  
  
  closeMenu() {
    this.menuCtrl.close('menupersonal');
  }
  
  
  toggleMenu() {
    this.menuCtrl.toggle('menupersonal');
  }
  
  fechaHoraSeleccionada: string = new Date().toISOString();
  fechaHoraSeleccionada2: string = new Date().toISOString();

  ngOnInit() {
    let token=localStorage.getItem('token')

    this.apiService.checktoken(token).subscribe(
      res=>{

        const respuesta=<any>res
        if (respuesta.code==400) {
          this.router.navigate(["home"])
        }

      },
      err=> console.log(err)
    );
  }

  casoesp(){
    this.router.navigate(["micasoesp"])
  }
  consum(){
    this.router.navigate(["miconsumo"])
  }
  desplaz(){
    this.router.navigate(["midesplzamiento"])
  }
  servfin(){
    this.router.navigate(["miservfin"])
  }
  gendes(){
    this.router.navigate(["desplnew"])
  }
  gencases(){
    this.router.navigate(["mislab"])
  }
  labores(){
    this.router.navigate(["inicio"])
  }
  logout(compare:any){
    if (compare=="Cerrar Sesión") {
      localStorage.setItem('token',"")
    }
  }

}
