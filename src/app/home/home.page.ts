import { Component } from '@angular/core';
import { ApiService, credenciales, respuesta } from '../api.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  imageUrl: string = 'https://static.wixstatic.com/media/632b1b_7a7cfc03c37641d08c03c1e93378328d~mv2.png/v1/fill/w_900,h_589,al_c/632b1b_7a7cfc03c37641d08c03c1e93378328d~mv2.png';
  ngOnInit() {
    /*
    let token=localStorage.getItem('token')

    this.apiService.checktoken(token).subscribe(
      res=>{

        this.respuesta=<any>res
        if (this.respuesta.code==200) {

          this.router.navigate(["inicio"])
        }

      },
      err=> console.log(err)
    );

*/
  }
  credenciales:credenciales={
    alias:'',
    password:''
  }
  respuesta:respuesta={
    code:'',
    data:{idusuario:'',idtercero:'',nombre:'',token:'',numerotercero:''}
  }

  constructor(private apiService:ApiService, private router:Router,private alertController: AlertController,private http: HttpClient) {

    this.loadImage();
  }


  loadImage() {
    this.http.get(this.imageUrl, { responseType: 'blob' }).subscribe((data) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(data);
    });
  }

  async fal() {
    const alert = await this.alertController.create({
      header: 'Login',
      subHeader: 'Los datos ingresados no son correctos',
      buttons: ['OK'],
    });

    await alert.present();
  }



  login(alias:any,password:any){

    this.credenciales.alias=alias
    this.credenciales.password=password
    this.apiService.login(this.credenciales).subscribe(
      (res:any)=>{
        this.respuesta=<any>res
        console.log(res);
        
        if (this.respuesta.code==200) {
        
          localStorage.setItem('respuesta',JSON.stringify(this.respuesta))
          localStorage.setItem('token',this.respuesta.data.token)
          localStorage.setItem('idtercero',this.respuesta.data.idtercero)
          localStorage.setItem('idusuario',this.respuesta.data.idusuario)
          localStorage.setItem('numerotercero', res.data.numerotercero)
          setTimeout(() => {
          this.guardaridcuadrilla();
          }, 300);
            /*this.apiService.obtenerDatosTecnico(res.data.numerotercero).subscribe((nomTecnico:any)=>{
            

              localStorage.setItem('nombres',nomTecnico.data[0].nombres.toLowerCase().trim() +" "+ nomTecnico.data[0].apellidos.toLowerCase().trim())
              
              
            })*/



        }else{
          this.fal()
          alias=""
          password=""
        }

      },
      err=> console.log(err)
    );

  }
  


  guardaridcuadrilla(){
    console.log(localStorage.getItem('idtercero'));
    this.apiService.obtercero(localStorage.getItem('token'),localStorage.getItem('idtercero')).subscribe(
      (res:any)=>{
        console.log(res);
        const dataArray = res['data'];
        dataArray.map((item: any)=>{
          const { idservicio: idservicio } = item;
          console.log(idservicio);
          localStorage.setItem('idcuadrilla',idservicio)
          console.log(localStorage.getItem('idcuadrilla'));
        })
      }
    );    
    setTimeout(() => {
      this.router.navigate(["inicio"])
    }, 300);

  }


}
