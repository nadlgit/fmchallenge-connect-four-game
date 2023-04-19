import { BOARD_COLUMNS, BOARD_ROWS, type GameState, type PlayerColor } from './game-state';

export class Board {
  #columns: PlayerColor[][];

  constructor(state?: GameState['boardCounters']) {
    this.#columns = Array.from(new Array(BOARD_COLUMNS), (c) => []);
    if (state) {
      for (let c = 0; c < BOARD_COLUMNS; c++) {
        const stateData = state
          .filter(({ column }) => column === c + 1)
          .sort((a, b) => a.row - b.row);
        stateData.forEach(({ color }) => {
          this.#columns[c].push(color);
        });
      }
    }
  }

  getCounters(): GameState['boardCounters'] {
    return this.#columns.flatMap((rows, colIdx) =>
      rows.map((color, rowIdx) => ({
        row: rowIdx + 1,
        column: colIdx + 1,
        color,
      }))
    );
  }

  addCounter(color: PlayerColor, column: number) {
    if (column < 1 || column > BOARD_COLUMNS || this.#columns[column - 1].length >= BOARD_ROWS) {
      return null;
    }
    const columnRows = this.#columns[column - 1];
    columnRows.push(color);
    return columnRows.length;
  }
}
