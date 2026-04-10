// src/app/core/tokens/app.tokens.ts
import { InjectionToken } from '@angular/core';

// 1. Definimos la forma de los datos
export interface GlobalConfig {
    apiEndpoint: string;
    theme: 'light' | 'dark';
    retryAttempts: number;
}


// Definimos una interfaz para tener autocompletado y evitar errores
export interface ApiConfig {
    baseUrl: string;
    timeout: number;
}

// Creamos el token. Es una constante que actuará como "llave"
export const RESERVAS_API_CONFIG = new InjectionToken<ApiConfig>('reservas.config');