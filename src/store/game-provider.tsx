import { createContext, useCallback, useState, type PropsWithChildren } from 'react';
import { GameService, type GameState, type PlayerColor, type PlayMode } from '@/core';

export const GameContext = createContext<
  | {
      playMode: PlayMode;
      playerNames: Record<PlayerColor, string>;
      playerScores: Record<PlayerColor, number>;
      boardCounters: GameState['boardCounters'];
      currentPlayer: PlayerColor | null;
      winner: PlayerColor | null;
      createGame: (playMode: PlayMode) => void;
      resetGame: () => void;
      startNewRound: () => void;
      play: (color: PlayerColor, column: number) => void;
    }
  | undefined
>(undefined);

export const GameProvider = ({ children }: PropsWithChildren) => {
  const [playMode, setPlayMode] = useState<PlayMode>('vsPlayer');
  const [playerNames, setPlayerNames] = useState<Record<PlayerColor, string>>({
    RED: '',
    YELLOW: '',
  });
  const [playerScores, setPlayerScores] = useState<Record<PlayerColor, number>>({
    RED: -1,
    YELLOW: -1,
  });
  const [boardCounters, setBoardCounters] = useState(
    () => GameService.getDefaultState().boardCounters
  );
  const [currentPlayer, setCurrentPlayer] = useState<PlayerColor | null>(null);
  const [winner, setWinner] = useState<PlayerColor | null>(null);
  const updateGameState = useCallback((gameState: GameState) => {
    setPlayerNames({
      RED: gameState.players.RED.name,
      YELLOW: gameState.players.YELLOW.name,
    });
    setPlayerScores({
      RED: gameState.players.RED.score,
      YELLOW: gameState.players.YELLOW.score,
    });
    setBoardCounters(gameState.boardCounters);
    setCurrentPlayer(
      gameState.players.RED.isCurrentPlayer
        ? 'RED'
        : gameState.players.YELLOW.isCurrentPlayer
        ? 'YELLOW'
        : null
    );
    setWinner(
      gameState.players.RED.isWinner ? 'RED' : gameState.players.YELLOW.isWinner ? 'YELLOW' : null
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
        playerNames,
        playerScores,
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
