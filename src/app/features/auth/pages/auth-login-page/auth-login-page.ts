import { Component, inject } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
    selector: 'app-auth-login-page',
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './auth-login-page.html',
    styleUrl: './auth-login-page.css',
})
export class AuthLoginPage {
    private readonly _fb = inject(FormBuilder);
    private readonly _router = inject(Router);
    private readonly _authService = inject(AuthService);

    identifier = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required]);

    formLogin = this._fb.group({
        identifier: this.identifier,
        password: this.password,
    });

    async onSubmit() {
        this.formLogin.markAllAsTouched();
        if (this.formLogin.valid) {
            try {
                console.log(this.formLogin.value);
                await this._authService
                    .login(
                        this.formLogin.value.identifier!,
                        this.formLogin.value.password!,
                    )
                    .then(() => {
                        this._router.navigate(['/']);
                    });
            } catch (err) {
                console.warn('auth login', err);
            }
        }
    }
}
