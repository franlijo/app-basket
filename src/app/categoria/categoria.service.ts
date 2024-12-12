import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CategoriaCreacionDTO, CategoriaDTO } from './categoria';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';
import { IServicioCRUD } from '../compartidos/interfaces/IServicioCRUD';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService implements IServicioCRUD<CategoriaDTO, CategoriaCreacionDTO> {

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/categorias';
  
  constructor() { }

  public obtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<CategoriaDTO[]>>{
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<CategoriaDTO[]>(this.urlBase, {params: queryParams, observe: 'response'});

  }

  public obtenerTodas(): Observable<CategoriaDTO[]>{
    return this.http.get<CategoriaDTO[]>(`${this.urlBase}/todas`);
  }

  public obtenerPorId(id: number): Observable<CategoriaDTO>{
    return this.http.get<CategoriaDTO>(`${this.urlBase}/${id}`);
  }

  public actualizar(id: number, entidad: CategoriaCreacionDTO): Observable<any>{
    return this.http.put(`${this.urlBase}/${id}`, entidad);
  }

  public crear(entidad: CategoriaCreacionDTO): Observable<any>{
    return this.http.post(this.urlBase, entidad);
  }

  public borrar(id:number): Observable<any>{
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}

