import { CategoriaDTO } from "../categoria/categoria";
import { ElementoTecnicoDTO } from "../elementoTecnico/elementoTecnico";

export interface TareaDTO {
    id: number;
    nombre: string;
    descripcion: string; 
    version: string; 
    fechaInicio: Date;
    fechaFin?: Date;
    tareaPadre: number;
    estado: string;
    entrenadorId: number;
    dominio: string;
    numeroMin: number;
    numeroMax: number;
    tiempoMin: number;
    tiempoMax: number;
    nivelFisico?: number;
    ataque: number;
    defensa: number; 
    tecnicoIndividual: number;
    tacticoIndividual: number;
    tecnicoColectivo: number;
    tacticoColectivo: number;
    material?: string; 
    objetivoPrincipal: string;
    objetivoSecundario?: string;
    comentario?: string;
    foto?: string;
    video?: string;
}

export interface TareaCreacionDTO {
    nombre: string;
    descripcion: string; 
    version: string; 
    fechaInicio: Date;
    fechaFin: Date;
    tareaPadre: number;
    estado: string;
    entrenadorId: number;
    dominio: string;
    numeroMin: number;
    numeroMax: number;
    tiempoMin: number;
    tiempoMax: number;
    nivelFisico: number;
    ataque: number;
    defensa: number; 
    tecnicoIndividual: number;
    tacticoIndividual: number;
    tecnicoColectivo: number;
    tacticoColectivo: number;
    material: string; 
    objetivoPrincipal: string;
    objetivoSecundario: string;
    comentario: string;
    foto: File;
    video: string; 
    elementosTecnicosIds?: number[];
    categoriasIds?: number[];
    imagenesIds?: TareaImagenDTO[];
}

export interface TareasPostGetDTO{
    elementosTecnicos: ElementoTecnicoDTO[];
    categorias: CategoriaDTO[];
}

export interface TareasHistoricoDTO {
    tareasVigentes: TareaDTO[];
    tareasNoVigentes: TareaDTO[];

}

export interface TareasPutGetDTO {
        tarea: TareaDTO;
        imagenes: TareaImagenDTO[];
        elementosTecnicosSeleccionados: ElementoTecnicoDTO[];
        elementosTecnicosNoSeleccionados: ElementoTecnicoDTO[];
        categoriasSeleccionadas:CategoriaDTO[];
        categoriasNoSeleccionadas:CategoriaDTO[];
}

export interface TareaImagenDTO {
    id: number;
    orden: number;
    foto?: string | File;
    nombre: string;
    tareaId: number;
    descripcion: string;
  }

  export interface TareaImagenCreacionDTO {
    orden: number;
    foto?: File | string;
    nombre: string;
    tareaId: number;
    descripcion: string;
  }