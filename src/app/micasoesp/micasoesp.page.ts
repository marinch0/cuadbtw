import { Component, OnInit } from '@angular/core';
import { ApiService, casosData, casoscre, normalizacasos } from '../api.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-micasoesp',
  templateUrl: './micasoesp.page.html',
  styleUrls: ['./micasoesp.page.scss'],
})
export class MicasoespPage implements OnInit {
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
  constructor(private router: Router,private apiService: ApiService) { }

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

  casoscre:casoscre = {
    idCuadrilla: '',
    fecha:'',
    fecha2:'',
    
  }
  home() {
    this.router.navigate(["menupersonal"])
  }
  logout(compare:any){
    if (compare=="Cerrar Sesión") {
      localStorage.setItem('token',"")
    }
  }
  casData: casosData[] = [];
  sumatoria=0

  filtrar(casoscre:casoscre){
    let authorization = localStorage.getItem('token')
    this.casoscre.idCuadrilla=localStorage.getItem("idcuadrilla")
    this.casoscre.fecha=moment(this.fechaHoraSeleccionada).format('YYYY-MM-DD');
    this.casoscre.fecha2=moment(this.fechaHoraSeleccionada2).format('YYYY-MM-DD');
    this.casoscre.estadolabor="["+2+"]"
    
    this.apiService.casobuscar(authorization, casoscre).subscribe({
      next:(res) => {
        this.casData=normalizacasos(res);
        console.log(res.data.tiempo);
      },
      error: (err) =>{console.log(err);
      },
      complete() {

      }
    }
    );
  }

  filtrarr(casoscre:casoscre){
    let authorization = localStorage.getItem('token')
    this.casoscre.idCuadrilla=localStorage.getItem("idcuadrilla")
    this.casoscre.fecha=moment(this.fechaHoraSeleccionada).format('YYYY-MM-DD');
    this.casoscre.fecha2=moment(this.fechaHoraSeleccionada2).format('YYYY-MM-DD');
    this.casoscre.estadolabor="["+2+"]"
    
    this.apiService.casobuscar(authorization, casoscre).subscribe({
      next:(res) => {

        this.casData=normalizacasos(res);
        console.log(this.casData);
        const tiempos = this.casData.map(item => item.tiempo);

        const suma = tiempos.reduce((acc, val) => acc + Number(val), 0);        
        this.sumatoria=parseInt((suma/60).toFixed(1))
        
      },
      error: (err) =>{console.log(err);
      },
      complete() {

      }
    }
    );
    console.log(this.sumatoria);
    
  }
}