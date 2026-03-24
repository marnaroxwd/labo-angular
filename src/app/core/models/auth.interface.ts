import { JwtPayload } from 'jwt-decode';

export interface LoginReponse {
  accessToken: string;
}

export interface JwtDecoded extends JwtPayload {
  role: string;
}