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

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideHttpClient(withInterceptors([jwtInterceptor, errorsInterceptor])),
        { provide: LOCALE_ID, useValue: 'fr-FR' },
    ],
};
