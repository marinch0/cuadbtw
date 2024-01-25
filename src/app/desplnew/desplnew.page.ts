import { Component, OnInit } from '@angular/core';
import { ApiService, creadez, dezplaData, dezplacre, entidadescre, normadezdez, normalizaentidez, normalizardezpla } from '../api.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-desplnew',
  templateUrl: './desplnew.page.html',
  styleUrls: ['./desplnew.page.scss'],
})
export class DesplnewPage implements OnInit {
  cant: any;
  laboress: any[] = [];
  cardss: any[] = [];
  

  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'Home' },
    { title: 'Dashboard', url: '/dashboard', icon: 'paper-plane' },
    { title: 'Mis Servicios', url: '/menupersonal', icon: 'archive' },
    { title: 'Excepciones', url: '/mislab', icon: 'warning' },
    { title: 'Desplazamiento', url: '/desplnew', icon: 'car' },
    { title: 'Cerrar Session', url: '/home', icon: 'warning'   },
  ];
  
  constructor(private router:Router,private apiService: ApiService,private alertController: AlertController) { }

  credenciales: entidadescre={
    materiales:'',
    labores:'',
    idtipooperacion:'',
    desplazamientos:''
  }
  listdez(){
    let authorization = localStorage.getItem('token')
    let id=369688
    this.apiService.dezpl(authorization,id).subscribe({
      next:(res) => {
        this.cardss = normadezdez(res);
        console.log(res);
        
  },
  error: (err) =>{console.log(err);
  },
  complete() {

  }
}
);

}


  listarentidadamterial(entidadescre: entidadescre) {
    entidadescre.materiales = "true"
    entidadescre.labores = "true"
    entidadescre.idtipooperacion="1"
    entidadescre.desplazamientos="true"
    let authorization = localStorage.getItem('token')

    this.apiService.entidadesBuscar(authorization, entidadescre).subscribe({
      next:(res) => {
        this.laboress=normalizaentidez(res);
        console.log(this.laboress);
        
      },
      error: (err) =>{console.log(err);
      },
      complete() {

      }
    }
    );
  }

  creadez: creadez = {
    iddesplazamiento: '',
    idserviciocuadrilla: '',
    idoperacionservicio: ''
  }
  

  eliminar(id: any) {
    let authorization = localStorage.getItem('token')
    this.apiService.eliminardez(authorization, id).subscribe({
      next:(res) => {

        this.cardss = normadezdez(res);
        this.elimi()
      },
      error: (err) =>{console.log(err);
      },
      complete() {

      }
    }
    );
  }

  async agreg() {
    const alert = await this.alertController.create({
      header: 'DESPLAZAMIENTOS',
      subHeader: 'Se agrego un desplazamiento ',
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  async elimi() {
    const alert = await this.alertController.create({
      header: 'DESPLAZAMIENTOS',
      subHeader: 'Se elimino un desplazamiento ',
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  agregar(creadez: creadez) {

    creadez.iddesplazamiento = this.cant
    creadez.idserviciocuadrilla = 1
    creadez.idoperacionservicio = 1
    let authorization = localStorage.getItem('token')
    if (this.cant==null) {
      this.error()
    }else{
      this.apiService.creardesplaz(authorization, creadez).subscribe({
        next: (res) => {
          console.log(res);
          
          this.cardss = normadezdez(res);
          this.agreg()
                
        },
        error: (err) =>{console.log(err);
        },
        complete() {
  
        }
      }
      );
    }


  }

  async error() {
    const alert = await this.alertController.create({
      header: 'DESPLAZAMIENTOS',
      subHeader: 'Error al seleccionar desplazamiento a la operacion',
      buttons: ['OK'],
    });
  
    await alert.present();
  }



  ngOnInit() {
    this.listarentidadamterial(this.credenciales)
    this.listdez()
  }
  labores(){
    this.router.navigate(["labores"])

  }
  consumos(){
    this.router.navigate(["consumos"])
  }
  desplaza(){
    this.router.navigate(["desp"])
  }
  casos(){
    this.router.navigate(["casespecial"])
  }
}
