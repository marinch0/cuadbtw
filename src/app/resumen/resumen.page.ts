import { Component, OnInit } from '@angular/core';
import { ApiService, finalagenda, normacasoses, normacons, normadezdez, normalab } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
})
export class ResumenPage implements OnInit {
  datalabores:any[]=[];
  cons:any[]=[];
  cases:any[]=[];
  desplaz:any[]=[];
  coordenadas: string = "39.9390731,116.1172782";
  constructor(private apiService: ApiService,private router: Router) { }

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
    this.listlab()
    this.listcons()
    this.listdez()
    this.listcases()

  }
  finalagenda:finalagenda={
    fechafinal:'',
    coordenadas:'',
    idoperacion:'',
    idagenda:''
   }

  home(){
    let authorization = localStorage.getItem('token')
    this.finalagenda.fechafinal=new Date().getTime()
    this.finalagenda.coordenadas=this.coordenadas
    this.finalagenda.idoperacion=localStorage.getItem('idoperacion')
    this.finalagenda.idagenda=localStorage.getItem('idagenda')
    this.apiService.finaloperacion(authorization,this.finalagenda).subscribe({
      next:(res) => {
        console.log(res);
        
  },
  error: (err) =>{console.log(err);
  },
  complete() {

  }
}
);

    this.router.navigate(["inicio"])
  }

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
        console.log(res);
        
  },
  error: (err) =>{console.log(err);
  },
  complete() {

  }
}
);

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
  let id=localStorage.getItem('numserv')
  this.apiService.consum(authorization,id).subscribe({
    next:(res) => {
      this.cons = normacons(res);
},
error: (err) =>{console.log(err);
},
complete() {

}
}
);

}

listdez(){
  let authorization = localStorage.getItem('token')
  let id=localStorage.getItem('numserv')
  this.apiService.dezpl(authorization,id).subscribe({
    next:(res) => {
      this.desplaz = normadezdez(res);
      console.log(res);
      
},
error: (err) =>{console.log(err);
},
complete() {

}
}
);

}


listcases(){
  let authorization = localStorage.getItem('token')
  let id=localStorage.getItem('numserv')
  this.apiService.casoses(authorization,id).subscribe({
    next:(res) => {
      this.cases = normacasoses(res);
},
error: (err) =>{console.log(err);
},
complete() {

}
}
);

}
}
