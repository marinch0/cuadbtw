import { Component, OnInit } from '@angular/core';
import { ApiService, creadez, dezplaData, dezplacre, entidadescre, normadezdez, normalizaentidez, normalizardezpla } from '../api.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
  

  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'Home' },
    { title: 'Dashboard', url: '/dashboard', icon: 'paper-plane' },
    { title: 'Mis Servicios', url: '/menupersonal', icon: 'archive' },
    { title: 'Excépciones', url: '/mislab', icon: 'warning' },
    { title: 'Desplazamiento', url: '/desplnew', icon: 'car' },
    { title: 'Cerrar Sesión', url: '/home', icon: 'warning' },
  ];
  
  constructor(private router:Router,private apiService: ApiService,private alertController: AlertController) { }

  credenciales: entidadescre={
    materiales:'',
    labores:'',
    idtipooperacion:'',
    desplazamientos:''
  }

  async agreg() {
    const alert = await this.alertController.create({
      header: 'DESPLAZAMIENTOS',
      subHeader: 'Se agrego un desplazamiento a la operacion',
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  async elimi() {
    const alert = await this.alertController.create({
      header: 'DESPLAZAMIENTOS',
      subHeader: 'Se elimino un desplazamiento a la operacion',
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  async error() {
    const alert = await this.alertController.create({
      header: 'DESPLAZAMIENTOS',
      subHeader: 'Error al seleccionar desplazamiento a la operacion',
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  listdez(){
    let authorization = localStorage.getItem('token')
    let id=369688
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
    
  
    creadez.idserviciocuadrilla = 1
    creadez.idoperacionservicio = 1
    let authorization = localStorage.getItem('token')
    console.log(this.laboress)
    for (let i = 0; i < this.laboress.length; i++) {
      
      if (this.laboress[i].municipioinicio.nombre==this.cant && this.laboress[i].municipiofin.nombre==this.cantt) {
        console.log(this.laboress[i].iddesplazamiento);
        creadez.iddesplazamiento=this.laboress[i].iddesplazamiento
        this.apuntador=this.laboress[i].iddesplazamiento
      }
    }
   
    
    if (this.apuntador==null&&creadez.iddesplazamiento==null) {
      this.error()
    }else{
      this.apiService.creardesplaz(authorization, creadez).subscribe({
        next: (res) => {
          console.log(res);
          
          this.cardss = normadezdez(res);
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



  ngOnInit() {
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
  logout(compare:any){
    if (compare=="Cerrar Sesión") {
      localStorage.clear();
    }
  }
}

