import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryType } from '@core/enums/category.enum';
import { CreateTournament, Tournament } from '@core/models/tournament.interface';
import { TournamentService } from '@core/services/tournament.service';

@Component({
    selector: 'app-tournament-add',
    imports: [ReactiveFormsModule],
    templateUrl: './tournament-add.html',
    styleUrl: './tournament-add.css',
})
export class TournamentAdd {
    private readonly _fb = inject(FormBuilder);
    private readonly _tournamentService = inject(TournamentService)
    private readonly _router = inject(Router);


    name = new FormControl('', [Validators.required, Validators.minLength(3)]);
    location = new FormControl('En ligne', [Validators.required]);
    playerMin = new FormControl(2, [
        Validators.required,
        Validators.min(2),
        Validators.max(32),
    ]);
    playerMax = new FormControl(32, [
        Validators.required,
        Validators.min(2),
        Validators.max(32),
    ]);
    eloMin = new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(3000),
    ]);
    eloMax = new FormControl(3000, [
        Validators.required,
        Validators.min(0),
        Validators.max(3000),
    ]);
        categories = new FormGroup({
        junior:  new FormControl(true),   // CategoryType.JUNIOR  = 0
        senior:  new FormControl(true),   // CategoryType.SENIOR  = 1
        veteran: new FormControl(true),   // CategoryType.VETERAN = 2
    });
    isWoman = new FormControl(false, [Validators.required]);
    endInscriptionDate = new FormControl('', [Validators.required]);




        private buildCategories(): CategoryType[] {
        const { junior, senior, veteran } = this.categories.value;
        const result: CategoryType[] = [];
        if (junior)  result.push(CategoryType.Junior);   // 0
        if (senior)  result.push(CategoryType.Senior);   // 1
        if (veteran) result.push(CategoryType.Veteran);  // 2
        return result;
    }
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
       onSubmitCreate() {
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
            console.log(data);
            this._tournamentService.create(data).then(() => {
                this._router.navigate(['/']);
            });
            console.log(data);
        }
    }
}
