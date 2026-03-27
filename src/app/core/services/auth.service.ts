import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { UserRole } from '@core/enums/user-role.enum';
import { JwtDecoded, LoginReponse } from '@core/models/auth.interface';
import { UsersData } from '@core/models/users.interface';
import { env } from '@env';
import { jwtDecode } from 'jwt-decode';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _apiUrl = env.apiURL;

    private _authToken = signal<string>('');
    private _role = signal<UserRole | null>(null);
    authToken = this._authToken.asReadonly();
    role = this._role.asReadonly();

    isAdmin = computed(() => {
        return this.role() === UserRole.Admin;
    });

    isConnected = computed(() => !!this.authToken());
    // !! convertis en boolean
    /*Que fais "!!" ?(exemple)
on prends la valeur de this.authtoken ("abc")
le premier ! inverse "abc = false (pour rappel une chaine de texte non vide est vraie en js
//le deuxième ! ré-inverse le false en VRAI
// donc "abc" (string' devient true (boolean)) */

    constructor() {
        /*Cet effect est activé à chaque fois que this.authToken() change de valeur
    Il faut penser à tout les cas:
    -login
    -lorsqu'on est connecté avec token dans le localstorage
    -logout
    -et si on est pas connecté
    
    Lorsqu'on se log et la récupération du localstorage -> on obtient un token
    Quand on logout -> on a une chaîne de texte vide
    */
        effect(() => {
            const token = this._authToken();
            if (!token) {
                localStorage.removeItem('token');
                this._role.set(null);
                return;
            }
            localStorage.setItem('token', token);
            const decoded = jwtDecode<JwtDecoded>(token);
            if (decoded.exp && decoded.exp * 1000 > Date.now()) {
                this._role.set((decoded.role as UserRole) ?? UserRole.User);
            } else {
                this._authToken.set('');
            }
        });
        const localToken = localStorage.getItem('token');
        if (localToken) {
            this._authToken.set(localToken);
        }
    }
    async login(identifier: string, password: string): Promise<void> {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const body = emailRegex.test(identifier)
            ? { email: identifier, password }
            : { nickname: identifier, password };

        const response = await firstValueFrom(
            this._httpClient.post<LoginReponse>(
                this._apiUrl + 'auth/login',
                body,
            ),
        );

        this._authToken.set(response.token);
    }
    async register(userData: UsersData): Promise<void> {
        await firstValueFrom(
            //FirstValue from tranforme un observable en promesse

            this._httpClient.post(this._apiUrl + 'auth/register', userData),
        );
    }
    logout() {
        this._authToken.set('');
    }
}
