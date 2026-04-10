import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import {
    nuevoDestino,
    elegidoFavorito,
    eliminarDestino
} from './destinos.actions';

@Injectable()
export class DestinosViajesEffects {

    nuevoAgregado$: any;

    constructor(private actions$: Actions) {
        this.nuevoAgregado$ = createEffect(() =>
            this.actions$.pipe(
                ofType(nuevoDestino),
                map(action => elegidoFavorito({ destino: action.destino }))
            )
        );
    }
}