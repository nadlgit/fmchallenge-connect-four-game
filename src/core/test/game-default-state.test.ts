import { Game } from '../game';

describe('Game default state', () => {
  test('round is not ended', () => {
    const gameState = new Game().getState();
    expect(gameState.isRoundEnded).toBe(false);
  });
  test('players names are set', () => {
    const gameState = new Game().getState();
    expect(gameState.players.RED.name).toBe('Player 1');
    expect(gameState.players.YELLOW.name).toBe('Player 2');
  });
  test('players scores are 0', () => {
    const gameState = new Game().getState();
    expect(gameState.players.RED.score).toBe(0);
    expect(gameState.players.YELLOW.score).toBe(0);
  });
  test('first player is RED', () => {
    const gameState = new Game().getState();
    expect(gameState.players.RED.isFirstPlayer).toBe(true);
    expect(gameState.players.YELLOW.isFirstPlayer).toBe(false);
  });
  test('current player is first player', () => {
    const gameState = new Game().getState();
    expect(gameState.players.RED.isCurrentPlayer).toBe(gameState.players.RED.isFirstPlayer);
    expect(gameState.players.YELLOW.isCurrentPlayer).toBe(gameState.players.YELLOW.isFirstPlayer);
  });
  test('there is no winner', () => {
    const gameState = new Game().getState();
    expect(gameState.players.RED.isWinner).toBe(false);
    expect(gameState.players.YELLOW.isWinner).toBe(false);
  });
  test('board is empty', () => {
    const gameState = new Game().getState();
    expect(gameState.boardCounters).toStrictEqual([]);
  });
  test('there is no dropped counter', () => {
    const gameState = new Game().getState();
    expect(gameState.droppedCounter).toBeUndefined();
  });
  test('there is no updated player score', () => {
    const gameState = new Game().getState();
    expect(gameState.updatedPlayerScore).toBeUndefined();
  });
});
