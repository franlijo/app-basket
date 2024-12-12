import { Component, inject } from '@angular/core';
import { JugadoresService } from '../jugadores.service';
import { PaginacionDTO } from '../../compartidos/modelos/PaginacionDTO';
import { HttpResponse } from '@angular/common/http';
import { JugadorDTO } from '../jugador';
import { ListadoGenericoComponent } from "../../compartidos/componentes/listado-generico/listado-generico.component";


import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { IndiceEntidadComponent } from "../../compartidos/componentes/indice-entidad/indice-entidad.component";



@Component({
    selector: 'app-listado-jugadores',
    standalone: true,
    imports: [ MatButtonModule, MatTableModule, MatPaginatorModule, SweetAlert2Module, IndiceEntidadComponent],
    templateUrl: './listado-jugadores.component.html',
    styleUrl: './listado-jugadores.component.css',
    providers: [
        { provide: SERVICIO_CRUD_TOKEN, useClass: JugadoresService }
    ]
})
export class ListadoJugadoresComponent {
  columnasAMostrar = ['foto','nombreCorto','nombre','apellidos','genero','puesto', 'acciones'];
}
