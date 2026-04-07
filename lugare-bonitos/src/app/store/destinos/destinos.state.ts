import { DestinoViajes } from '../../models/destino-viaje.model';

export interface DestinosViajesState {
    items: DestinoViajes[];
    loading: boolean;
    favorito: DestinoViajes | null;
}

export const initializeDestinosViajesState = (): DestinosViajesState => ({
    items: [],
    loading: false,
    favorito: null
});