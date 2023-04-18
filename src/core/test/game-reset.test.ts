import { Game } from '../game';
import { GameStateBuilder } from './game-state-builder';

describe('resetGame() final game state', () => {
  test('round is not ended', () => {
    const initialState = new GameStateBuilder().withRoundEnded().build();
    const game = new Game(undefined, undefined, initialState);
    game.resetGame();
    const gameState = game.getState();
    expect(gameState.isRoundEnded).toBe(false);
  });
  test('players names are kept', () => {
    const initialState = new GameStateBuilder()
      .withRedPlayerName('Red player')
      .withYellowPlayerName('Yellow player')
      .build();
    const game = new Game(undefined, undefined, initialState);
    game.resetGame();
    const gameState = game.getState();
    expect(gameState.players.RED.name).toBe('Red player');
    expect(gameState.players.YELLOW.name).toBe('Yellow player');
  });
  test('players scores are 0', () => {
    const initialState = new GameStateBuilder()
      .withRedPlayerScore(1)
      .withYellowPlayerScore(2)
      .build();
    const game = new Game(undefined, undefined, initialState);
    game.resetGame();
    const gameState = game.getState();
    expect(gameState.players.RED.score).toBe(0);
    expect(gameState.players.YELLOW.score).toBe(0);
  });
  test('first player is RED', () => {
    const initialState = new GameStateBuilder().withFirstPlayer('YELLOW').build();
    const game = new Game(undefined, undefined, initialState);
    game.resetGame();
    const gameState = game.getState();
    expect(gameState.players.RED.isFirstPlayer).toBe(true);
    expect(gameState.players.YELLOW.isFirstPlayer).toBe(false);
  });
  test('current player is first player', () => {
    const initialState = new GameStateBuilder()
      .withFirstPlayer('YELLOW')
      .withCurrentPlayer(null)
      .build();
    const game = new Game(undefined, undefined, initialState);
    game.resetGame();
    const gameState = game.getState();
    expect(gameState.players.RED.isCurrentPlayer).toBe(gameState.players.RED.isFirstPlayer);
    expect(gameState.players.YELLOW.isCurrentPlayer).toBe(gameState.players.YELLOW.isFirstPlayer);
  });
  test('there is no winner', () => {
    const initialState = new GameStateBuilder().withWinner('RED').build();
    const game = new Game(undefined, undefined, initialState);
    game.resetGame();
    const gameState = game.getState();
    expect(gameState.players.RED.isWinner).toBe(false);
    expect(gameState.players.YELLOW.isWinner).toBe(false);
  });
  test('board is empty', () => {
    const initialState = new GameStateBuilder()
      .withBoardCounters([{ row: 1, column: 1, color: 'YELLOW' }])
      .build();
    const game = new Game(undefined, undefined, initialState);
    game.resetGame();
    const gameState = game.getState();
    expect(gameState.boardCounters).toStrictEqual([]);
  });
  test('there is no dropped counter', () => {
    const initialState = new GameStateBuilder().withDroppedCounter({ row: 1, column: 1 }).build();
    const game = new Game(undefined, undefined, initialState);
    game.resetGame();
    const gameState = game.getState();
    expect(gameState.droppedCounter).toBeUndefined();
  });
  test('there is no updated player score', () => {
    const initialState = new GameStateBuilder().withUpdatedPlayerScore('RED').build();
    const game = new Game(undefined, undefined, initialState);
    game.resetGame();
    const gameState = game.getState();
    expect(gameState.updatedPlayerScore).toBeUndefined();
  });
});
