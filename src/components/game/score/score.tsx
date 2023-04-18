import styles from './score.module.css';
import imgPlayer1 from './player-one.svg';
import imgPlayer2 from './player-two.svg';
// import imgYou from './you.svg';
// import imgCPU from './cpu.svg';

type ScoreProps = {
  color: 'R' | 'Y';
  value: number;
};

const scoreConfig: Record<
  ScoreProps['color'],
  { label: string; icon: string; position: 'left' | 'right' }
> = {
  R: { label: 'Player 1', icon: imgPlayer1, position: 'left' },
  Y: { label: 'Player 2', icon: imgPlayer2, position: 'right' },
};

export const Score = ({ color, value }: ScoreProps) => {
  const { label, icon, position } = scoreConfig[color];
  return (
    <div className={styles.container} data-position={position}>
      <img src={icon} alt="" className={styles.icon} />
      <span className={styles.label}>{label}</span>
      <span className={styles.score}>{value}</span>
    </div>
  );
};
