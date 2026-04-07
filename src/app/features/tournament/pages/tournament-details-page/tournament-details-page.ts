import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Match } from '@core/models/match.interface';
import {
    MaxRounds,
    PlayerScore,
    TournamentDetails,
} from '@core/models/tournament.interface';
import { AuthService } from '@core/services/auth.service';
import { TournamentService } from '@core/services/tournament.service';
import { sleep } from '@core/utils/sleep.util';
import { Button } from '../../../../shared/components/button/button';
import { Links } from '../../../../shared/components/links/links';

@Component({
    selector: 'app-tournament-details-page',
    imports: [DatePipe, Button, Links],
    templateUrl: './tournament-details-page.html',
    styleUrl: './tournament-details-page.css',
})
export class TournamentDetailsPage {
    private readonly _tournamentService = inject(TournamentService);
    private readonly _router = inject(Router);
    private readonly _activatedRoute = inject(ActivatedRoute);
    private readonly _authService = inject(AuthService);
    isAdmin = this._authService.isAdmin;
    isConnected = this._authService.isConnected;
    tournamentId = '0';
    details = signal<TournamentDetails | null>(null);
    matches = signal<Match[]>([]);
    score = signal<PlayerScore[]>([]);
    maxRounds = signal<MaxRounds | null>(null);
    ngOnInit(): void {
        this._activatedRoute.params.subscribe({
            next: async (params) => {
                this.tournamentId = params['id'];

                //PROMESSE
                this.onRefresh();
            },
        });
    }
    async onRefresh() {
    try {
        
        const detailsData = await this._tournamentService.details(this.tournamentId);
        this.details.set(detailsData);

        
        const matchesData = await this._tournamentService.matches(this.tournamentId);
        this.matches.set(matchesData);

       
        this.score.set(
            await this._tournamentService.score(this.tournamentId),
        );

        this.maxRounds.set(
            await this._tournamentService.maxRounds(this.tournamentId),
        );
        
    } catch (err) {
            const e = err as Error;
            console.log(e);
        }
}

    async onNextRoundBtn() {
        await this._tournamentService.nextRound(this.tournamentId);
        await this.onRefresh();
    }
    async onStartBtn() {
        await this._tournamentService.startTournament(this.tournamentId);
        await this.onRefresh();
    }
    async onLeave(id: number) {
        this.tournamentId = id.toString();
        await this._tournamentService.leave(this.tournamentId);
        await this.onRefresh();
    }
    async onRegister(id: number) {
         this.tournamentId = id.toString();
        await this._tournamentService.register(this.tournamentId);
        await this.onRefresh();
    }
}
