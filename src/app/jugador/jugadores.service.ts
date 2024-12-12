import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { jugadorAutoCompleteDTO, JugadorCreacionDTO, JugadorDTO } from './jugador';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';
import { from, Observable } from 'rxjs';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';
import { IServicioCRUD } from '../compartidos/interfaces/IServicioCRUD';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService implements IServicioCRUD<JugadorDTO, JugadorCreacionDTO>{

  constructor() { }
  private http =inject(HttpClient);
  private urlBase = environment.apiURL + '/jugadores';

  public obtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<JugadorDTO[]>>{
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<JugadorDTO[]>(this.urlBase, {params: queryParams, observe: 'response'});

  }

  public obtenerPorId(id: number): Observable<JugadorDTO>{
    return this.http.get<JugadorDTO>(`${this.urlBase}/${id}`);
  }

  public obtenerPorNombre (nombre:string): Observable<jugadorAutoCompleteDTO[]>{
    return this.http.get<jugadorAutoCompleteDTO[]>(`${this.urlBase}/${nombre}`);
  }


  public actualizar(id: number, jugador: JugadorCreacionDTO){
    const formData = this.construirFormData(jugador);
    return this.http.put(`${this.urlBase}/${id}`, formData);
  }

  
  public crear(jugador : JugadorCreacionDTO){
    const formData = this.construirFormData(jugador);
    return this.http.post(this.urlBase,formData);
    
  }

  public borrar(id: number){
    return this.http.delete(`${this.urlBase}/${id}`);
  }



  private construirFormData(jugador: JugadorCreacionDTO): FormData{
    const formData = new FormData();

    formData.append('nombre', jugador.nombre);

    formData.append('apellidos', jugador.apellidos);
    formData.append('nombreCorto', jugador.nombreCorto);
    formData.append('nombre', jugador.nombre);
    formData.append('genero', jugador.genero);
    formData.append('email', jugador.email);
    formData.append('altura', jugador.altura);
    formData.append('puesto', jugador.puesto);
    formData.append('telefono', jugador.telefono);
    formData.append('historial', jugador.historial);
    formData.append('notas', jugador.notas);
    formData.append('caracteristicas', jugador.caracteristicas);
    formData.append('tutor', jugador.tutor);
    formData.append('fechaNacimiento', jugador.fechaNacimiento.toISOString().split('T')[0]);

    if (jugador.foto){
      formData.append('foto', jugador.foto);
    }

    return formData;

  }

}
