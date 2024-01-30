import { Component, OnInit,ViewChild  } from '@angular/core';
import {  Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AgendaData, ApiService, agenda, credeagenda, normalizeData } from '../api.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;
  isModalOpen = false;
  agendaData: AgendaData[] = [];
  target =0
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string="";

  cancel() {
    this.isModalOpen = false;
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
    this.router.navigate(["labores"])
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  setOpen(isOpen: boolean,i:any,numeroservicio:any) {
    this.target=i
    this.isModalOpen = isOpen;
    localStorage.setItem('numserv',numeroservicio)
  }


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

    this.target=target
   // this.router.navigate(["detalleop"])
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
