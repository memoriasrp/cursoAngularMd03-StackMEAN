import { DestinosViajesState, initializeDestinosViajesState } from './destinos.state';
import {
    DestinosViajesActionTypes,
    NuevoDestinoAction,
    ElegidoFavoritoAction
} from './destinos.actions';
import { Action } from '@ngrx/store';

export function reducerDestinosViajes(
    state: DestinosViajesState = initializeDestinosViajesState(),
    action: Action
): DestinosViajesState {
    switch (action.type) {
        case DestinosViajesActionTypes.NUEVO_DESTINO:
            const nuevo = action as NuevoDestinoAction;
            return {
                ...state,
                items: [...state.items, nuevo.destino]
            };

        case DestinosViajesActionTypes.ELEGIDO_FAVORITO:
            const fav = action as ElegidoFavoritoAction;
            state.items.forEach(x => x.setSelected(false));
            fav.destino.setSelected(true);
            return {
                ...state,
                favorito: fav.destino
            };

        default:
            return state;
    }
}