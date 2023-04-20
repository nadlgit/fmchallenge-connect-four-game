import { createContext, useCallback, useState, type PropsWithChildren } from 'react';
import { GameService, type GameState, type PlayerColor } from '@/core';

export const GameContext = createContext<
  | {
      gameState: GameState;
      createGame: (playMode: 'vsPlayer' | 'vsCPU') => void;
      resetGame: () => void;
      startNewRound: () => void;
      play: (color: PlayerColor, column: number) => void;
    }
  | undefined
>(undefined);

export const GameProvider = ({ children }: PropsWithChildren) => {
  const [gameState, setGameState] = useState<GameState>(() => GameService.getDefaultState());
  const [gameService, setGameService] = useState<GameService>(
    () => new GameService('vsPlayer', setGameState)
  );
  const createGame = useCallback((playMode: 'vsPlayer' | 'vsCPU') => {
    setGameService(new GameService(playMode, setGameState));
  }, []);
  const resetGame = useCallback(() => {
    gameService.resetGame();
  }, [gameService]);
  const startNewRound = useCallback(() => {
    gameService.startNewRound();
  }, [gameService]);
  const play = useCallback(
    (color: PlayerColor, column: number) => {
      gameService.play(color, column);
    },
    [gameService]
  );
  return (
    <GameContext.Provider value={{ gameState, createGame, resetGame, startNewRound, play }}>
      {children}
    </GameContext.Provider>
  );
};
