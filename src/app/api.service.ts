import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders}from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  urlActivosFijos:string = "http://192.168.50.169:4001"

  API_URL='http://104.131.8.122:8000/';

  //solo para hacer la prueba de los tecnicos
  urlServicios:string = "https://bitwan.info/api/public/login"

  constructor(private http: HttpClient) { }

  httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	};

//-------------------------------------------------------------------------------------------------------------------------------//

  getAuthHeaders(): HttpHeaders {
    // Crea y devuelve los encabezados de autenticación con el token
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  }

  getBodegasTecnicos(){
    const headers = this.getAuthHeaders();
    const numTercero = localStorage.getItem('numerotercero');
    const nombreTecnico = localStorage.getItem('nombres');

    return this.http.get(`${this.urlActivosFijos}/getBodegasTecnicos/${nombreTecnico}/${numTercero}`, {headers} );
  }

  buscarActivoFijoMoverTecnicos(buscar:string){

    const numTercero = localStorage.getItem('numerotercero');

    const headers = this.getAuthHeaders();
    const nombreTecnico = localStorage.getItem('nombres');

    return this.http.get(`${this.urlActivosFijos}/buscarActivoFijoMoverTecnicos/${buscar}/${nombreTecnico}/${numTercero}`, {headers} );
  }


  postActaDeMovimiento(RazonMovimiento:string, TipoEntrega:string, BodegaEntra:string, BodegaSale:string, Descripcion:string, GuiaTrasportadora:string,  ImgGuia:string, idOnts:any,ServicioDelClienteEspecifico:string){
    const headers = this.getAuthHeaders();
    const nombreTecnico = localStorage.getItem('nombres');
    const numTercero = localStorage.getItem('numerotercero');

    const form = new FormData();

    form.append('RazonMovimiento', RazonMovimiento);
    form.append('TipoEntrega', TipoEntrega);
    form.append('BodegaEntra', BodegaEntra);
    form.append('BodegaSale', BodegaSale);
    form.append('Descripcion', Descripcion);
    form.append('GuiaTrasportadora', GuiaTrasportadora);
    form.append('estadoActa', '1');
    form.append('nombre', nombreTecnico!.trim());
    form.append('files',ImgGuia);
    form.append('idOnts', JSON.stringify(idOnts));
    form.append('ServicioDelClienteEspecifico',ServicioDelClienteEspecifico);
    form.append('numTercero',numTercero!)

    return this.http.post(`${this.urlActivosFijos}/postCrearActaDeMovimiento`, form , {headers} )
  }


  getOnt(numServicio:string){

    const headers = this.getAuthHeaders();

    const data = {
      numServicio:numServicio
    }

    return this.http.post(`${this.urlActivosFijos}/retirarCliente`, data,  {headers} )

  }

  getOntEspecifica(idActivoFijo:string){

    const headers = this.getAuthHeaders();

    const data = {
      idActivoFijo:idActivoFijo,
    }

    return this.http.post(`${this.urlActivosFijos}/retirarClienteEspecifico`, data,  {headers} )

  }


//-----------------------------------------------------------------------------------------------------------------------------//

  loginn(credenciale:credenciales){

    let formData = new FormData();

    formData.append('json', JSON.stringify(credenciale))

    return this.http.post(this.API_URL+'login',formData);
  }

  login(credenciale:credenciales){

    return this.http.post(
      this.urlServicios,
      'json='+JSON.stringify(credenciale),
      this.httpOptions
    );
  }
  consumosbuscar(authorization:any,consumoscredenciales:consumoscredenciales){
    let formData = new FormData();
    formData.append('authorization',authorization)
    formData.append('json', JSON.stringify(consumoscredenciales))
    return this.http.post(this.API_URL+'consumosopservicios/consumosbycuadrilla',formData);

  }
  casobuscar(authorization:any,casoscre:casoscre){
    let formData = new FormData();
    formData.append('authorization',authorization)
    formData.append('json', JSON.stringify(casoscre))
    return this.http.post(this.API_URL+'casosespeciales/casosbycuadrilla',formData);

  }

  //datos grafica
  grafbuscar(authorization:any,credgraf:credgraf):Observable<any>{
    let formData = new FormData();
    formData.append('authorization',authorization)
    formData.append('json', JSON.stringify(credgraf))
    return this.http.post(this.API_URL+'laboresop/laboresbycuadrilla',formData);

  }

  entidadesBuscar(authorization:any,entidadescre:entidadescre){
    let formData = new FormData();
    formData.append('authorization',authorization)
    formData.append('json', JSON.stringify(entidadescre))
    return this.http.post(this.API_URL+'operacionesservicios/getentities',formData);
  }


  dezplabuscar(authorization:any,dezplacre:dezplacre){
    let formData = new FormData();
    formData.append('authorization',authorization)
    formData.append('json', JSON.stringify(dezplacre))
    return this.http.post(this.API_URL+'desplazamientoscuadrillas/desplazamientosbycuadrilla',formData);
  }

  servfinbuscar(authorization:any,dezplacre:dezplacre){

    let formData = new FormData();
    formData.append('authorization',authorization)
    formData.append('json', JSON.stringify(dezplacre))

    return this.http.post(this.API_URL+'operacionesservicios/listbycuadrilla',formData);
  }


  agendabuscar(authorization:any,credeagenda:credeagenda){

    let formData = new FormData();
    formData.append('authorization',authorization)
    formData.append('json', JSON.stringify(credeagenda))

    return this.http.post(this.API_URL+'agenda/listbytercero',formData);

  }

  ///////////////////////////////////////////////////////////////////////////

  labsop(authorization:any,id:any){

    let formData = new FormData();
    formData.append('authorization',authorization)
    formData.append('idoperacion', id)
    return this.http.post(this.API_URL+'laboresop/laboresbyoperacion',formData);

  }


  consum(authorization:any,id:any){

    let formData = new FormData();
    formData.append('authorization',authorization)
    formData.append('idoperacion', id)
    return this.http.post(this.API_URL+'consumosopservicios/consumosbyoperacion',formData);

  }


  dezpl(authorization:any,id:any){

    let formData = new FormData();
    formData.append('authorization',authorization)
    formData.append('idoperacion', id)
    return this.http.post(this.API_URL+'desplazamientoscuadrillas/desplazamientobyoperacion',formData);

  }


  casoses(authorization:any,id:any){

    let formData = new FormData();
    formData.append('authorization',authorization)
    formData.append('idoperacion', id)
    return this.http.post(this.API_URL+'casosespeciales/casosespecialesbyoperacion',formData);

  }

  ////////////////////////////////////////////////////////////////////////////




  crearlabor(authorization:any,creaLabor:creaLabor){
    let formData = new FormData();
    formData.append('authorization',authorization)
    formData.append('json', JSON.stringify(creaLabor))
    return this.http.post(this.API_URL+'laboresop/create',formData);
  }

  crearconsumo(authorization:any,creaconsumo:creaconsumo){
    let formData = new FormData();
    formData.append('authorization',authorization)
    formData.append('json', JSON.stringify(creaconsumo))
    return this.http.post(this.API_URL+'consumosopservicios/create',formData);
  }

  creardesplaz(authorization:any,creadez:creadez){
    let formData = new FormData();
    formData.append('authorization',authorization)
    formData.append('json', JSON.stringify(creadez))
    return this.http.post(this.API_URL+'desplazamientoscuadrillas/create',formData);
  }
  crearcasoez(authorization:any,creacasoez:creacasoez){
    let formData = new FormData();
    formData.append('authorization',authorization)
    formData.append('json', JSON.stringify(creacasoez))
    return this.http.post(this.API_URL+'casosespeciales/create',formData);
  }

////////////////////////////////////////////////////////////////////


  eliminarconsumo(authorization:any,idconsumo:any){
    let formData = new FormData();
    formData.append('authorization',authorization)
    return this.http.post(this.API_URL+'consumosopservicios/delete/'+idconsumo,formData);
  }
  eliminardez(authorization:any,iddesplazamientocuadrilla:any){
    let formData = new FormData();
    formData.append('authorization',authorization)
    return this.http.post(this.API_URL+'desplazamientoscuadrillas/delete/'+iddesplazamientocuadrilla,formData);
  }
  eliminarcasoez(authorization:any,idcasoespecial:any){
    let formData = new FormData();
    formData.append('authorization',authorization)
    return this.http.post(this.API_URL+'casosespeciales/delete/'+idcasoespecial,formData);
  }

  //////////////////////////////////////////////////////////////////////////////////////////


  listarconsop(authorization:any,idcasoespecial:any){
    let formData = new FormData();
    formData.append('authorization',authorization)
    return this.http.post(this.API_URL+'consumosopservicios/consumosbyoperacion',formData);
  }

  listarlaboresop(authorization:any,idcasoespecial:any){
    let formData = new FormData();
    formData.append('authorization',authorization)
    return this.http.post(this.API_URL+'laboresop/laboresbyoperacion',formData);
  }

  listardezop(authorization:any,idcasoespecial:any){
    let formData = new FormData();
    formData.append('authorization',authorization)
    return this.http.post(this.API_URL+'desplazamientoscuadrillas/desplazamientobyoperacion',formData);
  }
  listarcasesop(authorization:any,idcasoespecial:any){
    let formData = new FormData();
    formData.append('authorization',authorization)
    return this.http.post(this.API_URL+'casosespeciales/casosespecialesbyoperacion',formData);
  }

  //////////////////////////////////////////////////////////////////////////////////////
  checktoken(token:any){

    return this.http.post(
      this.API_URL+'checktoken',
      'authorization='+token,
      this.httpOptions
    );
  }
}



export interface credencialgeneral{
  idoperacion?:any;
}



export interface creaLabor{
  idoperacionservicio?:any;
  idlabor?:any;
}
export interface creaconsumo{
  idoperacionservicio?:any;
  idmaterial?:any;
  cantidad?:any;
}

export interface datalabor{
  idlaborop?:any;
  idlabor?:any;
  nombre?:any;
}
export function normalab(respuestaAPI: any): datalabor[] {
  if (!respuestaAPI || !respuestaAPI.data || !Array.isArray(respuestaAPI.data)) {
    return [];
  }

  // Suponiendo que el array de datos se encuentra en respuestaAPI.materiales
  return respuestaAPI.data.map((item: any) => ({
    idlaborop: item.idlaborop,
    idlabor: item.idlabor,
    nombre: item.nombre,

    // Mapea otras propiedades que necesites de la respuesta de la API
  }));
}

export interface creacasoez{
  descripcion?:any;
  tiempo?:any;
  idserviciocuadrilla?:any;
  idoperacionservicio?:any;
}
export interface creadez{
  iddesplazamiento?:any;
  idserviciocuadrilla?:any;
  idoperacionservicio?:any;
}


export interface credenciales{
  alias?:any;
  password?:any;
}
export interface respuesta{
  code?:any;
  data:{idusuario?:any,nombre?:any,token?:any}
}

export interface credeagenda {
  idcuadrilla?:any;
  estado?:any;
}

export interface consumoscredenciales {
  fecha?:any;
  fecha2?:any;
  idcuadrilla?:any;
}
export interface consumosData {
  nombre?:any;
  cantidad?:any;
  fechacreacion?:any;
}

export interface dezplacre {
  idCuadrilla?:any;
  fecha?:any;
  fecha2?:any;
}

export interface misservcred {
  idcuadrilla?:any;
  fecha?:any;
  fecha2?:any;
}

export interface entidadescre {
  materiales?:any;
  labores?:any;
  idtipooperacion?:any;
  desplazamientos?:any;
}
export interface entimatdata{
  id?:any;
  nombre?:any;
  descripcion?:any;
  unidadMedida?:any;
}

export function normalizamaterialess(respuestaAPI: any): entimatdata[] {
  if (!respuestaAPI || !respuestaAPI.materiales || !Array.isArray(respuestaAPI.materiales)) {
    return [];
  }

  // Suponiendo que el array de datos se encuentra en respuestaAPI.materiales
  return respuestaAPI.materiales.map((item: any) => ({
    id: item.idmaterial,
    nombre: item.nombre,
    descripcion: item.descripcion,
    unidadMedida: item.unidadmedida
    // Mapea otras propiedades que necesites de la respuesta de la API
  }));
}

export interface entilabdata{
  id?:any;
  estado?:any;
  nombre?:any;
  maximo?:any;
  minimo?:any;
  normal?:any;
  categoria?:any;
}

export function normalizaentilab(respuestaAPI: any): entimatdata[] {
  if (!respuestaAPI || !respuestaAPI.labores || !Array.isArray(respuestaAPI.labores)) {
    return [];
  }

  // Suponiendo que el array de datos se encuentra en respuestaAPI.materiales
  return respuestaAPI.labores.map((item: any) => ({
    id: item.idlabor,
    estado: item.estadolabor,
    nombre: item.nombre,
    maximo: item.maximo,
    minimo: item.minimo,
    normal: item.normal,
    categoria: item.categoria,
    // Mapea otras propiedades que necesites de la respuesta de la API
  }));
}

// consumos
export interface consData {
  idconsumooperacionservicio: string;
  cantidad: string;
  fechacreacion: string;
  nombre: string;
  unidadmedida: string;
}

export function normacons(respuestaAPI: any): consData[] {
  if (!respuestaAPI || !respuestaAPI.data || !Array.isArray(respuestaAPI.data)) {
    return [];
  }

  // Suponiendo que el array de datos se encuentra en respuestaAPI.materiales
  return respuestaAPI.data.map((item: any) => ({
    idconsumooperacionservicio: item.idconsumooperacionservicio,
    cantidad: item.cantidad,
    fechacreacion: item.fechacreacion,
    nombre: item.nombre,
    unidadmedida: item.unidadmedida,
    // Mapea otras propiedades que necesites de la respuesta de la API
  }));
}


// casoses
export interface casosesdata {
  idcasoespeciales: string;
  descripcion: string;
  tiempo: string;
}

export function normacasoses(respuestaAPI: any): consData[] {
  if (!respuestaAPI || !respuestaAPI.data || !Array.isArray(respuestaAPI.data)) {
    return [];
  }

  // Suponiendo que el array de datos se encuentra en respuestaAPI.materiales
  return respuestaAPI.data.map((item: any) => ({
    idcasoespeciales: item.idcasoespeciales,
    descripcion: item.descripcion,
    tiempo: item.tiempo,

    // Mapea otras propiedades que necesites de la respuesta de la API
  }));
}


// dezplasamientos
export interface dezdezdata {
  iddesplazamientocuadrilla: string;
  municipioinicio: string;
  municipiofin: string;
}

export function normadezdez(respuestaAPI: any): dezdezdata[] {
  if (!respuestaAPI || !respuestaAPI.data || !Array.isArray(respuestaAPI.data)) {
    return [];
  }

  // Suponiendo que el array de datos se encuentra en respuestaAPI.materiales
  return respuestaAPI.data.map((item: any) => ({
    iddesplazamientocuadrilla: item.iddesplazamientocuadrilla,
    municipioinicio: item.municipioinicio,
    municipiofin: item.municipiofin
    // Mapea otras propiedades que necesites de la respuesta de la API
  }));
}

// archivo desplazamiento.model.ts
export interface Desplazamiento {
  iddesplazamiento: number;
  kilometros: string;
  tiempo: number;
  municipioinicio: Municipio;
  municipiofin: Municipio;
}

// archivo municipio.model.ts
export interface Municipio {
  idmunicipio: number;
  nombre: string;
  iddepartamento: Departamento;
}

// archivo departamento.model.ts
export interface Departamento {
  iddepartamento: number;
  nombre: string;
}


export function normalizaentidez(respuestaAPI: any): entimatdata[] {
  if (!respuestaAPI || !respuestaAPI.desplazamientos || !Array.isArray(respuestaAPI.desplazamientos)) {
    return [];
  }

  // Suponiendo que el array de datos se encuentra en respuestaAPI.materiales
  return respuestaAPI.desplazamientos.map((item: any) => ({
    iddesplazamiento: item.iddesplazamiento,
    kilometros: item.kilometros,
    tiempo: item.tiempo,
    municipioinicio: {
      idmunicipio: item.municipioinicio.idmunicipio,
      nombre: item.municipioinicio.nombre,
      iddepartamento: item.municipioinicio.iddepartamento
    },
    municipiofin: {
      idmunicipio: item.municipiofin.idmunicipio,
      nombre: item.municipiofin.nombre,
      iddepartamento: item.municipiofin.iddepartamento
    }
  }));
}

export interface  credgraf {
  idCuadrilla?:any;
  fecha?:any;
  fecha2?:any;
  estadolabor?:any;
  idestadodocumento?:any;
}
export interface grafdata{
  idlaborop?:any;
  justificacion?:any;
  fechamodificacion?:any;
  nombrelabor?:any;
  idlabor?:any;
  tiempolabor?:any;
  categorialabor?:any;
  validaciondocumento?:any;
  idestadodocumento?:any;
  nombreestadodocumento?:any;
  nombreestado?:any;
  idestadolabor?:any;
  idoperacionservici0?:any;
  idservicio?:any;
  numeroservicio?:any;
  nombretipooperacion?:any;
}

export function normalizagraf(respuestaAPI: any): grafdata[] {
  if (!respuestaAPI || !respuestaAPI.data || !Array.isArray(respuestaAPI.data)) {
    return [];
  }

  // Suponiendo que el array de datos se encuentra en respuestaAPI.materiales
  return respuestaAPI.data.map((item: any) => ({
    idlaborop: item.idlaborop,
    justificacion: item.justificacion,
    fechamodificacion: item.fechamodificacion,
    nombrelabor: item.nombrelabor,
    idlabor: item.idlabor,
    tiempolabor: item.tiempolabor,
    categorialabor: item.categorialabor,
    validaciondocumento: item.validaciondocumento,
    idestadodocumento: item.idestadodocumento,
    nombreestadodocumento: item.nombreestadodocumento,
    nombreestado: item.nombreestado,
    idestadolabor: item.idestadolabor,
    idoperacionservici0: item.idoperacionservici0,
    idservicio: item.idservicio,
    numeroservicio: item.numeroservicio,
    nombretipooperacion: item.nombretipooperacion
    // Mapea otras propiedades que necesites de la respuesta de la API
  }));
}

export function normalizafech(respuestaAPI: any): grafdata[] {
  if (!respuestaAPI || !respuestaAPI.data || !Array.isArray(respuestaAPI.data)) {
    return [];
  }

  // Suponiendo que el array de datos se encuentra en respuestaAPI.materiales
  return respuestaAPI.data.map((item: any) => ({
    fechamodificacion: item.fechamodificacion,
    // Mapea otras propiedades que necesites de la respuesta de la API
  }));
}


export interface casoscre {
  idCuadrilla?:any;
  fecha?:any;
  fecha2?:any;
  estadolabor?:any;
}
export interface casosData {
  numeroservicio?:any;
  tiempo?:any;
  descripcion?:any;
  justificacion?:any;
  nombreestado?:any;
}


export interface agenda {
  data:{apellidostercero?:any,
    celular1?:any,
    celular2?:any,
    descripciondireccion?:any,
    estado?:any,
    fechaagenda?:any,
    fechacreado?:any,
    idagenda?:any,
    idoperacionservicio?:any,
    idservicio?:any}
}
export interface AgendaData {
  apellidostercero: string;
  celular1: string;
  celular2: string;
  descripciondireccion: string;
  estado: any;
  fechaagenda:any;
  fechacreado:any;
  nombredepartamento:any;
  nombremunicipio:any;
  nombrecontactosolicitud:any;
  nombreplan:any;
  nombretiposolicitud:any;
  numeroservicio:any;

  // Agrega otras propiedades que necesites de la respuesta de la API
}


export interface servfin {
  idoperacionservicio: string;
  fechainicial: string;
  fechafinal: string;
  observaciones: string;
  fechacreacion :string;
  descripciontipo :string;
  descripcionclase :string;
  nombrescuadrilla :string;
  apellidoscuadrilla :string;
  coordenadas:string;
  nombreclase:string;
  nombretipo:string;

  // Agrega otras propiedades que necesites de la respuesta de la API
}
export function normalizeDataservfin(respuestaAPI: any): AgendaData[] {
  if (!respuestaAPI || !respuestaAPI.data || !Array.isArray(respuestaAPI.data)) {
    return [];
  }

  // Suponiendo que el array de datos se encuentra en respuestaAPI.data
  return respuestaAPI.data.map((item: any) => ({
    idoperacionservicio: item.idoperacionservicio,
    fechainicial: item.fechainicial,
    fechafinal: item.fechafinal,
    observaciones: item.observaciones,
    fechacreacion: item.fechacreacion,
    descripciontipo:item.descripciontipo,
    descripcionclase:item.descripcionclase,
    nombrescuadrilla:item.nombrescuadrilla,
    apellidoscuadrilla:item.apellidoscuadrilla,

    // Mapea otras propiedades que necesites de la respuesta de la API
  }));
}





export interface dezplaData {
  nombremunicipioinicio: string;
  nombremunicipiofin: string;
  kilometros: string;
  nombreestado: string;
  fechacreacion :string;
  // Agrega otras propiedades que necesites de la respuesta de la API
}

export function normalizeData(respuestaAPI: any): AgendaData[] {
  if (!respuestaAPI || !respuestaAPI.data || !Array.isArray(respuestaAPI.data)) {
    return [];
  }

  // Suponiendo que el array de datos se encuentra en respuestaAPI.data
   const item = respuestaAPI.data.map((item: any) => ({


    apellidostercero: item.apellidostercero,
    celular1: item.celular1,
    celular2: item.celular2,
    descripciondireccion: item.descripciondireccion,
    estado: item.estado,
    fechaagenda:item.fechaagenda,
    fechacreado:item.fechacreado,
    numeroservicio:item.numeroservicio,
    nombredepartamento:item.nombredepartamento,
    nombremunicipio:item.nombremunicipio,
    nombrecontactosolicitud:item.nombrecontactosolicitud,
    nombreplan:item.nombreplan,
    nombretiposolicitud:item.nombretiposolicitud

    // Mapea otras propiedades que necesites de la respuesta de la API
  }));

  console.log('normalizado',item);


  return item
}

export function normalizardezpla(respuestaAPI: any): dezplaData[] {
  if (!respuestaAPI || !respuestaAPI.data || !Array.isArray(respuestaAPI.data)) {
    return [];
  }

  // Suponiendo que el array de datos se encuentra en respuestaAPI.data
  return respuestaAPI.data.map((item: any) => ({
    nombremunicipioinicio: item.nombremunicipioinicio,
    nombremunicipiofin: item.nombremunicipiofin,
    kilometros: item.kilometros,
    nombreestado: item.nombreestado,
    fechacreacion :item.fechacreacion
    // Mapea otras propiedades que necesites de la respuesta de la API
  }));
}

export function normalizaconsumos(respuestaAPI: any): consumosData[] {
  if (!respuestaAPI || !respuestaAPI.data || !Array.isArray(respuestaAPI.data)) {
    return [];
  }

  // Suponiendo que el array de datos se encuentra en respuestaAPI.data
  return respuestaAPI.data.map((item: any) => ({
    nombre: item.nombre,
    cantidad: item.cantidad,
    fechacreacion:item.fechacreacion
    // Mapea otras propiedades que necesites de la respuesta de la API
  }));
}


export function normalizacasos(respuestaAPI: any): casosData[] {
  if (!respuestaAPI || !respuestaAPI.data || !Array.isArray(respuestaAPI.data)) {
    return [];
  }

  // Suponiendo que el array de datos se encuentra en respuestaAPI.data
  return respuestaAPI.data.map((item: any) => ({
    numeroservicio:item.numeroservicio,
    tiempo:item.tiempo,
    descripcion:item.descripcion,
    justificacion:item.justificacion,
    nombreestado:item.nombreestado,
    // Mapea otras propiedades que necesites de la respuesta de la API
  }));



}


