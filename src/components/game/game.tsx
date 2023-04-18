import { useState } from 'react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const restartGame = () => console.log('restart');
  const openIngameMenu = () => setIsMenuOpen(true);
  const closeIngameMenu = (choice: 'continue' | 'restart' | 'quit') => {
    setIsMenuOpen(false);
    if (choice === 'quit') {
      goHome();
    }
    if (choice === 'restart') {
      restartGame();
    }
  };
  const playOnColumn = (column: number) => console.log(`play on column ${column}`);

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header showMenu={openIngameMenu} restart={restartGame} />
        {isMenuOpen && <IngameMenu onClose={closeIngameMenu} />}
      </div>
      <div className={styles.scoreleft}>
        <Score color="R" value={12} />
      </div>
      <div className={styles.scoreright}>
        <Score color="Y" value={23} />
      </div>
      <div className={styles.boardmain}>
        <BoardMain
          counters={[
            { row: 1, column: 1, color: 'R', isWinPart: true },
            { row: 1, column: 2, color: 'R', isWinPart: true },
            { row: 1, column: 3, color: 'R', isWinPart: true },
            { row: 1, column: 4, color: 'R', isDropped: true, isWinPart: true },
            { row: 2, column: 1, color: 'Y' },
            { row: 2, column: 2, color: 'Y' },
            { row: 2, column: 3, color: 'Y' },
          ]}
          onSelectColumn={playOnColumn}
        />
      </div>
      <div className={styles.boardbottom}>
        <BoardBottom />
      </div>
    </div>
  );
};
