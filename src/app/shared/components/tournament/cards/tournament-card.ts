import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Tournament } from '@core/models/tournament.interface';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-tournament-card',
    imports: [DatePipe, RouterLink],
    templateUrl: './tournament-card.html',
    styleUrl: './tournament-card.css',
})
export class TournamentCard {
    tournamentInput = input.required<Tournament>();
}
