import { Component, inject } from '@angular/core';
import { entrenadorAutoCompleteDTO } from '../../entrenador/entrenador';
import { jugadorAutoCompleteDTO } from '../../jugador/jugador';
import { EquiposService } from '../equipos.service';
import { EquipoCreacionDTO } from '../equipo';
import { Router } from '@angular/router';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { CargandoComponent } from "../../compartidos/componentes/cargando/cargando.component";
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { FormularioEquiposComponent } from '../formulario-equipos/formulario-equipos.component';
import { CrearEntidadComponent } from "../../compartidos/componentes/crear-entidad/crear-entidad.component";

@Component({
    selector: 'app-crear-equipo',
    standalone: true,
    imports: [ MostrarErroresComponent, FormularioEquiposComponent, CargandoComponent],
    templateUrl: './crear-equipo.component.html',
    styleUrl: './crear-equipo.component.css',
    providers: [
        { provide: SERVICIO_CRUD_TOKEN, useClass: EquiposService }
    ]
})
export class CrearEquipoComponent {

  // formularioEquipos = FormularioEquiposComponent;
  jugadoresSeleccionados: jugadorAutoCompleteDTO[] = [];
  entrenadoresSeleccionados: entrenadorAutoCompleteDTO[] = [];
  equiposService = inject(EquiposService);
  router = inject(Router);
  errores: string[] = [];

  guardarCambios(equipo: EquipoCreacionDTO){
    this.equiposService.crear(equipo).subscribe({
      next: equipo => {
        this.router.navigate(['/equipos']);
      },
      error: err => {
        const errores = extraerErrores(err);
        this.errores = errores;
      }
    })
  }
  
}
