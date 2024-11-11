import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { JugadorCreacionDTO, JugadorDTO } from '../jugador';
import moment from 'moment';

@Component({
  selector: 'app-formulario-jugador',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule],
  templateUrl: './formulario-jugador.component.html',
  styleUrl: './formulario-jugador.component.css'
})
export class FormularioJugadorComponent implements OnInit{
  ngOnInit(): void {
    if (this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  private formbuilder = inject(FormBuilder);

  @Input()
  modelo?: JugadorDTO

  @Output()
  posteoFormulario = new EventEmitter<JugadorCreacionDTO>();

  form = this.formbuilder.group({
    nombre: ['', {
      validators: [Validators.required]
    }],
    apellidos: ['', {
      validators: [Validators.required]
    }],

    fechaNacimiento: new FormControl<Date | null>(null)
  })

  guardarCambios() {
    if (!this.form.valid){return;}

    const jugador = this.form.value as JugadorCreacionDTO;
    jugador.fechaNacimiento = moment(jugador.fechaNacimiento).toDate();
    this.posteoFormulario.emit(jugador);


    }
    

}
