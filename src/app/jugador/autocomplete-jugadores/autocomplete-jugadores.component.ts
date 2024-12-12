import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { jugadorAutoCompleteDTO, JugadorCreacionDTO, JugadorDTO } from '../jugador';
import { JugadoresService } from '../jugadores.service';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-autocomplete-jugadores',
    standalone: true,
    imports: [MatAutocompleteModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, FormsModule, MatTableModule, MatInputModule,
        DragDropModule],
    templateUrl: './autocomplete-jugadores.component.html',
    styleUrl: './autocomplete-jugadores.component.css'
})
export class AutocompleteJugadoresComponent implements OnInit{

  ngOnInit(): void {
    this.control.valueChanges.subscribe(valor => {
      if (typeof valor === 'string' && valor ){
      this.jugadoresService.obtenerPorNombre(valor).subscribe(jugadores => {
        this.jugadores = jugadores;
      });
    }
    });
  }
  control = new FormControl();

  jugadores: jugadorAutoCompleteDTO[]=[];

  @Input({required: true}) 
  jugadoresSeleccionados: jugadorAutoCompleteDTO[] = [];

  jugadoresService = inject(JugadoresService);

  columnasAMostrar = ['imagen', 'nombre','apellidos', 'dorsal','fechaInicio','fechaFin', 'acciones'];

  @ViewChild(MatTable) table!: MatTable<jugadorAutoCompleteDTO>;

  jugadorSeleccionado(event: MatAutocompleteSelectedEvent) {
    this.jugadoresSeleccionados.push(event.option.value);
    this.control.patchValue('');

    if (this.table != undefined) {
      this.table.renderRows();
    }
  }

  finalizarArrastre(event: CdkDragDrop<any[]>){
    const indicePrevio = this.jugadoresSeleccionados.findIndex(jugador => jugador === event.item.data);
    moveItemInArray(this.jugadoresSeleccionados, indicePrevio, event.currentIndex);
    this.table.renderRows();
  }

  eliminar(jugador: jugadorAutoCompleteDTO) {
    const indice = this.jugadoresSeleccionados.findIndex((j: jugadorAutoCompleteDTO) => j.id === jugador.id);
    this.jugadoresSeleccionados.splice(indice, 1);
    this.table.renderRows();
  }

}
