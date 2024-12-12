import { Component, inject, Input, OnInit, ViewChild, viewChild } from '@angular/core';
import { PaginacionDTO } from '../../modelos/PaginacionDTO';
import { SERVICIO_CRUD_TOKEN } from '../../proveedores/proveedores';
import { HttpResponse } from '@angular/common/http';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ListadoGenericoComponent } from "../listado-generico/listado-generico.component";
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { IServicioCRUD } from '../../interfaces/IServicioCRUD';
import { ListadoEquiposCategoriaComponent } from '../../../equipos/listado-equipos-categoria/listado-equipos-categoria.component';

@Component({
  selector: 'app-indice-entidad',
  standalone: true,
  imports: [RouterLink, MatButtonModule, ListadoGenericoComponent, MatTableModule, MatPaginatorModule, SweetAlert2Module],
  templateUrl: './indice-entidad.component.html',
  styleUrl: './indice-entidad.component.css'
})
export class IndiceEntidadComponent<TDTO, TCreacionDTO> implements OnInit{

  ngOnInit(): void {
     
      
  }
  @Input({ required: true })
  titulo!: string;

  @Input({ required: true })
  rutaCrear!: string;

  @Input({ required: true })
  rutaEditar!: string;

  @ViewChild("ListadoEquiposCategoriaChild") ListadoEquiposCategoriaComponent!: ListadoEquiposCategoriaComponent;

  @Input()
  columnasAMostrar = ['id', 'nombre', 'acciones', 'foto'];

  servicioCRUD = inject(SERVICIO_CRUD_TOKEN) as IServicioCRUD<TDTO, TCreacionDTO>;

  paginacion: PaginacionDTO = { pagina: 1, recordsPorPagina: 10 };
  entidades!: TDTO[];
  cantidadTotalRegistros!: number;

  constructor() {
    this.cargarRegistros();
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginacion = { pagina: datos.pageIndex + 1, recordsPorPagina: datos.pageSize };
    this.cargarRegistros();

  }

  cargarRegistros() {
    this.servicioCRUD.obtenerPaginado(this.paginacion).subscribe((respuesta: HttpResponse<TDTO[]>) => {
      this.entidades = respuesta.body as TDTO[];
      const cabecera = respuesta.headers.get("cantidad-total-registros") as string;
      this.cantidadTotalRegistros = parseInt(cabecera, 10);
    })
  }

  borrar(id: number) {
    this.servicioCRUD.borrar(id)
      .subscribe(() => {
        //        this.paginacion.pagina = 1;
        this.cargarRegistros();
      })
  }

  primeraLetraEnMayuscula(valor: string) {
    if (!valor) return valor;
    return valor.charAt(0).toUpperCase() + valor.slice(1);
  }
}
