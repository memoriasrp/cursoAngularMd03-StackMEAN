import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import {
    NuevoDestinoAction,
    ElegidoFavoritoAction,
    DestinosViajesActionTypes
} from './destinos.actions';

@Injectable()
export class DestinosViajesEffects {

    nuevoAgregado$: any;

    constructor(private actions$: Actions) {
        this.nuevoAgregado$ = createEffect(() =>
            this.actions$.pipe(
                ofType<NuevoDestinoAction>(DestinosViajesActionTypes.NUEVO_DESTINO),
                map(action => new ElegidoFavoritoAction(action.destino))
            )
        );
    }
}