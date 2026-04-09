// destinos-api-client-storage.ts
import { Injectable } from '@angular/core';
import { DestinosApiClient } from './destinos-api-client.model';
import { DestinoViajes } from './destino-viaje.model';

@Injectable()
export class DestinosApiClientLocalStorage extends DestinosApiClient {

    constructor() {
        super(); // Llama al constructor original (inicializa array vacío)
        const db = localStorage.getItem('destinos');
        if (db) {
            // Cargamos lo que había guardado
            const data = JSON.parse(db);
            this.destinos = data.map((d: any) => new DestinoViajes(d.nombre, d.imagenUrl));
        }
    }

    override add(d: DestinoViajes) {
        super.add(d); // Ejecuta la lógica original (push al array)
        // Añade lógica nueva: Guardar en LocalStorage
        localStorage.setItem('destinos', JSON.stringify(this.destinos));
    }
    // En tu clase que extiende (la que tiene el LocalStorage)
    override eliminar(d: DestinoViajes) {
        // 1. Llamamos al eliminar original (que quita el destino del array)
        super.eliminar(d);

        // 2. Sobrescribimos el LocalStorage con el nuevo array (ya sin ese destino)
        localStorage.setItem('destinos', JSON.stringify(this.destinos));
    }
}