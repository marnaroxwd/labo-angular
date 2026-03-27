import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserRole } from '@core/enums/user-role.enum';
import { AuthService } from '@core/services/auth.service';

@Component({
    selector: 'app-nav-bar',
    imports: [RouterLink],
    templateUrl: './nav-bar.html',
    styleUrl: './nav-bar.css',
})
export class NavBar {
    protected readonly UserRole = UserRole;
    private readonly _authService = inject(AuthService);
    isConnected = this._authService.isConnected;
    isAdmin = this._authService.isAdmin;
    onLogoutBtn() {
        this._authService.logout();
    }
}
