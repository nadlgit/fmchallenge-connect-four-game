import { AppContent } from './app-content';
import { ChallengeAttribution } from './challenge-attribution';
import styles from './app.module.css';

export const App = () => {
  return (
    <>
      <main className={styles.content}>
        <AppContent />
      </main>
      <footer className={styles.footer}>
        <ChallengeAttribution />
      </footer>
    </>
  );
};
