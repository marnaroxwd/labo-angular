import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-checkbox',
    imports: [FormsModule],
    templateUrl: './checkbox.html',
    styleUrl: './checkbox.css',
})
export class Checkbox {
    // Inputs classiques (Lecture seule)
    label = input<string>('');
    id = input<string>('default-id');

    // Model (Lecture/Écriture pour le Two-Way Binding)
    checked = model<boolean>(false);
}
