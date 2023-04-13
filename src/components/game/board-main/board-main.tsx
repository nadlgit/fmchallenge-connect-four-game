import { useEffect, useState } from 'react';
import { GRID_COLUMNS, GRID_ROWS, type PlayerColor } from '@/core';
import styles from './board-main.module.css';

type BoardMainProps = {
  counterDropped?: {
    column: number;
    row: number;
    color: PlayerColor;
  };
  playerColor: PlayerColor;
  finalCounters?: {
    column: number;
    row: number;
    color: PlayerColor;
    isWinPart?: boolean;
  }[];
  onSelectColumn: (column: number) => void;
};

export const BoardMain = ({
  counterDropped,
  playerColor,
  finalCounters,
  onSelectColumn,
}: BoardMainProps) => {
  const [grid, setGrid] = useState(
    new Array(GRID_ROWS * GRID_COLUMNS).fill(undefined) as (
      | { color: PlayerColor; dropOffset?: number; isWinPart?: boolean }
      | undefined
    )[]
  );
  const [markerColumn, setMarkerColumn] = useState(6);

  useEffect(() => {
    const isSameCell = (column: number, row: number, gridIdx: number) =>
      column === (gridIdx % GRID_COLUMNS) + 1 &&
      row === Math.ceil(GRID_ROWS - gridIdx / GRID_COLUMNS);
    setGrid((g) =>
      g.map((cell, idx) => {
        let updatedCell: typeof cell = cell === undefined ? undefined : { color: cell.color };
        if (counterDropped && isSameCell(counterDropped.column, counterDropped.row, idx)) {
          updatedCell = {
            color: counterDropped.color,
            dropOffset: GRID_ROWS - counterDropped.row + 1,
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
      {Array.from(new Array(GRID_COLUMNS), (val, idx) => {
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
      data-color={finalCounters ? undefined : playerColor}
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
