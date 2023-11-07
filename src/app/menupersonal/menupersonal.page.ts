import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, dezplaData, dezplacre, misservcred, normalizeDataservfin, servfin } from '../api.service';
import * as moment from 'moment';

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
    { title: 'Excepciones', url: '/mislab', icon: 'warning' },
    { title: 'Desplazamiento', url: '/desplnew', icon: 'car' },
    { title: 'Cerrar Session', url: '/home', icon: 'warning' },
  ];


  constructor(private router:Router, private apiService: ApiService) { }


  fechaHoraSeleccionada: string = new Date().toISOString();
  fechaHoraSeleccionada2: string = new Date().toISOString();

  ngOnInit() {
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
}
