import { Component, inject } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Button } from "../../../../shared/components/button/button";
import { Links } from "@shared/components/links/links";
import { FormsErrorDisplay } from "@shared/components/forms-error-display/forms-error-display";

@Component({
    imports: [ReactiveFormsModule, Button, Links, FormsErrorDisplay],
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
            // loading true
            try {
                await this._authService
                    .login(
                        this.formLogin.value.identifier!,
                        this.formLogin.value.password!,
                    )
                    .then(() => {
                        this._router.navigate(['/']);
                    }).catch().finally(() =>{
                        // loading false
                    })
            } catch (err) {
                console.warn('auth login', err);
            }
        }
    }
}
