import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Tournament } from '@core/models/tournament.interface';
import { RouterLink } from '@angular/router';
import { TournamentService } from '@core/services/tournament.service';
import { AuthService } from '@core/services/auth.service';
import { Links } from "../../links/links";
import { Button } from "../../button/button";

@Component({
    selector: 'app-tournament-card',
    imports: [DatePipe, RouterLink, Links, Button, NgClass],
    templateUrl: './tournament-card.html',
    styleUrl: './tournament-card.css',
})
export class TournamentCard {
    private readonly _tournamentService = inject(TournamentService);
    tournamentInput = input.required<Tournament>();
    private readonly _authService = inject(AuthService);
    isConnected = this._authService.isConnected;
    isAdmin = this._authService.isAdmin
    idTournament: string = '';
    onRegister(id: number) {
        this.idTournament = id.toString();
        this._tournamentService.register(this.idTournament);
    }
    onLeave(id: number) {
        this.idTournament = id.toString();
        this._tournamentService.leave(this.idTournament);
    }
}
