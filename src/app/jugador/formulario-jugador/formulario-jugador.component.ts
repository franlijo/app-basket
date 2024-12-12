import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { JugadorCreacionDTO, JugadorDTO } from '../jugador';
import moment from 'moment';
import { fechaNoPuedeSerFutura, obtenerGenero } from '../../compartidos/funciones/validaciones';
import { InputImgComponent } from "../../compartidos/componentes/input-img/input-img.component";
import { MatRadioModule } from '@angular/material/radio';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
    selector: 'app-formulario-jugador',
    standalone: true,
    imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule, InputImgComponent, MatRadioModule, MatGridListModule, MatToolbarModule, MatCardModule],
    templateUrl: './formulario-jugador.component.html',
    styleUrl: './formulario-jugador.component.css'
})
export class FormularioJugadorComponent implements OnInit{
  ngOnInit(): void {
    if (this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  private formbuilder = inject(FormBuilder);

  @Input()
  modelo?: JugadorDTO

  @Output()
  posteoFormulario = new EventEmitter<JugadorCreacionDTO>();

  posicionesLista: string[] = ['Base', 'Escolta', 'Alero', 'Ala-pivot', 'Pivot'];

  form = this.formbuilder.group({
    nombre: ['', {validators: [Validators.required]}],
    apellidos: ['', {validators: [Validators.required]}],
    nombreCorto: ['', {validators: [Validators.required]}],
    fechaNacimiento: new FormControl<Date | null>(null, {
      validators: [Validators.required, fechaNoPuedeSerFutura()]
    }),
    genero: ['Masculino'],
    altura: ['165'],
    puesto: [''], 
    caracteristicas: [''], 
    tutor: [''], 
    email: [''], 
    telefono: [''], 
    foto: new FormControl<File | string | null>(null), 
    historial: ['', {validators: [Validators.maxLength(500)]}],
    notas: ['', {validators: [Validators.maxLength(500)]}],
  })

  obtenerErrorCampoNombre(){
    let campo = this.form.controls.nombre;

    if (campo.hasError('required')){
      return 'El campo nombre es obligatorio';
    }

    return "";
  }

  obtenerErrorCampoApellidos(){
    let campo = this.form.controls.apellidos;

    if (campo.hasError('required')){
      return 'El campo apellidos es obligatorio';
    }

    return "";
  }

  obtenerErrorCampoHistorial(){
    let campo = this.form.controls.historial;
    if (campo.hasError('maxlength')){
      return "El texto no puede superar los 500 caracteres ";
    }
    return '';
  }

  obtenerErrorCampoNotas(){
    let campo = this.form.controls.notas;
    if (campo.hasError('maxLength')){
      return "El texto no puede superar los 500 caracteres ";
    }
    return '';
  }  

  obtenerErrorCampoFechaNacimiento(){
    let campo = this.form.controls.fechaNacimiento;

    if (campo.hasError('required')){
      return 'El campo Fecha Nacimiento es requerido';
    }


    if (campo.hasError("futuro")){
      return campo.getError('futuro').mensaje;
    }

    return "";
  }

  archivoSeleccionado(file: File){
    this.form.controls.foto.setValue(file);
  }  


  guardarCambios() {
    if (!this.form.valid){
      return;
    }
    
    const jugador = this.form.value as JugadorCreacionDTO;
    jugador.fechaNacimiento = moment(jugador.fechaNacimiento).toDate();
    jugador.genero = obtenerGenero(jugador.genero);
    this.posteoFormulario.emit(jugador);
    }

}
