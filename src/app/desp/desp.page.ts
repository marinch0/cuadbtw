import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, creadez, entidadescre, normadezdez, normalizaentidez } from '../api.service';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-desp',
  templateUrl: './desp.page.html',
  styleUrls: ['./desp.page.scss'],
})
export class DespPage implements OnInit {
   cant: any;
  cantt: any;
  laboress: any[] = [];
  cardss: any[] = [];
  muni: any[] = [];
  apuntador: any[]=[];
  filtrado:any[]=[];
  arregloSinDuplicados:any[]=[]
  isButtonDisabled = false;

  

  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'Home' },
    { title: 'Dashboard', url: '/dashboard', icon: 'paper-plane' },
    { title: 'Mis Servicios', url: '/menupersonal', icon: 'archive' },
    { title: 'Excépciones', url: '/mislab', icon: 'warning' },
    { title: 'Desplazamiento', url: '/desplnew', icon: 'car' },
    { title: 'Cerrar Sesión', url: '/home', icon: 'warning' },
  ];
  
  constructor(private router:Router,private apiService: ApiService,private alertController: AlertController, private menuCtrl: MenuController) { }


  /////////////////////
  openMenu() {
    this.menuCtrl.open('desp');
  }


  closeMenu() {
    this.menuCtrl.close('desp');
  }


  toggleMenu() {
    this.menuCtrl.toggle('desp');
  }
///////////////////////////

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
    let id=localStorage.getItem('idcuadrilla')
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
    this.isButtonDisabled = true;

    
    setTimeout(() => {
      this.isButtonDisabled = false;
    }, 300);
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
    creadez.idoperacionservicio = localStorage.getItem('idcuadrilla')
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
