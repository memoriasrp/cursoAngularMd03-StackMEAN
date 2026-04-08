import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../../services/auth';
export const usuarioLogueadoGuard: CanActivateFn = (route, state) => {
  // 1. Inyectamos las herramientas necesarias
  const authService = inject(Auth);
  const router = inject(Router);

  // 2. Revisamos el Signal de autenticación
  // Importante: usamos paréntesis () porque es un Signal
  if (authService.isLoggedIn()) {
    return true; // El usuario puede pasar
  } else {
    // 3. Si no está logueado, lo mandamos al login
    return router.parseUrl('/login');
  }
};
