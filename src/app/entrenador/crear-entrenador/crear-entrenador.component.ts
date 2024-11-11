import { Component, inject} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EntrenadorCreacionDTO } from '../entrenador';
import { EntrenadorService } from '../entrenador.service';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { FormularioEntrenadorComponent } from "../formulario-entrenador/formulario-entrenador.component";

@Component({
  selector: 'app-crear-entrenador',
  standalone: true,
  imports: [MostrarErroresComponent, FormularioEntrenadorComponent],
  // [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, FormularioEntrenadorComponent],
  templateUrl: './crear-entrenador.component.html',
  styleUrl: './crear-entrenador.component.css'
})
export class CrearEntrenadorComponent {

  private router = inject(Router);
  private entrenadorService = inject(EntrenadorService);
  errores: string[]= [];

  guardarCambios(entrenador: EntrenadorCreacionDTO ){
    this.entrenadorService.crear(entrenador).subscribe({
      next: () => {
        this.router.navigate(['/entrenadores']);
      },
      error: err => {
        const errores = extraerErrores(err);
        this.errores = errores;
      }
    });

  }


  
}
