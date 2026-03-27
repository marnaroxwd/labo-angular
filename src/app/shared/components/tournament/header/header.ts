import { Component, input } from '@angular/core';
import { TournamentDetails } from '@core/models/tournament.interface';

@Component({
    selector: 'app-header',
    imports: [],
    templateUrl: './header.html',
    styleUrl: './header.css',
})
export class Header {
    tournamentInput = input.required<TournamentDetails>();
}
