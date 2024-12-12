import { Component, inject } from '@angular/core';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { TareaService } from '../tarea.service';
import { Router } from '@angular/router';
import { TareaImagenDTO, TareaCreacionDTO } from '../tarea';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { FormularioTareaComponent } from "../formulario-tarea/formulario-tarea.component";
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo';
import { CargandoComponent } from "../../compartidos/componentes/cargando/cargando.component";
import { FormularioImagenComponent } from "../formulario-imagen/formulario-imagen.component";

@Component({
    selector: 'app-crear-tarea',
    standalone: true,
    imports: [MostrarErroresComponent, FormularioTareaComponent, CargandoComponent],
    templateUrl: './crear-tarea.component.html',
    styleUrl: './crear-tarea.component.css', 
    providers: [
        {provide: SERVICIO_CRUD_TOKEN, useClass: TareaService}
    ]
})
export class CrearTareaComponent {


    elementosTecnicosSeleccionados: SelectorMultipleDTO[] =[];
    elementosTecnicosNoSeleccionados: SelectorMultipleDTO[] =[];
    categoriasSeleccionadas: SelectorMultipleDTO[] =[];
    categoriasNoSeleccionadas : SelectorMultipleDTO[]=[];
    imagenesTareaSeleccionadas: TareaImagenDTO[]=[];
  
    
    tareaService = inject(TareaService);

    router = inject(Router);
    errores: string[] = [];

    constructor(){
         this.tareaService.crearGet().subscribe(modelo => {
             this.elementosTecnicosNoSeleccionados = modelo.elementosTecnicos.map(elemento => {
                return<SelectorMultipleDTO>{llave: elemento.id, valor: elemento.nombre};
            })

             this.categoriasNoSeleccionadas = modelo.categorias.map(categoria => {
                return <SelectorMultipleDTO>{llave: categoria.id, valor: categoria.nombre.substring(0,8)+' - ' + categoria.genero.substring(0,1)};
             }

             )
         })

    }

    guardarCambios(tarea: TareaCreacionDTO){
        this.tareaService.crear(tarea).subscribe({
            next: tarea => {
                this.router.navigate(['/tareas']);
            },
            error: err => {
                const errores = extraerErrores(err);
                this.errores= errores;
            }
        })
    }

}
