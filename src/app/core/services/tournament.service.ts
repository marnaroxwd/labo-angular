import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import {
    ApiResponse,
    PaginatedResponse,
} from '@core/models/api-response.interface';
import { Match } from '@core/models/match.interface';
import {
    CreateTournament,
    MaxRounds,
    PlayerScore,
    Tournament,
    TournamentDetails,
} from '@core/models/tournament.interface';
import { env } from '@env';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TournamentService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _apiUrl = env.apiURL;

    tournamentDetails = signal<TournamentDetails | null>(null);

    currentRoundMatches = computed(() => {
        const tournament = this.tournamentDetails();
        if (!tournament) return [];

        return tournament.matches.filter(
            (match) => match.roundNumber === tournament.currentRound,
        );
    });
    async listing(filters?: {
        name?: string;
        status?: string;
        category?: string;
        isWoman?: boolean;
        offset?: number;
    }): Promise<PaginatedResponse<Tournament>> {
        let params = new HttpParams()
            .set('limit', 20)
            .set('offset', filters?.offset ?? 0);
        if (filters?.name) {
            params = params.set('name', filters.name);
        }
        if (filters?.isWoman !== undefined ) {
            params = params.set('isWoman', filters.isWoman);
        }
        if (filters?.status) {
            params = params.set('status', filters.status);
        }
        if (filters?.category) {
            params = params.set('category', filters.category);
        }

        const response = await firstValueFrom(
            this._httpClient.get<PaginatedResponse<Tournament>>(
                this._apiUrl + 'tournament',
                { params },
            ),
        );
        return response;
    }
    async create(tournamentData: CreateTournament): Promise<void> {
        await firstValueFrom(
            this._httpClient.post(this._apiUrl + 'tournament', tournamentData),
        );
    }
    async details(id: string): Promise<TournamentDetails> {
        const response = await firstValueFrom(
            this._httpClient.get<ApiResponse<TournamentDetails>>(
                this._apiUrl + 'tournament/' + id,
            ),
        );

        return response.data;
    }
    async maxRounds(id: string): Promise<MaxRounds> {
        const response = await firstValueFrom(
            this._httpClient.get<ApiResponse<MaxRounds>>(
                this._apiUrl + 'tournament/' + id + '/maxround',
            ),
        );
        console.log(response.data);
        return response.data;
    }
    async matches(id: string): Promise<Match[]> {
        const response = await firstValueFrom(
            this._httpClient.get<ApiResponse<{ matches: Match[] }>>(
                this._apiUrl + 'tournament/' + id + '/match/current',
            ),
        );

        return response.data.matches;
    }
    async score(id: string): Promise<PlayerScore[]> {
        const response = await firstValueFrom(
            this._httpClient.get<ApiResponse<PlayerScore[]>>(
                this._apiUrl + 'tournament/' + id + '/scores',
            ),
        );
        console.log(response.data);
        return response.data;
    }

    async nextRound(id: string): Promise<void> {
        await firstValueFrom(
            this._httpClient.patch(
                this._apiUrl + 'tournament/' + id + '/next-round',
                {},
            ),
        );
    }
    async startTournament(id: string): Promise<void> {
        await firstValueFrom(
            this._httpClient.post(
                this._apiUrl + 'tournament/' + id + '/start',
                {},
            ),
        );
    }
    async register(tournamentId: string): Promise<void> {
        await firstValueFrom(
            this._httpClient.post(
                this._apiUrl + 'tournament/' + tournamentId + '/join',
                {},
            ),
        );
    }

    async leave(tournamentId: string): Promise<void> {
        await firstValueFrom(
            this._httpClient.delete(
                this._apiUrl + 'tournament/' + tournamentId + '/leave',
                {},
            ),
        );
    }
    async delete(tournamentId: string): Promise<void> {
        await firstValueFrom(
            this._httpClient.delete(
                this._apiUrl + 'tournament/' + tournamentId,
            ),
        );
    }
}
