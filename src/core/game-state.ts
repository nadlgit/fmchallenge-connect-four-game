export const BOARD_ROWS = 6;
export const BOARD_COLUMNS = 7;

export type PlayerColor = 'RED' | 'YELLOW';

export type GameState = {
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
    isDropped?: boolean;
  }[];
};
