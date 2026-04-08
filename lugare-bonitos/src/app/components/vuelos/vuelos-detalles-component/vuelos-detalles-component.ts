import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vuelos-detalles-component',
  standalone: true,
  imports: [],
  templateUrl: './vuelos-detalles-component.html',
  styleUrl: './vuelos-detalles-component.css',
})
export class VuelosDetallesComponent implements OnInit {

  // Angular "inyecta" el valor de la URL aquí automáticamente
  @Input() id: string | null = null;

  ngOnInit(): void {
    // Cuando el componente nace, el ID ya tiene su valor
    console.log('ID recibido desde la URL:', this.id);
  }
}