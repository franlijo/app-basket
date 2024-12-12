import { Component, EventEmitter, Input, numberAttribute, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-formulario-entrenamiento',
  imports: [ 
    FormsModule, CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './formulario-entrenamiento.component.html'
})
export class FormularioEntrenamientoComponent {
  fechaEntrenamiento: string = '';
  @Input({ transform: numberAttribute })  id!: number;
  @Output() posteoFormulario: EventEmitter<string> = new EventEmitter();

  enviarFormulario() {
    // Emitir el evento con la fecha del entrenamiento
    this.posteoFormulario.emit(this.fechaEntrenamiento);
  }
}