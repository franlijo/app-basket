import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IServicioCRUD } from '../compartidos/interfaces/IServicioCRUD';
import { TareaImagenCreacionDTO, TareaImagenDTO } from './tarea';
import { environment } from '../../environments/environment';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';

@Injectable({
  providedIn: 'root'
})
export class TareaImagenService implements IServicioCRUD<TareaImagenDTO, TareaImagenCreacionDTO> {

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/tareasimagenes';

  constructor() { }
  
  
  public obtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<TareaImagenDTO[]>> {
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<TareaImagenDTO[]>(this.urlBase, {params: queryParams, observe: 'response'});
    
  }

  public obtenerPorId(id: number): Observable<TareaImagenDTO> {
    return this.http.get<TareaImagenDTO>(`${this.urlBase}/${id}`);
  }

  public obtenerPorTareaId(TareaId: number): Observable<TareaImagenDTO[]> {
    return this.http.get<TareaImagenDTO[]>(`${this.urlBase}/${TareaId}`);
  }


  public actualizar(id: number, entidad: TareaImagenCreacionDTO): Observable<any> {
    const formData = this.construirFormData(entidad);
    return this.http.put(`${this.urlBase}/${id}`,formData);
   
  }
  construirFormData(entidad: TareaImagenCreacionDTO): FormData {
    const formData = new FormData();

    formData.append('nombre', entidad.nombre);
    formData.append('descripcion', entidad.descripcion);
    formData.append('orden', entidad.orden.toString());

    if (entidad.foto){
      formData.append('foto', entidad.foto);
    }

    return formData;
    
  }

  public crear(entidad: TareaImagenCreacionDTO): Observable<TareaImagenDTO> {
    const formData = this.construirFormData(entidad);
    return this.http.post<TareaImagenDTO>(this.urlBase, formData);
  }
  
  public borrar(id: number): Observable<any> {
    return this.http.delete(`${this.urlBase}/${id}`);
  }

}
