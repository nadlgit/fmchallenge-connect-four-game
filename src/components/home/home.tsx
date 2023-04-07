type HomeProps = {
  showRules: () => void;
  playVsPlayer: () => void;
  playVsCPU: () => void;
};

export const Home = ({ showRules, playVsPlayer, playVsCPU }: HomeProps) => {
  return (
    <div>
      <h1>Connect Four game: Home</h1>
      <button onClick={playVsCPU}>Vs CPU</button>
      <button onClick={playVsPlayer}>Vs Player</button>
      <button onClick={showRules}>Rules</button>
    </div>
  );
};
