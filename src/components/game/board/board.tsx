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
  return (
    <div className={styles.grid}>
      {grid.map((cell) => {
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
          <div className={cssClasses.join(' ')} data-content={cell?.color} style={inlineStyle} />
        );
      })}
    </div>
  );
};
