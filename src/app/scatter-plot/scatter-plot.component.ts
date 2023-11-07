import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {Chart} from 'chart.js';


@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.scss'],
})
export class ScatterPlotComponent  implements OnInit {

  @ViewChild('scatterCanvas', { static: true })
  scatterCanvas!: ElementRef;

  constructor() { }

  ngOnInit() {
    this.createScatterPlot();
  }

  createScatterPlot() {
    const scatterCtx = this.scatterCanvas.nativeElement.getContext('2d');
    new Chart(scatterCtx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Scatter Plot',
            data: [
              { x: 10, y: 20 },
              { x: 15, y: 10 },
              { x: 5, y: 25 },
              // Agrega más datos aquí
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
          },
          y: {
            type: 'linear',
            position: 'left',
          },
        },
      },
    });
  }
}
