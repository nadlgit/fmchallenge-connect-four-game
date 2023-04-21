import { useEffect, useState } from 'react';
import { useGame } from '@/store';
import { BoardBottom } from './board-bottom';
import { BoardMain } from './board-main';
import { Header } from './header';
import { IngameMenu } from './menu';
import { Score } from './score';
import styles from './game.module.css';

type GameProps = {
  goHome: () => void;
  playMode: 'vsPlayer' | 'vsCPU';
};

export const Game = ({ goHome, playMode }: GameProps) => {
  const { currentPlayer, createGame, resetGame, handlePlayerTimeOut } = useGame();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const TIMER_START_VALUE = 30;
  const [timerValue, setTimerValue] = useState(TIMER_START_VALUE);

  const restart = () => {
    resetGame();
    setTimerValue(TIMER_START_VALUE);
  };
  const openIngameMenu = () => setIsMenuOpen(true);
  const closeIngameMenu = (choice: 'continue' | 'restart' | 'quit') => {
    setIsMenuOpen(false);
    if (choice === 'quit') {
      goHome();
    }
    if (choice === 'restart') {
      restart();
    }
  };

  useEffect(() => {
    createGame(playMode);
  }, [playMode]);

  useEffect(() => {
    if (!isMenuOpen) {
      const intervalId = setInterval(() => {
        setTimerValue((v) => (v > 0 ? v - 1 : 0));
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isMenuOpen]);
  useEffect(() => {
    setTimerValue(TIMER_START_VALUE);
  }, [currentPlayer.color]);
  useEffect(() => {
    if (timerValue === 0 && currentPlayer.color) {
      handlePlayerTimeOut(currentPlayer.color);
    }
  }, [timerValue]);

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header showMenu={openIngameMenu} restart={restart} />
        {isMenuOpen && <IngameMenu onClose={closeIngameMenu} />}
      </div>
      <div className={styles.scoreleft}>
        <Score player="RED" />
      </div>
      <div className={styles.scoreright}>
        <Score player="YELLOW" />
      </div>
      <div className={styles.boardmain}>
        <BoardMain />
      </div>
      <div className={styles.boardbottom}>
        <BoardBottom timerValue={timerValue} />
      </div>
    </div>
  );
};
