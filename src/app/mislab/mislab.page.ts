import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, creacasoez, normacasoses } from '../api.service';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-mislab',
  templateUrl: './mislab.page.html',
  styleUrls: ['./mislab.page.scss'],
})
export class MislabPage implements OnInit {
  isButtonDisabled = false;
  descrip: any;
  minutos: any;
  cards: any[] = [];

  openMenu() {
    this.menuCtrl.open('mislab');
  }
  
  
  closeMenu() {
    this.menuCtrl.close('mislab');
  }
  
  
  toggleMenu() {
    this.menuCtrl.toggle('mislab');
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

    { title: 'Cerrar Sesión', url: '/home', icon: 'warning' },
  ];
  listcons(){
    let authorization = localStorage.getItem('token')
    let id= 1
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
logout(compare:any){
  if (compare=="Cerrar Sesión") {
    localStorage.setItem('token',"")
  }
}
home() {
  this.router.navigate(["inicio"])
}

  eliminar(id: any) {
    this.isButtonDisabled = true;

    
    setTimeout(() => {
      this.isButtonDisabled = false;
    }, 300);

    let authorization = localStorage.getItem('token')
    this.apiService.eliminarcasoez(authorization,id).subscribe({
      next:(res) => {
       
        
        this.cards = normacasoses(res);
        
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
    creacasoez.idserviciocuadrilla = localStorage.getItem("idcuadrilla")
    creacasoez.idoperacionservicio = 1
   
    
    if (this.descrip==null) {
      this.error1()
    }else if(this.minutos==null){
      this.error2()
    }else{
      let authorization = localStorage.getItem('token')
      this.apiService.crearcasoez(authorization, creacasoez).subscribe({
        next: (res) => {
         
          
          this.cards = normacasoses(res);
          
          this.agreg()
          this.descrip=null
          this.minutos=null
        },
        error: (err) =>{console.log(err);
        },
        complete() {
  
        }
      }
      );
    }

  }


  
  constructor(private router:Router,private apiService: ApiService,private alertController: AlertController, private menuCtrl: MenuController) { }

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
    let token=localStorage.getItem('token')

    this.apiService.checktoken(token).subscribe(
      res=>{

        const respuesta=<any>res
        if (respuesta.code==400) {
          this.router.navigate(["home"])
        }

      },
      err=> console.log(err)
    );

  }

}
