import { Category } from './category.interface';
import { Match } from './match.interface';
import { Player } from './users.interface';

export interface Tournament {
    id: number;
    name: string;
    location: string;
    playerMin: number;
    playerMax: number;
    eloMin: number;
    eloMax: number;
    currentRound: number;
    isWoman: boolean;
    status: string;
    endInscriptionDate: string;
    nbrOfPlayers: number;
    categories: Category[];
}

export interface TournamentDetails{
    id: number;
  name: string;
  location: string;
  playerMin: number;
  playerMax: number;
  eloMin: number;
  eloMax: number;
  currentRound: number;
  isWoman: boolean;
  status: string;
  endInscriptionDate: string;  
  players: Player[];
  categories: Category[];
  matches: Match[];
}