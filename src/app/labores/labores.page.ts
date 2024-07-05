import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, creaLabor, entidadescre, normalab, normalizaentilab } from '../api.service';
import { AlertController, MenuController } from '@ionic/angular';


@Component({
  selector: 'app-labores',
  templateUrl: './labores.page.html',
  styleUrls: ['./labores.page.scss'],
})
export class LaboresPage implements OnInit {
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
  constructor(private router:Router,private apiService: ApiService,private alertController: AlertController, private menuCtrl: MenuController) { }

  credenciales: entidadescre={
    materiales:'',
    labores:'',
    idtipooperacion:'',
    desplazamientos:''
  }
//////////////////////
openMenu() {
  this.menuCtrl.open('lab');
}


closeMenu() {
  this.menuCtrl.close('lab');
}


toggleMenu() {
  this.menuCtrl.toggle('lab');
}
////////////////////////
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

  listarentidadamterial(entidadescre: entidadescre) {
    entidadescre.materiales = "true"
    entidadescre.labores = "true"
    entidadescre.idtipooperacion="1"
    entidadescre.desplazamientos="true"
    let authorization = localStorage.getItem('token')

    this.apiService.entidadesBuscar(authorization, entidadescre).subscribe({
     next: (res) => {
        this.laboress=normalizaentilab(res);
        console.log(this.laboress);
        
      },
      error: (err) =>{console.log(err);
      },
      complete() {

      }
    }
    );
  }

  crealabor: creaLabor = {
    idoperacionservicio: '',
    idlabor: ''
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
    
    if (compare=="Cerrar Sesión") {
      localStorage.setItem('token',"")
    }
  }

  listlab(){
    let authorization = localStorage.getItem('token')
    let id=localStorage.getItem('numserv')
    this.apiService.labsop(authorization,id).subscribe({
      next:(res) => {
        this.datalabores = normalab(res);
  },
  error: (err) =>{console.log(err);
  },
  complete() {

  }
}
);

}


  agregar(creaLabor: creaLabor) {
    creaLabor.idlabor = this.cant
    creaLabor.idoperacionservicio = localStorage.getItem('numserv')
    console.log(this.cant==null);
    if (this.cant==null) {
      this.error()
    }else{
      let authorization = localStorage.getItem('token')
      this.apiService.crearlabor(authorization, creaLabor).subscribe({
        next:(res) => {
          this.datalabores = normalab(res);
          console.log(this.datalabores);
          this.agreg()
          this.cant=null
        },
        error: (err) =>{console.log(err);
        },
        complete() {
  
        }
      }
      );
    }


  }



  ngOnInit() {
    let token=localStorage.getItem('token')
    
    console.log(localStorage.getItem('numserv'));
    
    this.apiService.checktoken(token).subscribe(
      res=>{

        const respuesta=<any>res
        if (respuesta.code==400) {
          this.router.navigate(["home"])
        }

      },
      err=> console.log(err)
    );
    this.listarentidadamterial(this.credenciales)
    this.listlab()
    console.log(localStorage.getItem('idRazon'));
    
  }

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


}
