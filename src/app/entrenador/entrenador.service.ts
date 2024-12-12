import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';
import { IServicioCRUD } from '../compartidos/interfaces/IServicioCRUD';
import { EntrenadorDTO, EntrenadorCreacionDTO, entrenadorAutoCompleteDTO } from './entrenador';


@Injectable({
  providedIn: 'root'
})
export class EntrenadorService implements IServicioCRUD<EntrenadorDTO, EntrenadorCreacionDTO> {

  constructor() { }
  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/entrenadores';

  public obtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<EntrenadorDTO[]>>{
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<EntrenadorDTO[]>(this.urlBase, {params: queryParams, observe: 'response'});
  }

  public obtenerTodos(): Observable<EntrenadorDTO[]>{
    return this.http.get<EntrenadorDTO[]>(`${this.urlBase}/todos`);
  }


  public obtenerPorId(id: number): Observable<EntrenadorDTO>{
    return this.http.get<EntrenadorDTO>(`${this.urlBase}/${id}`);
  }

   public obtenerPorNombre(nombre: string): Observable<entrenadorAutoCompleteDTO[]>{
     return this.http.get<entrenadorAutoCompleteDTO[]>(`${this.urlBase}/${nombre}`);
   }

  public actualizar(id: number, entrenador: EntrenadorCreacionDTO){
    const formData = this.construirFormData(entrenador);
    return this.http.put(`${this.urlBase}/${id}`,formData);
  }

  public crear(entrenador: EntrenadorCreacionDTO){
    const formData = this.construirFormData(entrenador);
    return this.http.post(this.urlBase, formData);
  }

  public borrar(id:number){
    return this.http.delete(`${this.urlBase}/${id}`);
  }

  private construirFormData(entrenador: EntrenadorCreacionDTO): FormData{
    const formData = new FormData();

    formData.append('nombre', entrenador.nombre);
    formData.append('apellidos', entrenador.apellidos);
    formData.append('nombreCorto', entrenador.nombreCorto);
    formData.append('titulacion', entrenador.titulacion);
    formData.append('email', entrenador.email);
    formData.append('telefono', entrenador.telefono);
    formData.append('fechaNacimiento', entrenador.fechaNacimiento.toISOString().split('T')[0]);
    formData.append('historial', entrenador.historial);
    formData.append('notas', entrenador.notas);

    if (entrenador.foto){
      formData.append('foto', entrenador.foto);
    }

    return formData;
  }
}
