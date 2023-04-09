import { Logo } from '@/components/logo';
import { Board } from './board';

type GameProps = {
  goHome: () => void;
  playMode: 'vsPlayer' | 'vsCPU';
};

export const Game = ({ goHome, playMode }: GameProps) => {
  return (
    <div>
      <div>
        <div>Menu</div>
        <Logo />
        <div>Restart</div>
      </div>
      <div>
        <div>Red Score</div>
        <div>Yellow Score</div>
        <Board />
      </div>
    </div>
  );
};
