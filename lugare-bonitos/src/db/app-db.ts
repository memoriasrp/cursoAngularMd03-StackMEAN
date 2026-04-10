import Dexie, { Table } from 'dexie';

export class AppDB extends Dexie {
    destinos!: Table<any, number>;
    // 'destinos' es el nombre de la tabla, 'DestinoViajes' es el tipo de dato,
    //  'number' es el tipo de la clave primaria 

    constructor() {
        super('DestinosDB');
        this.version(1).stores({
            destinos: '++id, nombre' // '++id' es clave primaria autoincremental
        });
    }
}

export const db = new AppDB();