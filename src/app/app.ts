import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/layout/header/header';
import { LoaderComponent } from "@shared/components/loading/loading";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Header, LoaderComponent],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    protected readonly title = signal('labo-angular');
}
