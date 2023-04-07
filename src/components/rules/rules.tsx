type RulesProps = {
  goHome: () => void;
};

export const Rules = ({ goHome }: RulesProps) => {
  return (
    <div>
      <h1>Connect Four game: Rules</h1>
      <button onClick={goHome}>Home</button>
    </div>
  );
};
