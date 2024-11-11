import { Component, Input, numberAttribute } from '@angular/core';
import { JugadorCreacionDTO, JugadorDTO } from '../jugador';
import { FormularioJugadorComponent } from "../formulario-jugador/formulario-jugador.component";

@Component({
  selector: 'app-editar-jugador',
  standalone: true,
  imports: [FormularioJugadorComponent],
  templateUrl: './editar-jugador.component.html',
  styleUrl: './editar-jugador.component.css'
})
export class EditarJugadorComponent {

  @Input({transform: numberAttribute})
  id!:number;

  jugador: JugadorDTO = {id: 1, nombre: 'Alberto', apellidos:'Garcia', fechaNacimiento: new Date('2000-01-05')};

  guardarCambios(jugador: JugadorCreacionDTO){


  }


}
