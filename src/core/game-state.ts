export type PlayerColor = 'RED' | 'YELLOW';

export type GameState = {
  isRoundEnded: boolean;
  players: {
    [key in PlayerColor]: {
      name: string;
      score: number;
      isFirstPlayer: boolean;
      isCurrentPlayer: boolean;
      isWinner: boolean;
    };
  };
  boardCounters: {
    row: number;
    column: number;
    color: PlayerColor;
    isWinPart?: boolean;
  }[];
  droppedCounter?: {
    row: number;
    column: number;
  };
  updatedPlayerScore?: PlayerColor;
};
