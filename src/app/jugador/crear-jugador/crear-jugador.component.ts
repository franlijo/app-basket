import { Component } from '@angular/core';
import { FormularioJugadorComponent } from "../formulario-jugador/formulario-jugador.component";
import { JugadorCreacionDTO } from '../jugador';

@Component({
  selector: 'app-crear-jugador',
  standalone: true,
  imports: [FormularioJugadorComponent],
  templateUrl: './crear-jugador.component.html',
  styleUrl: './crear-jugador.component.css'
})
export class CrearJugadorComponent {
  
guardarCambios(jugador: JugadorCreacionDTO) {

}

}
