import { Component, Input, numberAttribute } from '@angular/core';
import { FormularioEntrenadorComponent } from "../formulario-entrenador/formulario-entrenador.component";
import { EntrenadorCreacionDTO, EntrenadorDTO } from '../entrenador';

@Component({
  selector: 'app-editar-entrenador',
  standalone: true,
  imports: [FormularioEntrenadorComponent],
  templateUrl: './editar-entrenador.component.html',
  styleUrl: './editar-entrenador.component.css'
})
export class EditarEntrenadorComponent {

  @Input({transform: numberAttribute})
  id!:number;

  entrenador: EntrenadorDTO = {id: 1, nombre: 'Luis', apellidos: 'Sanchez', nombreCorto: 'pepe', email: 'correo', telefono: '879456', titulacion: 'Nivel 2',
      fechaNacimiento: new Date('1980-01-15')
  } ;


  guardarCambios(entrenador: EntrenadorCreacionDTO) {


    }
    
}
