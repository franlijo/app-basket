import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EntrenadorCreacionDTO, EntrenadorDTO } from './entrenador';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/entrenadores';
  
  constructor() { }

  public obtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<EntrenadorDTO[]>>{
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<EntrenadorDTO[]>(this.urlBase, {params: queryParams, observe: 'response'});

  }

  public crear(entrenador: EntrenadorCreacionDTO){
    return this.http.post(this.urlBase, entrenador);
  }
}
