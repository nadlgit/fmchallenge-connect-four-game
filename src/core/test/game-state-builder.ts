import { GameState } from '../game-state';

export class GameStateBuilder {
  #gameState: GameState = {
    isRoundEnded: false,
    players: {
      RED: {
        name: 'red',
        score: -1,
        isFirstPlayer: false,
        isCurrentPlayer: false,
        isWinner: false,
      },
      YELLOW: {
        name: 'yellow',
        score: -1,
        isFirstPlayer: false,
        isCurrentPlayer: false,
        isWinner: false,
      },
    },
    boardCounters: [],
  };

  build() {
    return this.#gameState;
  }

  withRoundEnded() {
    this.#gameState.isRoundEnded = true;
    return this;
  }

  withRedPlayerName(value: string) {
    this.#gameState.players['RED'].name = value;
    return this;
  }

  withYellowPlayerName(value: string) {
    this.#gameState.players['YELLOW'].name = value;
    return this;
  }

  withRedPlayerScore(value: number) {
    this.#gameState.players['RED'].score = value;
    return this;
  }

  withYellowPlayerScore(value: number) {
    this.#gameState.players['YELLOW'].score = value;
    return this;
  }

  withFirstPlayer(value: keyof GameState['players']) {
    this.#gameState.players[value].isFirstPlayer = true;
    return this;
  }

  withCurrentPlayer(value: keyof GameState['players'] | null) {
    for (const [color, details] of Object.entries(this.#gameState.players)) {
      if (color === value) {
        details.isCurrentPlayer = true;
      }
    }
    return this;
  }

  withWinner(value: keyof GameState['players'] | null) {
    for (const [color, details] of Object.entries(this.#gameState.players)) {
      if (color === value) {
        details.isWinner = true;
      }
    }
    return this;
  }

  withBoardCounters(value: GameState['boardCounters']) {
    this.#gameState.boardCounters = value;
    return this;
  }

  withDroppedCounter(value: GameState['droppedCounter']) {
    this.#gameState.droppedCounter = value;
    return this;
  }

  withUpdatedPlayerScore(value: GameState['updatedPlayerScore']) {
    this.#gameState.updatedPlayerScore = value;
    return this;
  }
}
