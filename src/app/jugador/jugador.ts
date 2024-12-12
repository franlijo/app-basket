import { Sexo } from "../compartidos/Sexo";

export interface JugadorDTO {
    id: number;
    nombre: string;
    apellidos: string; 
    nombreCorto: string;
    fechaNacimiento: Date;
    genero: string;
    altura?: string;
    puesto?: string;
    caracteristicas?: string; 
    tutor?: string;
    email?: string; 
    telefono?: string;
    foto?: string;
    historial?: string;
    notas?: string;

}

export interface JugadorCreacionDTO {
    nombre: string;
    apellidos: string; 
    nombreCorto: string;
    fechaNacimiento: Date;
    genero: string;
    altura: string;
    puesto: string;
    caracteristicas: string; 
    tutor: string;
    email: string; 
    telefono: string;
    foto: File;
    historial: string;
    notas: string;
}

export interface jugadorAutoCompleteDTO {
    id: number;
    nombre: string;
    apellidos: string; 
    nombreCorto: string;
    foto: string;
    dorsal: string;
    fechaInicio: string;
    fechaFin: string;


}