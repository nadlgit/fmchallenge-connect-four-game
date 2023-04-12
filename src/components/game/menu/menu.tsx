import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './menu.module.css';

type MenuModalProps = {
  onClose: (choice: 'continue' | 'restart' | 'quit') => void;
};

export const IngameMenu = ({ onClose }: MenuModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return createPortal(
    <div className={styles.backdrop}>
      <div className={styles.content} role="dialog">
        <h1 className={styles.title}>Pause</h1>
        <button className={styles.button} onClick={() => onClose('continue')}>
          Continue game
        </button>
        <button className={styles.button} onClick={() => onClose('restart')}>
          Restart
        </button>
        <button className={`${styles.button} ${styles.buttonred}`} onClick={() => onClose('quit')}>
          Quit game
        </button>
      </div>
    </div>,
    document.getElementById('modal') as HTMLElement
  );
};
