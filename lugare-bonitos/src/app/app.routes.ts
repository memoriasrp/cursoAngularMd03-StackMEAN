import { Routes } from '@angular/router';
import { ListaDestinos } from './components/lista-destinos/lista-destinos';
import { DestinoDetalle } from './components/destino-detalle/destino-detalle';
import { Login } from './components/login/login/login';

import { usuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado-guard';

export const routes: Routes = [
    // Ruta por defecto: redirige al login si no hay nada
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // Ruta de Login (pública)
    { path: 'login', component: Login },

    // Ruta de Home (pública o protegida, según decidas)
    { path: 'home', component: ListaDestinos, canActivate: [usuarioLogueadoGuard] },

    // Ruta Protegida: Solo entran si el Guard devuelve true
    {
        path: 'destino',
        component: DestinoDetalle,
        canActivate: [usuarioLogueadoGuard]
    }

];
