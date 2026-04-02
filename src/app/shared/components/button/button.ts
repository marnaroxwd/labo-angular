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
    
    clicked = output<void>();
    onAction(): void {
        this.clicked.emit();
    }
}
