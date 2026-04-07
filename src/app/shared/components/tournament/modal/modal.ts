import { Component, inject, input } from '@angular/core';
import { Tournament } from '@core/models/tournament.interface';
import { TournamentService } from '@core/services/tournament.service';

@Component({
    selector: 'app-modal',
    imports: [],
    templateUrl: './modal.html',
    styleUrl: './modal.css',
})
export class Modal {
    private readonly _tournamentService = inject(TournamentService);
    tournamentInput = input.required<Tournament>();
}
