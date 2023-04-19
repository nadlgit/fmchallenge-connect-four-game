import { Board } from './board';
import { type GameState, type PlayerColor } from './game-state';

export class Game {
  #players: GameState['players'] = {
    RED: {
      name: 'Player 1',
      score: 0,
      isFirstPlayer: true,
      isCurrentPlayer: true,
      isWinner: false,
    },
    YELLOW: {
      name: 'Player 2',
      score: 0,
      isFirstPlayer: false,
      isCurrentPlayer: false,
      isWinner: false,
    },
  };
  #board = new Board();
  #victoryCounters: { row: number; column: number }[] = [];
  #droppedCounter: GameState['droppedCounter'];
  #updatedPlayerScore: GameState['updatedPlayerScore'];

  constructor(redPlayerName?: string, yellowPlayerName?: string, gameState?: GameState) {
    if (redPlayerName) {
      this.#players.RED.name = redPlayerName;
    }
    if (yellowPlayerName) {
      this.#players.YELLOW.name = yellowPlayerName;
    }
    if (gameState) {
      this.#players = {
        RED: { ...gameState.players.RED },
        YELLOW: { ...gameState.players.YELLOW },
      };
      this.#board = new Board(gameState.boardCounters);
      this.#droppedCounter = gameState.droppedCounter ? { ...gameState.droppedCounter } : undefined;
      this.#updatedPlayerScore = gameState.updatedPlayerScore;
    }
  }

  getState(): GameState {
    const boardCounters = this.#board.getCounters();
    boardCounters.forEach((counter) => {
      if (
        this.#victoryCounters.find(
          ({ row, column }) => row === counter.row && column === counter.column
        )
      ) {
        counter.isWinPart = true;
      }
    });
    return {
      isRoundEnded: !this.#players.RED.isCurrentPlayer && !this.#players.YELLOW.isCurrentPlayer,
      players: this.#players,
      boardCounters,
      droppedCounter: this.#droppedCounter,
      updatedPlayerScore: this.#updatedPlayerScore,
    };
  }

  resetGame() {
    this.#players.RED.score = 0;
    this.#players.YELLOW.score = 0;
    this.#players.RED.isFirstPlayer = true;
    this.#players.YELLOW.isFirstPlayer = false;
    this.#players.RED.isCurrentPlayer = this.#players.RED.isFirstPlayer;
    this.#players.YELLOW.isCurrentPlayer = this.#players.YELLOW.isFirstPlayer;
    this.#players.RED.isWinner = false;
    this.#players.YELLOW.isWinner = false;
    this.#board = new Board();
    this.#victoryCounters = [];
    this.#droppedCounter = undefined;
    this.#updatedPlayerScore = undefined;
  }

  startNewRound() {
    this.#players.RED.isFirstPlayer = !this.#players.RED.isFirstPlayer;
    this.#players.YELLOW.isFirstPlayer = !this.#players.YELLOW.isFirstPlayer;
    this.#players.RED.isCurrentPlayer = this.#players.RED.isFirstPlayer;
    this.#players.YELLOW.isCurrentPlayer = this.#players.YELLOW.isFirstPlayer;
    this.#players.RED.isWinner = false;
    this.#players.YELLOW.isWinner = false;
    this.#board = new Board();
    this.#victoryCounters = [];
    this.#droppedCounter = undefined;
    this.#updatedPlayerScore = undefined;
  }

  play(color: PlayerColor, column: number) {
    this.#droppedCounter = undefined;
    if (!this.#players[color].isCurrentPlayer) {
      return;
    }
    const row = this.#board.addCounter(color, column);
    if (!row) {
      return;
    }
    this.#droppedCounter = { row, column };
    this.#victoryCounters = this.#board.checkVictoryForPosition(row, column);
    if (this.#victoryCounters.length > 0) {
      this.#players.RED.isCurrentPlayer = false;
      this.#players.YELLOW.isCurrentPlayer = false;
      this.#players[color].isWinner = true;
      this.#players[color].score += 1;
      this.#updatedPlayerScore = color;
    } else {
      this.#players.RED.isCurrentPlayer = !this.#players.RED.isCurrentPlayer;
      this.#players.YELLOW.isCurrentPlayer = !this.#players.YELLOW.isCurrentPlayer;
    }
  }
}
