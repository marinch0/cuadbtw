import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AgendaData, ApiService, agenda, credeagenda, normalizeData } from '../api.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  
  agendaData: AgendaData[] = [];


  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'Home' },
    { title: 'Dashboard', url: '/dashboard', icon: 'paper-plane' },
    { title: 'Mis Servicios', url: '/menupersonal', icon: 'archive' },
    { title: 'Excepciones', url: '/mislab', icon: 'warning' },
    { title: 'Desplazamiento', url: '/mislab', icon: 'car' },
    { title: 'Cerrar Session', url: '/home', icon: 'warning' },
  ];

  listaAgenda:any = null;


  ngOnInit() {
    //console.log(localStorage.getItem('token'));
    this.listargenda(this.credenciales)
  }

  credenciales: credeagenda = {
    idcuadrilla: '',
    estado: ''
  }

  Agenda: agenda = {
    data: {
      apellidostercero: '', celular1: '',
      celular2: '', descripciondireccion: '',
      estado: '', fechaagenda: '',
      fechacreado: '', idagenda: '', idoperacionservicio: '',
      idservicio: ''
    }
  }

  cambio(target:number){
    console.log(target);
    
  }



  agenda(target:any) {
    //console.log(target);
    localStorage.setItem('target',target)
    this.router.navigate(["detalleop"])
  }


  listargenda(credeagenda: credeagenda) {
    credeagenda.idcuadrilla = "21095"
    credeagenda.estado = "pendientes"
    let authorization = localStorage.getItem('token')

    this.apiService.agendabuscar(authorization, credeagenda).subscribe({
      next:(res) => {
       // console.log(res);

        
        this.agendaData=normalizeData(res);

        
      },
      error: (err) =>{console.log(err);
      },
      complete() {

      }
    }
    );
  }

  constructor(private apiService: ApiService, private router: Router) { }
}
