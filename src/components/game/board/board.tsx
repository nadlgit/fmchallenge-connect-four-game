import { useEffect, useState } from 'react';
import { GRID_COLUMNS, GRID_ROWS, type PlayerColor } from '@/core';
import styles from './board.module.css';

type BoardProps = {
  counterDropped?: { column: number; row: number; color: PlayerColor };
  currentPlayerColor: PlayerColor;
  selectColumn: (column: number) => void;
};

export const Board = ({ counterDropped, currentPlayerColor, selectColumn }: BoardProps) => {
  const [grid, setGrid] = useState(
    new Array(GRID_ROWS * GRID_COLUMNS).fill(undefined) as (
      | { color: PlayerColor; dropOffset?: number }
      | undefined
    )[]
  );
  const [markerColumn, setMarkerColumn] = useState(6);

  useEffect(() => {
    setGrid((g) =>
      g.map((cell, idx) => {
        if (
          counterDropped &&
          counterDropped.column === (idx % GRID_COLUMNS) + 1 &&
          counterDropped.row === Math.ceil(GRID_ROWS - idx / GRID_COLUMNS)
        ) {
          return { color: counterDropped.color, dropOffset: GRID_ROWS - counterDropped.row + 1 };
        }
        if (cell && cell?.dropOffset !== undefined) {
          return { color: cell.color };
        }
        return cell;
      })
    );
  }, [counterDropped]);

  return (
    <div className={styles.grid}>
      {grid.map((cell, idx) => {
        const cssClasses = [styles.cell];
        let inlineStyle = {};
        if (cell?.dropOffset !== undefined) {
          cssClasses.push(styles.dropping);
          inlineStyle = {
            '--drop-offset': cell.dropOffset,
            '--drop-duration': `${0.1 * cell.dropOffset}s`,
          };
        }
        return (
          <div
            key={`cell${idx}`}
            className={cssClasses.join(' ')}
            data-content={cell?.color}
            style={inlineStyle}
          />
        );
      })}

      <div className={styles.columns}>
        {Array.from(new Array(GRID_COLUMNS), (val, idx) => {
          const column = idx + 1;
          return (
            <div
              key={`column${column}`}
              onClick={() => selectColumn(column)}
              onMouseEnter={() => setMarkerColumn(column)}
            />
          );
        })}
      </div>

      <div
        className={styles.marker}
        data-color={currentPlayerColor}
        style={
          {
            '--marker-column': markerColumn,
          } as {}
        }
      />
    </div>
  );
};
