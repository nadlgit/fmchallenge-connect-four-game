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
    setTimeout(() => {
      this.#game.play('YELLOW', 1);
      this.#notifyUpdate();
    }, 1000);
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
    }
  }

  play(color: PlayerColor, column: number) {
    if (color === 'RED' || this.#playMode !== 'vsCPU') {
      this.#game.play(color, column);
      this.#notifyUpdate();
    }
    if (this.#playMode === 'vsCPU') {
      this.#playAsCPU();
    }
  }

  handlePlayerTimeOut(color: PlayerColor) {
    const winner = color === 'RED' ? 'YELLOW' : 'RED';
    this.#game.forceVictory(winner);
    this.#notifyUpdate();
  }
}
