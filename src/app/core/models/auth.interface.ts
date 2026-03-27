import { JwtPayload } from 'jwt-decode';

export interface LoginReponse {
    token: string;
}

export interface JwtDecoded extends JwtPayload {
    role: string;
}
