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
  const { createGame, resetGame } = useGame();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openIngameMenu = () => setIsMenuOpen(true);
  const closeIngameMenu = (choice: 'continue' | 'restart' | 'quit') => {
    setIsMenuOpen(false);
    if (choice === 'quit') {
      goHome();
    }
    if (choice === 'restart') {
      resetGame();
    }
  };

  useEffect(() => {
    createGame(playMode);
  }, [playMode]);

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header showMenu={openIngameMenu} restart={resetGame} />
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
        <BoardBottom />
      </div>
    </div>
  );
};
