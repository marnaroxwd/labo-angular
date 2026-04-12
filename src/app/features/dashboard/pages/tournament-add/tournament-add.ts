import { Component, inject, effect } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'; // Import requis pour transformer le flux en Signal
import { CategoryType } from '@core/enums/category.enum';
import { CreateTournament } from '@core/models/tournament.interface';
import { TournamentService } from '@core/services/tournament.service';
import { Button } from "../../../../shared/components/button/button";

@Component({
    selector: 'app-tournament-add',
    standalone: true, // Recommandé pour les nouveaux composants
    imports: [ReactiveFormsModule, Button],
    templateUrl: './tournament-add.html',
    styleUrl: './tournament-add.css',
})
export class TournamentAdd {
    private readonly _fb = inject(FormBuilder);
    private readonly _tournamentService = inject(TournamentService);
    private readonly _router = inject(Router);

    // Définition des contrôles
    name = new FormControl('', [Validators.required, Validators.minLength(3)]);
    location = new FormControl('En ligne', [Validators.required]);
    playerMin = new FormControl(2, [Validators.required, Validators.min(2), Validators.max(32)]);
    playerMax = new FormControl(32, [Validators.required, Validators.min(2), Validators.max(32)]);
    eloMin = new FormControl(0, [Validators.required, Validators.min(0), Validators.max(3000)]);
    eloMax = new FormControl(3000, [Validators.required, Validators.min(0), Validators.max(3000)]);
    
    categories = new FormGroup({
        junior: new FormControl(true),
        senior: new FormControl(true),
        veteran: new FormControl(true),
    });
    
    isWoman = new FormControl(false, [Validators.required]);
    endInscriptionDate = new FormControl('', [Validators.required]);

    // Groupement du formulaire
    formCreate = this._fb.group({
        name: this.name,
        location: this.location,
        playerMin: this.playerMin,
        playerMax: this.playerMax,
        eloMin: this.eloMin,
        eloMax: this.eloMax,
        categories: this.categories,
        isWoman: this.isWoman,
        endInscriptionDate: this.endInscriptionDate,
    });

    constructor() {

        const playerMinValue = toSignal(this.playerMin.valueChanges, { initialValue: 2 });

        effect(() => {
            const minPlayers = playerMinValue();
            if (minPlayers && minPlayers >= 2) {
                const dateCalculated = this.calculateDefaultDate(minPlayers);
                this.endInscriptionDate.setValue(dateCalculated);
            }
        });
    }

    private calculateDefaultDate(daysToAdd: number): string {
        const date = new Date();
        date.setDate(date.getDate() + daysToAdd);
        return date.toISOString().split('T')[0];
    }

    private buildCategories(): CategoryType[] {
        const { junior, senior, veteran } = this.categories.value;
        const result: CategoryType[] = [];
        if (junior) result.push(CategoryType.Junior);
        if (senior) result.push(CategoryType.Senior);
        if (veteran) result.push(CategoryType.Veteran);
        return result;
    }

    async onSubmitCreate() {
        this.formCreate.markAllAsTouched();
        
        if (this.formCreate.valid) {
            const data: CreateTournament = {
                name: this.formCreate.value.name!,
                location: this.formCreate.value.location!,
                playerMin: this.formCreate.value.playerMin!,
                playerMax: this.formCreate.value.playerMax!,
                eloMin: this.formCreate.value.eloMin!,
                eloMax: this.formCreate.value.eloMax!,
                categories: this.buildCategories(),
                isWoman: this.formCreate.value.isWoman!,
                endInscriptionDate: this.formCreate.value.endInscriptionDate!,
            };

            try {
                await this._tournamentService.create(data);
                this._router.navigate(['/']);
            } catch (error) {
                console.error('Erreur lors de la création:', error);
            }
        }
    }
}