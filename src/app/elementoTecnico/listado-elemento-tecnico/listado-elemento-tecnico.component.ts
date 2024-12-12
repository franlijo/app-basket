import { Component } from '@angular/core';
import { IndiceEntidadComponent } from "../../compartidos/componentes/indice-entidad/indice-entidad.component";
import { ElementoTecnicoService } from '../elemento-tecnico.service';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';

@Component({
    selector: 'app-listado-elemento-tecnico',
    imports: [IndiceEntidadComponent],
    templateUrl: './listado-elemento-tecnico.component.html',
    styleUrl: './listado-elemento-tecnico.component.css',
    providers: [{
            provide: SERVICIO_CRUD_TOKEN, useClass: ElementoTecnicoService
        }]
})
export class ListadoElementoTecnicoComponent {

}
