import { inject, Injectable } from '@angular/core';
import { IServicioCRUD } from '../compartidos/interfaces/IServicioCRUD';
import { ElementoTecnicoCreacionDTO, ElementoTecnicoDTO } from './elementoTecnico';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';

@Injectable({
  providedIn: 'root'
})
export class ElementoTecnicoService implements IServicioCRUD<ElementoTecnicoCreacionDTO, ElementoTecnicoCreacionDTO> {
  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/elementosTecnicos';

  constructor() { }

  obtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<ElementoTecnicoCreacionDTO[]>> {
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<ElementoTecnicoDTO[]>(this.urlBase, {params: queryParams, observe: 'response'});
  }

  obtenerTodos(): Observable<ElementoTecnicoDTO[]>{
    return this.http.get<ElementoTecnicoDTO[]>(`${this.urlBase}/todos`);
  }

  obtenerPorId(id: number): Observable<ElementoTecnicoCreacionDTO> {
    return this.http.get<ElementoTecnicoDTO>(`${this.urlBase}/${id}`);
  }
  actualizar(id: number, entidad: ElementoTecnicoCreacionDTO): Observable<any> {
    return this.http.put(`${this.urlBase}/${id}`, entidad);
  }
  crear(entidad: ElementoTecnicoCreacionDTO): Observable<any> {
    return this.http.post(this.urlBase, entidad);
  }
  borrar(id: number): Observable<any> {
    return this.http.delete(`${this.urlBase}/${id}`);
  }

  
}
