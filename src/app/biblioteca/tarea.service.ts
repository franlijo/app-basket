import { inject, Injectable } from '@angular/core';
import { IServicioCRUD } from '../compartidos/interfaces/IServicioCRUD';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';
import { TareaCreacionDTO, TareaDTO, TareasHistoricoDTO, TareasPostGetDTO, TareasPutGetDTO } from './tarea';
import { environment } from '../../environments/environment.development';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';

@Injectable({
  providedIn: 'root'
})
export class TareaService implements IServicioCRUD<TareaDTO, TareaCreacionDTO> {

  constructor() { }
  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/tareas';

  public obtenerHistorico(): Observable<TareasHistoricoDTO>{
    return this.http.get<TareasHistoricoDTO>(`${this.urlBase}/historico`);
  }
  
  public obtenerPorId(id: number): Observable<TareaDTO> {
    return this.http.get<TareaDTO>(`${this.urlBase}/${id}`);
  }

  public obtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<TareaDTO[]>> {
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<TareaDTO[]>(this.urlBase, {params: queryParams, observe: 'response'});
    
  }

  public filtrar(valores: any): Observable<HttpResponse<TareaDTO[]>>{
    const params = new HttpParams({fromObject: valores});
    return this.http.get<TareaDTO[]>(`${this.urlBase}/filtrar`, {params, observe: 'response'});
  }

  public actualizar(id: number, entidad: TareaCreacionDTO): Observable<any> {
    const formData = this.construirFormData(entidad);
    return this.http.put(`${this.urlBase}/${id}`,formData);
   
  }

  public actualizarGet(id: number): Observable<TareasPutGetDTO>{
    return this.http.get<TareasPutGetDTO>(`${this.urlBase}/PutGet/${id}`);
  }

  public crearGet() : Observable<TareasPostGetDTO>{
    return this.http.get<TareasPostGetDTO>(`${this.urlBase}/PostGet`);
  }

  public crear(entidad: TareaCreacionDTO): Observable<TareaDTO> {
    const formData = this.construirFormData(entidad);
    return this.http.post<TareaDTO>(this.urlBase, formData);
  }
  
  public borrar(id: number): Observable<any> {
    return this.http.delete(`${this.urlBase}/${id}`);
  }

  private construirFormData(tarea: TareaCreacionDTO): FormData {
    const formData = new FormData();

    formData.append('nombre', tarea.nombre);
    formData.append('descripcion', tarea.descripcion);
    // formData.append('version', tarea.version);
    formData.append('version', tarea.version ? tarea.version.toString() : '');
    formData.append('tareaPadre', tarea.tareaPadre.toString());
    formData.append('fechaInicio', tarea.fechaInicio.toLocaleDateString('es-ES'));
    formData.append('fechaFin', tarea.fechaFin.toLocaleDateString('es-ES'));    
    formData.append('estado', tarea.estado);
    formData.append('entrenadorId', tarea.entrenadorId.toString());
    formData.append('dominio', tarea.dominio);
    formData.append('numeroMin',tarea.numeroMin.toString());
    formData.append('numeroMax', tarea.numeroMax.toString());

    formData.append('tiempoMin',tarea.tiempoMin.toString());
    formData.append('tiempoMax', tarea.tiempoMax.toString());
    
    formData.append('nivelFisico', tarea.nivelFisico.toString());

    formData.append('ataque', tarea.ataque.toString());
    formData.append('defensa', tarea.defensa.toString());
    formData.append('tecnicoIndividual', tarea.tecnicoIndividual.toString());
    formData.append('tacticoIndividual', tarea.tacticoIndividual.toString());
    formData.append('tecnicoColectivo', tarea.tecnicoColectivo.toString());
    formData.append('tacticoColectivo', tarea.tacticoColectivo.toString());

    formData.append('material', tarea.material);
    formData.append('objetivoPrincipal', tarea.objetivoPrincipal);
    formData.append('objetivoSecundario', tarea.objetivoSecundario);
    formData.append('comentario', tarea.comentario);
    formData.append('video',tarea.video);
    formData.append('categoriasIds', JSON.stringify(tarea.categoriasIds));
    formData.append('elementosTecnicosIds',JSON.stringify(tarea.elementosTecnicosIds));
    formData.append('imagenesIds', JSON.stringify(tarea.imagenesIds));
    
    if (tarea.foto){
      formData.append('foto', tarea.foto);
    }
    return formData;
  }
}
