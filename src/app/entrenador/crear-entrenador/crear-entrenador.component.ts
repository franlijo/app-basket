import { Component, inject} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EntrenadorCreacionDTO } from '../entrenador';
import { EntrenadorService } from '../entrenador.service';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { FormularioEntrenadorComponent } from "../formulario-entrenador/formulario-entrenador.component";
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { CrearEntidadComponent } from "../../compartidos/componentes/crear-entidad/crear-entidad.component";

@Component({
    selector: 'app-crear-entrenador',
    imports: [CrearEntidadComponent],
    // [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, FormularioEntrenadorComponent],
    templateUrl: './crear-entrenador.component.html',
    styleUrl: './crear-entrenador.component.css',
    providers: [
        { provide: SERVICIO_CRUD_TOKEN, useClass: EntrenadorService }
    ]
})
export class CrearEntrenadorComponent {

  formularioEntrenadores = FormularioEntrenadorComponent;


  
}
