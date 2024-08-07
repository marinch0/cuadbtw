import { Component, OnInit } from '@angular/core';
import { ApiService, consumosData, consumoscredenciales, normalizaconsumos } from '../api.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-miconsumo',
  templateUrl: './miconsumo.page.html',
  styleUrls: ['./miconsumo.page.scss'],
})
export class MiconsumoPage implements OnInit {
  fechaHoraSeleccionada: string = new Date().toISOString();
  fechaHoraSeleccionada2: string = new Date().toISOString();
  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'Home' },
    { title: 'Dashboard', url: '/dashboard', icon: 'paper-plane' },
    { title: 'Mis Servicios', url: '/menupersonal', icon: 'archive' },
    { title: 'Excépciones', url: '/mislab', icon: 'warning' },
    { title: 'Desplazamiento', url: '/desplnew', icon: 'car' },
    { title: 'Cerrar Sesión', url: '/home', icon: 'warning' },
  ];
  constructor(private router: Router,private apiService: ApiService, private menuCtrl: MenuController) { }
  openMenu() {
    this.menuCtrl.open('miconsumo');
  }
  
  
  closeMenu() {
    this.menuCtrl.close('miconsumo');
  }
  
  
  toggleMenu() {
    this.menuCtrl.toggle('miconsumo');
  }
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
  home() {
    this.router.navigate(["menupersonal"])
  }
  consData: consumosData[] = [];
  consumoscredenciales:consumoscredenciales = {
    fecha:'',
    fecha2:'',
    idcuadrilla: '',
  }
  logout(compare:any){
    if (compare=="Cerrar Sesión") {
      localStorage.setItem('token',"")
    }
  }
  filtrar(consumoscredenciales:consumoscredenciales){
    let authorization = localStorage.getItem('token')
    this.consumoscredenciales.idcuadrilla=localStorage.getItem("idcuadrilla")
    this.consumoscredenciales.fecha=moment(this.fechaHoraSeleccionada).format('YYYY-MM-DD');
    this.consumoscredenciales.fecha2=moment(this.fechaHoraSeleccionada2).format('YYYY-MM-DD');
    
    this.apiService.consumosbuscar(authorization, consumoscredenciales).subscribe({
      next:(res) => {
        this.consData=normalizaconsumos(res);
        console.log(res);
        
      },
      error: (err) =>{console.log(err);
      },
      complete() {

      }
    }
    );
  }
}
