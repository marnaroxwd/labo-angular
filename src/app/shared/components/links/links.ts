import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-links',
    imports: [RouterLink],
    templateUrl: './links.html',
    styleUrl: './links.css',
})
export class Links {
    label = input('');
    extraClasses = input('');
    link = input('');
}
