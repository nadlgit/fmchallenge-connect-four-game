import { PlayerColor } from '@/core';
import styles from './timer.module.css';

type TimerProps = {
  playMode: 'vsPlayer' | 'vsCPU';
  playerColor: PlayerColor;
  value: number;
};

const labelConfig: Record<TimerProps['playMode'], Record<TimerProps['playerColor'], string>> = {
  vsPlayer: {
    R: "Player 1's turn",
    Y: "Player 2's turn",
  },
  vsCPU: {
    R: 'Your turn',
    Y: "CPU's turn",
  },
};

export const Timer = ({ playMode, playerColor, value }: TimerProps) => {
  return (
    <div className={styles.container} data-color={playerColor}>
      <span className={styles.label}>{labelConfig[playMode][playerColor]}</span>
      <span className={styles.value}>{`${value}s`}</span>
    </div>
  );
};
