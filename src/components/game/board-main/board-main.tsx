import { useEffect, useState } from 'react';
import { BOARD_COLUMNS, BOARD_ROWS, type Player } from '@/core';
import styles from './board-main.module.css';

type BoardMainProps = {
  counterDropped?: {
    column: number;
    row: number;
    color: Player;
  };
  player: Player;
  finalCounters?: {
    column: number;
    row: number;
    color: Player;
    isWinPart?: boolean;
  }[];
  onSelectColumn: (column: number) => void;
};

export const BoardMain = ({
  counterDropped,
  player,
  finalCounters,
  onSelectColumn,
}: BoardMainProps) => {
  const [grid, setGrid] = useState(
    new Array(BOARD_ROWS * BOARD_COLUMNS).fill(undefined) as (
      | { color: Player; dropOffset?: number; isWinPart?: boolean }
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
        if (counterDropped && isSameCell(counterDropped.column, counterDropped.row, idx)) {
          updatedCell = {
            color: counterDropped.color,
            dropOffset: BOARD_ROWS - counterDropped.row + 1,
          };
        }
        const finalCell = finalCounters?.find(({ column, row }) => isSameCell(column, row, idx));
        if (finalCell) {
          updatedCell = {
            color: finalCell.color,
            dropOffset: updatedCell?.dropOffset,
            isWinPart: finalCell.isWinPart,
          };
        }
        return updatedCell;
      })
    );
  }, [counterDropped, finalCounters]);

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

  const gridColumns = !finalCounters && (
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
      data-color={finalCounters ? undefined : player}
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
