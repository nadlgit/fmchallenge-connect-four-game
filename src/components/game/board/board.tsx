import { useState } from 'react';
import styles from './board.module.css';

type BoardProps = {};

export const Board = ({}: BoardProps) => {
  //prettier-ignore
  const grid = [
    undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    { color: 'R', dropOffset: 5 }, undefined, undefined, undefined, undefined, undefined, undefined,
    { color: 'Y' }, undefined, undefined, undefined, undefined, undefined, undefined
  ];
  const currentPlayerColor = 'Y';

  const [markerColumn, setMarkerColumn] = useState(6);

  return (
    <div className={styles.grid}>
      {grid.map((cell, idx) => {
        const cssClasses = [styles.cell];
        let inlineStyle = {};
        if (cell?.dropOffset !== undefined) {
          cssClasses.push(styles.dropping);
          inlineStyle = {
            '--drop-offset': cell.dropOffset,
            '--drop-duration': `${0.2 * cell.dropOffset}s`,
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
        {Array.from(new Array(7), (val, idx) => (
          <div
            key={`column${idx}`}
            onClick={() => console.log(`Play on column ${idx + 1}`)}
            onMouseEnter={() => setMarkerColumn(idx + 1)}
          />
        ))}
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
