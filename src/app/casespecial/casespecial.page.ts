import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, creacasoez, normacasoses } from '../api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-casespecial',
  templateUrl: './casespecial.page.html',
  styleUrls: ['./casespecial.page.scss'],
})
export class CasespecialPage implements OnInit {

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
  observ(){
    this.router.navigate(["observ"])
  }
  actas(){
    this.router.navigate(["actinstalacion"])
  }

  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'Home' },
    { title: 'Dashboard', url: '/dashboard', icon: 'paper-plane' },
    { title: 'Mis Servicios', url: '/menupersonal', icon: 'archive' },
    { title: 'Excépciones', url: '/mislab', icon: 'warning' },
    { title: 'Desplazamiento', url: '/desplnew', icon: 'car' },
    { title: 'Acta instalacion', url: '/actinstalacion', icon:"document"},
    { title: 'Cerrar Sesión', url: '/home', icon: 'warning' },
  ];
  listcons(){
    let authorization = localStorage.getItem('token')
    let id=localStorage.getItem('numserv')
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
    this.apiService.eliminarcasoez(authorization, localStorage.getItem('numserv')).subscribe({
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
    creacasoez.idserviciocuadrilla = localStorage.getItem('numserv')
    creacasoez.idoperacionservicio = localStorage.getItem("idcuadrilla")
    if (this.descrip==null) {
      this.error1()
    }else if(this.minutos==null){
      this.error2()
    }else{
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

  }


  
  constructor(private router:Router,private apiService: ApiService,private alertController: AlertController) { }

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
  async error1() {
    const alert = await this.alertController.create({
      header: 'CASOS ESPECIALES',
      subHeader: 'no se agrego una descripcion',
      buttons: ['OK'],
    });
  
    await alert.present();
  }
  async error2() {
    const alert = await this.alertController.create({
      header: 'CASOS ESPECIALES',
      subHeader: 'no se agrego minutos en el caso especial',
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  omitir(){
    this.router.navigate(["inicio"])
  }
  acta(){
    this.router.navigate(["actinstalacion"])
  }
  ngOnInit() {
    this.listcons()
  }

}
