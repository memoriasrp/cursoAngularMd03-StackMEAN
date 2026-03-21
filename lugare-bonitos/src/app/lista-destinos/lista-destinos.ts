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
  guardar(nombreInput: HTMLInputElement, urlInput: HTMLInputElement): boolean {
    const nombre = nombreInput.value;
    const url = urlInput.value;
    if (!nombre || !url) return false;

    this.destinos.push(new DestinoViajes(nombre, url + "/380/230"));
    // limpiar inputs
    nombreInput.value = '';
    urlInput.value = '';

    return false;
  }
}
