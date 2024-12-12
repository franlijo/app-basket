import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { FormularioEntrenadorComponent } from "../formulario-entrenador/formulario-entrenador.component";
import { EntrenadorCreacionDTO, EntrenadorDTO } from '../entrenador';
import { EntrenadorService } from '../entrenador.service';
import { CargandoComponent } from "../../compartidos/componentes/cargando/cargando.component";
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { Router } from '@angular/router';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { EditarEntidadComponent } from "../../compartidos/componentes/editar-entidad/editar-entidad.component";

@Component({
    selector: 'app-editar-entrenador',
    imports: [EditarEntidadComponent],
    templateUrl: './editar-entrenador.component.html',
    styleUrl: './editar-entrenador.component.css',
    providers: [
        { provide: SERVICIO_CRUD_TOKEN, useClass: EntrenadorService }
    ]
})
export class EditarEntrenadorComponent {

  @Input({transform: numberAttribute})
  id!:number;    

  formularioEntrenador = FormularioEntrenadorComponent;
}
