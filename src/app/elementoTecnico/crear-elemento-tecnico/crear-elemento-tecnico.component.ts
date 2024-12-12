import { Component } from '@angular/core';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { ElementoTecnicoService } from '../elemento-tecnico.service';
import { FormularioElementoTecnicoComponent } from '../formulario-elemento-tecnico/formulario-elemento-tecnico.component';
import { CrearEntidadComponent } from "../../compartidos/componentes/crear-entidad/crear-entidad.component";

@Component({
    selector: 'app-crear-elemento-tecnico',
    imports: [CrearEntidadComponent],
    templateUrl: './crear-elemento-tecnico.component.html',
    styleUrl: './crear-elemento-tecnico.component.css',
    providers: [
        { provide: SERVICIO_CRUD_TOKEN, useClass: ElementoTecnicoService }
    ]
})
export class CrearElementoTecnicoComponent {

  formularioElementosTecnicos = FormularioElementoTecnicoComponent;

}
