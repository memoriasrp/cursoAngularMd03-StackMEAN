import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  // 1. Definimos un signal privado (nadie fuera de aquí puede cambiarlo)
  private _isLoggedIn = signal(false);
  // 2. Exponemos una versión de solo lectura
  public isLoggedIn = this._isLoggedIn.asReadonly();

  constructor() {
    // Aquí podrías chequear el localStorage al iniciar
    const auth = localStorage.getItem('auth');
    if (auth) this._isLoggedIn.set(true);
  }

  login() {
    this._isLoggedIn.set(true);
    localStorage.setItem('auth', 'true');
  }

  logout() {
    this._isLoggedIn.set(false);
    localStorage.removeItem('auth');
  }
}
