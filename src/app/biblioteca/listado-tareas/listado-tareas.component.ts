import { Component } from '@angular/core';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { TareaService } from '../tarea.service';
import { IndiceEntidadComponent } from "../../compartidos/componentes/indice-entidad/indice-entidad.component";
import { ListadoGenericoComponent } from "../../compartidos/componentes/listado-generico/listado-generico.component";

@Component({
    selector: 'app-listado-tareas',
    imports: [IndiceEntidadComponent],
    templateUrl: './listado-tareas.component.html',
    styleUrl: './listado-tareas.component.css',
    providers: [
        { provide: SERVICIO_CRUD_TOKEN, useClass: TareaService }
    ]
})
export class ListadoTareasComponent {
  columnasAmostrar=['foto','nombre', 'estado','objetivoPrincipal', 'objetivoSecundario', 'acciones'];

}
