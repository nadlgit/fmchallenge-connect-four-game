import styles from './rules.module.css';
import imgCheck from './check.svg';

type RulesProps = {
  goHome: () => void;
};

export const Rules = ({ goHome }: RulesProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainheading}>Rules</h1>
      <h2 className={styles.subheading}>Objective</h2>
      <p>
        Be the first player to connect 4 of the same colored discs in a row (either vertically,
        horizontally, or diagonally).
      </p>
      <h2 className={styles.subheading}>How to play</h2>
      <ol className={styles.orderedlist}>
        <li>Red goes first in the first game.</li>
        <li>Players must alternate turns, and only one disc can be dropped in each turn.</li>
        <li>The game ends when there is a 4-in-a-row or a stalemate.</li>
        <li>The starter of the previous game goes second on the next game.</li>
      </ol>
      <button className={styles.button} onClick={goHome}>
        <img src={imgCheck} alt="OK" />
      </button>
    </div>
  );
};
