import { Sexo } from "../compartidos/Sexo";

export interface JugadorDTO {
    id: number;
    nombre: string;
    apellidos: string; 
    fechaNacimiento: Date; 
}

export interface JugadorCreacionDTO {
    nombre: string;
    apellidos: string; 
    fechaNacimiento: Date; 
}