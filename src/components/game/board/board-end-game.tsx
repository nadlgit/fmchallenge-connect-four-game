import { GRID_COLUMNS, GRID_ROWS, type PlayerColor } from '@/core';
import styles from './board.module.css';

type BoardEndGameProps = {
  counters: {
    column: number;
    row: number;
    color: PlayerColor;
    dropOffset?: number;
    isWin?: boolean;
  }[];
};

export const BoardEndGame = ({ counters }: BoardEndGameProps) => {
  const grid = new Array(GRID_ROWS * GRID_COLUMNS).fill(undefined) as (
    | { color: PlayerColor; dropOffset?: number; isWin?: boolean }
    | undefined
  )[];
  counters.forEach(({ column, row, color, dropOffset, isWin }) => {
    grid[(GRID_ROWS - row) * GRID_COLUMNS + column - 1] = { color, dropOffset, isWin };
  });

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
        if (cell?.isWin) {
          cssClasses.push(styles.win);
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

      <div
        className={styles.marker}
        style={
          {
            '--marker-column': 1,
          } as {}
        }
      />
    </div>
  );
};
