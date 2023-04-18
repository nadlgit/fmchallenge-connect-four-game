import { type GameState } from './game-state';

export class Game {
  #isRoundEnded: GameState['isRoundEnded'] = false;
  #players: GameState['players'] = {
    RED: { name: 'Player 1', score: 0, isCurrentPlayer: true, isWinner: false },
    YELLOW: { name: 'Player 2', score: 0, isCurrentPlayer: false, isWinner: false },
  };
  #boardCounters: GameState['boardCounters'] = [];
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
      this.#isRoundEnded = gameState.isRoundEnded;
      this.#players = {
        RED: { ...gameState.players.RED },
        YELLOW: { ...gameState.players.YELLOW },
      };
      this.#boardCounters = gameState.boardCounters.map((c) => ({ ...c }));
      this.#droppedCounter = gameState.droppedCounter ? { ...gameState.droppedCounter } : undefined;
      this.#updatedPlayerScore = gameState.updatedPlayerScore;
    }
  }

  getState(): GameState {
    return {
      isRoundEnded: this.#isRoundEnded,
      players: this.#players,
      boardCounters: this.#boardCounters,
      droppedCounter: this.#droppedCounter,
      updatedPlayerScore: this.#updatedPlayerScore,
    };
  }

  resetGame() {
    this.#isRoundEnded = false;
    this.#players.RED.score = 0;
    this.#players.YELLOW.score = 0;
    this.#players.RED.isCurrentPlayer = true;
    this.#players.YELLOW.isCurrentPlayer = false;
    this.#players.RED.isWinner = false;
    this.#players.YELLOW.isWinner = false;
    this.#boardCounters = [];
    this.#droppedCounter = undefined;
    this.#updatedPlayerScore = undefined;
  }
}
