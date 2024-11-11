export interface EntrenadorCreacionDTO {
    nombre: string;
    apellidos: string; 
    nombreCorto: string;
    fechaNacimiento: Date; 
    titulacion: string; 
    email: string; 
    telefono: string; 
    foto?: File; 

}

export interface EntrenadorDTO {

    id: number;    
    nombre: string;
    apellidos: string; 
    nombreCorto: string;
    fechaNacimiento: Date; 
    titulacion: string; 
    email: string; 
    telefono: string; 
    foto?: string

}