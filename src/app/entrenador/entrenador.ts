export interface EntrenadorCreacionDTO {
    nombre: string;
    apellidos: string; 
    nombreCorto: string;
    fechaNacimiento: Date; 
    titulacion: string; 
    email: string; 
    telefono: string; 
    foto: File; 
    historial: string;
    notas: string;

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
    foto?: string;
    historial?: string;
    notas?: string;

}
export interface entrenadorAutoCompleteDTO {

    id: number;    
    nombre: string;
    apellidos: string; 
    nombreCorto: string;
    rol: string;
    fechaInicio: Date;
    fechaFin: Date;
    foto: string;

}

