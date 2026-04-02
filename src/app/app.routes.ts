import { Routes } from '@angular/router';
import { adminGuard } from '@core/guards/admin.guard';
import { Error404 } from '@features/errors/pages/error-404/error-404';
import { TournamentListingPage } from '@features/tournament/pages/tournament-listing-page/tournament-listing-page';

export const routes: Routes = [
    {
        path: '',
        component: TournamentListingPage,
    },
    {
        path: 'auth',
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
        path: '**',
        component: Error404,
    },
];
