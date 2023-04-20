import { useEffect, useState } from 'react';
import styles from './board-main.module.css';

const BOARD_COLUMNS = 7;
const BOARD_ROWS = 6;

const counters: {
  column: number;
  row: number;
  color: 'R' | 'Y';
  isDropped?: boolean;
  isWinPart?: boolean;
}[] = [
  { row: 1, column: 1, color: 'R', isWinPart: true },
  { row: 1, column: 2, color: 'R', isWinPart: true },
  { row: 1, column: 3, color: 'R', isWinPart: true },
  { row: 1, column: 4, color: 'R', isDropped: true, isWinPart: true },
  { row: 2, column: 1, color: 'Y' },
  { row: 2, column: 2, color: 'Y' },
  { row: 2, column: 3, color: 'Y' },
];
const onSelectColumn = (column: number) => console.log(`play on column ${column}`);

export const BoardMain = () => {
  const [grid, setGrid] = useState(
    new Array(BOARD_ROWS * BOARD_COLUMNS).fill(undefined) as (
      | { color: 'R' | 'Y'; dropOffset?: number; isWinPart?: boolean }
      | undefined
    )[]
  );
  const [markerColumn, setMarkerColumn] = useState(6);

  useEffect(() => {
    const isSameCell = (column: number, row: number, gridIdx: number) =>
      column === (gridIdx % BOARD_COLUMNS) + 1 &&
      row === Math.ceil(BOARD_ROWS - gridIdx / BOARD_COLUMNS);
    setGrid((g) =>
      g.map((cell, idx) => {
        let updatedCell: typeof cell = cell === undefined ? undefined : { color: cell.color };
        const counterCell = counters.find(({ column, row }) => isSameCell(column, row, idx));
        if (counterCell) {
          updatedCell = {
            color: counterCell.color,
            dropOffset: counterCell.isDropped ? BOARD_ROWS - counterCell.row + 1 : undefined,
            isWinPart: counterCell.isWinPart,
          };
        }
        return updatedCell;
      })
    );
  }, [counters]);

  const gridCells = grid.map((cell, idx) => {
    const cssClasses = [styles.cell];
    let inlineStyle = {};
    if (cell?.dropOffset !== undefined) {
      cssClasses.push(styles.celldropping);
      inlineStyle = {
        '--drop-offset': cell.dropOffset,
        '--drop-duration': `${0.1 * cell.dropOffset}s`,
      };
    }
    if (cell?.isWinPart) {
      cssClasses.push(styles.cellwin);
    }
    return (
      <div
        key={`cell${idx}`}
        className={cssClasses.join(' ')}
        data-content={cell?.color}
        style={inlineStyle}
      />
    );
  });

  const gridColumns = true && (
    <div className={styles.columns}>
      {Array.from(new Array(BOARD_COLUMNS), (val, idx) => {
        const column = idx + 1;
        return (
          <div
            key={`column${column}`}
            onClick={() => onSelectColumn(column)}
            onMouseEnter={() => setMarkerColumn(column)}
          />
        );
      })}
    </div>
  );

  const gridMarker = (
    <div
      className={styles.marker}
      data-color="Y"
      style={
        {
          '--marker-column': markerColumn,
        } as {}
      }
    />
  );

  return (
    <div className={styles.grid}>
      {gridCells}
      {gridColumns}
      {gridMarker}
    </div>
  );
};
