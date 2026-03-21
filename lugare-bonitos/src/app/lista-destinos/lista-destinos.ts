import { Component } from '@angular/core';
import { DestinoViaje } from '../destino-viaje/destino-viaje';
import { DestinoViajes } from '../models/destino-viaje.model';

@Component({
  selector: 'app-lista-destinos',
  imports: [DestinoViaje],
  templateUrl: './lista-destinos.html',
  styleUrl: './lista-destinos.css',
})
export class ListaDestinos {
  destinos: DestinoViajes[];
  constructor() {
    this.destinos = [];
  }
  guardar(n: string, u: string): boolean {
    this.destinos.push(new DestinoViajes(n, u));
    console.log(this.destinos.length)
    return false;
  }
}
