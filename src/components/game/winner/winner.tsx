import styles from './winner.module.css';

type WinnerProps = {
  winner?: 'player1' | 'player2' | 'you' | 'CPU';
  playAgain: () => void;
};

export const Winner = ({ winner, playAgain }: WinnerProps) => {
  const { player, wins } = (() => {
    if (winner === 'player1') {
      return { player: 'Player 1', wins: 'wins' };
    }
    if (winner === 'player2') {
      return { player: 'Player 2', wins: 'wins' };
    }
    if (winner === 'you') {
      return { player: 'You', wins: 'win' };
    }
    if (winner === 'CPU') {
      return { player: 'CPU', wins: 'wins' };
    }
    return { player: '', wins: 'tie' };
  })();

  return (
    <div className={styles.container}>
      <span className={styles.player}>{player}</span>
      <span className={styles.wins}>{wins}</span>
      <button className={styles.button} onClick={playAgain}>
        Play again
      </button>
    </div>
  );
};
