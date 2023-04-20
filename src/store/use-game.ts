import { useContext } from 'react';

import { GameContext } from './game-provider';

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame() must be used with <GameProvider>');
  }
  return context;
};
