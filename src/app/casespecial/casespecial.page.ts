import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, creacasoez, normacasoses } from '../api.service';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-casespecial',
  templateUrl: './casespecial.page.html',
  styleUrls: ['./casespecial.page.scss'],
})
export class CasespecialPage implements OnInit {

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
    this.menuCtrl.close();
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
    let id= localStorage.getItem("idcuadrilla")
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
    let authorization = localStorage.getItem('token')
    this.apiService.eliminarcasoez(authorization,id).subscribe({
      next:(res) => {
        console.log(res);
        
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
    creacasoez.idserviciocuadrilla = localStorage.getItem("idcuadrilla")
    creacasoez.idoperacionservicio = localStorage.getItem("idcuadrilla")
    console.log(localStorage.getItem("numserv"));
    
    if (this.descrip==null) {
      this.error1()
    }else if(this.minutos==null){
      this.error2()
    }else{
      let authorization = localStorage.getItem('token')
      this.apiService.crearcasoez(authorization, creacasoez).subscribe({
        next: (res) => {
          console.log(res);
          
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
