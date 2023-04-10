import { type PlayerColor } from '@/core';
import styles from './score.module.css';
import imgPlayer1 from './player-one.svg';
import imgPlayer2 from './player-two.svg';
import imgYou from './you.svg';
import imgCPU from './cpu.svg';

type ScoreProps = { playMode: 'vsPlayer' | 'vsCPU'; playerColor: PlayerColor; value: number };

const scoreConfig: Record<
  ScoreProps['playMode'],
  Record<ScoreProps['playerColor'], { label: string; icon: string; position: 'left' | 'right' }>
> = {
  vsPlayer: {
    R: { label: 'Player 1', icon: imgPlayer1, position: 'left' },
    Y: { label: 'Player 2', icon: imgPlayer2, position: 'right' },
  },
  vsCPU: {
    R: { label: 'You', icon: imgYou, position: 'left' },
    Y: { label: 'CPU', icon: imgCPU, position: 'right' },
  },
};

export const Score = ({ playMode, playerColor, value }: ScoreProps) => {
  const { label, icon, position } = scoreConfig[playMode][playerColor];
  return (
    <div className={styles.container} data-position={position}>
      <img src={icon} alt="" className={styles.icon} />
      <span className={styles.label}>{label}</span>
      <span className={styles.score}>{value}</span>
    </div>
  );
};
