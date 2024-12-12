import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { EquiposService } from '../equipos.service';
import { ListadoGenericoComponent } from "../../compartidos/componentes/listado-generico/listado-generico.component";
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-listado-equipos',
  standalone: true,
  imports: [ListadoGenericoComponent, DatePipe, CurrencyPipe, MatButtonModule, MatIconModule, 
    RouterLink, SweetAlert2Module ],
  templateUrl: './resumen-equipos.component.html',
  styleUrl: './resumen-equipos.component.css'
})
export class ResumenEquiposComponent {
  equiposService = inject(EquiposService);
  equiposTemporada!: any[];
  equiposHistorico!: any[];



  cargarEquipos(){
    this.equiposService.obtenerListado().subscribe(modelo => {
      this.equiposTemporada = modelo.equiposTemporada;
      this.equiposHistorico = modelo.equiposHistorico;
    });
  }
}
