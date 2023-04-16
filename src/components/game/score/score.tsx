import { type Player } from '@/core';
import styles from './score.module.css';
import imgPlayer1 from './player-one.svg';
import imgPlayer2 from './player-two.svg';
import imgYou from './you.svg';
import imgCPU from './cpu.svg';

type ScoreProps = { playMode: 'vsPlayer' | 'vsCPU'; player: Player; value: number };

const scoreConfig: Record<
  ScoreProps['playMode'],
  Record<ScoreProps['player'], { label: string; icon: string; position: 'left' | 'right' }>
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

export const Score = ({ playMode, player, value }: ScoreProps) => {
  const { label, icon, position } = scoreConfig[playMode][player];
  return (
    <div className={styles.container} data-position={position}>
      <img src={icon} alt="" className={styles.icon} />
      <span className={styles.label}>{label}</span>
      <span className={styles.score}>{value}</span>
    </div>
  );
};
