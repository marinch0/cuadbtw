import { Component, OnInit } from '@angular/core';
import { ApiService, creacasoez, normacasoses } from '../api.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-observ',
  templateUrl: './observ.page.html',
  styleUrls: ['./observ.page.scss'],
})
export class ObservPage implements OnInit {

  descrip: any;
  minutos: any;
  cards: any[] = [];


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

  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'Home' },
    { title: 'Dashboard', url: '/dashboard', icon: 'paper-plane' },
    { title: 'Mis Servicios', url: '/menupersonal', icon: 'archive' },
    { title: 'Excepciones', url: '/mislab', icon: 'warning' },
    { title: 'Desplazamiento', url: '/desplnew', icon: 'car' },
    { title: 'Cerrar Session', url: '/home', icon: 'warning' },
  ];
  listcons(){
    let authorization = localStorage.getItem('token')
    let id=367971
    this.apiService.casoses(authorization,id).subscribe({
      next:(res) => {
        this.cards = normacasoses(res);
  },
  error: (err) =>{console.log(err);
  },
  complete() {

  }
}
);

}
home() {
  this.router.navigate(["inicio"])
}

  eliminar(id: any) {
    let authorization = localStorage.getItem('token')
    this.apiService.eliminarcasoez(authorization, id).subscribe({
      next:(res) => {
        this.cards = normacasoses(res);
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

  creacaso: creacasoez = {
    descripcion: '',
    tiempo: '',
    idserviciocuadrilla: '',
    idoperacionservicio:''
  }


  agregar(creacasoez: creacasoez) {

    creacasoez.descripcion = this.descrip
    creacasoez.tiempo = this.minutos
    creacasoez.idserviciocuadrilla = 1
    creacasoez.idoperacionservicio = localStorage.getItem("idcuadrilla")


    let authorization = localStorage.getItem('token')
    this.apiService.crearcasoez(authorization, creacasoez).subscribe({
      next: (res) => {
        this.cards = normacasoses(res);
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

  limpiar(){
    this.descrip=""
  }


  async error() {
    const alert = await this.alertController.create({
      header: 'OBSERVACIONES',
      subHeader: 'error al generar la observacion ',
      buttons: ['OK'],
    });
  
    await alert.present();
  }
  
  constructor(private router:Router,private apiService: ApiService, private alertController: AlertController  ) { }

  async agreg() {
    const alert = await this.alertController.create({
      header: 'CASOS ESPECIALES',
      subHeader: 'Se agrego un caso a la operacion',
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  async elimi() {
    const alert = await this.alertController.create({
      header: 'CASOS ESPECIALES',
      subHeader: 'Se elimino un caso a la operacion',
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  omitir(){
    this.router.navigate(["inicio"])
  }
  ngOnInit() {
    this.listcons()
  }

}
