import { Component, OnInit } from '@angular/core';
import { ApiService, normacasoses, normacons, normadezdez, normalab } from '../api.service';

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
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.listlab()
    this.listcons()
    this.listdez()
    this.listcases()

  }

  home(){
    console.log("finalizado");
    
  }


  listlab(){
    let authorization = localStorage.getItem('token')
    let id=807
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
  let id=807
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
  let id=369688
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
  let id=367971
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
