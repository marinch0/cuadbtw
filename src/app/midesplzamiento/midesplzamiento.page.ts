import { Component, OnInit } from '@angular/core';
import { ApiService, dezplacre,normalizardezpla,dezplaData } from '../api.service';
import * as moment from 'moment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-midesplzamiento',
  templateUrl: './midesplzamiento.page.html',
  styleUrls: ['./midesplzamiento.page.scss'],
})
export class MidesplzamientoPage implements OnInit {
  
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
    dezData: dezplaData[] = [];
    dezplacre:dezplacre = {
    idCuadrilla: '',
    fecha:'',
    fecha2:''
  }
  filtrar(dezplacre:dezplacre){
    let authorization = localStorage.getItem('token')
    this.dezplacre.idCuadrilla=localStorage.getItem("idcuadrilla")
    this.dezplacre.fecha=moment(this.fechaHoraSeleccionada).format('YYYY-MM-DD');
    this.dezplacre.fecha2=moment(this.fechaHoraSeleccionada2).format('YYYY-MM-DD');
    
    this.apiService.dezplabuscar(authorization, dezplacre).subscribe({
      next:(res) => {
        console.log(res);
        
        this.dezData=normalizardezpla(res);
      },
      error: (err) =>{console.log(err);
      },
      complete() {

      }
    }
    );
  }
  logout(compare:any){
    if (compare=="Cerrar Sesión") {
      localStorage.setItem('token',"")
    }
  }

  home() {
    this.router.navigate(["menupersonal"])
  }
}
