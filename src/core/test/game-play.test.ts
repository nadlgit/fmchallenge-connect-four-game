import { Game } from '../game';
import { GameStateBuilder } from './game-state-builder';

describe('play()', () => {
  test('given empty board sets counter on row 1', () => {
    const initialState = new GameStateBuilder()
      .withBoardCounters([])
      .withCurrentPlayer('RED')
      .build();
    const game = new Game(undefined, undefined, initialState);
    game.play('RED', 2);
    const gameState = game.getState();
    expect(gameState.boardCounters).toStrictEqual([{ row: 1, column: 2, color: 'RED' }]);
    expect(gameState.droppedCounter).toStrictEqual({ row: 1, column: 2 });
  });

  test('given column with 2 counters sets counter on row 3', () => {
    const initialState = new GameStateBuilder()
      .withBoardCounters([
        { row: 1, column: 1, color: 'RED' },
        { row: 2, column: 1, color: 'YELLOW' },
      ])
      .withCurrentPlayer('RED')
      .build();
    const game = new Game(undefined, undefined, initialState);
    game.play('RED', 1);
    const gameState = game.getState();
    expect(gameState.boardCounters).toStrictEqual([
      { row: 1, column: 1, color: 'RED' },
      { row: 2, column: 1, color: 'YELLOW' },
      { row: 3, column: 1, color: 'RED' },
    ]);
    expect(gameState.droppedCounter).toStrictEqual({ row: 3, column: 1 });
  });

  test('given column is full ignores move', () => {
    const initialState = new GameStateBuilder()
      .withBoardCounters([
        { row: 1, column: 1, color: 'RED' },
        { row: 2, column: 1, color: 'YELLOW' },
        { row: 3, column: 1, color: 'RED' },
        { row: 4, column: 1, color: 'YELLOW' },
        { row: 5, column: 1, color: 'RED' },
        { row: 6, column: 1, color: 'YELLOW' },
      ])
      .withCurrentPlayer('RED')
      .withDroppedCounter({ row: 6, column: 1 })
      .build();
    const game = new Game(undefined, undefined, initialState);
    game.play('RED', 1);
    const gameState = game.getState();
    expect(gameState.boardCounters).toStrictEqual([
      { row: 1, column: 1, color: 'RED' },
      { row: 2, column: 1, color: 'YELLOW' },
      { row: 3, column: 1, color: 'RED' },
      { row: 4, column: 1, color: 'YELLOW' },
      { row: 5, column: 1, color: 'RED' },
      { row: 6, column: 1, color: 'YELLOW' },
    ]);
    expect(gameState.droppedCounter).toBeUndefined();
  });

  test('given color is not current player ignores move', () => {
    const initialState = new GameStateBuilder()
      .withBoardCounters([{ row: 1, column: 1, color: 'RED' }])
      .withCurrentPlayer('YELLOW')
      .withDroppedCounter({ row: 1, column: 1 })
      .build();
    const game = new Game(undefined, undefined, initialState);
    game.play('RED', 2);
    const gameState = game.getState();
    expect(gameState.boardCounters).toStrictEqual([{ row: 1, column: 1, color: 'RED' }]);
    expect(gameState.droppedCounter).toBeUndefined();
  });

  test('given move is valid switches player', () => {
    const initialState = new GameStateBuilder()
      .withBoardCounters([])
      .withCurrentPlayer('RED')
      .build();
    const game = new Game(undefined, undefined, initialState);
    game.play('RED', 2);
    const gameState = game.getState();
    expect(gameState.players.RED.isCurrentPlayer).toBe(false);
    expect(gameState.players.YELLOW.isCurrentPlayer).toBe(true);
  });
});
