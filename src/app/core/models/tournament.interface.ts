import { CategoryType } from '@core/enums/category.enum';
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
    canRegister: boolean;
    isRegistered: boolean;
}


export interface CreateTournament {
    name: string;
    location: string;
    playerMin: number;
    playerMax: number;
    eloMin: number;
    eloMax: number;
    isWoman: boolean;
    endInscriptionDate: string;
    categories: CategoryType[];
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
  canRegister: boolean;
  isRegistered: boolean;
}

export interface PlayerScore{
  player: Player;
  score: number,
  victory: number,
  draw: number,
  defeat: number
}
export interface MaxRounds{
  maxRound: string,
}