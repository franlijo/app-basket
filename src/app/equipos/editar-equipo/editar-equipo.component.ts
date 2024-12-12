import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { FormularioEquiposComponent } from '../formulario-equipos/formulario-equipos.component';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { EquiposService } from '../equipos.service';
import { EditarEntidadComponent } from "../../compartidos/componentes/editar-entidad/editar-entidad.component";
import { EquipoCreacionDTO, EquipoDTO } from '../equipo';
import { jugadorAutoCompleteDTO } from '../../jugador/jugador';
import { entrenadorAutoCompleteDTO } from '../../entrenador/entrenador';
import { Router, RouterModule } from '@angular/router';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { CargandoComponent } from "../../compartidos/componentes/cargando/cargando.component";
import { MatButtonModule } from '@angular/material/button';
import { FormularioEntrenamientoComponent } from "../formulario-entrenamiento/formulario-entrenamiento.component";
import { FormularioPartidoComponent } from "../formulario-partido/formulario-partido.component";

@Component({
    selector: 'app-editar-equipo',
    standalone: true,
    imports: [MostrarErroresComponent, FormularioEquiposComponent, CargandoComponent, RouterModule, MatButtonModule, FormularioEntrenamientoComponent, FormularioPartidoComponent],
    templateUrl: './editar-equipo.component.html',
    styleUrl: './editar-equipo.component.css',
    providers: [
        { provide: SERVICIO_CRUD_TOKEN, useClass: EquiposService }
    ]
})
export class EditarEquipoComponent implements OnInit {
  ngOnInit(): void {

    this.equiposService.actualizarGet(this.id).subscribe(modelo => {
      this.equipo = modelo.equipo;
      this.jugadoresSeleccionados = modelo.jugadores;
      this.entrenadoresSeleccionados = modelo.entrenadores;
 
    })

  }

  @Input({transform: numberAttribute})
  id!:number;

  equipo!: EquipoDTO;
  jugadoresSeleccionados!: jugadorAutoCompleteDTO[];
  entrenadoresSeleccionados!: entrenadorAutoCompleteDTO[];

  equiposService = inject(EquiposService);
  router = inject(Router);
  errores: string[] = [];

  // formularioEquipos = FormularioEquiposComponent;

  guardarCambios(equipo: EquipoCreacionDTO){
    
    this.equiposService.actualizar(this.id, equipo).subscribe({
      next: () => {
        this.router.navigate(['/equipos']);
      },
      error: err => {
        const errores = extraerErrores(err);
        this.errores = errores;
      }
    })
  }

  guardarPartido() {
    throw new Error('Method not implemented.');
    }
  guardarEntrenamiento() {
    throw new Error('Method not implemented.');
    }
    

}
