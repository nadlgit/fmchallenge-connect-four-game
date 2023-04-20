import { Game } from './game';
import { type GameState, type PlayerColor } from './game-state';

export type PlayMode = 'vsPlayer' | 'vsCPU';

export class GameService {
  #playMode;
  #game;
  #onStateUpdate;

  static getDefaultState() {
    return new Game().getState();
  }

  constructor(playMode: PlayMode, onStateUpdate: (state: GameState) => void) {
    this.#playMode = playMode;
    this.#game = this.#playMode === 'vsCPU' ? new Game('You', 'CPU') : new Game();
    this.#onStateUpdate = onStateUpdate;
    this.#notifyUpdate();
  }

  #notifyUpdate() {
    this.#onStateUpdate(this.#game.getState());
  }

  #playAsCPU() {
    this.#game.play('YELLOW', 1);
  }

  resetGame() {
    this.#game.resetGame();
    this.#notifyUpdate();
  }

  startNewRound() {
    this.#game.startNewRound();
    this.#notifyUpdate();
    if (this.#playMode === 'vsCPU' && this.#game.getState().players.YELLOW.isFirstPlayer) {
      this.#playAsCPU();
      this.#notifyUpdate();
    }
  }

  play(color: PlayerColor, column: number) {
    if (color === 'RED' || this.#playMode !== 'vsCPU') {
      this.#game.play(color, column);
      this.#notifyUpdate();
    }
    if (this.#playMode === 'vsCPU') {
      this.#playAsCPU();
      this.#notifyUpdate();
    }
  }
}
