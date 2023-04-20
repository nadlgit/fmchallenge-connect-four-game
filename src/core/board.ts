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

  isFull() {
    return this.#columns.reduce((acc, curr) => acc + curr.length, 0) >= BOARD_COLUMNS * BOARD_ROWS;
  }

  addCounter(color: PlayerColor, column: number) {
    if (column < 1 || column > BOARD_COLUMNS || this.#columns[column - 1].length >= BOARD_ROWS) {
      return null;
    }
    const columnRows = this.#columns[column - 1];
    columnRows.push(color);
    return columnRows.length;
  }

  checkVictoryForPosition(row: number, column: number) {
    const horizontalLine = [];
    const verticalLine = [];
    const ascendingDiagonalLine = [];
    const descendingDiagonalLine = [];
    const positionItem = { row, column, value: this.#columns[column - 1][row - 1] };
    for (let c = 1; c <= BOARD_COLUMNS; c++) {
      for (let r = 1; r <= BOARD_ROWS; r++) {
        const item =
          c === column && r === row
            ? positionItem
            : {
                row: r,
                column: c,
                value: r <= this.#columns[c - 1].length ? this.#columns[c - 1][r - 1] : null,
              };
        if (r === row) {
          horizontalLine.push(item);
        }
        if (c === column) {
          verticalLine.push(item);
        }
        if (r - c === row - column) {
          ascendingDiagonalLine.push(item);
        }
        if (r + c === row + column) {
          descendingDiagonalLine.push(item);
        }
      }
    }
    for (const line of [
      horizontalLine,
      verticalLine,
      ascendingDiagonalLine,
      descendingDiagonalLine,
    ]) {
      const NB_VICTORY_COUNTERS = 4;
      const sequence = line.reduce((acc, curr, idx) => {
        if (acc.length === NB_VICTORY_COUNTERS) {
          return acc;
        }
        if (
          curr.value === positionItem.value &&
          Math.abs(line.indexOf(positionItem) - idx) < NB_VICTORY_COUNTERS
        ) {
          acc.push({ row: curr.row, column: curr.column });
          return acc;
        }
        return [];
      }, [] as { row: number; column: number }[]);
      if (sequence.length === NB_VICTORY_COUNTERS) {
        return sequence;
      }
    }
    return [];
  }
}
