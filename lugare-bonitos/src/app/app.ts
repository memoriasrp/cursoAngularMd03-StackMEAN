import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Auth } from './services/auth'; // Ajusta la ruta a tu servicio
import { interval, map } from 'rxjs';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Inyectamos el servicio como público
  public authService = inject(Auth);
  private router = inject(Router); // 2. Inyecta el Router
  protected readonly title = signal('lugare-bonitos');
  time = interval(1000).pipe(
    map(() => new Date().toLocaleString())
  );
  onLogout() {
    // 3. Ejecutas la lógica de cierre de sesión
    this.authService.logout();

    // 4. Rediriges al login inmediatamente
    this.router.navigate(['/login']);
  }

}
