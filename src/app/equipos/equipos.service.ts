import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { EquipoCreacionDTO, EquipoDTO, EquiposPutGetDTO, ListadoEquiposDTO} from './equipo';
import { Observable } from 'rxjs';
import { IServicioCRUD } from '../compartidos/interfaces/IServicioCRUD';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';

@Injectable({
  providedIn: 'root'
})
export class EquiposService implements IServicioCRUD<EquipoDTO, EquipoCreacionDTO> {

  constructor() { }
  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/equipos';

  obtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<EquipoDTO[]>> {
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<EquipoDTO[]>(this.urlBase, {params: queryParams, observe: 'response'});

  }

  public obtenerListado(): Observable<ListadoEquiposDTO> {
    return this.http.get<ListadoEquiposDTO>(`${this.urlBase}/landing`)

  }

  public obtenerListadoPorCategoria(categoriaId: number): Observable<EquipoDTO[]> {
    return this.http.get<EquipoDTO[]>(`${this.urlBase}/categoria/${categoriaId}`)

  }

  public obtenerPorId(id: number): Observable<EquipoDTO>{
    return this.http.get<EquipoDTO>(`${this.urlBase}/${id}`);
  }
  
  public filtrar(valores: any): Observable<HttpResponse<EquipoDTO[]>>{
    const params = new HttpParams({fromObject: valores});
    return this.http.get<EquipoDTO[]>(`${this.urlBase}/filtrar`, {params, observe: 'response'});
  }


  public crear(equipo: EquipoCreacionDTO): Observable<EquipoDTO> {
    const formData = this.construirFormData(equipo);
    return this.http.post<EquipoDTO>(this.urlBase, formData);
  }

  public actualizar(id: number, equipo: EquipoCreacionDTO){
    const formData = this.construirFormData(equipo);
    return this.http.put(`${this.urlBase}/${id}`, formData);
  }

  public actualizarGet(id: number): Observable<EquiposPutGetDTO>{
    return this.http.get<EquiposPutGetDTO>(`${this.urlBase}/putget/${id}`);
  }


  public borrar(id: number){
    return this.http.delete(`${this.urlBase}/${id}`);
  }

  private construirFormData(equipo: EquipoCreacionDTO): FormData{
    const formData = new FormData();
    formData.append('nombre', equipo.nombre);
    formData.append('categoriaId', equipo.categoriaId.toString());
    formData.append('fechaInicio', equipo.fechaInicio.toLocaleDateString('es-ES'));
    formData.append('fechaFin', equipo.fechaFin.toLocaleDateString('es-ES'));
    formData.append('minimoJugadores', equipo.minimoJugadores.toString());
    formData.append('maximoJugadores', equipo.maximoJugadores.toString());
    formData.append('liga', equipo.liga);

    if (equipo.foto){
      formData.append('foto', equipo.foto);
    }
    formData.append('jugadores', JSON.stringify(equipo.jugadores));
    formData.append('entrenadores', JSON.stringify(equipo.entrenadores));
    
    return formData;


  }}
