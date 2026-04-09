import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { APP_CONFIG } from './core/tokens/app-config.token';
import { RESERVAS_API_CONFIG } from './core/tokens/app-config.token';
import { routes } from './app.routes';
import { DestinosApiClientLocalStorage } from './models/DestinosApiClientLocalStorage';
import { DestinosApiClient, ClonDelApi } from './models/destinos-api-client.model';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    // Tip: En v21 se suele incluir provideZoneChangeDetection para mejor rendimiento
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),// 2. Activar el binding mágico
    {
      provide: APP_CONFIG,
      useValue: {
        apiEndpoint: 'https://api.vuelos.com',
        theme: 'dark',
        retryAttempts: 3
      }
    },
    {
      provide: RESERVAS_API_CONFIG,
      useValue: { baseUrl: 'http://localhost:3000/api', timeout: 5000 }
    },
    {
      provide: DestinosApiClient,        // La base
      useClass: DestinosApiClientLocalStorage // La mejora
    },
    {
      provide: ClonDelApi,       // El nombre nuevo
      useExisting: DestinosApiClient // El puente: usa el que ya existe
    }
  ]
};
