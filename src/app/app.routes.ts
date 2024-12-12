import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ListadoJugadoresComponent } from './jugador/listado-jugadores/listado-jugadores.component';
import { ListadoTareasComponent } from './biblioteca/listado-tareas/listado-tareas.component';
import { ListadoEntrenadoresComponent } from './entrenador/listado-entrenadores/listado-entrenadores.component';
import { CrearEntrenadorComponent } from './entrenador/crear-entrenador/crear-entrenador.component';
import { EditarEntrenadorComponent } from './entrenador/editar-entrenador/editar-entrenador.component';
import { CrearJugadorComponent } from './jugador/crear-jugador/crear-jugador.component';
import { EditarJugadorComponent } from './jugador/editar-jugador/editar-jugador.component';
import { CrearTareaComponent } from './biblioteca/crear-tarea/crear-tarea.component';
import { EditarTareaComponent } from './biblioteca/editar-tarea/editar-tarea.component';
import { ListadoCategoriaComponent } from './categoria/listado-categoria/listado-categoria.component';
import { CrearCategoriaComponent } from './categoria/crear-categoria/crear-categoria.component';
import { EditaCategoriaComponent } from './categoria/edita-categoria/edita-categoria.component';
import { ListadoEquiposComponent } from './equipos/listado-equipos/listado-equipos.component';
import { CrearEquipoComponent } from './equipos/crear-equipo/crear-equipo.component';
import { EditarEquipoComponent } from './equipos/editar-equipo/editar-equipo.component';
import { ListadoElementoTecnicoComponent } from './elementoTecnico/listado-elemento-tecnico/listado-elemento-tecnico.component';
import { CrearElementoTecnicoComponent } from './elementoTecnico/crear-elemento-tecnico/crear-elemento-tecnico.component';
import { EditarElementoTecnicoComponent } from './elementoTecnico/editar-elemento-tecnico/editar-elemento-tecnico.component';
import { esAdminGuard } from './compartidos/guards/es-admin.guard';
import { LoginComponent } from './seguridad/login/login.component';
import { RegistroComponent } from './seguridad/registro/registro.component';
import { IndiceUsuariosComponent } from './seguridad/indice-usuarios/indice-usuarios.component';
import { ListadoEquiposCategoriaComponent } from './equipos/listado-equipos-categoria/listado-equipos-categoria.component';


export const routes: Routes = [
    {path: '', component: LandingPageComponent}, 

    {path: 'entrenadores', component: ListadoEntrenadoresComponent, canActivate: [esAdminGuard]},
    {path: 'entrenadores/crear', component: CrearEntrenadorComponent, canActivate: [esAdminGuard]},
    {path: 'entrenadores/editar/:id', component: EditarEntrenadorComponent, canActivate: [esAdminGuard]},

    {path: 'equipos', component: ListadoEquiposComponent, canActivate: [esAdminGuard]},
    {path: 'equipos/crear', component: CrearEquipoComponent, canActivate: [esAdminGuard]},
    {path: 'equipos/editar/:id', component: EditarEquipoComponent, canActivate: [esAdminGuard]},
    {path: 'equipos/equiposcategoria/:id', component: ListadoEquiposCategoriaComponent, canActivate: [esAdminGuard]},
    

    {path: 'jugadores', component: ListadoJugadoresComponent, canActivate: [esAdminGuard]},
    {path: 'jugadores/crear', component: CrearJugadorComponent, canActivate: [esAdminGuard]},
    {path: 'jugadores/editar/:id', component: EditarJugadorComponent, canActivate: [esAdminGuard]},

    {path: 'categorias', component: ListadoCategoriaComponent, canActivate: [esAdminGuard]},
    {path: 'categorias/crear', component: CrearCategoriaComponent, canActivate: [esAdminGuard]},
    {path: 'categorias/editar/:id', component: EditaCategoriaComponent, canActivate: [esAdminGuard]},

    {path: 'elementosTecnicos', component: ListadoElementoTecnicoComponent, canActivate: [esAdminGuard]},
    {path: 'elementosTecnicos/crear', component: CrearElementoTecnicoComponent, canActivate: [esAdminGuard]},
    {path: 'elementosTecnicos/editar/:id', component: EditarElementoTecnicoComponent, canActivate: [esAdminGuard]},

    {path: 'tareas', component: ListadoTareasComponent, canActivate: [esAdminGuard]},
    {path: 'tareas/crear', component: CrearTareaComponent, canActivate: [esAdminGuard]},
    {path: 'tareas/editar/:id', component: EditarTareaComponent, canActivate: [esAdminGuard]},

    {path: 'login', component: LoginComponent},
    {path: 'registrar', component: RegistroComponent},
    {path: 'usuarios', component: IndiceUsuariosComponent, canActivate: [esAdminGuard]},

    {path: '**', redirectTo: ''}

]