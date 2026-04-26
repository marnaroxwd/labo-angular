import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

    const token = authService.authToken();
    if (token) {
        //clone de la requête pour ajouter 'Authorization" dans les headers
        const reqClone = req.clone({
            headers: req.headers.append('Authorization', 'Bearer ' + token),
        });

        //retourne la requête modifiée
        return next(reqClone);
    }
    
    return next(req);
};
