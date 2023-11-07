import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService, credgraf, normalizafech, normalizagraf } from '../api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  graf:any[] = [];
  fechas: any[]= [];
  tiempos:any[] = [];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  fechaHoraSeleccionada: string = new Date().toISOString();
  fechaHoraSeleccionada2: string = new Date().toISOString();
  grafica: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    //this.datgraf(this.credgraf)
  }

  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'Home' },
    { title: 'Dashboard', url: '/dashboard', icon: 'paper-plane' },
    { title: 'Mis Servicios', url: '/menupersonal', icon: 'archive' },
    { title: 'Excepciones', url: '/mislab', icon: 'warning' },
    { title: 'Desplazamiento', url: '/desplnew', icon: 'car' },
    { title: 'Cerrar Session', url: '/home', icon: 'warning' },
  ];

  public barChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4,
      },
    },

    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: { display: true },
    },
  };
  public barChartLabels: string[] = [
    '10-10-2023',
    '15-10-2023',
    '20-10-2023',
    '25-10-2023'
  ];
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [15, 15, 15, 15 ], label: 'realizados' },
      { data: [16, 20, 17, 15 ], label: 'meta' },
    ],
  };

  // events
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

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }


  //////////////////////////////////////////////////////////////////////

  datgraf(credgraf: credgraf) {
    this.tiempos=[]
    this.fechas=[]
    credgraf.idCuadrilla ="8636"
    credgraf.fecha = moment(this.fechaHoraSeleccionada).format('YYYY-MM-DD');
    credgraf.fecha2 =moment(this.fechaHoraSeleccionada2).format('YYYY-MM-DD');
    credgraf.estadolabor =[2]
    credgraf.idestadodocumento=[2]
    let authorization = localStorage.getItem('token')
    
    
    this.apiService.grafbuscar(authorization, credgraf).subscribe({
      next: (res) =>{
        
        const dataArray = res['data'];
        dataArray.map((item: any)=>{
          const { fechamodificacion: fecha,tiempolabor:tiempo } = item;
          this.fechas.push(fecha)
          this.tiempos.push(parseInt(tiempo))
        })
        console.log( this.fechas);
        console.log(this.tiempos);
        this.chart?.update();
        
      },
      error: (err) =>{console.log(err);
      },
      complete() {
        console.log('complete suscripción');
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

