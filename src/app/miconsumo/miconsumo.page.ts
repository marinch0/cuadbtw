import { Component, OnInit } from '@angular/core';
import { ApiService, consumosData, consumoscredenciales, normalizaconsumos } from '../api.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

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
    { title: 'Excepciones', url: '/mislab', icon: 'warning' },
    { title: 'Desplazamiento', url: '/desplnew', icon: 'car' },
    { title: 'Cerrar Session', url: '/home', icon: 'warning' },
  ];
  constructor(private router: Router,private apiService: ApiService) { }

  ngOnInit() {
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
