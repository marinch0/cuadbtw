import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, creacasoez, normacasoses } from '../api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mislab',
  templateUrl: './mislab.page.html',
  styleUrls: ['./mislab.page.scss'],
})
export class MislabPage implements OnInit {


  descrip: any;
  minutos: any;
  cards: any[] = [];

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

async agreg() {
  const alert = await this.alertController.create({
    header: 'CASO ESPECIAL',
    subHeader: 'Se agrego un caso especial',
    buttons: ['OK'],
  });

  await alert.present();
}

async elimi() {
  const alert = await this.alertController.create({
    header: 'CASO ESPECIAL',
    subHeader: 'Se elimino un caso especial',
    buttons: ['OK'],
  });

  await alert.present();
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
    subHeader: 'no se agrego minutos ',
    buttons: ['OK'],
  });

  await alert.present();
}


agregar(creacasoez: creacasoez) {

  creacasoez.descripcion = this.descrip
  creacasoez.tiempo = this.minutos
  creacasoez.idserviciocuadrilla = 1
  creacasoez.idoperacionservicio = 1


  let authorization = localStorage.getItem('token')
  if (this.descrip==null) {
    this.error1()
  }else if(this.minutos==null){
    this.error2()
  }else{
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

  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'Home' },
    { title: 'Dashboard', url: '/dashboard', icon: 'paper-plane' },
    { title: 'Mis Servicios', url: '/menupersonal', icon: 'archive' },
    { title: 'Excepciones', url: '/mislab', icon: 'warning' },
    { title: 'Desplazamiento', url: '/desplnew', icon: 'car' },
    { title: 'Cerrar Session', url: '/home', icon: 'warning' },
  ];
  
  constructor(private router:Router,private apiService: ApiService ,private alertController: AlertController) { }
  omitir(){
    this.router.navigate(["inicio"])
  }
  ngOnInit() {
    this.listcons()
  }

  home() {
    this.router.navigate(["menupersonal"])
  }
}
