import styles from './board-bottom.module.css';

type BoardBottomProps = {};

export const BoardBottom = ({}: BoardBottomProps) => {
  const timerLabel = "Player 1's turn";
  const timerValue = 30;

  // <div
  //   className={`${styles.container} ${
  //     winner === 'R' ? styles.bottomred : winner === 'Y' ? styles.bottomyellow : ''
  //   }`}
  // ></div>
  return (
    <div className={styles.container}>
      <div className={styles.timer} data-color="R">
        <span className={styles.label}>{timerLabel}</span>
        <span className={styles.value}>{`${timerValue}s`}</span>
      </div>
      {/* <div className={`${styles.winner} ${winner ? styles.endgame : ''}`}>
        <span className={styles.player}>{winnerLabel}</span>
        <span className={styles.wins}>{verbLabel}</span>
        <button className={styles.button} onClick={onPlayAgain}>
          Play again
        </button>
      </div> */}
    </div>
  );
};
