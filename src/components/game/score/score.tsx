import { type PlayerColor } from '@/core';
import styles from './score.module.css';
import imgPlayer1 from './player-one.svg';
import imgPlayer2 from './player-two.svg';
import imgYou from './you.svg';
import imgCPU from './cpu.svg';

type ScoreProps = {
  player: PlayerColor;
};

const scoreConfig: Record<
  PlayerColor,
  { value: number; label: string; icon: string; position: 'left' | 'right' }
> = {
  RED: { value: 12, label: 'Player 1', icon: imgPlayer1, position: 'left' },
  YELLOW: { value: 23, label: 'Player 2', icon: imgPlayer2, position: 'right' },
};

export const Score = ({ player }: ScoreProps) => {
  const { value, label, icon, position } = scoreConfig[player];
  return (
    <div className={styles.container} data-position={position}>
      <img src={icon} alt="" className={styles.icon} />
      <span className={styles.label}>{label}</span>
      <span className={styles.score}>{value}</span>
    </div>
  );
};
