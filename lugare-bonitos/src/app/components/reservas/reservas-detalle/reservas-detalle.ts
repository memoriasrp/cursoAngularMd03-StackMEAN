import { Component, inject, Input, OnInit } from '@angular/core';
import { ReservasApiClient } from '../../../reservas/reservas-api-client';

@Component({
  selector: 'app-reservas-detalle',
  standalone: true,
  imports: [],
  templateUrl: './reservas-detalle.html',
  styleUrl: './reservas-detalle.css',
})
export class ReservasDetalle implements OnInit {
  // Recibe el :id de la URL automáticamente
  @Input() id: string | null = null;
  // Ahora puedes inyectarlo normalmente
  private apiService = inject(ReservasApiClient);
  ngOnInit(): void {
    console.log('Cargando datos para la reserva:', this.id);
  }
}
