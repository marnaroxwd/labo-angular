import { UsersData } from "./users.interface";

export interface Match {
    id: number;
    roundNumber: number;
    result: string;
    tournamentId: number;
    whitePlayer: UsersData;
    blackPlayer: UsersData;
}
