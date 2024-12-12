import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-formulario-partido',
  imports: [ FormsModule],
  templateUrl: './formulario-partido.component.html'
})
export class FormularioPartidoComponent {
  fechaPartido: string = '';

  @Output() posteoFormulario: EventEmitter<string> = new EventEmitter();

  enviarFormulario() {
    // Emitir el evento con la fecha del partido
    this.posteoFormulario.emit(this.fechaPartido);
  }
}