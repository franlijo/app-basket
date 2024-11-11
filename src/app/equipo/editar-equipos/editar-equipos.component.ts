import { Component, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-editar-equipos',
  standalone: true,
  imports: [],
  templateUrl: './editar-equipos.component.html',
  styleUrl: './editar-equipos.component.css'
})
export class EditarEquiposComponent {
  
  @Input({transform: numberAttribute})
  id!:number;


}
