import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actinstalacion',
  templateUrl: './actinstalacion.page.html',
  styleUrls: ['./actinstalacion.page.scss'],
})
export class ActinstalacionPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  acta(){
    this.router.navigate(["resumen"])
  }
}
