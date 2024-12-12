import { Component, inject, Input, OnInit } from '@angular/core';
import { TareaImagenService } from '../tarea-imagenes.service';
import { TareaImagenCreacionDTO, TareaImagenDTO } from '../tarea';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormsModule } from '@angular/forms';  // Si usas ngModel
import { CommonModule } from '@angular/common';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';

@Component({
  selector: 'app-formulario-imagen',
  imports: [MatFormFieldModule,
    MatInputModule, CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule],
  templateUrl: './formulario-imagen.component.html',
  styleUrls: ['./formulario-imagen.component.css']
})
export class FormularioImagenComponent implements OnInit {
  ngOnInit(): void {
    this.CargarImagenes(this.tareaId);
  }
  @Input({ required: true }) tareaId: number = 0;  // Recibimos el tareaId del padre
  private readonly formBuilder = inject(FormBuilder);
  listaimagenes: TareaImagenDTO[] = [];  // Array que almacenará las imágenes seleccionadas
  imagenesService = inject(TareaImagenService);
  errores: string[]= [];

  form = this.formBuilder.group(
    {
      orden: [0],
      foto: new FormControl<File | string | null>(null),
      nombre: [""],
      tareaId: [0],
      descripcion: [""] 

    }
  )

  // Método para abrir el selector de archivos


  CargarImagenes(tarea: number) {
    this.imagenesService.obtenerPorTareaId(tarea).subscribe((imagenes) => {
      this.listaimagenes = imagenes;
    })
  }

  agregarImagen() {
    // Al hacer clic en el botón "Añadir Foto", se activará el input de archivo
    const fileInput: HTMLElement = document.querySelector('#inputFile')!;
    fileInput.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      // Aquí puedes hacer lo necesario para subir la imagen al servidor o gestionarla
      const newImagen = {
        foto: URL.createObjectURL(file), // Aquí usamos una URL temporal para mostrar la imagen
        nombre: 'Nueva Imagen',
        descripcion: 'Descripción de la nueva imagen',
      };

      // // Agregar la nueva imagen al array de imágenes
      // this.listaimagenes.push(newImagen);
    }
  }
  guardarCambios(imagen: TareaImagenDTO) {
    this.imagenesService.crear(imagen).subscribe({
      next: imagen => {
        
      }, 
      error: err => {
        const errores = extraerErrores(err);
        this.errores = errores; 
      }
    })

  }

  
  borrarImagen(arg0: number) {
    throw new Error('Method not implemented.');
  }
  editarImagen(_t6: TareaImagenDTO) {
    throw new Error('Method not implemented.');
  }


}

