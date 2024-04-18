import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { ApiService, credgraf } from '../api.service';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  graf:any[] = [];
  fechas: any[]= [];
  tiempos:any[] = [];
  fechast: any[]= [];
  tiempost:any[] = [];
  metas:any[]=[16,20,14,10];
  acumulad:any[]=[];
  total:number=0;
  
  fechaHoraSeleccionada: string = new Date().toISOString();
  fechaHoraSeleccionada2: string = new Date().toISOString();
  grafica: any;

  constructor(private apiService: ApiService,private alertController: AlertController) {
    Chart.register();
  }

  ngOnInit() {
    //this.datgraf(this.credgraf)
  }

  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'Home' },
    { title: 'Dashboard', url: '/dashboard', icon: 'paper-plane' },
    { title: 'Mis Servicios', url: '/menupersonal', icon: 'archive' },
    { title: 'Excépciones', url: '/mislab', icon: 'warning' },
    { title: 'Desplazamiento', url: '/desplnew', icon: 'car' },
    { title: 'Cerrar Sesión', url: '/home', icon: 'warning' },
  ];

  ///////////////////////////////////////////////////////////////////////

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.tiempos,
        label: 'Tiempos',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [16,20,14,10],
        label: 'Estimado',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      
    ],
    labels: this.fechas,
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },

    plugins: {
      legend: { display: true },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }
  async error() {
    const alert = await this.alertController.create({
      header: 'DASHBOARD',
      subHeader: 'El filtro seleccionado No encuentra datos',
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  //////////////////////////////////////////////////////////////////////

  datgraf(credgraf: credgraf) {
    const self = this;
    this.fechast=[]
    this.tiempost=[]
    
    credgraf.idCuadrilla ="8636"
    credgraf.fecha = moment(this.fechaHoraSeleccionada).format('YYYY-MM-DD');
    credgraf.fecha2 =moment(this.fechaHoraSeleccionada2).format('YYYY-MM-DD');
    credgraf.estadolabor =[2]
    credgraf.idestadodocumento=[2]
    let authorization = localStorage.getItem('token')
    this.apiService.grafbuscar(authorization, credgraf).subscribe({
      next: (res) =>{
        console.log(res);
        
        if(res['data']==0){
          this.error()
        }
        const dataArray = res['data'];
        dataArray.map((item: any)=>{
          const { fechamodificacion: fecha,tiempolabor:tiempo,nombreestadodocumento:estado } = item;
          if (estado=="Validado") {
            this.fechas.push(moment(fecha).format('L'))
            this.fechast.push(moment(fecha).format('L'))
            this.tiempos.push(parseInt(tiempo))
            this.tiempost.push(parseInt(tiempo))
            this.total+=parseInt(tiempo)
            this.acumulad.push((this.total))
          }else{
            //llenar otra lista con todos los datos asi no esten validados 
          }
        })
        this.graficar();
        this.tiempos=this.tiempost
        this.fechas=this.fechast
      },
      error: (err) =>{console.log(err);
      },
      complete() {
        console.log('complete suscripción');
        self.tiempos=[]
        self.fechas=[]

      },
    }
    );
  }

  graficar(){
    this.chart?.update();

  }

  credgraf: credgraf = {
    idCuadrilla:'',
    fecha:'',
    fecha2:'',
    estadolabor:'',
    idestadodocumento:''
  }

}

