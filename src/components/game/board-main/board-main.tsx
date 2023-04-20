import { useState } from 'react';
import { useGame } from '@/store';
import styles from './board-main.module.css';

export const BoardMain = () => {
  const { BOARD_COLUMNS, BOARD_ROWS, boardCounters, currentPlayer, play } = useGame();
  const grid = Array.from(Array(BOARD_ROWS * BOARD_COLUMNS), (cell, idx) => {
    const cellCounter = boardCounters.find(
      ({ column, row }) =>
        column === (idx % BOARD_COLUMNS) + 1 && row === Math.ceil(BOARD_ROWS - idx / BOARD_COLUMNS)
    );
    return cellCounter
      ? {
          color: cellCounter.color,
          dropOffset: cellCounter.isDropped ? BOARD_ROWS - cellCounter.row + 1 : undefined,
          isWinPart: cellCounter.isWinPart,
        }
      : undefined;
  });
  const DEFAULT_MARKER_COLUMN = 6;
  const [markerColumn, setMarkerColumn] = useState(DEFAULT_MARKER_COLUMN);

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

  const gridColumns = currentPlayer.color && (
    <div className={styles.columns}>
      {Array.from(new Array(BOARD_COLUMNS), (val, idx) => {
        const column = idx + 1;
        return (
          <div
            key={`column${column}`}
            onClick={() => {
              if (currentPlayer.color) {
                play(currentPlayer.color, column);
              }
            }}
            onMouseEnter={() => setMarkerColumn(column)}
          />
        );
      })}
    </div>
  );

  const gridMarker = currentPlayer.color && (
    <div
      className={styles.marker}
      data-color={currentPlayer.color}
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
