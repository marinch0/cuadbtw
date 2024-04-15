import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-actinstalacion',
  templateUrl: './actinstalacion.page.html',
  styleUrls: ['./actinstalacion.page.scss'],
})
export class ActinstalacionPage implements OnInit {

  @ViewChild('valorOnts') miInput!: ElementRef;

  tipoOperacion:string = "1";
  TipoEntrega: string = "";
  GuiaTrasportadora: string = "";
  archivoCapturado: any;
  BodegaSale: string = "";
  BodegaEntra: string = "";
  selectOntEspecifica:string = "";
  serial:string = ""
  numOnt:string = "";
  Descripcion:string = "";
  ServicioDelClienteEspecifico:any = "";

  numServicioCliente:string = "";


  bodegaTecnico: any;
  dynamicInputs: any[] = []; //variable para acumular las ont que se vayan a instalar
  resultadosPorInput: any[] = [];
  guardarValorOnts: any[] = [];
  guardarActivosFijos: any;
  guardarClienteRetirar:any;
  guardarOntEspecifica:any;


  /*esta varibale la uso para tener una condicion sobre la cantidad de inputs que se pueden crear dependiendo de el tipo de movimiento que vaya a hacer el usuario o tambien para
  oculatar o mostrar el boton*/

  bodegaSaleMostrar:boolean = true;
  bodegaEntraMostrar:boolean = true;
  bodegaEntraMostrarUser:boolean = true
  selectOntsRetirar:boolean = false;
  btnPushOnts:boolean = true;
  bodegaEntraMostrarEspecifico:boolean = false;

  anular: boolean = false;
  infoTextoActivosFijos:boolean = false;

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit() {

    this.numServicioCliente = localStorage.getItem('numserv')!


    this.api.getBodegasTecnicos().subscribe(res => {
      this.bodegaTecnico = res;

      if(this.tipoOperacion == '1' || this.tipoOperacion == '2' || this.tipoOperacion == '3' || this.tipoOperacion == '4' || this.tipoOperacion == '19'){
        this.BodegaSale = this.bodegaTecnico[0].ID
        this.bodegaEntraMostrar = false
        this.bodegaEntraMostrarUser = false;

      }else if(this.tipoOperacion == '5' || this.tipoOperacion == '6' || this.tipoOperacion == '7' || this.tipoOperacion == '8'){
        this.BodegaEntra = this.bodegaTecnico[0].ID
        this.bodegaSaleMostrar = false
        this.btnPushOnts = false;

        this.api.getOnt(this.numServicioCliente).subscribe(res=>{

          this.guardarClienteRetirar = res;
          if(this.guardarClienteRetirar.length>1){

            this.bodegaEntraMostrar = false;

            this.selectOntsRetirar = true;

          }else{
            this.BodegaSale = this.numServicioCliente;
            this.serial = this.guardarClienteRetirar[0].serial
            this.numOnt = this.guardarClienteRetirar[0].numeroActivo;
            this.bodegaEntraMostrarEspecifico = true
            this.guardarValorOnts = this.guardarClienteRetirar[0].numeroActivo;
            this.selectOntsRetirar = false;

          }


        })

      }



    })




  }
  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'Home' },
    { title: 'Dashboard', url: '/dashboard', icon: 'paper-plane' },
    { title: 'Mis Servicios', url: '/menupersonal', icon: 'archive' },
    { title: 'Excépciones', url: '/mislab', icon: 'warning' },
    { title: 'Desplazamiento', url: '/desplnew', icon: 'car' },
    { title: 'Acta instalacion', url: '/actinstalacion', icon:"document"},
    { title: 'Cerrar Sesión', url: '/home', icon: 'warning' },
  ];

  acta() {
    this.router.navigate(["resumen"])
  }

  labores() {
    this.router.navigate(["labores"])

  }

  consumos() {
    this.router.navigate(["consumos"])
  }

  desplaza() {
    this.router.navigate(["desp"])
  }

  casos() {
    this.router.navigate(["casespecial"])
  }

  observ(){
    this.router.navigate(["observ"])
  }

  addInput() {

    this.dynamicInputs.push(""); // Agregar un nuevo objeto al arreglo
    this.infoTextoActivosFijos = true;
    //esto es para limitar el boton de agregar ont en las instalaciones
    this.anular = false;

    if (this.dynamicInputs[this.dynamicInputs.length - 1] !== '') {
      this.infoTextoActivosFijos = true;
      this.dynamicInputs.push(""); // Agregar un nuevo objeto al arreglo
    }
  }

  searchONTs(value: any, index: number) {

    if (value == "") {

      Swal.fire({
        title: 'ERROR',
        text: `Ingrese un valor a buscar`,
        icon: 'error',
        customClass: {
          popup: 'bg-dark',
          title: 'text-white',
          htmlContainer: 'text-white'
        }
      });
    } else {

      this.api.buscarActivoFijoMoverTecnicos(value).subscribe(acta => {

        if (acta == "") {


          Swal.fire({
            title: 'ERROR',
            text: `No existen registros con el numero ${value} `,
            icon: 'error',
            customClass: {
              popup: 'bg-dark',
              title: 'text-white',
              htmlContainer: 'text-white'
            }
          });

          this.dynamicInputs[index] = "";

        } else {

          this.guardarActivosFijos = acta;

          if (this.guardarActivosFijos[0].estadoM == 1) {

            Swal.fire({
              title: 'ERROR',
              text: `Este activo fijo ya se encuentra actualmente en un movimiento `,
              icon: 'error',
              customClass: {
                popup: 'bg-dark',
                title: 'text-white',
                htmlContainer: 'text-white'
              }
            });

            this.dynamicInputs[index] = "";

          } else {

            if (this.guardarValorOnts.includes(this.guardarActivosFijos[0].idactivoFijo)) {
              console.log("Valor duplicado:", this.guardarActivosFijos[0].idactivoFijo);

              Swal.fire({
                title: 'ERROR',
                text: `El valor ya ha sido ingresado en otro campo.`,
                icon: 'error',
                customClass: {
                  popup: 'bg-dark',
                  title: 'text-white',
                  htmlContainer: 'text-white'
                }
              });
            } else {
              this.guardarValorOnts[index] = this.guardarActivosFijos[0].idactivoFijo;
              this.resultadosPorInput[index] = this.guardarActivosFijos[0];
            }

          }
        }
      })

    }
  }

  eliminarInput(index: number) {
    this.dynamicInputs.splice(index, 1); // Eliminar el input del arreglo dynamicInputs
    this.resultadosPorInput.splice(index, 1); // Eliminar el resultado correspondiente
    this.guardarValorOnts.splice(index, 1); // Eliminar el valor guardado correspondiente
    this.anular = false;

    if(this.dynamicInputs.length == 0){
      this.infoTextoActivosFijos = false
    }

  }


  crearActa(){

    if (this.tipoOperacion == '1' || this.tipoOperacion == '2' || this.tipoOperacion == '3' || this.tipoOperacion == '4' || this.tipoOperacion == '19') {

      if(this.guardarValorOnts.length == 0){
        Swal.fire({
          title: 'ERROR',
          text: 'POR FAVOR CARGUE ONTS EN LA ACTA',
          icon: 'error',
          customClass: {
            popup: 'bg-dark',
            title: 'text-white',
            htmlContainer: 'text-white'
          }
        });
      }else{

        this.api.postActaDeMovimiento(this.tipoOperacion, this.TipoEntrega, this.numServicioCliente, this.BodegaSale, this.Descripcion, this.GuiaTrasportadora, this.archivoCapturado, this.guardarValorOnts,this.ServicioDelClienteEspecifico).subscribe((crear: any) => {
          //habilitar esto cuando tenga el numero de servicio de las instalaciones
           if(crear.length >= 1) {

            Swal.fire({
              title: 'ERROR',
              text: `ESTE CLIENTE YA CUENTA CON UNA ACTA PENDIENTE`,
              icon: 'error',
              customClass: {
                popup: 'bg-dark',
                title: 'text-white',
                htmlContainer: 'text-white'
              }
            });

          } else{
            Swal.fire({
              title: 'EXITO',
              text: 'ACTA CREADA CON EXITO',
              icon: 'success',
              customClass: {
                popup: 'bg-dark',
                title: 'text-white',
                htmlContainer: 'text-white'
              }
            }).then((result)=>{
              if (result.isConfirmed) {

                this.guardarValorOnts = [];
                this.BodegaEntra = "";
                this.dynamicInputs = [];
                this.infoTextoActivosFijos = false;
                this.resultadosPorInput = [];
                this.Descripcion = "";


              }
            });;


          }

        }

      )}

    }else if(this.tipoOperacion == '5' || this.tipoOperacion == '6' || this.tipoOperacion == '7' || this.tipoOperacion == '8'){

      if(this.guardarValorOnts.length == 0){

        Swal.fire({
          title: 'ERROR',
          text: 'POR FAVOR SELECIONE UNA ONT A RETIRAR DEL CLIENTE',
          icon: 'error',
          customClass: {
            popup: 'bg-dark',
            title: 'text-white',
            htmlContainer: 'text-white'
          }
        });

      }else{
        this.api.postActaDeMovimiento(this.tipoOperacion, this.TipoEntrega, this.BodegaEntra, this.BodegaSale, this.Descripcion, this.GuiaTrasportadora, this.archivoCapturado, this.guardarValorOnts,this.ServicioDelClienteEspecifico).subscribe((crear: any) => {
          //habilitar esto cuando tenga el numero de servicio de las instalaciones
           if(crear.length >= 1) {

            Swal.fire({
              title: 'ERROR',
              text: `ESTE CLIENTE YA CUENTA CON UNA ACTA PENDIENTE`,
              icon: 'error',
              customClass: {
                popup: 'bg-dark',
                title: 'text-white',
                htmlContainer: 'text-white'
              }
            });

          } else{
            Swal.fire({
              title: 'EXITO',
              text: 'ACTA CREADA CON EXITO',
              icon: 'success',
              customClass: {
                popup: 'bg-dark',
                title: 'text-white',
                htmlContainer: 'text-white'
              }
            }).then((result)=>{
              if (result.isConfirmed) {
                this.ngOnInit();
              }
            });




          }

        })
      }

     }

  }


  retirarOntEspecifica(){


    this.api.getOntEspecifica(this.selectOntEspecifica).subscribe(res=>{

      this.bodegaEntraMostrar = true;
      this.guardarOntEspecifica = res;


      this.guardarValorOnts = this.guardarOntEspecifica[0].numeroActivo;
      this.serial = this.guardarOntEspecifica[0].serial
      this.numOnt = this.guardarOntEspecifica[0].numeroActivo;
      this.BodegaSale = this.numServicioCliente;



    });




  }


  trackByFn(index: number, item: any): any {
    return index;
  }

}
