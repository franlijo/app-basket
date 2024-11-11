import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { EntrenadorService } from '../entrenador.service';
import { EntrenadorDTO } from '../entrenador';
import { ListadoGenericoComponent } from "../../compartidos/componentes/listado-generico/listado-generico.component";
import { MatTableModule } from '@angular/material/table';
import { HttpResponse } from '@angular/common/http';
import { PaginacionDTO } from '../../compartidos/modelos/PaginacionDTO';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-listado-entrenadores',
  standalone: true,
  imports: [RouterLink, MatButtonModule, ListadoGenericoComponent, MatTableModule, MatPaginatorModule],
  templateUrl: './listado-entrenadores.component.html',
  styleUrl: './listado-entrenadores.component.css'
})
export class ListadoEntrenadoresComponent {
  entrenadorService = inject(EntrenadorService);
  entrenadores!: EntrenadorDTO[];
  columnasAMostrar = ['id', 'nombreCorto','nombre','apellidos','titulacion','acciones'];
  paginacion : PaginacionDTO = {pagina:1, recordsPorPagina: 5};
  cantidadTotalRegistros!: number; 


  constructor() {
  this.cargarRegistros();    
  }

  cargarRegistros()
  {
    this.entrenadorService.obtenerPaginado(this.paginacion).subscribe((respuesta: HttpResponse<EntrenadorDTO[]>)=> {
      this.entrenadores = respuesta.body as EntrenadorDTO[];
      const cabecera = respuesta.headers.get("catidad-total-registros") as string;
      this.cantidadTotalRegistros = parseInt(cabecera, 10);
    })

  }

  actualizarPaginacion(datos: PageEvent){
    this.paginacion = {pagina: datos.pageIndex +1, recordsPorPagina: datos.pageSize};
    this.cargarRegistros;

  }


}
