type GameProps = {
  goHome: () => void;
  playMode: 'vsPlayer' | 'vsCPU';
};

export const Game = ({ goHome, playMode }: GameProps) => {
  return (
    <div>
      <h1>{`Connect Four game: Game ${playMode}`}</h1>
      <button onClick={goHome}>Home</button>
    </div>
  );
};
