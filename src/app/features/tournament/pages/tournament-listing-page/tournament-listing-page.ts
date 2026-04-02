import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from '@core/models/tournament.interface';
import { TournamentService } from '@core/services/tournament.service';
import { TournamentCard } from '../../../../shared/components/tournament/cards/tournament-card';
import { FormsModule } from '@angular/forms';
import { PaginatedResponse } from '@core/models/api-response.interface';
import { Button } from '../../../../shared/components/button/button';

@Component({
    selector: 'app-tournament-listing-page',
    imports: [TournamentCard, FormsModule, Button],
    templateUrl: './tournament-listing-page.html',
    styleUrl: './tournament-listing-page.css',
})
export class TournamentListingPage {
    private readonly _tournamentService = inject(TournamentService);
    private readonly _router = inject(Router);
    private readonly _activatedRoute = inject(ActivatedRoute);
    tournaments = signal<null | PaginatedResponse<Tournament>>(null);
    tournamentSearch = '';

    pages = computed(() => {
        const response = this.tournaments();
        if (!response) return [];
        return Array.from(
            { length: Math.ceil(response.total / response.limit) },
            (_, i) => i,
        );
    });
    ngOnInit(): void {
        this._activatedRoute.queryParams.subscribe({
            next: async (queryParam) => {
                this.tournamentSearch = queryParam['tournamentName'];
                console.log('queryParams:', queryParam); // ← voir ce qu'on reçoit
                console.log('offset brut:', queryParam['offset']);
                const offset = Number(queryParam['offset'] ?? 0);
                console.log('offset final:', offset);
                //PROMESSE
                try {
                    this.tournaments.set(
                        await this._tournamentService.listing({
                            name: this.tournamentSearch,
                            offset: offset,
                        }),
                    );
                } catch (err) {
                    const e = err as Error;
                    console.log(e);
                }
            },
        });
    }

    onClickSearch() {
        this._router.navigate(['/'], {
            queryParams: {
                tournamentName: this.tournamentSearch,
            },
        });
    }
    goToPage(page: number): void {
        this._router.navigate(['/'], {
            queryParams: {
                offset: page * this.tournaments()!.limit,
            },
            queryParamsHandling: 'merge', // ← fusionne avec les queryParams existants
        });
    }
}
