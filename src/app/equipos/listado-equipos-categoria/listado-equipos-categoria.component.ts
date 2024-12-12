import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { EquiposService } from '../equipos.service';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IndiceEntidadComponent } from '../../compartidos/componentes/indice-entidad/indice-entidad.component';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { ListadoGenericoComponent } from "../../compartidos/componentes/listado-generico/listado-generico.component";
import { AutorizadoComponent } from "../../seguridad/autorizado/autorizado.component";
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { EquipoDTO } from '../equipo';


@Component({
  selector: 'app-listado-equipos-categoria',
  imports: [ListadoGenericoComponent, MatButtonModule, MatIconModule, RouterLink, SweetAlert2Module, AutorizadoComponent],
  templateUrl: './listado-equipos-categoria.component.html',
  styleUrl: './listado-equipos-categoria.component.css',
  providers: [
    { provide: SERVICIO_CRUD_TOKEN, useClass: EquiposService }
  ]
})
export class ListadoEquiposCategoriaComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.categoriaId = this.route.snapshot.params['id'];     
    this.cargarDatos();
  }


  url: string[] | null = null;
  categoriaId!: number;

  equiposService = inject(EquiposService);

  private router = inject(Router);

  equipos: EquipoDTO[] = [];
  // equipos = this.equiposService.obtenerListadoPorCategoria(2);

  @Output()
  borrado = new EventEmitter<void>();


  // columnasAMostrar = ['nombre','liga','fechaInicio', 'acciones'];

  borrar(id: number) {
    this.equiposService.borrar(id)
      .subscribe(() => this.borrado.emit())
  }



  cargarDatos(): void {
    this.equiposService.obtenerListadoPorCategoria(this.categoriaId).subscribe((listado) => {
      this.equipos = listado;
    })

  }


}
