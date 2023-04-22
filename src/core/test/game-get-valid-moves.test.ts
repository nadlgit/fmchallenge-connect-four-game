import { Game } from '../game';
import { GameStateBuilder } from './game-state-builder';

describe('getValidMoves()', () => {
  test('given empty board returns array with all columns', () => {
    const initialState = new GameStateBuilder().withBoardCounters([]).build();
    const game = new Game(undefined, undefined, initialState);
    expect(game.getValidMoves()).toIncludeSameMembers([1, 2, 3, 4, 5, 6, 7]);
  });

  test('given full board returns empty array', () => {
    const initialState = new GameStateBuilder()
      .withBoardCounters([
        { row: 1, column: 1, color: 'RED' },
        { row: 1, column: 2, color: 'YELLOW' },
        { row: 2, column: 1, color: 'RED' },
        { row: 2, column: 2, color: 'YELLOW' },
        { row: 1, column: 3, color: 'RED' },
        { row: 1, column: 4, color: 'YELLOW' },
        { row: 2, column: 3, color: 'RED' },
        { row: 2, column: 4, color: 'YELLOW' },
        { row: 1, column: 5, color: 'RED' },
        { row: 1, column: 6, color: 'YELLOW' },
        { row: 2, column: 5, color: 'RED' },
        { row: 2, column: 6, color: 'YELLOW' },
        { row: 3, column: 6, color: 'RED' },
        { row: 3, column: 5, color: 'YELLOW' },
        { row: 4, column: 6, color: 'RED' },
        { row: 4, column: 5, color: 'YELLOW' },
        { row: 3, column: 4, color: 'RED' },
        { row: 3, column: 3, color: 'YELLOW' },
        { row: 4, column: 4, color: 'RED' },
        { row: 4, column: 3, color: 'YELLOW' },
        { row: 3, column: 2, color: 'RED' },
        { row: 3, column: 1, color: 'YELLOW' },
        { row: 4, column: 2, color: 'RED' },
        { row: 4, column: 1, color: 'YELLOW' },
        { row: 5, column: 1, color: 'RED' },
        { row: 5, column: 2, color: 'YELLOW' },
        { row: 6, column: 1, color: 'RED' },
        { row: 6, column: 2, color: 'YELLOW' },
        { row: 5, column: 3, color: 'RED' },
        { row: 5, column: 4, color: 'YELLOW' },
        { row: 6, column: 3, color: 'RED' },
        { row: 6, column: 4, color: 'YELLOW' },
        { row: 5, column: 5, color: 'RED' },
        { row: 5, column: 6, color: 'YELLOW' },
        { row: 6, column: 5, color: 'RED' },
        { row: 6, column: 6, color: 'YELLOW' },
        { row: 1, column: 7, color: 'RED' },
        { row: 2, column: 7, color: 'YELLOW' },
        { row: 3, column: 7, color: 'RED' },
        { row: 4, column: 7, color: 'YELLOW' },
        { row: 5, column: 7, color: 'RED' },
        { row: 5, column: 7, color: 'YELLOW' },
      ])
      .build();
    const game = new Game(undefined, undefined, initialState);
    expect(game.getValidMoves()).toEqual([]);
  });

  test('given 4 full columns returns array with 3 remining columns', () => {
    const initialState = new GameStateBuilder()
      .withBoardCounters([
        { row: 1, column: 1, color: 'RED' },
        { row: 2, column: 1, color: 'RED' },
        { row: 3, column: 1, color: 'RED' },
        { row: 4, column: 1, color: 'RED' },
        { row: 5, column: 1, color: 'RED' },
        { row: 6, column: 1, color: 'RED' },
        { row: 1, column: 2, color: 'RED' },
        { row: 2, column: 2, color: 'RED' },
        { row: 3, column: 2, color: 'RED' },
        { row: 4, column: 2, color: 'RED' },
        { row: 5, column: 2, color: 'RED' },
        { row: 6, column: 2, color: 'RED' },
        { row: 1, column: 4, color: 'YELLOW' },
        { row: 2, column: 4, color: 'YELLOW' },
        { row: 3, column: 4, color: 'YELLOW' },
        { row: 4, column: 4, color: 'YELLOW' },
        { row: 5, column: 4, color: 'YELLOW' },
        { row: 6, column: 4, color: 'YELLOW' },
        { row: 1, column: 7, color: 'YELLOW' },
        { row: 2, column: 7, color: 'YELLOW' },
        { row: 3, column: 7, color: 'YELLOW' },
        { row: 4, column: 7, color: 'YELLOW' },
        { row: 5, column: 7, color: 'YELLOW' },
        { row: 6, column: 7, color: 'YELLOW' },
      ])
      .build();
    const game = new Game(undefined, undefined, initialState);
    expect(game.getValidMoves()).toIncludeSameMembers([3, 5, 6]);
  });
});
