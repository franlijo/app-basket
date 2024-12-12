import { Component } from '@angular/core';
import { EquiposService } from '../equipos.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { IndiceEntidadComponent } from '../../compartidos/componentes/indice-entidad/indice-entidad.component';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';

@Component({
    selector: 'app-listado-equipos',
    imports: [IndiceEntidadComponent],
    templateUrl: './listado-equipos.component.html',
    styleUrl: './listado-equipos.component.css',
    providers: [
        { provide: SERVICIO_CRUD_TOKEN, useClass: EquiposService }
    ]
})
export class ListadoEquiposComponent {
  columnasAMostrar = ['foto', 'nombre','categoriaNombre','categoriaGenero','liga','fechaInicio', 'acciones'];

}
