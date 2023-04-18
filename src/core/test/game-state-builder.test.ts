import { GameStateBuilder } from './game-state-builder';

describe('GameStateBuilder', () => {
  test('default', () => {
    const state = new GameStateBuilder().build();
    expect(state).toStrictEqual({
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
    });
  });
  test('withRoundEnded', () => {
    const state = new GameStateBuilder().withRoundEnded().build();
    expect(state.isRoundEnded).toBe(true);
  });
  test('withRedPlayerName', () => {
    const state = new GameStateBuilder().withRedPlayerName('abc').build();
    expect(state.players.RED.name).toBe('abc');
  });
  test('withYellowPlayerName', () => {
    const state = new GameStateBuilder().withYellowPlayerName('abc').build();
    expect(state.players.YELLOW.name).toBe('abc');
  });
  test('withRedPlayerScore', () => {
    const state = new GameStateBuilder().withRedPlayerScore(2).build();
    expect(state.players.RED.score).toBe(2);
  });
  test('withYellowPlayerScore', () => {
    const state = new GameStateBuilder().withYellowPlayerScore(2).build();
    expect(state.players.YELLOW.score).toBe(2);
  });
  test('withFirstPlayer red player', () => {
    const state = new GameStateBuilder().withFirstPlayer('RED').build();
    expect(state.players.RED.isFirstPlayer).toBe(true);
    expect(state.players.YELLOW.isFirstPlayer).toBe(false);
  });
  test('withFirstPlayer yellow player', () => {
    const state = new GameStateBuilder().withFirstPlayer('YELLOW').build();
    expect(state.players.RED.isFirstPlayer).toBe(false);
    expect(state.players.YELLOW.isFirstPlayer).toBe(true);
  });
  test('withCurrentPlayer null', () => {
    const state = new GameStateBuilder().withCurrentPlayer(null).build();
    expect(state.players.RED.isCurrentPlayer).toBe(false);
    expect(state.players.YELLOW.isCurrentPlayer).toBe(false);
  });
  test('withCurrentPlayer red player', () => {
    const state = new GameStateBuilder().withCurrentPlayer('RED').build();
    expect(state.players.RED.isCurrentPlayer).toBe(true);
    expect(state.players.YELLOW.isCurrentPlayer).toBe(false);
  });
  test('withCurrentPlayer yellow player', () => {
    const state = new GameStateBuilder().withCurrentPlayer('YELLOW').build();
    expect(state.players.RED.isCurrentPlayer).toBe(false);
    expect(state.players.YELLOW.isCurrentPlayer).toBe(true);
  });
  test('withWinner null', () => {
    const state = new GameStateBuilder().withWinner(null).build();
    expect(state.players.RED.isWinner).toBe(false);
    expect(state.players.YELLOW.isWinner).toBe(false);
  });
  test('withWinner red player', () => {
    const state = new GameStateBuilder().withWinner('RED').build();
    expect(state.players.RED.isWinner).toBe(true);
    expect(state.players.YELLOW.isWinner).toBe(false);
  });
  test('withWinner yellow player', () => {
    const state = new GameStateBuilder().withWinner('YELLOW').build();
    expect(state.players.RED.isWinner).toBe(false);
    expect(state.players.YELLOW.isWinner).toBe(true);
  });
  test('withBoardCounters', () => {
    const state = new GameStateBuilder()
      .withBoardCounters([
        { row: 1, column: 1, color: 'RED' },
        { row: 1, column: 2, color: 'YELLOW' },
      ])
      .build();
    expect(state.boardCounters).toStrictEqual([
      { row: 1, column: 1, color: 'RED' },
      { row: 1, column: 2, color: 'YELLOW' },
    ]);
  });
  test('withDroppedCounter', () => {
    const state = new GameStateBuilder().withDroppedCounter({ row: 1, column: 1 }).build();
    expect(state.droppedCounter).toStrictEqual({ row: 1, column: 1 });
  });
  test('withUpdatedPlayerScore', () => {
    const state = new GameStateBuilder().withUpdatedPlayerScore('RED').build();
    expect(state.updatedPlayerScore).toBe('RED');
  });
});
