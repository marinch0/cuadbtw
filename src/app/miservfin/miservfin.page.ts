import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService, dezplacre, misservcred, normalizeDataservfin, servfin } from '../api.service';
import * as moment from 'moment';
import { IonModal } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-miservfin',
  templateUrl: './miservfin.page.html',
  styleUrls: ['./miservfin.page.scss'],
})
export class MiservfinPage implements OnInit {
  isopen:boolean=false;
  fechaHoraSeleccionada: string = new Date().toISOString();
  fechaHoraSeleccionada2: string = new Date().toISOString();
  isLoading:boolean=false;

  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'Home' },
    { title: 'Dashboard', url: '/dashboard', icon: 'paper-plane' },
    { title: 'Mis Servicios', url: '/menupersonal', icon: 'archive' },
    { title: 'Excépciones', url: '/mislab', icon: 'warning' },
    { title: 'Desplazamiento', url: '/desplnew', icon: 'car' },
    { title: 'Cerrar Sesión', url: '/home', icon: 'warning' },
  ];
  constructor(private router: Router,private apiService: ApiService, private alertController: AlertController) { }

  ngOnInit() {
  }
  dezData: any[] = [];
  dezplacre:misservcred = {
  idcuadrilla: '',
  fecha:'',
  fecha2:''
}

async presentAlert() {
  const alert = await this.alertController.create({
    header: 'MIS OPERACIONES',
    subHeader: 'Se listo correctamente',
    buttons: ['OK'],
  });

  await alert.present();
  this.isLoading=false
}

home() {
  this.router.navigate(["menupersonal"])
}

filtrar(dezplacre:misservcred){
  this.isLoading=true
  let authorization = localStorage.getItem('token')
  this.dezplacre.idcuadrilla="8632"//localStorage.getItem("idcuadrilla")
  this.dezplacre.fecha=moment(this.fechaHoraSeleccionada).format('YYYY-MM-DD');
  this.dezplacre.fecha2=moment(this.fechaHoraSeleccionada2).format('YYYY-MM-DD');

  this.apiService.servfinbuscar(authorization, dezplacre).subscribe({
    next:(res) => {
      this.dezData=normalizeDataservfin(res);
      console.log(this.dezData);

      this.presentAlert()

      
    },
    error: (err) =>{console.log(err);
    },
    complete() {

    }
  }
  );
}
}
