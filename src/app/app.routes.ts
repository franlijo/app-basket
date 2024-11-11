import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ListadoEquiposComponent } from './equipo/listado-equipos/listado-equipos.component';
import { ListadoEntrenadoresComponent } from './entrenador/listado-entrenadores/listado-entrenadores.component';
import { ListadoJugadoresComponent } from './jugador/listado-jugadores/listado-jugadores.component';
import { ListadoTareasComponent } from './biblioteca/listado-tareas/listado-tareas.component';
import { CrearEntrenadorComponent } from './entrenador/crear-entrenador/crear-entrenador.component';
import { EditarEntrenadorComponent } from './entrenador/editar-entrenador/editar-entrenador.component';
import { CrearEquipoComponent } from './equipo/crear-equipo/crear-equipo.component';
import { EditarEquiposComponent } from './equipo/editar-equipos/editar-equipos.component';
import { CrearJugadorComponent } from './jugador/crear-jugador/crear-jugador.component';
import { EditarJugadorComponent } from './jugador/editar-jugador/editar-jugador.component';
import { CrearTareaComponent } from './biblioteca/crear-tarea/crear-tarea.component';
import { EditarTareaComponent } from './biblioteca/editar-tarea/editar-tarea.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent}, 

    {path: 'equipos', component: ListadoEquiposComponent},
    {path: 'equipos/crear', component: CrearEquipoComponent},
    {path: 'equipos/editar/:id', component: EditarEquiposComponent},

    {path: 'entrenadores', component: ListadoEntrenadoresComponent},
    {path: 'entrenadores/crear', component: CrearEntrenadorComponent},
    {path: 'entrenadores/editar/:id', component: EditarEntrenadorComponent},

    {path: 'jugadores', component: ListadoJugadoresComponent},
    {path: 'jugadores/crear', component: CrearJugadorComponent},
    {path: 'jugadores/editar/:id', component: EditarJugadorComponent},

    {path: 'biblioteca', component: ListadoTareasComponent},
    {path: 'biblioteca/crear', component: CrearTareaComponent},
    {path: 'biblioteca/editar/:id', component: EditarTareaComponent}, 
    {path: '**', redirectTo: ''}

]