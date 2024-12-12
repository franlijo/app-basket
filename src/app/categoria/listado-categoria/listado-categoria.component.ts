import { Component } from '@angular/core';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { CategoriaService } from '../categoria.service';
import { IndiceEntidadComponent } from "../../compartidos/componentes/indice-entidad/indice-entidad.component";
import { ListadoGenericoComponent } from "../../compartidos/componentes/listado-generico/listado-generico.component";

@Component({
    selector: 'app-listado-categoria',
    imports: [IndiceEntidadComponent],
    templateUrl: './listado-categoria.component.html',
    styleUrl: './listado-categoria.component.css',
    providers: [{
            provide: SERVICIO_CRUD_TOKEN, useClass: CategoriaService
        }]
})
export class ListadoCategoriaComponent {
  

}
