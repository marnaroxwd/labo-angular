import {
    ApplicationConfig,
    provideBrowserGlobalErrorListeners,
    LOCALE_ID,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from '@core/interceptors/jwt.interceptor';
import { errorsInterceptor } from '@core/interceptors/errors.interceptor';
// 1. Importe ton intercepteur ici (ajuste le chemin si besoin)
import { loadingInterceptor } from '@core/interceptors/loading.interceptor'; 

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([
                loadingInterceptor, // 2. Ajoute-le ici
                jwtInterceptor, 
                errorsInterceptor
            ])
        ),
        { provide: LOCALE_ID, useValue: 'fr-FR' },
    ],
};