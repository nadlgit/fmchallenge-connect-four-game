import { useEffect, useState } from 'react';
import { useGame } from '@/store';
import styles from './board-bottom.module.css';

export const BoardBottom = () => {
  const { currentPlayer, winner, startNewRound } = useGame();
  const [timerLabel, setTimerLabel] = useState('');

  const timerValue = 30;
  const verbLabel = `win${winner.name.toLowerCase() === 'you' ? '' : 's'}`;

  useEffect(() => {
    if (currentPlayer.name) {
      setTimerLabel(`${currentPlayer.name}'s turn`);
    }
  }, [currentPlayer.name]);

  return (
    <div
      className={`${styles.container} ${
        winner.color === 'RED'
          ? styles.bottomred
          : winner.color === 'YELLOW'
          ? styles.bottomyellow
          : ''
      }`}
    >
      <div className={styles.timer} data-color={(currentPlayer.color ?? '').substring(0, 1)}>
        <span className={styles.label}>{timerLabel}</span>
        <span className={styles.value}>{`${timerValue}s`}</span>
      </div>
      <div className={`${styles.winner} ${winner.color ? styles.endgame : ''}`}>
        <span className={styles.player}>{winner.name}</span>
        <span className={styles.wins}>{verbLabel}</span>
        <button className={styles.button} onClick={startNewRound}>
          Play again
        </button>
      </div>
    </div>
  );
};
