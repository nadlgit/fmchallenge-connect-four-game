import { useGame } from '@/store';
import styles from './board-bottom.module.css';

type BoardBottomProps = { timerValue: number };

export const BoardBottom = ({ timerValue }: BoardBottomProps) => {
  const { currentPlayer, winner, startNewRound } = useGame();

  const timerLabel = `${
    currentPlayer.name.toLowerCase() === 'you' ? 'Your' : currentPlayer.name + "'s"
  } turn`;
  const timerElement = (
    <div className={styles.timer} data-color={currentPlayer.color}>
      <span className={styles.timerlabel}>{timerLabel}</span>
      <span className={styles.timervalue}>{`${timerValue}s`}</span>
    </div>
  );

  const winnerResult = winner.color
    ? 'win' + (winner.name.toLowerCase() === 'you' ? '' : 's')
    : 'tie';
  const winnerElement = (
    <div className={styles.winner}>
      <span className={styles.winnerplayer}>{winner.name}</span>
      <span className={styles.winnerresult}>{winnerResult}</span>
      <button className={styles.winnerbutton} onClick={startNewRound}>
        Play again
      </button>
    </div>
  );

  return (
    <div
      className={`${styles.container}  ${
        winner.color === 'RED'
          ? styles.bottomred
          : winner.color === 'YELLOW'
          ? styles.bottomyellow
          : ''
      } ${winner.color || !currentPlayer.color ? styles.winnervisible : ''}`}
    >
      {timerElement}
      {winnerElement}
    </div>
  );
};
