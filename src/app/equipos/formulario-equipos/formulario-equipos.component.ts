import { Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EquipoCreacionDTO, EquipoDTO } from '../equipo';
import moment from 'moment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { Router, RouterLink } from '@angular/router';
import { InputImgComponent } from '../../compartidos/componentes/input-img/input-img.component';
import { entrenadorAutoCompleteDTO } from '../../entrenador/entrenador';
import { jugadorAutoCompleteDTO } from '../../jugador/jugador';
import { CategoriaDTO } from '../../categoria/categoria';
import { SelectorMultipleComponent } from "../../compartidos/componentes/selector-multiple/selector-multiple.component";
import { AutocompleteJugadoresComponent } from "../../jugador/autocomplete-jugadores/autocomplete-jugadores.component";
import { CategoriaService } from '../../categoria/categoria.service';

import { MatOption, MatOptionModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, NgForOf } from '@angular/common';
import { AutocompleteEntrenadoresComponent } from "../../entrenador/autocomplete-entrenadores/autocomplete-entrenadores.component";
import { EquiposService } from '../equipos.service';
import { PaginacionDTO } from '../../compartidos/modelos/PaginacionDTO';
import { MatSelectModule } from '@angular/material/select';
import { NgxSliderModule, Options} from '@angular-slider/ngx-slider';





@Component({
    selector: 'app-formulario-equipos',
    standalone: true,
    imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule, InputImgComponent, MatRadioModule, AutocompleteJugadoresComponent, MatOption, AutocompleteEntrenadoresComponent, MatSelectModule, MatOptionModule, NgForOf, NgxSliderModule],
    templateUrl: './formulario-equipos.component.html',
    styleUrl: './formulario-equipos.component.css'
})
export class FormularioEquiposComponent implements OnInit{

  ngOnInit(): void {

    this.cargarCategorias();
    if (this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  private categoriasService = inject(CategoriaService);

  private router = inject(Router);
  
  private formBuilder = inject(FormBuilder);

  @Input({required: true}) entrenadoresSeleccionados!: entrenadorAutoCompleteDTO[];

  @Input({required: true}) jugadoresSeleccionados!: jugadorAutoCompleteDTO[];

  @Input() modelo?: EquipoDTO;

  @Output()
  posteoFormulario = new EventEmitter<EquipoCreacionDTO>();

  rangoJugadores: Options = {floor: 4, ceil: 15, step: 1, showTicksValues: false};
  
  anchoFoto: number=400;
  altoFoto: number=300;

  @ViewChild('campoFoto', { static: false }) campoFoto!: ElementRef;

  listaCategorias?: CategoriaDTO[]= [];

  // equiposService = inject(EquiposService);

  form = this.formBuilder.group({
    nombre: ['', {validators: [Validators.required]}],
    categoriaId:['', {validators: [Validators.required]}],
    liga:  ['', {validators: [Validators.required]}],
    fechaInicio: new FormControl<Date | null>(null, {
      validators: [Validators.required]
    }),
    fechaFin: new FormControl<Date | null>(null, {
      validators: [Validators.required]
    }),      
    foto: new FormControl<File | string | null>(null), 
      minimoJugadores: [0],
      maximoJugadores: [12]  })


  obtenerErrorCampoNombre(): string {
    let campo = this.form.controls.nombre;

    if (campo.hasError('required')){
      return "El campo nombre es requerido";
    }

    return "";
  }


archivoSeleccionado(file: File){
  this.form.controls.foto.setValue(file);
}  

cargarCategorias(): void {
 
  this.categoriasService.obtenerTodas().subscribe((categorias)=> {
    this.listaCategorias = categorias;

  })    

}

// Método para actualizar el valor mínimo en el formulario
onMinValueChange(value: number): void {
  this.form.controls.minimoJugadores.setValue(value);
}

// Método para actualizar el valor máximo en el formulario
onMaxValueChange(value: number): void {
  this.form.controls.maximoJugadores.setValue(value);
}

// calcularDimensiones(): void {
//   const anchoDiv = this.campoFoto.nativeElement.offsetWidth; // Obtén el ancho del div
//   this.anchoFoto = anchoDiv /2 ; // La mitad del ancho
//   this.altoFoto = (this.anchoFoto * 3) / 4; // Mantener la proporción 4:3
// }

  guardarCambios(){
    if (!this.form.valid){
      return;
    }

    const equipo = this.form.value as EquipoCreacionDTO;

    equipo.fechaInicio = moment(equipo.fechaInicio).toDate();
    equipo.fechaFin = moment(equipo.fechaFin).toDate();

    equipo.entrenadores = this.entrenadoresSeleccionados;
    equipo.jugadores = this.jugadoresSeleccionados;

    this.posteoFormulario.emit(equipo);

    this.router.navigate(["/equipos"]);
    

  }
 

}
