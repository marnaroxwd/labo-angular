import { Component, inject } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Gender } from '@core/enums/gender.enum';
import { UserRole } from '@core/enums/user-role.enum';
import { UsersData } from '@core/models/users.interface';
import { AuthService } from '@core/services/auth.service';
import { FormsErrorDisplay } from '../../../../shared/components/forms-error-display/forms-error-display';
import { usernameValidator } from '@core/validators/username.validator';
import { Links } from "@shared/components/links/links";
import { Button } from "@shared/components/button/button";

@Component({
    selector: 'app-auth-register-page',
    imports: [ReactiveFormsModule, FormsErrorDisplay, Links, Button],
    templateUrl: './auth-register-page.html',
    styleUrl: './auth-register-page.css',
})
export class AuthRegisterPage {
    private readonly _fb = inject(FormBuilder);
    private readonly _router = inject(Router);
    private readonly _authService = inject(AuthService);

    email = new FormControl('', [Validators.required, Validators.email]);
    nickname = new FormControl<string>('', [
        Validators.required,
        usernameValidator(),
    ]);
    password = new FormControl<string>('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
    ]);
    gender = new FormControl<Gender>(Gender.Man);

    birthDate = new FormControl<string>('', [Validators.required]);

    elo = new FormControl<number>(1200, [
        Validators.required,
        Validators.min(0),
        Validators.max(3000),
    ]);

    formRegister = this._fb.group({
        email: this.email,
        nickname: this.nickname,
        password: this.password,
        gender: this.gender,
        birthDate: this.birthDate,
        elo: this.elo,
    });

    onSubmitRegister() {
        this.formRegister.markAllAsTouched();
        if (this.formRegister.valid) {
            const data: UsersData = {
                email: this.formRegister.value.email!,
                nickname: this.formRegister.value.nickname!,
                password: this.formRegister.value.password!,
                gender: this.formRegister.value.gender!,
                birthDate: this.formRegister.value.birthDate!,
                elo: this.formRegister.value.elo!,
                role: UserRole.User,
            };
            console.log(data);
            this._authService.register(data).then(() => {
                this._router.navigate(['/', 'auth', 'login']);
            });
        }
    }
}
