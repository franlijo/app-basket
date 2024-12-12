import { Component, inject, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { entrenadorAutoCompleteDTO } from '../entrenador';
import { EntrenadorService } from '../entrenador.service';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
    selector: 'app-autocomplete-entrenadores',
    standalone: true,
    imports: [MatAutocompleteModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, FormsModule, MatTableModule, MatInputModule, MatDatepickerModule,
        DragDropModule],
    templateUrl: './autocomplete-entrenadores.component.html',
    styleUrl: './autocomplete-entrenadores.component.css'
})
export class AutocompleteEntrenadoresComponent implements OnInit{
  ngOnInit(): void {
    this.control.valueChanges.subscribe(valor => {
      if(typeof valor === 'string' && valor){
      this.entrenadoresService.obtenerPorNombre(valor).subscribe(entrenadores => {
        this.entrenadores = entrenadores;
      });
    }
    });
    
  }

  control = new FormControl();

  entrenadores: entrenadorAutoCompleteDTO[]=[];

  @Input({required:true}) entrenadoresSeleccionados: entrenadorAutoCompleteDTO[]=[];

  entrenadoresService = inject(EntrenadorService);

  columnasAMostrar = ['imagen', 'nombre', 'apellidos',  'rol', 'fechaInicio', 'fechaFin', 'acciones'];

  @ViewChild(MatTable) table!: MatTable<entrenadorAutoCompleteDTO>;

  entrenadorSeleccionado(event: MatAutocompleteSelectedEvent) {
    this.entrenadoresSeleccionados.push(event.option.value);
    this.control.patchValue('');

    if (this.table != undefined) {
      this.table.renderRows();
    }
  }

  finalizarArrastre(event: CdkDragDrop<any[]>){
    const indicePrevio = this.entrenadoresSeleccionados.findIndex(entrenador => entrenador === event.item.data);
    moveItemInArray(this.entrenadoresSeleccionados, indicePrevio, event.currentIndex);
    this.table.renderRows();
  }

  eliminar(entrenador: entrenadorAutoCompleteDTO) {
    const indice = this.entrenadoresSeleccionados.findIndex((a: entrenadorAutoCompleteDTO) => a.id === entrenador.id);
    this.entrenadoresSeleccionados.splice(indice, 1);
    this.table.renderRows();
  }

  


}
