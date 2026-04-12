import { Routes } from '@angular/router';
import { adminGuard } from '@core/guards/admin.guard';
import { cantBeConnectedGuard } from '@core/guards/not-connected.guard';
import { Error404 } from '@features/errors/pages/error-404/error-404';
import { TournamentListingPage } from '@features/tournament/pages/tournament-listing-page/tournament-listing-page';

export const routes: Routes = [
    {
        path: '',
        component: TournamentListingPage,
    },
    {
        path: 'auth',
        canActivate: [cantBeConnectedGuard],
        loadChildren: () =>
            import('./features/auth/auth.router').then((r) => r.routes),
    },
    {
        path: 'tournament',
        loadChildren: () =>
            import('./features/tournament/tournament.routes').then(
                (r) => r.routes,
            ),
    },
    {
        path: 'dashboard',
        canActivate: [adminGuard],
        loadChildren: () =>
            import('./features/dashboard/dashboard.routes').then(
                (r) => r.routes,
            ),
    },
    {
        path: 'error-500',
        loadComponent:() => import('./features/errors/pages/error-500/error-500').then(m => m.Error500)
    },
    {
        path: '**',
        component: Error404,
    },
];
