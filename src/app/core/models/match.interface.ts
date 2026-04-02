import { Player } from "./users.interface";

export interface Match {
    id: number;
    roundNumber: number;
    result: string;
    whitePlayer: Player;
    blackPlayer: Player;
}
