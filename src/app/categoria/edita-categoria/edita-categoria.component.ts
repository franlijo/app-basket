import { Component, Input, numberAttribute } from '@angular/core';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { CategoriaService } from '../categoria.service';
import { transferArrayItem } from '@angular/cdk/drag-drop';
import { FormularioCategoriaComponent } from '../formulario-categoria/formulario-categoria.component';
import { EditarEntidadComponent } from "../../compartidos/componentes/editar-entidad/editar-entidad.component";

@Component({
    selector: 'app-edita-categoria',
    imports: [EditarEntidadComponent],
    templateUrl: './edita-categoria.component.html',
    styleUrl: './edita-categoria.component.css',
    providers: [{ provide: SERVICIO_CRUD_TOKEN, useClass: CategoriaService }]
})
export class EditaCategoriaComponent {
  @Input({transform: numberAttribute})
  id!: number;
  formularioCategoria = FormularioCategoriaComponent;

}
