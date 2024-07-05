import { Component, OnInit } from '@angular/core';
import { ApiService, creadez, dezplaData, dezplacre, entidadescre, normadezdez, normalizaentidez, normalizardezpla } from '../api.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AlertController,MenuController } from '@ionic/angular';


@Component({
  selector: 'app-desplnew',
  templateUrl: './desplnew.page.html',
  styleUrls: ['./desplnew.page.scss'],
})
export class DesplnewPage implements OnInit {
  cant: any;
  cantt: any;
  laboress: any[] = [];
  cardss: any[] = [];
  muni: any[] = [];
  apuntador: any[]=[];
  filtrado:any[]=[];
  arregloSinDuplicados:any[]=[]

  

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
  openMenu() {
    this.menuCtrl.open('desplnew');
  }
  
  
  closeMenu() {
    this.menuCtrl.close('desplnew');
  }
  
  
  toggleMenu() {
    this.menuCtrl.toggle('desplnew');
  }

  async agreg() {
    const alert = await this.alertController.create({
      header: 'DESPLAZAMIENTOS',
      subHeader: 'Se agrego un desplazamiento ',
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  async elimi() {
    const alert = await this.alertController.create({
      header: 'DESPLAZAMIENTOS',
      subHeader: 'Se elimino un desplazamiento ',
      buttons: ['OK'],
    });
  
    await alert.present();
  }
  async error() {
    const alert = await this.alertController.create({
      header: 'DESPLAZAMIENTOS',
      subHeader: 'Error al seleccionar desplazamiento ',
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  listdez(){
    let authorization = localStorage.getItem('token')
    let id=1
    this.apiService.dezpl(authorization,id).subscribe({
      next:(res) => {
        this.cardss = normadezdez(res);
        console.log(res);
        
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

  listarentidadamterial(entidadescre: entidadescre) {
    entidadescre.materiales = "true"
    entidadescre.labores = "true"
    entidadescre.idtipooperacion="1"
    entidadescre.desplazamientos="true"
    let authorization = localStorage.getItem('token')

    this.apiService.entidadesBuscar(authorization, entidadescre).subscribe({
      next:(res) => {
        this.laboress=normalizaentidez(res);
        console.log(  this.laboress);
        this.laboress.map(item=>{
          
          this.filtrado.push(item['municipioinicio']['nombre'])
        })
        
        console.log( this.filtrado);
         this.arregloSinDuplicados = [...new Set(this.filtrado)];
        console.log(this.arregloSinDuplicados);
        
      },
      error: (err) =>{console.log(err);
      },
      complete() {

      }
    }
    );
  }


  desplz() {

    let authorization = localStorage.getItem('token')

    this.apiService.dezplmuni(authorization).subscribe({
      next:(res) => {
        const dataArray = res['data'];
        dataArray.map((item: any)=>{
          const { nombre:nombre } = item;
          this.muni.push(nombre)
        })

        console.log(this.muni);
      },
      error: (err) =>{console.log(err);
      },
      complete() {

      }
    }
    );
  }








  creadez: creadez = {
    iddesplazamiento: '',
    idserviciocuadrilla: '',
    idoperacionservicio: ''
  }
  

  eliminar(id: any) {
    let authorization = localStorage.getItem('token')
    this.apiService.eliminardez(authorization, id).subscribe({
      next:(res) => {
        console.log(res);
        
        this.cardss = normadezdez(res);
        this.elimi()

      },
      error: (err) =>{console.log(err);
      },
      complete() {

      }
    }
    );
  }


  agregar(creadez: creadez) {
    creadez.iddesplazamiento=0
  
    creadez.idserviciocuadrilla = localStorage.getItem('idcuadrilla')
    creadez.idoperacionservicio = 1
    let authorization = localStorage.getItem('token')

    for (let i = 0; i < this.laboress.length; i++) {

      if (this.laboress[i].municipioinicio.nombre==this.cant && this.laboress[i].municipiofin.nombre==this.cantt) {
        creadez.iddesplazamiento=this.laboress[i].iddesplazamiento
        this.apuntador=this.laboress[i].iddesplazamiento     
        console.log(this.laboress[i].iddesplazamiento);
        
      }
    }
    if (creadez.iddesplazamiento==0) {

      this.error()
    }else{
      this.apiService.creardesplaz(authorization, creadez).subscribe({
        next: (res) => {
          console.log(res);
          
          if (res.code=!200) {
            this.error()
          }else{
            this.cardss = normadezdez(res);
            this.agreg()

            creadez.iddesplazamiento=0
          }      
        },
        error: (err) =>{console.log(err);
        },
        complete() {
  
        }
      }
      );
    }
    this.cant=null
    this.cantt=null
      creadez.iddesplazamiento=0
  }

  logout(compare:any){
    if (compare=="Cerrar Sesión") {
      localStorage.setItem('token',"")
    }
  }

  ngOnInit() {
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
    
    this.listarentidadamterial(this.credenciales)
    this.listdez()
    this.desplz()
  }
  labores(){
    this.router.navigate(["labores"])

  }
  consumos(){
    this.router.navigate(["consumos"])
  }
  desplaza(){
    this.router.navigate(["desp"])
  }
  casos(){
    this.router.navigate(["casespecial"])
  }
  observ(){
    this.router.navigate(["observ"])
  }
  actas(){
    this.router.navigate(["actinstalacion"])
  }
}
