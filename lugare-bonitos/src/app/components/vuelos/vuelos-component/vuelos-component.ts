import { Component } from '@angular/core';
// 1. Importa las directivas de enrutamiento
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-vuelos-component',
  imports: [RouterLink, RouterOutlet], // 2. Declara las directivas en imports
  templateUrl: './vuelos-component.html',
  styleUrl: './vuelos-component.css',
})
export class VuelosComponent { }
