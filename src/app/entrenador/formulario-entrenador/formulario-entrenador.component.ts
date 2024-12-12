import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { InputImgComponent } from '../../compartidos/componentes/input-img/input-img.component';
import moment from 'moment';
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo';
import { SelectorMultipleComponent } from "../../compartidos/componentes/selector-multiple/selector-multiple.component";
import { EntrenadorCreacionDTO, EntrenadorDTO } from '../entrenador';
import { primeraLetraMayuscula } from '../../compartidos/funciones/validaciones';
import { MatRadioModule } from '@angular/material/radio';


@Component({
    selector: 'app-formulario-entrenador',
    imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterLink, MatDatepickerModule, InputImgComponent, MatRadioModule],
    // [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterLink, MatDatepickerModule, InputImgComponent, SelectorMultipleComponent],
    templateUrl: './formulario-entrenador.component.html',
    styleUrl: './formulario-entrenador.component.css'
})
export class FormularioEntrenadorComponent implements OnInit{
  
  ngOnInit(): void {
    if (this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  @Input()
  modelo?: EntrenadorDTO; 

  @Output()
  posteoFormulario = new EventEmitter<EntrenadorCreacionDTO>();

  private formbuilder = inject(FormBuilder);

  form = this.formbuilder.group({
    nombre: ['', {validators:[Validators.required, primeraLetraMayuscula(), Validators.maxLength(50)] }], 
    apellidos: ['', {validators:[Validators.required, primeraLetraMayuscula()] }],
    nombreCorto: ['', {validators:[Validators.required]}],
    email: ['', {validators:[Validators.required, Validators.email]}],
    telefono: ['', {validators:[Validators.required, Validators.pattern(/^\+?\d{1,3}(\s?\d+)+$/)]}],
    titulacion: ['Sin titulacion', {validators:[Validators.required]}],
    fechaNacimiento: new FormControl<Date | null>(null, {validators: [Validators.required]}),
    foto: new FormControl<File | string | null>(null), 
    historial: ['', {validators: [Validators.maxLength(500)]}],
    notas: ['', {validators: [Validators.maxLength(500)]}],

  })

  obtenerErrorCampoNombre(): string{
    let nombre = this.form.controls.nombre; 
    if (nombre.hasError('required')){
      return "El campo nombre es obligatorio"
    }
    if (nombre.hasError('maxlength')){
      return `El campo nombre no puede tener mas de ${nombre.getError('maxlength').requiredLength} caracteres`;
    }
    if (nombre.hasError('primeraLetraMayuscula')){
      return nombre.getError("primeraLetraMayuscula").mensaje;
    }
    return '';
  }

  obtenerErrorCampoApellidos() {
    let apellidos = this.form.controls.apellidos; 
    if (apellidos.hasError('required')){
      return "El campo apellidos es obligatorio"
    }
    if (apellidos.hasError('primeraLetraMayuscula')){
      return apellidos.getError("primeraLetraMayuscula").mensaje;
    }
    return '';

    }

  obtenerErrorCampoTelefono() {
    let campo = this.form.controls.telefono; 
    if (campo.hasError('required')){
      return "El campo telefono es obligatorio"
    }
    if (campo.hasError('pattern')){
      return  "El campo teléfono debe tener un formato válido"
    }

    return '';


      
      }
  obtenerErrorCampoEmail() {
    let campo = this.form.controls.email; 
    if (campo.hasError('required')){
      return "El campo email es obligatorio"
    }

    if (campo.hasError('email')){
      return "El email debe tener un formato correcto"
    }
    return '';

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
      
    

  obtenerErrorCampoNombreCorto() {
      let nombreCorto = this.form.controls.nombreCorto; 
      if (nombreCorto.hasError('required')){
        return "El campo Nombre Corto es obligatorio"
      }
      if (nombreCorto.hasError('primeraLetraMayuscula')){
        return nombreCorto.getError("primeraLetraMayuscula").mensaje;
      }
      return '';
  
  }
  
  obtenerErrorCampoTitulacion() {
        let titulacion = this.form.controls.titulacion; 
        if (titulacion.hasError('required')){
          return "El campo Titulacion es obligatorio"
        }
        if (titulacion.hasError('primeraLetraMayuscula')){
          return titulacion.getError("primeraLetraMayuscula").mensaje;
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
    

  guardarCambios(){
    if (!this.form.valid){
          return;
    }
 
    const entrenador = this.form.value as EntrenadorCreacionDTO;
    entrenador.fechaNacimiento = moment(entrenador.fechaNacimiento).toDate();

    this.posteoFormulario.emit(entrenador);
  }

}
