import styles from './board.module.css';

type BoardProps = {};

export const Board = ({}: BoardProps) => {
  //prettier-ignore
  const grid = [
    'R', 'Y', '', '', '', '', 'Y',
    'R', 'Y', '', '', '', '', 'R',
    'R', 'Y', '', '', '', '', 'R',
    'R', 'Y', '', '', '', '', 'Y',
    'R', 'Y', '', '', '', '', 'R',
    'R', 'Y', '', '', '', '', 'Y'
  ];
  return (
    <div className={styles.grid}>
      {grid.map((cell) => (
        <div className={styles.cell} data-content={cell} />
      ))}
    </div>
  );
};
