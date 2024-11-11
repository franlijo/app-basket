import { Component, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-editar-tarea',
  standalone: true,
  imports: [],
  templateUrl: './editar-tarea.component.html',
  styleUrl: './editar-tarea.component.css'
})
export class EditarTareaComponent {

  @Input({transform: numberAttribute})
  id!:number;  
}
