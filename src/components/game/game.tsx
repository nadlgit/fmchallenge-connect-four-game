import { type ComponentPropsWithoutRef, useState } from 'react';
import { Logo } from '@/components/logo';
import { Board } from './board';
import { Score } from './score';
import { Timer } from './timer';

type GameProps = {
  goHome: () => void;
  playMode: 'vsPlayer' | 'vsCPU';
};

export const Game = ({ goHome, playMode }: GameProps) => {
  const [counterDropped, setCounterDropped] =
    useState<ComponentPropsWithoutRef<typeof Board>['counterDropped']>();
  const [currentPlayerColor, setCurrentPlayerColor] =
    useState<ComponentPropsWithoutRef<typeof Board>['currentPlayerColor']>('R');

  return (
    <div>
      <div>
        <div>Menu</div>
        <Logo />
        <div>Restart</div>
      </div>
      <div>
        <Score playMode={playMode} playerColor="R" value={12} />
        <Score playMode={playMode} playerColor="Y" value={23} />
        <Board
          counterDropped={counterDropped}
          currentPlayerColor={currentPlayerColor}
          selectColumn={(column: number) => {
            setCounterDropped({ column, row: 1, color: currentPlayerColor });
            setCurrentPlayerColor((c) => (c === 'R' ? 'Y' : 'R'));
          }}
        />
        <Timer playMode={playMode} playerColor="R" value={30} />
      </div>
    </div>
  );
};
