import { Logo } from '@/components/logo';
import styles from './header.module.css';

type HeaderProps = {
  showMenu: () => void;
  restart: () => void;
};

export const Header = ({ showMenu, restart }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <button className={styles.button} onClick={showMenu}>
        Menu
      </button>
      <Logo />
      <button className={styles.button} onClick={restart}>
        Restart
      </button>
    </div>
  );
};
