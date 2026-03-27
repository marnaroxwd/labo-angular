import { Routes } from '@angular/router';
export const routes: Routes = [
    {
        path: ':id',
        loadComponent: () => import('./pages/tournament-details-page/tournament-details-page').then((c)=> c.TournamentDetailsPage)
    },

];
