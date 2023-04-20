import { createContext, useCallback, useState, type PropsWithChildren } from 'react';
import {
  BOARD_COLUMNS,
  BOARD_ROWS,
  GameService,
  type GameState,
  type PlayerColor,
  type PlayMode,
} from '@/core';

export const GameContext = createContext<
  | {
      playMode: PlayMode;
      playerScores: Record<PlayerColor, { value: number; name: string }>;
      BOARD_COLUMNS: number;
      BOARD_ROWS: number;
      boardCounters: GameState['boardCounters'];
      currentPlayer: { color: PlayerColor | null; name: string };
      winner: { color: PlayerColor | null; name: string };
      createGame: (playMode: PlayMode) => void;
      resetGame: () => void;
      startNewRound: () => void;
      play: (color: PlayerColor, column: number) => void;
    }
  | undefined
>(undefined);

export const GameProvider = ({ children }: PropsWithChildren) => {
  const [playMode, setPlayMode] = useState<PlayMode>('vsPlayer');
  const [playerScores, setPlayerScores] = useState<
    Record<PlayerColor, { value: number; name: string }>
  >({ RED: { value: -1, name: '' }, YELLOW: { value: -1, name: '' } });
  const [boardCounters, setBoardCounters] = useState(
    () => GameService.getDefaultState().boardCounters
  );
  const [currentPlayer, setCurrentPlayer] = useState<{ name: string; color: PlayerColor | null }>({
    color: null,
    name: '',
  });
  const [winner, setWinner] = useState<{ name: string; color: PlayerColor | null }>({
    color: null,
    name: '',
  });
  const updateGameState = useCallback((gameState: GameState) => {
    setPlayerScores({
      RED: { value: gameState.players.RED.score, name: gameState.players.RED.name },
      YELLOW: { value: gameState.players.YELLOW.score, name: gameState.players.YELLOW.name },
    });
    setBoardCounters(gameState.boardCounters);
    setCurrentPlayer(
      gameState.players.RED.isCurrentPlayer
        ? { color: 'RED', name: gameState.players.RED.name }
        : gameState.players.YELLOW.isCurrentPlayer
        ? { color: 'YELLOW', name: gameState.players.YELLOW.name }
        : { color: null, name: '' }
    );
    setWinner(
      gameState.players.RED.isWinner
        ? { color: 'RED', name: gameState.players.RED.name }
        : gameState.players.YELLOW.isWinner
        ? { color: 'YELLOW', name: gameState.players.YELLOW.name }
        : { color: null, name: '' }
    );
  }, []);
  const [gameService, setGameService] = useState(() => new GameService(playMode, updateGameState));
  const createGame = useCallback((playMode: PlayMode) => {
    setPlayMode(playMode);
    setGameService(new GameService(playMode, updateGameState));
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
    <GameContext.Provider
      value={{
        playMode,
        playerScores,
        BOARD_COLUMNS,
        BOARD_ROWS,
        boardCounters,
        currentPlayer,
        winner,
        createGame,
        resetGame,
        startNewRound,
        play,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
