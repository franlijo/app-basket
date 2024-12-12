import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { JugadorCreacionDTO, JugadorDTO } from '../jugador';
import { FormularioJugadorComponent } from "../formulario-jugador/formulario-jugador.component";
import { JugadoresService } from '../jugadores.service';
import { Router } from '@angular/router';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { CargandoComponent } from "../../compartidos/componentes/cargando/cargando.component";
import { EditarEntidadComponent } from "../../compartidos/componentes/editar-entidad/editar-entidad.component";
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';

@Component({
    selector: 'app-editar-jugador',
    standalone: true,
    imports: [EditarEntidadComponent],
    templateUrl: './editar-jugador.component.html',
    styleUrl: './editar-jugador.component.css',
    providers: [
        { provide: SERVICIO_CRUD_TOKEN, useClass: JugadoresService }
    ]
})
export class EditarJugadorComponent {
 
  @Input({transform: numberAttribute})
  id!:number;

  formularioJugadores = FormularioJugadorComponent;


}
