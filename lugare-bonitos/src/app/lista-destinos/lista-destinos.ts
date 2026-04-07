import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DestinoViajes } from '../models/destino-viaje.model';
import { nuevoDestino, elegidoFavorito, eliminarDestino } from '../store/destinos/destinos.actions';
import { DestinosViajesState } from '../store/destinos/destinos.state';
import { AsyncPipe } from '@angular/common';
import { FormDestinoViaje } from '../form-destino-viaje/form-destino-viaje';
import { DestinoViaje } from '../destino-viaje/destino-viaje';
@Component({
  selector: 'app-lista-destinos',
  imports: [FormDestinoViaje, DestinoViaje, AsyncPipe],
  templateUrl: './lista-destinos.html',
  styleUrl: './lista-destinos.css',
})
export class ListaDestinos {

  destinos$!: Observable<DestinoViajes[]>;

  update: string[] = [];

  constructor(private store: Store<{ destinos: DestinosViajesState }>) {
    this.destinos$ = this.store.select(state => state.destinos.items);

    this.store.select(state => state.destinos.favorito)
      .subscribe(d => {
        if (d) {
          this.update.push('Se eligió a ' + d.nombre);
        }
      });
  }

  agregado(d: DestinoViajes) {
    this.store.dispatch(nuevoDestino({ destino: d }));
    this.update.push('Se agregó ' + d.nombre);
  }

  elegido(d: DestinoViajes) {
    this.store.dispatch(elegidoFavorito({ destino: d }));
  }

  eliminarDestino(d: DestinoViajes) {
    this.store.dispatch(eliminarDestino({ destino: d }));
    this.update.push('Se eliminó ' + d.nombre);
  }
}