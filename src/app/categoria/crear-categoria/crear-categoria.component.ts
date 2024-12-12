import { Component } from '@angular/core';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { CategoriaService } from '../categoria.service';
import { FormularioCategoriaComponent } from '../formulario-categoria/formulario-categoria.component';
import { CrearEntidadComponent } from "../../compartidos/componentes/crear-entidad/crear-entidad.component";

@Component({
    selector: 'app-crear-categoria',
    imports: [CrearEntidadComponent],
    templateUrl: './crear-categoria.component.html',
    styleUrl: './crear-categoria.component.css',
    providers: [
        { provide: SERVICIO_CRUD_TOKEN, useClass: CategoriaService }
    ]
})
export class CrearCategoriaComponent {

  formularioCategorias = FormularioCategoriaComponent;


}
