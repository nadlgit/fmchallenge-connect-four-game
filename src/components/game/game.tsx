import { type ComponentPropsWithoutRef, useState } from 'react';
import { Board, BoardEndGame } from './board';
import { Header } from './header';
import { IngameMenu } from './menu';
import { Score } from './score';
import { Timer } from './timer';
import styles from './game.module.css';
import { Winner } from './winner';

type GameProps = {
  goHome: () => void;
  playMode: 'vsPlayer' | 'vsCPU';
};

export const Game = ({ goHome, playMode }: GameProps) => {
  const [counterDropped, setCounterDropped] =
    useState<ComponentPropsWithoutRef<typeof Board>['counterDropped']>();
  const [currentPlayerColor, setCurrentPlayerColor] =
    useState<ComponentPropsWithoutRef<typeof Board>['currentPlayerColor']>('R');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const handleRestart = () => console.log('click on restart');
  const [isEndGame, setIsEndGame] = useState(false);
  const handleRestart = () => setIsEndGame(true);

  const handleCloseIngameMenu: ComponentPropsWithoutRef<typeof IngameMenu>['onClose'] = (
    choice
  ) => {
    setIsMenuOpen(false);
    if (choice === 'quit') {
      goHome();
    }
    if (choice === 'restart') {
      handleRestart();
    }
  };

  return (
    <div className={`${styles.layout} ${isEndGame ? styles.bottomred : ''}`}>
      <div className={styles.header}>
        <Header showMenu={() => setIsMenuOpen(true)} restart={handleRestart} />
        {isMenuOpen && <IngameMenu onClose={handleCloseIngameMenu} />}
      </div>
      <div className={styles.scoreleft}>
        <Score playMode={playMode} playerColor="R" value={12} />
      </div>
      <div className={styles.scoreright}>
        <Score playMode={playMode} playerColor="Y" value={23} />
      </div>
      <div className={styles.board}>
        {isEndGame ? (
          <BoardEndGame
            counters={[
              { row: 1, column: 1, color: 'R', isWin: true },
              { row: 1, column: 2, color: 'R', isWin: true },
              { row: 1, column: 3, color: 'R', isWin: true },
              { row: 1, column: 4, color: 'R', isWin: true, dropOffset: 6 },
              { row: 2, column: 1, color: 'Y' },
              { row: 2, column: 2, color: 'Y' },
              { row: 2, column: 3, color: 'Y' },
            ]}
          />
        ) : (
          <Board
            counterDropped={counterDropped}
            currentPlayerColor={currentPlayerColor}
            selectColumn={(column: number) => {
              setCounterDropped({ column, row: 1, color: currentPlayerColor });
              setCurrentPlayerColor((c) => (c === 'R' ? 'Y' : 'R'));
            }}
          />
        )}
      </div>
      <div className={`${styles.screenbottom} ${isEndGame ? styles.endgame : ''}`}>
        <Timer playMode={playMode} playerColor="R" value={30} />
        <Winner winner="player1" playAgain={() => {}} />
      </div>
    </div>
  );
};
