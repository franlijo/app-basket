import { Component, EventEmitter, inject, Input, OnInit } from '@angular/core';
import { ElementoTecnicoCreacionDTO, ElementoTecnicoDTO } from '../elementoTecnico';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from '../../compartidos/funciones/validaciones';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RouterLink } from '@angular/router';
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo';

@Component({
    selector: 'app-formulario-elemento-tecnico',
    imports: [ReactiveFormsModule, MatFormFieldModule, MatFormFieldModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterLink, MatRadioModule, MatDatepickerModule],
    templateUrl: './formulario-elemento-tecnico.component.html',
    styleUrl: './formulario-elemento-tecnico.component.css'
})
export class FormularioElementoTecnicoComponent implements OnInit {
  ngOnInit(): void {
    if (this.modelo!==undefined){
      this.form.patchValue(this.modelo);
    }
  }

  @Input() modelo: ElementoTecnicoDTO | undefined;

  @Input() posteoFormulario = new EventEmitter<ElementoTecnicoCreacionDTO>();

  private formbuilder = inject(FormBuilder);

  form = this.formbuilder.group ({
    nombre: ['', {validators: [Validators.required, primeraLetraMayuscula()]}],
    descripcion: ['', {validators: [Validators.required, primeraLetraMayuscula()]}]
  });

  obtenerErrorCampoNombre(): string{
    let campo = this.form.controls.nombre;
    if (campo.hasError('required')){
      return ("El nombre no puede ser nulo")
    }
    if (campo.hasError('primeraLetraMayuscula')){
      return campo.getError("primeraLetraMayuscula").mensaje;
    }
    return '';
  }
  obtenerErrorCampoDescripcion(): string{
    let campo = this.form.controls.nombre;
    if (campo.hasError('required')){
      return ("La Descripcion no puede ser nula")
    }
    if (campo.hasError('primeraLetraMayuscula')){
      return campo.getError("primeraLetraMayuscula").mensaje;
    }
    return '';
  }

  guardarCambios(){
    if (!this.form.valid){
      return;
    }
    const elemenoTecnico = this.form.value as ElementoTecnicoCreacionDTO;

    this.posteoFormulario.emit(elemenoTecnico);
  }
  

}
