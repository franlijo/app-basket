import { Component, inject } from '@angular/core';
import { EntrenadorService } from '../entrenador.service';
import { IndiceEntidadComponent } from "../../compartidos/componentes/indice-entidad/indice-entidad.component";
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';

@Component({
    selector: 'app-listado-entrenadores',
    imports: [IndiceEntidadComponent],
    templateUrl: './listado-entrenadores.component.html',
    styleUrl: './listado-entrenadores.component.css',
    providers: [
        { provide: SERVICIO_CRUD_TOKEN, useClass: EntrenadorService }
    ]
})
export class ListadoEntrenadoresComponent {
  columnasAMostrar = ['foto','nombreCorto','nombre','apellidos','titulacion', 'acciones'];

}
