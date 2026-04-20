import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-button',
    imports: [],
    templateUrl: './button.html',
    styleUrl: './button.css',
})
export class Button {
    label = input('');
    extraClasses = input('');
    icon = input<string | null>(null);

disabled = input<boolean>(false);
    type = input('')
    clicked = output<void>();
    onAction(): void {
        this.clicked.emit();
    }
}
