import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../../services/auth'
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importante para manejar los inputs
@Component({
  selector: 'app-login',
  standalone: true, // Esto es estándar en v21
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(Auth);
  private router = inject(Router);
  // Creas una propiedad que solo expone el Signal
  isLoggedIn = this.authService.isLoggedIn;
  // Usamos un Signal para el mensaje de error (estilo Angular 21)
  errorMessage = signal<string>('');

  // Variables para vincular con el HTML
  email = '';
  password = '';

  onLogin(event: Event) {
    event.preventDefault(); // Evitamos que la página se recargue

    // Lógica básica de validación local
    if (this.email === 'admin@admin.com' && this.password === '123456') {

      this.authService.login(); // Cambiamos el estado en el servicio

      // Navegamos a la ruta protegida (asegúrate que 'destino' exista en app.routes.ts)
      this.router.navigate(['/home']);

    } else {
      // Si falla, actualizamos el signal del error
      this.errorMessage.set('Credenciales incorrectas. Intenta con admin@admin.com / 123456');
    }
  }

  logout() {
    this.authService.logout();
    // Opcional: limpiar los campos del formulario al salir
    this.email = '';
    this.password = '';
  }

  goToDestinos() {
    this.router.navigate(['/destino']);
  }
}