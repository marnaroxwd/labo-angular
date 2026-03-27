import { Gender } from '@core/enums/gender.enum';
import { UserRole } from '@core/enums/user-role.enum';

export interface UsersData {
    email: string;
    nickname: string;
    password: string;
    gender: Gender;
    birthDate: string;
    elo: number;
    role: UserRole;
}

export interface Player {
  nickname : string,
  elo: number;
  gender: Gender,
}