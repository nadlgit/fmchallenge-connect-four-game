import { useEffect, useState } from 'react';
import { type PlayerColor } from '@/core';
import { useGame } from '@/store';
import styles from './score.module.css';
import imgPlayer1 from './player-one.svg';
import imgPlayer2 from './player-two.svg';
import imgYou from './you.svg';
import imgCPU from './cpu.svg';

type ScoreProps = {
  player: PlayerColor;
};

export const Score = ({ player }: ScoreProps) => {
  const { playMode, playerNames, playerScores } = useGame();
  const [score, setScore] = useState(playerScores[player]);
  // const [prevScore, setPrevScore] = useState(playerScores[player]);
  const position = player === 'RED' ? 'left' : player === 'YELLOW' ? 'right' : '';
  const icon = (() => {
    if (player === 'RED' && playMode === 'vsPlayer') return imgPlayer1;
    if (player === 'RED' && playMode === 'vsCPU') return imgYou;
    if (player === 'YELLOW' && playMode === 'vsPlayer') return imgPlayer2;
    if (player === 'YELLOW' && playMode === 'vsCPU') return imgCPU;
    return '';
  })();

  useEffect(() => {
    // setPrevScore(score);
    setScore(playerScores[player]);
  }, [playerScores[player]]);

  return (
    <div className={styles.container} data-position={position}>
      <img src={icon} alt="" className={styles.icon} />
      <span className={styles.label}>{playerNames[player]}</span>
      <span className={styles.score}>{score}</span>
    </div>
  );
};
