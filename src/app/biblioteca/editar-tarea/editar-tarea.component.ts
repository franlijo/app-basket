import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { TareaService } from '../tarea.service';
import { TareaImagenDTO, TareaCreacionDTO, TareaDTO } from '../tarea';
import { Router } from '@angular/router';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { FormularioTareaComponent } from "../formulario-tarea/formulario-tarea.component";
import { CargandoComponent } from '../../compartidos/componentes/cargando/cargando.component';
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo';
import { FormularioImagenComponent } from "../formulario-imagen/formulario-imagen.component";


@Component({
  selector: 'app-editar-tarea',
  standalone: true,
  imports: [FormularioTareaComponent, MostrarErroresComponent, CargandoComponent, FormularioImagenComponent],
  templateUrl: './editar-tarea.component.html',
  styleUrl: './editar-tarea.component.css',
  providers: [
    { provide: SERVICIO_CRUD_TOKEN, useClass: TareaService }
  ]
})
export class EditarTareaComponent implements OnInit {
  ngOnInit(): void {



    this.tareaService.actualizarGet(this.id).subscribe(modelo => {

      this.tarea = modelo.tarea;
      this.imagenesTareaSeleccionadas = modelo.imagenes;

      this.elementosTecnicosNoSeleccionados = modelo.elementosTecnicosNoSeleccionados.map(elementoTecnico => {
        return <SelectorMultipleDTO>{ llave: elementoTecnico.id, valor: elementoTecnico.nombre };
      })

      this.elementosTecnicosSeleccionados = modelo.elementosTecnicosSeleccionados.map(elementoTecnico => {
        return <SelectorMultipleDTO>{ llave: elementoTecnico.id, valor: elementoTecnico.nombre };
      })

      this.categoriasNoSeleccionadas = modelo.categoriasNoSeleccionadas.map(categoria => {
        return <SelectorMultipleDTO>{ llave: categoria.id, valor: categoria.nombre.substring(0,8)+' - ' + categoria.genero.substring(0,1) };
      })


      this.categoriasSeleccionadas = modelo.categoriasSeleccionadas.map(categoria => {
        return <SelectorMultipleDTO>{ llave: categoria.id, valor: categoria.nombre.substring(0,8)+' - ' + categoria.genero.substring(0,1) };
      })
    })

  }

  @Input({ transform: numberAttribute }) id!: number;
  
  tarea!: TareaDTO;
  elementosTecnicosSeleccionados!: SelectorMultipleDTO[];
  elementosTecnicosNoSeleccionados!: SelectorMultipleDTO[];
  categoriasSeleccionadas!: SelectorMultipleDTO[];
  categoriasNoSeleccionadas!: SelectorMultipleDTO[];
  imagenesTareaSeleccionadas!: TareaImagenDTO[];

  tareaService = inject(TareaService);
  router = inject(Router);
  errores: string[] = [];

  guardarCambios(tarea: TareaCreacionDTO) {
    this.tareaService.actualizar(this.id, tarea).subscribe({
      next: () => {
        this.router.navigate(['/tareas']);
      },
      error: err => {
        const errores = extraerErrores(err);
        this.errores = errores;
      }
    })
  }

}
