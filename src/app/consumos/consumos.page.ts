import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, creaconsumo, entidadescre, normacons, normalizamaterialess } from '../api.service';
import { FormsModule } from '@angular/forms';
import { AlertController, InfiniteScrollCustomEvent, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-consumos',
  templateUrl: './consumos.page.html',
  styleUrls: ['./consumos.page.scss'],
})
export class ConsumosPage implements OnInit {
  cant: any;
  idaa: any = 0;
  laboress: any[] = [];
  cards: any[] = [];
  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'Home' },
    { title: 'Dashboard', url: '/dashboard', icon: 'paper-plane' },
    { title: 'Mis Servicios', url: '/menupersonal', icon: 'archive' },
    { title: 'Excépciones', url: '/mislab', icon: 'warning' },
    { title: 'Desplazamiento', url: '/desplnew', icon: 'car' },
    { title: 'Cerrar Sesión', url: '/home', icon: 'warning' },
  ];
  constructor(private router: Router, private apiService: ApiService,private alertController: AlertController, private menuCtrl: MenuController) { }



  credenciales: entidadescre = {
    materiales: '',
    labores: '',
    idtipooperacion: '',
    desplazamientos: ''
  }

  crearconsum: creaconsumo = {
    idoperacionservicio: '',
    idmaterial: '',
    cantidad: ''
  }

  async agreg() {
    const alert = await this.alertController.create({
      header: 'CONSUMOS',
      subHeader: 'Se agrego un consumo a la operacion',
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  async elimi() {
    const alert = await this.alertController.create({
      header: 'CONSUMOS',
      subHeader: 'Se elimino un consumo a la operacion',
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  async error1() {
    const alert = await this.alertController.create({
      header: 'CONSUMOS',
      subHeader: 'Seleccionar Consumo para la operacion',
      buttons: ['OK'],
    });
  
    await alert.present();
  }
  async error2() {
    const alert = await this.alertController.create({
      header: 'CONSUMOS',
      subHeader: 'Seleccionar Cantidad de Consumo para la operacion',
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  eliminar(id: any) {
    let authorization = localStorage.getItem('token')
    this.apiService.eliminarconsumo(authorization, id).subscribe({
      next: (res)=> {
        this.cards = normacons(res);
        
        console.log(res);
        this.elimi()
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

  agregar(crearconsum: creaconsumo) {

    crearconsum.idoperacionservicio = localStorage.getItem('numserv')
    crearconsum.idmaterial = this.idaa
    crearconsum.cantidad = this.cant
    
    if (this.idaa==0) {
      this.error1()
    }else if(this.cant==null){
      this.error2()
    }else{

      let authorization = localStorage.getItem('token')

      this.apiService.crearconsumo(authorization, crearconsum).subscribe({
        next: (res) => {
          this.cards = normacons(res);
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

  listcons(){
    let authorization = localStorage.getItem('token')
    let id=localStorage.getItem('numserv')
    this.apiService.consum(authorization,id).subscribe({
      next:(res) => {
        this.cards = normacons(res);
  },
  error: (err) =>{console.log(err);
  },
  complete() {

  }
}
);

}


  listarentidadamterial(entidadescre: entidadescre) {
    entidadescre.materiales = "true"
    entidadescre.labores = "true"
    entidadescre.idtipooperacion = "1"
    entidadescre.desplazamientos = "true"
    let authorization = localStorage.getItem('token')

    this.apiService.entidadesBuscar(authorization, entidadescre).subscribe({
      next: (res) => {
        console.log(res);
        
        this.laboress = normalizamaterialess(res);
        console.log(this.laboress);

      },
      error: (err) =>{console.log(err);
      },
      complete() {
        console.log('complete suscripción');
      },
    }
    );  
  }

  
  ngOnInit() {
    this.listarentidadamterial(this.credenciales)
    this.listcons()

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
  EndMenu() {
    this.menuCtrl.close();
  }

}
