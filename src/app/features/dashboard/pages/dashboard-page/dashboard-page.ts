import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Links } from "../../../../shared/components/links/links";

@Component({
    selector: 'app-dashboard-page',
    imports: [RouterLink, Links],
    templateUrl: './dashboard-page.html',
    styleUrl: './dashboard-page.css',
})
export class DashboardPage {}
