import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ApiReponse } from '@core/models/api-reponse.interface';
import { Tournament, TournamentDetails } from '@core/models/tournament.interface';
import { env } from '@env';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TournamentService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _apiUrl = env.apiURL;

    async listing(): Promise<Array<Tournament>> {
        const response = await firstValueFrom(
            this._httpClient.get<ApiReponse<Array<Tournament>>>(
                this._apiUrl + 'tournament',
            ),
        );

        return response.data;
    }
    async details(id: string): Promise<TournamentDetails>{
        const response = await firstValueFrom(
            this._httpClient.get<ApiReponse<TournamentDetails>>(
                this._apiUrl+'tournament/'+id,
            ),
        );
        console.log(response.data)
        return response.data
    }
}
