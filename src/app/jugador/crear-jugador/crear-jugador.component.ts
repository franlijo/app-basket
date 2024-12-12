import { Component, inject } from '@angular/core';
import { FormularioJugadorComponent } from "../formulario-jugador/formulario-jugador.component";
import { JugadorCreacionDTO } from '../jugador';
import { JugadoresService } from '../jugadores.service';
import { Router } from '@angular/router';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { CrearEntidadComponent } from "../../compartidos/componentes/crear-entidad/crear-entidad.component";

@Component({
    selector: 'app-crear-jugador',
    standalone: true,
    imports: [ CrearEntidadComponent],
    templateUrl: './crear-jugador.component.html',
    styleUrl: './crear-jugador.component.css',
    providers: [{ provide: SERVICIO_CRUD_TOKEN, useClass: JugadoresService }]
})
export class CrearJugadorComponent {
  formularioJugadores= FormularioJugadorComponent;


}
