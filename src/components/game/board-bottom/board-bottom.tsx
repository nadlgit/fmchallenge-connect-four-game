import { useEffect, useState } from 'react';
import { GRID_COLUMNS, GRID_ROWS, type PlayerColor } from '@/core';
import styles from './board-bottom.module.css';

type BoardBottomProps = {
  playMode: 'vsPlayer' | 'vsCPU';
  playerColor: PlayerColor;
  isPaused: boolean;
  winnerColor?: PlayerColor | 'none';
  onTimeout: () => void;
  onPlayAgain: () => void;
};

export const BoardBottom = ({
  playMode,
  playerColor,
  isPaused,
  winnerColor,
  onTimeout,
  onPlayAgain,
}: BoardBottomProps) => {
  const label = (() => {
    if (playMode === 'vsPlayer' && playerColor === 'R') {
      return "Player 1's turn";
    }
    if (playMode === 'vsPlayer' && playerColor === 'Y') {
      return "Player 2's turn";
    }
    if (playMode === 'vsCPU' && playerColor === 'R') {
      return 'Your turn';
    }
    if (playMode === 'vsCPU' && playerColor === 'Y') {
      return "CPU's turn";
    }
    return '';
  })();
  const value = 30;
  const { player, wins } = (() => {
    if (playMode === 'vsPlayer' && winnerColor === 'R') {
      return { player: 'Player 1', wins: 'wins' };
    }
    if (playMode === 'vsPlayer' && winnerColor === 'Y') {
      return { player: 'Player 2', wins: 'wins' };
    }
    if (playMode === 'vsCPU' && winnerColor === 'R') {
      return { player: 'You', wins: 'win' };
    }
    if (playMode === 'vsCPU' && winnerColor === 'Y') {
      return { player: 'CPU', wins: 'wins' };
    }
    return { player: '', wins: 'tie' };
  })();

  return (
    <div
      className={`${styles.container} ${
        winnerColor === 'R' ? styles.bottomred : winnerColor === 'Y' ? styles.bottomyellow : ''
      }`}
    >
      <div className={styles.timer} data-color={playerColor}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{`${value}s`}</span>
      </div>
      <div className={`${styles.winner} ${winnerColor ? styles.endgame : ''}`}>
        <span className={styles.player}>{player}</span>
        <span className={styles.wins}>{wins}</span>
        <button className={styles.button} onClick={onPlayAgain}>
          Play again
        </button>
      </div>
    </div>
  );
};
