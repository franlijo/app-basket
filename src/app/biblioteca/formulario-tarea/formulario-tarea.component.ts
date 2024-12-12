import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { TareaImagenDTO, TareaCreacionDTO, TareaDTO } from '../tarea';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import moment from 'moment';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Router, RouterLink } from '@angular/router';
import { InputImgComponent } from '../../compartidos/componentes/input-img/input-img.component';
import { EntrenadorDTO } from '../../entrenador/entrenador';
import { EntrenadorService } from '../../entrenador/entrenador.service';
import { CommonModule, NgForOf } from '@angular/common';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SelectorMultipleComponent } from '../../compartidos/componentes/selector-multiple/selector-multiple.component';
import { AutocompleteJugadoresComponent } from '../../jugador/autocomplete-jugadores/autocomplete-jugadores.component';
import { TareaService } from '../tarea.service';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { MatCardModule } from '@angular/material/card';
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo';

@Component({
  selector: 'app-formulario-tarea',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule, InputImgComponent, MatRadioModule, MatOption, MatSelectModule, MatOptionModule, NgForOf, NgxSliderModule, MatCardModule, SelectorMultipleComponent, CommonModule],
  templateUrl: './formulario-tarea.component.html',
  styleUrl: './formulario-tarea.component.css'
})
export class FormularioTareaComponent implements OnInit {

  ngOnInit(): void {

    this.cargarEntrenadores();

    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }
  }

  @Input({required: true})
  categoriasNoSeleccionadas: SelectorMultipleDTO[] = [];

  @Input({required: true})
  categoriasSeleccionadas!: SelectorMultipleDTO[];

  @Input({required: true})
  elementosTecnicosNoSeleccionados!: SelectorMultipleDTO[];

  @Input({required: true})
  elementosTecnicosSeleccionados!: SelectorMultipleDTO[];

  @Input({required: true})
  imagenesTareaSeleccionadas!: TareaImagenDTO[];

  @Input() modelo?: TareaDTO;

  @Output() posteoFormulario = new EventEmitter<TareaCreacionDTO>();

  private tareasService = inject(TareaService);

  private router = inject(Router);

  

  
  private formbuilder = inject(FormBuilder);

  private entrenadorServide = inject(EntrenadorService);

  rangoJugadores: Options = { vertical: true, floor: 1, ceil: 15, step: 1, showTicksValues: false };
  rangoTiempo: Options = { vertical: true, floor: 1, ceil: 30, step: 1, showTicksValues: false };
  rangoCien: Options = { vertical: true, floor: 0, ceil: 100, step: 5, showTicksValues: false };


  listaEntrenadores?: EntrenadorDTO[] = [];
  listaEstados: string[] = ["Beta", "Produccion", "Mantenimiento", "Obsoleta"]
  listaDominios: string[] = ["Publico", "Comun", "Privado"];


  form = this.formbuilder.group({
    nombre: ['', { Validators: [Validators.required] }],
    descripcion: ['', { validators: [Validators.maxLength(500)] }],
    version: [''],
    fechaInicio: new FormControl<Date | null>(null, { validators: [Validators.required] }),
    fechaFin: new FormControl<Date | null>(null),
    tareaPadre: [0],
    estado: ['', { Validators: [Validators.required] }],
    entrenadorId: [0],
    dominio: ['', { Validators: [Validators.required] }],
    numeroMin: [2],
    numeroMax: [10],
    tiempoMin: [5],
    tiempoMax: [30],
    nivelFisico: [25],
    ataque: [5],
    defensa: [5],
    tecnicoIndividual: [5],
    tacticoIndividual: [5],
    tecnicoColectivo: [5],
    tacticoColectivo: [5],
    material: [''],
    objetivoPrincipal: ['', { Validators: [Validators.required] }],
    objetivoSecundario: [''],
    comentario: ['', { validators: [Validators.maxLength(500)] }],
    foto: new FormControl<File | string | null>(null),
    video: ['']
  })

  archivoSeleccionado(file: File) {
    this.form.controls.foto.setValue(file);
  }

  // Método para actualizar el valor mínimo en el formulario
  onMinValueChange(value: number): void {
    this.form.controls.numeroMin.setValue(value);

  }

  onMinTiempoValueChange(value: number): void {
    this.form.controls.tiempoMin.setValue(value);
  }

  onMaxTiempoValueChange(value: number): void {
    this.form.controls.tiempoMax.setValue(value);
  }



  // Método para actualizar el valor máximo en el formulario
  onMaxValueChange(value: number): void {
    this.form.controls.numeroMax.setValue(value);
  }

  onNivelFisicoValueChange(value: number): void {
    this.form.controls.nivelFisico.setValue(value);
  }

  onAtaqueValueChange(value: number): void {
    this.form.controls.ataque.setValue(value);
  }
  onDefensaValueChange(value: number): void {
    this.form.controls.defensa.setValue(value);
  }

  onTecnicoIndividualValueChange(value: number): void {
    this.form.controls.tecnicoIndividual.setValue(value);
  }
  onTecnicoColectivoValueChange(value: number): void {
    this.form.controls.tecnicoColectivo.setValue(value);
  }
  onTacticoIndividualValueChange(value: number): void {
    this.form.controls.tacticoIndividual.setValue(value);
  }
  onTacticoColectivoValueChange(value: number): void {
    this.form.controls.tacticoColectivo.setValue(value);
  }

  guardarCambios() {
    if (!this.form.valid) {
      return;
    }
    const tarea = this.form.value as TareaCreacionDTO;

    const categoriasIds = this.categoriasSeleccionadas.map(val => val.llave);
    const elementosTecnicosIds = this.elementosTecnicosSeleccionados.map(val => val.llave);

    console.log('categorias: ',categoriasIds);
    console.log('elementos: ',elementosTecnicosIds);

    tarea.elementosTecnicosIds = elementosTecnicosIds;
    tarea.categoriasIds = categoriasIds;

    console.log('categorias: ',tarea.categoriasIds);
    console.log('elementos: ',tarea.elementosTecnicosIds);

    tarea.fechaInicio = moment(tarea.fechaInicio).toDate();
    tarea.fechaFin = moment(tarea.fechaFin).toDate();

    

    this.posteoFormulario.emit(tarea);
  }


  cargarEntrenadores(): void {
    this.entrenadorServide.obtenerTodos().subscribe((entrenadores) => {
      this.listaEntrenadores = entrenadores;
    })
  }







}
