import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentDetails } from '@core/models/tournament.interface';
import { TournamentService } from '@core/services/tournament.service';

@Component({
    selector: 'app-tournament-details-page',
    imports: [DatePipe],
    templateUrl: './tournament-details-page.html',
    styleUrl: './tournament-details-page.css',
})
export class TournamentDetailsPage {
    private readonly _tournamentService = inject(TournamentService);
    private readonly _router = inject(Router);
    private readonly _activatedRoute = inject(ActivatedRoute);
    tournamentId = '0';
    details = signal<TournamentDetails | null>(null);

    ngOnInit(): void {
        this._activatedRoute.params.subscribe({
            next: async (params) => {
                this.tournamentId = params['id'];

                //PROMESSE
                try {
                    this.details.set(
                        await this._tournamentService.details(
                            this.tournamentId,
                        ),
                    );
                    console.log(this.details)
                } catch (err) {
                    const e = err as Error;
                    console.log(e);
                }
            },
        });
    }

}
