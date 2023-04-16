import { type Player } from '@/core';
import styles from './board-bottom.module.css';

type BoardBottomProps = {
  playMode: 'vsPlayer' | 'vsCPU';
  player: Player;
  isPaused: boolean;
  winner?: Player | 'none';
  onTimeout: () => void;
  onPlayAgain: () => void;
};

export const BoardBottom = ({
  playMode,
  player,
  isPaused,
  winner,
  onTimeout,
  onPlayAgain,
}: BoardBottomProps) => {
  const label = (() => {
    if (playMode === 'vsPlayer' && player === 'R') {
      return "Player 1's turn";
    }
    if (playMode === 'vsPlayer' && player === 'Y') {
      return "Player 2's turn";
    }
    if (playMode === 'vsCPU' && player === 'R') {
      return 'Your turn';
    }
    if (playMode === 'vsCPU' && player === 'Y') {
      return "CPU's turn";
    }
    return '';
  })();
  const value = 30;
  const { winnerLabel, verbLabel } = (() => {
    if (playMode === 'vsPlayer' && winner === 'R') {
      return { winnerLabel: 'Player 1', verbLabel: 'wins' };
    }
    if (playMode === 'vsPlayer' && winner === 'Y') {
      return { winnerLabel: 'Player 2', verbLabel: 'wins' };
    }
    if (playMode === 'vsCPU' && winner === 'R') {
      return { winnerLabel: 'You', verbLabel: 'win' };
    }
    if (playMode === 'vsCPU' && winner === 'Y') {
      return { winnerLabel: 'CPU', verbLabel: 'wins' };
    }
    return { winnerLabel: '', verbLabel: 'tie' };
  })();

  return (
    <div
      className={`${styles.container} ${
        winner === 'R' ? styles.bottomred : winner === 'Y' ? styles.bottomyellow : ''
      }`}
    >
      <div className={styles.timer} data-color={player}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{`${value}s`}</span>
      </div>
      <div className={`${styles.winner} ${winner ? styles.endgame : ''}`}>
        <span className={styles.player}>{winnerLabel}</span>
        <span className={styles.wins}>{verbLabel}</span>
        <button className={styles.button} onClick={onPlayAgain}>
          Play again
        </button>
      </div>
    </div>
  );
};
