import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, MenuController } from '@ionic/angular';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  cant: any;
  laboress: any[] = [];
  datalabores:any[]=[];

  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'Home' },
    { title: 'Dashboard', url: '/dashboard', icon: 'paper-plane' },
    { title: 'Mis Servicios', url: '/menupersonal', icon: 'archive' },
    { title: 'Excépciones', url: '/mislab', icon: 'warning' },
    { title: 'Desplazamiento', url: '/desplnew', icon: 'car' },
    { title: 'Cerrar Sesión', url: '/home', icon: 'warning' },
  ];
  constructor(private router:Router,private alertController: AlertController, private menuCtrl: MenuController) { }



  async agreg() {
    const alert = await this.alertController.create({
      header: 'LABORES',
      subHeader: 'Se agrego una labor a la operacion',
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  async error() {
    const alert = await this.alertController.create({
      header: 'LABORES',
      subHeader: 'Error al agregar la operacion',
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  



  /*eliminar(id: any) {
    let authorization = localStorage.getItem('token')
    this.apiService.eliminarconsumo(authorization, id).subscribe(
      res => {
        this.cards = normacons(res);
        console.log(this.cards);

      },
      err => console.log(err)
    );
  }*/
  logout(compare:any){
      
    if(compare=="Inicio"){
      this.router.navigate(["inicio"])
    }else if (compare=="Dashboard") {
      this.router.navigate(["dashboard"])
    } else if (compare=="Mis Servicios") {
      this.router.navigate(["menupersonal"])
    } else if (compare=="Excépciones") {
      this.router.navigate(["mislab"])
    } else if (compare=="Desplazamiento") {
      this.router.navigate(["desplnew"])
    } else if (compare=="Cerrar Sesión") {
      localStorage.setItem('token',"")
    }
  }

 


 



  ngOnInit() {
    let token=localStorage.getItem('token')
    
    console.log(localStorage.getItem('numserv'));
    

    

    console.log(localStorage.getItem('idRazon'));
    
  }

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
}
