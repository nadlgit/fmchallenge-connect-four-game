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
    expect(gameState.boardCounters).toIncludeSameMembers([
      { row: 1, column: 2, color: 'RED', isDropped: true },
    ]);
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
    expect(gameState.boardCounters).toIncludeSameMembers([
      { row: 1, column: 1, color: 'RED' },
      { row: 2, column: 1, color: 'YELLOW' },
      { row: 3, column: 1, color: 'RED', isDropped: true },
    ]);
  });

  test('given column is full ignores move', () => {
    const initialState = new GameStateBuilder()
      .withBoardCounters([
        { row: 1, column: 1, color: 'RED' },
        { row: 2, column: 1, color: 'YELLOW' },
        { row: 3, column: 1, color: 'RED' },
        { row: 4, column: 1, color: 'YELLOW' },
        { row: 5, column: 1, color: 'RED' },
        { row: 6, column: 1, color: 'YELLOW', isDropped: true },
      ])
      .withCurrentPlayer('RED')
      .build();
    const game = new Game(undefined, undefined, initialState);
    game.play('RED', 1);
    const gameState = game.getState();
    expect(gameState.boardCounters).toIncludeSameMembers([
      { row: 1, column: 1, color: 'RED' },
      { row: 2, column: 1, color: 'YELLOW' },
      { row: 3, column: 1, color: 'RED' },
      { row: 4, column: 1, color: 'YELLOW' },
      { row: 5, column: 1, color: 'RED' },
      { row: 6, column: 1, color: 'YELLOW' },
    ]);
  });

  test('given color is not current player ignores move', () => {
    const initialState = new GameStateBuilder()
      .withBoardCounters([{ row: 1, column: 1, color: 'RED', isDropped: true }])
      .withCurrentPlayer('YELLOW')
      .build();
    const game = new Game(undefined, undefined, initialState);
    game.play('RED', 2);
    const gameState = game.getState();
    expect(gameState.boardCounters).toIncludeSameMembers([{ row: 1, column: 1, color: 'RED' }]);
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

  test('given board is full sets current player to none', () => {
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
      ])
      .withCurrentPlayer('YELLOW')
      .build();
    const game = new Game(undefined, undefined, initialState);
    game.play('YELLOW', 7);
    const gameState = game.getState();
    expect(gameState.players.RED.isCurrentPlayer).toBe(false);
    expect(gameState.players.YELLOW.isCurrentPlayer).toBe(false);
  });

  describe('given victory', () => {
    test('detects horizontal pattern', () => {
      const initialState = new GameStateBuilder()
        .withBoardCounters([
          { row: 1, column: 1, color: 'RED' },
          { row: 2, column: 1, color: 'YELLOW' },
          { row: 1, column: 2, color: 'RED' },
          { row: 2, column: 2, color: 'YELLOW' },
          { row: 1, column: 3, color: 'RED' },
          { row: 2, column: 3, color: 'YELLOW' },
        ])
        .withCurrentPlayer('RED')
        .build();
      const game = new Game(undefined, undefined, initialState);
      game.play('RED', 4);
      const gameState = game.getState();
      expect(gameState.boardCounters).toIncludeSameMembers([
        { row: 1, column: 1, color: 'RED', isWinPart: true },
        { row: 2, column: 1, color: 'YELLOW' },
        { row: 1, column: 2, color: 'RED', isWinPart: true },
        { row: 2, column: 2, color: 'YELLOW' },
        { row: 1, column: 3, color: 'RED', isWinPart: true },
        { row: 2, column: 3, color: 'YELLOW' },
        { row: 1, column: 4, color: 'RED', isWinPart: true, isDropped: true },
      ]);
    });

    test('detects vertical pattern', () => {
      const initialState = new GameStateBuilder()
        .withBoardCounters([
          { row: 1, column: 1, color: 'RED' },
          { row: 1, column: 2, color: 'YELLOW' },
          { row: 2, column: 1, color: 'RED' },
          { row: 2, column: 2, color: 'YELLOW' },
          { row: 3, column: 1, color: 'RED' },
          { row: 3, column: 2, color: 'YELLOW' },
        ])
        .withCurrentPlayer('RED')
        .build();
      const game = new Game(undefined, undefined, initialState);
      game.play('RED', 1);
      const gameState = game.getState();
      expect(gameState.boardCounters).toIncludeSameMembers([
        { row: 1, column: 1, color: 'RED', isWinPart: true },
        { row: 1, column: 2, color: 'YELLOW' },
        { row: 2, column: 1, color: 'RED', isWinPart: true },
        { row: 2, column: 2, color: 'YELLOW' },
        { row: 3, column: 1, color: 'RED', isWinPart: true },
        { row: 3, column: 2, color: 'YELLOW' },
        { row: 4, column: 1, color: 'RED', isWinPart: true, isDropped: true },
      ]);
    });

    test('detects ascending diagonal pattern', () => {
      const initialState = new GameStateBuilder()
        .withBoardCounters([
          { row: 1, column: 1, color: 'RED' },
          { row: 1, column: 2, color: 'YELLOW' },
          { row: 2, column: 2, color: 'RED' },
          { row: 1, column: 3, color: 'YELLOW' },
          { row: 1, column: 4, color: 'RED' },
          { row: 2, column: 3, color: 'YELLOW' },
          { row: 3, column: 3, color: 'RED' },
          { row: 2, column: 4, color: 'YELLOW' },
          { row: 1, column: 5, color: 'RED' },
          { row: 3, column: 4, color: 'YELLOW' },
        ])
        .withCurrentPlayer('RED')
        .build();
      const game = new Game(undefined, undefined, initialState);
      game.play('RED', 4);
      const gameState = game.getState();
      expect(gameState.boardCounters).toIncludeSameMembers([
        { row: 1, column: 1, color: 'RED', isWinPart: true },
        { row: 1, column: 2, color: 'YELLOW' },
        { row: 2, column: 2, color: 'RED', isWinPart: true },
        { row: 1, column: 3, color: 'YELLOW' },
        { row: 1, column: 4, color: 'RED' },
        { row: 2, column: 3, color: 'YELLOW' },
        { row: 3, column: 3, color: 'RED', isWinPart: true },
        { row: 2, column: 4, color: 'YELLOW' },
        { row: 1, column: 5, color: 'RED' },
        { row: 3, column: 4, color: 'YELLOW' },
        { row: 4, column: 4, color: 'RED', isWinPart: true, isDropped: true },
      ]);
    });

    test('detects descending diagonal pattern', () => {
      const initialState = new GameStateBuilder()
        .withBoardCounters([
          { row: 1, column: 4, color: 'RED' },
          { row: 1, column: 3, color: 'YELLOW' },
          { row: 2, column: 3, color: 'RED' },
          { row: 1, column: 5, color: 'YELLOW' },
          { row: 1, column: 2, color: 'RED' },
          { row: 2, column: 2, color: 'YELLOW' },
          { row: 3, column: 2, color: 'RED' },
          { row: 1, column: 1, color: 'YELLOW' },
          { row: 2, column: 1, color: 'RED' },
          { row: 3, column: 1, color: 'YELLOW' },
        ])
        .withCurrentPlayer('RED')
        .build();
      const game = new Game(undefined, undefined, initialState);
      game.play('RED', 1);
      const gameState = game.getState();
      expect(gameState.boardCounters).toIncludeSameMembers([
        { row: 1, column: 4, color: 'RED', isWinPart: true },
        { row: 1, column: 3, color: 'YELLOW' },
        { row: 2, column: 3, color: 'RED', isWinPart: true },
        { row: 1, column: 5, color: 'YELLOW' },
        { row: 1, column: 2, color: 'RED' },
        { row: 2, column: 2, color: 'YELLOW' },
        { row: 3, column: 2, color: 'RED', isWinPart: true },
        { row: 1, column: 1, color: 'YELLOW' },
        { row: 2, column: 1, color: 'RED' },
        { row: 3, column: 1, color: 'YELLOW' },
        { row: 4, column: 1, color: 'RED', isWinPart: true, isDropped: true },
      ]);
    });

    test('sets winner', () => {
      const initialState = new GameStateBuilder()
        .withBoardCounters([
          { row: 1, column: 1, color: 'RED' },
          { row: 2, column: 1, color: 'YELLOW' },
          { row: 1, column: 2, color: 'RED' },
          { row: 2, column: 2, color: 'YELLOW' },
          { row: 1, column: 3, color: 'RED' },
          { row: 2, column: 3, color: 'YELLOW' },
        ])
        .withCurrentPlayer('RED')
        .withWinner(null)
        .build();
      const game = new Game(undefined, undefined, initialState);
      game.play('RED', 4);
      const gameState = game.getState();
      expect(gameState.players.RED.isWinner).toBe(true);
      expect(gameState.players.YELLOW.isWinner).toBe(false);
    });

    test('updates winner score', () => {
      const initialState = new GameStateBuilder()
        .withBoardCounters([
          { row: 1, column: 1, color: 'RED' },
          { row: 2, column: 1, color: 'YELLOW' },
          { row: 1, column: 2, color: 'RED' },
          { row: 2, column: 2, color: 'YELLOW' },
          { row: 1, column: 3, color: 'RED' },
          { row: 2, column: 3, color: 'YELLOW' },
        ])
        .withCurrentPlayer('RED')
        .withRedPlayerScore(1)
        .withYellowPlayerScore(1)
        .build();
      const game = new Game(undefined, undefined, initialState);
      game.play('RED', 4);
      const gameState = game.getState();
      expect(gameState.players.RED.score).toBe(2);
      expect(gameState.players.YELLOW.score).toBe(1);
    });

    test('sets current player to none', () => {
      const initialState = new GameStateBuilder()
        .withBoardCounters([
          { row: 1, column: 1, color: 'RED' },
          { row: 2, column: 1, color: 'YELLOW' },
          { row: 1, column: 2, color: 'RED' },
          { row: 2, column: 2, color: 'YELLOW' },
          { row: 1, column: 3, color: 'RED' },
          { row: 2, column: 3, color: 'YELLOW' },
        ])
        .withCurrentPlayer('RED')
        .build();
      const game = new Game(undefined, undefined, initialState);
      game.play('RED', 4);
      const gameState = game.getState();
      expect(gameState.players.RED.isCurrentPlayer).toBe(false);
      expect(gameState.players.YELLOW.isCurrentPlayer).toBe(false);
    });
  });
});
