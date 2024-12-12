import { Component, Input, numberAttribute } from '@angular/core';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { ElementoTecnicoService } from '../elemento-tecnico.service';
import { EditarEntidadComponent } from "../../compartidos/componentes/editar-entidad/editar-entidad.component";
import { FormularioElementoTecnicoComponent } from '../formulario-elemento-tecnico/formulario-elemento-tecnico.component';

@Component({
    selector: 'app-editar-elemento-tecnico',
    imports: [EditarEntidadComponent],
    templateUrl: './editar-elemento-tecnico.component.html',
    styleUrl: './editar-elemento-tecnico.component.css',
    providers: [{ provide: SERVICIO_CRUD_TOKEN, useClass: ElementoTecnicoService }]
})
export class EditarElementoTecnicoComponent {
  @Input({transform: numberAttribute}) id!: number;
  formularioElementoTecnico = FormularioElementoTecnicoComponent;

}
