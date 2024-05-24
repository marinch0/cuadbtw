import { Component, OnInit,ViewChild  } from '@angular/core';
import {  Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AgendaData, ApiService, agenda, credeagenda, iniopera, normalizeData } from '../api.service';


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
  idServicioCuadrilla=""
  idsolicitudservicio=""
  operacionEnProgreso: any;
  errorMessage: string = '';
  target =0
  estado=""
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string="";

  cancel() {
    this.isModalOpen = false;
    
  }

  laborselect(tipolabor:any){
    if (tipolabor=="Solicitud de instalación") {
      localStorage.setItem('idRazon',"1")
    }else if(tipolabor=="Traslado"){
      localStorage.setItem('idRazon',"2")
    }else if(tipolabor=="Migracion"){
      localStorage.setItem('idRazon',"3")
    }else if (tipolabor=="Soporte") {
      localStorage.setItem('idRazon',"4")
    }else if (tipolabor=="Retiro final") {
      localStorage.setItem('idRazon',"5")
    }else if (tipolabor=="Retiro soporte") {
      localStorage.setItem('idRazon',"6")
    }else if (tipolabor=="Retiro migracion") {
      localStorage.setItem('idRazon',"7")
    }else if (tipolabor=="Retrio Traslado"){
      localStorage.setItem('idRazon',"8")
    }else if (tipolabor=="Envio tecnico") {
      localStorage.setItem('idRazon',"9")
    }else if(tipolabor=="Reconexion"){
      localStorage.setItem('idRazon',"19")
    }
    this.confirm()
  }
  iniopera:iniopera={
    fechainicial:'',
    idtipooperacionservicio:'',
    idclaseoperacionservicio:'',
    idsolicitudservicio:'',
    idserviciocuadrilla:''
  }
  confirm() {
    this.iniopera.fechainicial= new Date().getTime()
    this.iniopera.idtipooperacionservicio=1
    this.iniopera.idclaseoperacionservicio=1
    this.iniopera.idsolicitudservicio=this.idsolicitudservicio
    this.iniopera.idserviciocuadrilla=this.idServicioCuadrilla
    let authorization = localStorage.getItem('token')

    this.apiService.crearoperacion(authorization,this.iniopera ).subscribe({
      next: (res) =>{


       console.log(res);

        }

     })

     this.isModalOpen = false;

     setTimeout(()=>{
      this.router.navigate(['/labores'])
     },1000 )


  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  logout(compare:any){
    if (compare=="Cerrar Sesión") {
      localStorage.setItem('token',"")
    }
  }
  setOpen(isOpen: boolean,i:any,numeroservicio:any,tipoOperacion:string,idagenda:any) {
    this.target=i
    this.agenda()
    this.isModalOpen = isOpen;



    if(tipoOperacion == "Solicitud de instalación"){

      localStorage.setItem('tipoOperacion',"1")

    }else if(tipoOperacion == "Solicitud de conexión (por suspención temporal)"){

      localStorage.setItem('tipoOperacion',"19")

    }else if(tipoOperacion== "Terminación del contrato /cancelación del servicio"){

      localStorage.setItem('tipoOperacion',"5")

    }else if(tipoOperacion=="Traslado"){

      localStorage.setItem('tipoOperacion',"2")

    }else if(tipoOperacion=="Migración"){

      localStorage.setItem('tipoOperacion',"3")

    }else if(tipoOperacion=="Soporte técnico Internet: Mover WiFi"){

      localStorage.setItem('tipoOperacion',"4")

    }else if(tipoOperacion=="Soporte técnico Internet: Otras fallas de intertnet"){

      localStorage.setItem('tipoOperacion',"4")

    }else if(tipoOperacion=="Soporte técnico Internet: No hay internet"){

      localStorage.setItem('tipoOperacion',"4")

    }else if(tipoOperacion=="Soporte técnico Internet: Internet lento"){

      localStorage.setItem('tipoOperacion',"4")

    }else if(tipoOperacion=="Soporte técnico Internet: Internet intermitente"){

      localStorage.setItem('tipoOperacion',"4")

    }

    localStorage.setItem('numserv',numeroservicio)
    localStorage.setItem('idagenda',idagenda)


    this.agview(localStorage.getItem('numserv'))
  }

    agview(serv:any){
      let authorization = localStorage.getItem('token')
      this.apiService.opview(authorization,serv).subscribe({
        next: (res) =>{
           this.idServicioCuadrilla = res.data.idserviciocuadrilla.idservicio;
           this.idsolicitudservicio=res.data.idsolicitudservicio.idsolicitudservicio
           console.log(this.idsolicitudservicio);

          console.log(this.idServicioCuadrilla);
        }
      })
    }

  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'Home' },
    { title: 'Dashboard', url: '/dashboard', icon: 'paper-plane' },
    { title: 'Mis Servicios', url: '/menupersonal', icon: 'archive' },
    { title: 'Excépciones', url: '/mislab', icon: 'warning' },
    { title: 'Desplazamiento', url: '/mislab', icon: 'car' },
    { title: 'Cerrar Sesión', url: '/home', icon: 'warning' },
  ];

  listaAgenda:any = null;


  ngOnInit() {
  this.agendaData=[]
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



  agendas() {
  let idagenda=localStorage.getItem('idagenda')
  let idcuadrilla=localStorage.getItem('idcuadrilla')
  let authorization = localStorage.getItem('token')
  console.log(idagenda)
      this.apiService.agendacheck(authorization,idagenda,idcuadrilla ).subscribe({
       next: (res) =>{
        console.log(res);

         }

      })
  }


  agenda(): void {
    let idagenda=localStorage.getItem('idagenda')
    let idcuadrilla=localStorage.getItem('idcuadrilla')
    let authorization = localStorage.getItem('token')
    this.apiService.agendacheck(authorization,idagenda,idcuadrilla ).subscribe(
      response => {
        // Asegúrate de que response esté definido y tenga la estructura esperada

        console.log(response);

        localStorage.setItem('idoperacion',response.agenda.idoperacionservicio)

        if (response && response.operacionenprogreso !== undefined) {
          this.operacionEnProgreso = response.operacionenprogreso;
          if (this.operacionEnProgreso==null) {
            this.estado="Iniciar Operacion"
          }else{
            this.estado="Reanudar Operacion"
          }

        } else {
          this.errorMessage = 'La propiedad "operacionenprogreso" no está definida en la respuesta.';
        }
      },
      error => {
        this.errorMessage = 'Error al cargar los datos: ' + error.message;
        console.error(error);
      }
    );
  }

  listargenda(credeagenda: credeagenda) {

    credeagenda.idcuadrilla=localStorage.getItem('idcuadrilla')
    credeagenda.estado = "pendientes"
    let authorization = localStorage.getItem('token')

    this.apiService.agendabuscar(authorization, credeagenda).subscribe({
      next:(res) => {

        console.log(res);


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
