import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from '@core/models/tournament.interface';
import { TournamentService } from '@core/services/tournament.service';
import { TournamentCard } from '../../../../shared/components/tournament/cards/tournament-card';

@Component({
    selector: 'app-tournament-listing-page',
    imports: [TournamentCard],
    templateUrl: './tournament-listing-page.html',
    styleUrl: './tournament-listing-page.css',
})
export class TournamentListingPage {
    private readonly _tournamentService = inject(TournamentService);
    private readonly _router = inject(Router);
    private readonly _activatedRoute = inject(ActivatedRoute);
    tournaments = signal<Tournament[]>([]);
    // ngOnInit() {
    //     console.log;
    //     return this._tournamentService.listing();
    // }
    ngOnInit(): void {
        this._activatedRoute.queryParams.subscribe({
            next: async () => {
                //OBSERVABLE
                // this._movieService.getMoviesObservable().subscribe({
                //   next: reponses =>{
                //     this.movies.set(reponses);
                //   },
                //   error: (err: Error) => {
                //     this.moviesError.set(err.message)
                //   }
                // })

                //PROMESSE
                try {
                    this.tournaments.set(
                        await this._tournamentService.listing(),
                    );
                } catch (err) {
                    const e = err as Error;
                    console.log(e);
                }
            },
        });
    }
}
