import { Component, OnInit } from '@angular/core';
import { ApiService,creaobservaciones, creacasoez, normacasoses } from '../api.service';
import { AlertController, MenuController } from '@ionic/angular';
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

  labores(){
    setTimeout(()=>{
      this.openEnd()
      this.router.navigate(["labores"])
     },10 )
  }
  consumos(){
    setTimeout(()=>{
      this.openEnd()
      this.router.navigate(["consumos"])
     },10 )
    
  }
  desplaza(){
    setTimeout(()=>{
      this.openEnd()
      this.router.navigate(["desp"])
     },10 )
    
  }
  casos(){
    setTimeout(()=>{
      this.router.navigate(["casespecial"])
     },10 )
    
  }
  observ(){
    setTimeout(()=>{
      this.openEnd()
      this.router.navigate(["observ"])
     },10 )
    
  }
  actas(){
    setTimeout(()=>{
      this.openEnd()
      this.router.navigate(["actinstalacion"])
     },10 )
   
  }

  openFirst() {
    this.menuCtrl.enable(true, 'first');
    this.menuCtrl.open('first');
  }

  openEnd() {
    this.menuCtrl.close();
  }

  openCustom() {
    this.menuCtrl.close();
    this.menuCtrl.enable(true, 'custom');
    this.menuCtrl.open('custom');
  }
  EndMenu() {
    this.menuCtrl.close('first-menu');
  }
  logout(compare:any){
    if (compare=="Cerrar Sesión") {
      localStorage.setItem('token',"")
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



  creaobservaciones: creaobservaciones={
    idoperacionservicio:'',
    observaciones:''
  }


  agregar(creaobservaciones: creaobservaciones) {
    creaobservaciones.idoperacionservicio = localStorage.getItem("idoperacionservicio")
    creaobservaciones.observaciones = this.descrip
    let authorization = localStorage.getItem('token')
    this.apiService.observcuad(authorization, creaobservaciones).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('observ',this.descrip)
        this.agreg()
      },
      error: (err) =>{console.log(err);
      },
      complete() {

      }
    }
    );

  }

  clean(){
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
  
  constructor(private router:Router,private apiService: ApiService, private alertController: AlertController, private menuCtrl: MenuController  ) { }

  async agreg() {
    const alert = await this.alertController.create({
      header: 'CASOS ESPECIALES',
      subHeader: 'Se agrego un observacion a la operacion',
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
    let token=localStorage.getItem('token')
    this.descrip=localStorage.getItem('observ')
    this.apiService.checktoken(token).subscribe(
      res=>{

        const respuesta=<any>res
        if (respuesta.code==400) {
          this.router.navigate(["home"])
        }

      },
      err=> console.log(err)
    );
    this.listcons()
  }

}
