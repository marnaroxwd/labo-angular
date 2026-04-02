import { Routes } from '@angular/router';
export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/dashboard-page/dashboard-page').then(
                (c) => c.DashboardPage,
            ),
    },
    {
        path:'add',
        loadComponent:() => import('./pages/tournament-add/tournament-add').then((c) => c.TournamentAdd)
    }
];
