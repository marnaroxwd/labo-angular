import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from '@core/models/tournament.interface';
import { TournamentService } from '@core/services/tournament.service';
import { TournamentCard } from '../../../../shared/components/tournament/cards/tournament-card';
import { FormsModule } from '@angular/forms';
import { PaginatedResponse } from '@core/models/api-response.interface';
import { Button } from '../../../../shared/components/button/button';
import { Checkbox } from "@shared/components/checkbox/checkbox";

@Component({
    selector: 'app-tournament-listing-page',
    imports: [TournamentCard, FormsModule, Button, Checkbox],
    templateUrl: './tournament-listing-page.html',
    styleUrl: './tournament-listing-page.css',
})
export class TournamentListingPage {
    private readonly _tournamentService = inject(TournamentService);
    private readonly _router = inject(Router);
    private readonly _activatedRoute = inject(ActivatedRoute);
    tournaments = signal<null | PaginatedResponse<Tournament>>(null);
    tournamentSearch = '';
    tournamentStatus = "";
    tournamentCategory = "";
    isWoman = false;

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
            next: async (params) => {
                this.tournamentSearch = params['tournamentName'] || '';
                this.tournamentStatus = params['status'] || '';
                 this.tournamentCategory = params['category'] || '';
                 this.isWoman = params['isWoman'] || false;
                const offset = Number(params['offset'] ?? 0);

                try {
                    const response = await this._tournamentService.listing({
                        name: this.tournamentSearch,
                        status: this.tournamentStatus,
                        category: this.tournamentCategory,
                        isWoman: this.isWoman,
                        offset: offset,
                    });
                    this.tournaments.set(response);
                } catch (err) {
                    console.error("Erreur lors du filtrage", err);
                }
            },
        });
    }

onClickSearch() {
        this._router.navigate([], { // [] ou ['/'] selon ta route
            relativeTo: this._activatedRoute,
            queryParams: {
                tournamentName: this.tournamentSearch || null, // null retire le param de l'URL s'il est vide
                status: this.tournamentStatus || null,
                category: this.tournamentCategory || null,
                isWoman: this.isWoman || null,
                offset: 0 
            },
            queryParamsHandling: 'merge', // Garde les autres paramètres si nécessaire
        });
    }
    onResetFilter(){
                this._router.navigate([], { // [] ou ['/'] selon ta route
            relativeTo: this._activatedRoute,
            queryParams: {
                tournamentName: null, 
                status:  null,
                category: null,
                isWoman: null,
                offset: 0 
            },
            queryParamsHandling: 'merge', // Garde les autres paramètres si nécessaire
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
