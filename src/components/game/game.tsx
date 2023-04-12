import { type ComponentPropsWithoutRef, useState } from 'react';
import { Board } from './board';
import { Header } from './header';
import { IngameMenu } from './menu';
import { Score } from './score';
import { Timer } from './timer';
import styles from './game.module.css';

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

  const handleRestart = () => console.log('click on restart');

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
    <div className={styles.layout}>
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
        <Board
          counterDropped={counterDropped}
          currentPlayerColor={currentPlayerColor}
          selectColumn={(column: number) => {
            setCounterDropped({ column, row: 1, color: currentPlayerColor });
            setCurrentPlayerColor((c) => (c === 'R' ? 'Y' : 'R'));
          }}
        />
      </div>
      <div className={styles.screenbottom}>
        <Timer playMode={playMode} playerColor="R" value={30} />
      </div>
    </div>
  );
};
