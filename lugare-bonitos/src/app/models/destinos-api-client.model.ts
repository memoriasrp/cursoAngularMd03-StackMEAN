import { BehaviorSubject, Subject } from "rxjs";
import { DestinoViajes } from "./destino-viaje.model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class DestinosApiClient {
    destinos: DestinoViajes[];
    current: BehaviorSubject<DestinoViajes | null> = new BehaviorSubject<DestinoViajes | null>(null);
    constructor() {
        this.destinos = [];
        // 1. Intentamos recuperar el string del navegador
        const db = localStorage.getItem('destinos');
        // 2. Si existe algo guardado, lo procesamos
        if (db) {
            const objetosPlanos = JSON.parse(db); // Convertimos el texto en un array de objetos

            // 3. ¡IMPORTANTE! Debemos convertirlos de nuevo a instancias de DestinoViajes
            // para que tengan sus métodos (como setSelected, etc.)
            this.destinos = objetosPlanos.map((d: any) => {
                const nuevo = new DestinoViajes(d.nombre, d.imagenUrl);
                if (d.selected) nuevo.setSelected(true); // Si guardas el estado de selección
                return nuevo;
            });
        }
        console.log("destinos cargados", this.destinos);
    }

    add(d: DestinoViajes) {
        this.destinos.push(d);
    }

    getAll(): DestinoViajes[] {
        return this.destinos;
    }

    getById(id: string): DestinoViajes {
        return this.destinos.filter(function (d) { return d.isSelected.toString() === id })[0];
    }

    elegir(d: DestinoViajes) {
        this.destinos = this.destinos.map(x => {
            const nuevo = new DestinoViajes(x.nombre, x.imagenUrl);
            nuevo.setSelected(x === d);
            return nuevo;
        });

    }

    eliminar(d: DestinoViajes) {
        this.destinos = this.destinos.filter(x => x.nombre !== d.nombre);
        // GUARDAMOS EL CAMBIO: Si no haces esta línea, el borrado no persiste
        localStorage.setItem('destinos', JSON.stringify(this.destinos));
    }

    subscribeOnChange(fn: any) {
        this.current.subscribe(fn);
    }

}
export abstract class ClonDelApi { }