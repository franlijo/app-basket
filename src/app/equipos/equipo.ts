import { entrenadorAutoCompleteDTO } from "../entrenador/entrenador";
import { jugadorAutoCompleteDTO } from "../jugador/jugador";

export interface EquipoDTO{

    id: number; 
    nombre:string;
    categoriaId: string;
    categoriaNombre: string;
    categoriaGenero: string; 
    liga: string;
    fechaInicio: Date;
    fechaFin: Date;
    minimoJugadores: number;
    maximoJugadores: number;
    foto?: string;
    jugadores?: jugadorAutoCompleteDTO[];
    entrenadores?: entrenadorAutoCompleteDTO[];
}

export interface EquipoCreacionDTO {

    nombre:string;
    categoriaId: string;
    liga: string;
    fechaInicio: Date;
    fechaFin: Date;
    minimoJugadores: number;
    maximoJugadores: number;
    foto?: File;
    jugadores?: jugadorAutoCompleteDTO[];
    entrenadores?: entrenadorAutoCompleteDTO[];

}

export interface ListadoEquiposDTO {

    equiposTemporada: EquipoDTO[];
    equiposHistorico: EquipoDTO[];
}

export interface EquiposPutGetDTO {
    equipo: EquipoDTO;
    jugadores: jugadorAutoCompleteDTO[];
    entrenadores: entrenadorAutoCompleteDTO[];
}