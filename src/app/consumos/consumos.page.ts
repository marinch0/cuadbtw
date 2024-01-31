import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, creaconsumo, entidadescre, normacons, normalizamaterialess } from '../api.service';
import { FormsModule } from '@angular/forms';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-consumos',
  templateUrl: './consumos.page.html',
  styleUrls: ['./consumos.page.scss'],
})
export class ConsumosPage implements OnInit {
  cant: any;
  idaa: any = 0;
  laboress: any[] = [];
  cards: any[] = [];
  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'Home' },
    { title: 'Dashboard', url: '/dashboard', icon: 'paper-plane' },
    { title: 'Mis Servicios', url: '/menupersonal', icon: 'archive' },
    { title: 'Excepciones', url: '/mislab', icon: 'warning' },
    { title: 'Desplazamiento', url: '/desplnew', icon: 'car' },
    { title: 'Cerrar Session', url: '/home', icon: 'warning' },
  ];
  constructor(private router: Router, private apiService: ApiService,private alertController: AlertController) { }



  credenciales: entidadescre = {
    materiales: '',
    labores: '',
    idtipooperacion: '',
    desplazamientos: ''
  }

  crearconsum: creaconsumo = {
    idoperacionservicio: '',
    idmaterial: '',
    cantidad: ''
  }

  async agreg() {
    const alert = await this.alertController.create({
      header: 'CONSUMOS',
      subHeader: 'Se agrego un consumo a la operacion',
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  async elimi() {
    const alert = await this.alertController.create({
      header: 'CONSUMOS',
      subHeader: 'Se elimino un consumo a la operacion',
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  async error1() {
    const alert = await this.alertController.create({
      header: 'CONSUMOS',
      subHeader: 'Seleccionar Consumo para la operacion',
      buttons: ['OK'],
    });
  
    await alert.present();
  }
  async error2() {
    const alert = await this.alertController.create({
      header: 'CONSUMOS',
      subHeader: 'Seleccionar Cantidad de Consumo para la operacion',
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  eliminar(id: any) {
    let authorization = localStorage.getItem('token')
    this.apiService.eliminarconsumo(authorization, id).subscribe({
      next: (res)=> {
        this.cards = normacons(res);
        console.log(this.cards);
        this.elimi()
      },
      error: (err) =>{console.log(err);
      },
      complete() {

      }
    }
    );
  }


  agregar(crearconsum: creaconsumo) {

    crearconsum.idoperacionservicio = 1
    crearconsum.idmaterial = this.idaa
    crearconsum.cantidad = this.cant
    
    if (this.idaa==0) {
      this.error1()
    }else if(this.cant==null){
      this.error2()
    }else{

      let authorization = localStorage.getItem('token')

      this.apiService.crearconsumo(authorization, crearconsum).subscribe({
        next: (res) => {
          this.cards = normacons(res);
          console.log(this.cards);
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

  listcons(){
    let authorization = localStorage.getItem('token')
    let id=807
    this.apiService.consum(authorization,id).subscribe({
      next:(res) => {
        this.cards = normacons(res);
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
    entidadescre.idtipooperacion = "1"
    entidadescre.desplazamientos = "true"
    let authorization = localStorage.getItem('token')

    this.apiService.entidadesBuscar(authorization, entidadescre).subscribe({
      next: (res) => {
        this.laboress = normalizamaterialess(res);
        console.log(this.laboress);

      },
      error: (err) =>{console.log(err);
      },
      complete() {
        console.log('complete suscripción');
      },
    }
    );  
  }

  
  ngOnInit() {
    this.listarentidadamterial(this.credenciales)
    this.listcons()
  }
  labores() {
    this.router.navigate(["labores"])

  }
  consumos() {
    this.router.navigate(["consumos"])
  }
  desplaza() {
    this.router.navigate(["desp"])
  }
  casos() {
    this.router.navigate(["casespecial"])
  }
  home() {
    this.router.navigate(["inicio"])
  }
  observ(){
    this.router.navigate(["observ"])
  }
  actas(){
    this.router.navigate(["actinstalacion"])
  }
  

}
