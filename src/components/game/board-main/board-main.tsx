import { useEffect, useState } from 'react';
import { useGame } from '@/store';
import styles from './board-main.module.css';

export const BoardMain = () => {
  const { playMode, BOARD_COLUMNS, BOARD_ROWS, boardCounters, currentPlayer, play } = useGame();

  const onSelectColumn = (column: number) => {
    if (currentPlayer.color) {
      play(currentPlayer.color, column);
    }
  };

  const [grid, setGrid] = useState(
    new Array(BOARD_ROWS * BOARD_COLUMNS).fill(undefined) as (
      | { color: 'R' | 'Y'; dropOffset?: number; isWinPart?: boolean }
      | undefined
    )[]
  );
  const [markerColumn, setMarkerColumn] = useState(6);

  useEffect(() => {
    const counters: {
      column: number;
      row: number;
      color: 'R' | 'Y';
      isDropped?: boolean;
      isWinPart?: boolean;
    }[] = boardCounters.map((item) => ({
      ...item,
      color: item.color.substring(0, 1) as 'R' | 'Y',
    }));
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
  }, [boardCounters]);

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
      data-color={(currentPlayer.color ?? '').substring(0, 1)}
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
