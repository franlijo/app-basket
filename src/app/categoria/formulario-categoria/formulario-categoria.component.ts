import { Component, EventEmitter, inject, Input, OnInit, Output, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaCreacionDTO, CategoriaDTO } from '../categoria';
import { obtenerGenero, primeraLetraMayuscula } from '../../compartidos/funciones/validaciones';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { InputImgComponent } from '../../compartidos/componentes/input-img/input-img.component';
import { SelectorMultipleComponent } from '../../compartidos/componentes/selector-multiple/selector-multiple.component';
import { MatRadioModule } from '@angular/material/radio';

@Component({
    selector: 'app-formulario-categoria',
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatFormFieldModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterLink, MatRadioModule, MatDatepickerModule],
    templateUrl: './formulario-categoria.component.html',
    styleUrl: './formulario-categoria.component.css'
})
export class FormularioCategoriaComponent implements OnInit {
  ngOnInit(): void {
    if (this.modelo !==undefined){
      this.form.patchValue(this.modelo);
    }
    
  }

  @Input()
  modelo: CategoriaDTO | undefined;

  @Output()
  posteoFormulario = new EventEmitter<CategoriaCreacionDTO>();

  private formbuilder = inject(FormBuilder);

  form = this.formbuilder.group ({
    nombre: ['', {validators: [Validators.required, primeraLetraMayuscula()]}],
    genero: ['Masculino', {validators: [Validators.required]}], 
    edadMaxima: [0, {validators: [Validators.required]}]
  });

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

  guardarCambios(){
      // this.router.navigate(['/entrenadores']);
    if (!this.form.valid){
      return;

    }
    const categoria = this.form.value as CategoriaCreacionDTO;

    categoria.genero = obtenerGenero(categoria.genero);

    this.posteoFormulario.emit(categoria);
  }


  
}
