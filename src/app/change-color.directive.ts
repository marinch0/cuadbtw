import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeColor]'
})
export class ChangeColorDirective {
  @Input('appChangeColor') appChangeColor: string | undefined;
  constructor(private el: ElementRef, private renderer: Renderer2) { }


  ngOnInit() {
    // Colores posibles según el contenido del texto
    const colors = {
      'Texto1': 'red',
      'Texto2': 'blue',
      'Texto3': 'green'
      // Agrega más colores y textos según tus necesidades
    };

    // Obtén el color correspondiente al contenido del texto
    const color = 0//colors[this.appChangeColor];

    // Aplica la clase CSS al elemento según el color
    if (color) {
      this.renderer.setStyle(this.el.nativeElement, 'color', color);
    }
  }
}