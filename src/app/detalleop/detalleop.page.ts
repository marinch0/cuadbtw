import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, agenda, credeagenda, normalizeData,AgendaData } from '../api.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-detalleop',
  templateUrl: './detalleop.page.html',
  styleUrls: ['./detalleop.page.scss'],
})
export class DetalleopPage implements OnInit {
  
  agendaData: AgendaData[] = [];
  index=parseInt(localStorage.getItem('target')+"")


  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'Home' },
    { title: 'Dashboard', url: '/dashboard', icon: 'paper-plane' },
    { title: 'Mis Servicios', url: '/menupersonal', icon: 'archive' },
    { title: 'Excepciones', url: '/mislab', icon: 'warning' },
    { title: 'Desplazamiento', url: '/desplnew', icon: 'car' },
    { title: 'Cerrar Session', url: '/home', icon: 'warning' },
  ];

  listaAgenda:AgendaData[] = [];

  ngOnInit() {
    console.log(localStorage.getItem('token'));
    this.listargenda(this.credenciales)
    this.index=parseInt(localStorage.getItem('target')+"")
  }
  constructor(private apiService: ApiService, private router: Router) { }

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


  home() {
    this.router.navigate(["inicio"])
  }


  agendaa() {
    this.router.navigate(["labores"])
  }


  listargenda(credeagenda: credeagenda) {
    credeagenda.idcuadrilla = localStorage.getItem("idcuadrilla")
    credeagenda.estado = "pendientes"
    let authorization = localStorage.getItem('token')

    this.apiService.agendabuscar(authorization, credeagenda).subscribe({
      next:(res) => {

        
        console.log('sin normalizar',res);

        this.agendaData=normalizeData(res); 
          
         

        
      },
      error: (err) =>{console.log(err);
      },
      complete() {
        console.log("Subscripcion Completa-->");
        
      }
    }
    );
  }

  
}
