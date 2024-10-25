export interface GameState {
  board: Array<string | null>;
  isPlayerTurn: boolean;
  score: number;
  consecutiveWins: number;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  consecutiveWins: number;
}
