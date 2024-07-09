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
  observacion: any;
  minutos: any;
  cards: any[] = [];

////////////

adjustHeight(event: any): void {
  const element = event.target;
  element.style.height = 'auto';
  element.style.height = element.scrollHeight + 'px';
}

  openMenu() {
    this.menuCtrl.open('observ');
  }
  
  
  closeMenu() {
    this.menuCtrl.close('observ');
  }
  
  
  toggleMenu() {
    this.menuCtrl.toggle('observ');
  }
  //////////
  labores(){
    setTimeout(()=>{
      
      this.router.navigate(["labores"])
     },10 )
  }
  consumos(){
    setTimeout(()=>{
      
      this.router.navigate(["consumos"])
     },10 )
    
  }
  desplaza(){
    setTimeout(()=>{
      
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
     
      this.router.navigate(["observ"])
     },10 )
    
  }
  actas(){
    setTimeout(()=>{
   
      this.router.navigate(["actinstalacion"])
     },10 )
   
  }

  edit() {
    this.descrip=this.observacion
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
    if (this.observacion!=null) {
      
    }
    creaobservaciones.idoperacionservicio = localStorage.getItem("idoperacionservicio")
    creaobservaciones.observaciones = this.descrip
    let authorization = localStorage.getItem('token')
    this.apiService.observcuad(authorization, creaobservaciones).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('observ',this.descrip)
        this.observacion=this.descrip
        if (this.observacion!=null) {
          this.Edit()
        }else{
          this.agreg()
          
        }
        this.descrip=null
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

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.agregar(this.creaobservaciones);
      },
    },
  ];


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
      header: 'OBSERVACIONES',
      subHeader: 'Se agrego un observacion a la operacion',
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  async Edit() {
    const alert = await this.alertController.create({
      header: 'OBSERVACIONES',
      subHeader: 'Se Edito el caso de la operacion',
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  omitir(){
    this.router.navigate(["inicio"])
  }
  ngOnInit() {
    let token=localStorage.getItem('token')
    this.observacion=localStorage.getItem('observ')
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
