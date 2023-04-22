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
  const { playMode, playerScores } = useGame();
  const [score, setScore] = useState(playerScores[player].value);
  const [prevScore, setPrevScore] = useState(score);
  const [scoreTransition, setScoreTransition] = useState(false);
  const position = player === 'RED' ? 'left' : player === 'YELLOW' ? 'right' : '';
  const icon = (() => {
    if (player === 'RED' && playMode === 'vsPlayer') return imgPlayer1;
    if (player === 'RED' && playMode === 'vsCPU') return imgYou;
    if (player === 'YELLOW' && playMode === 'vsPlayer') return imgPlayer2;
    if (player === 'YELLOW' && playMode === 'vsCPU') return imgCPU;
    return '';
  })();

  useEffect(() => {
    setPrevScore(score);
    setScore(playerScores[player].value);
    setScoreTransition(!!playerScores[player].value);
    setTimeout(() => {
      setScoreTransition(false);
    }, 400);
  }, [playerScores[player].value]);

  return (
    <div className={styles.container} data-position={position}>
      <img src={icon} alt="" className={styles.icon} />
      <span className={styles.label}>{playerScores[player].name}</span>
      <span className={styles.score}>{scoreTransition ? prevScore : score}</span>
    </div>
  );
};
