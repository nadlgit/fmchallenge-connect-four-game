import { useEffect } from 'react';
import { Logo } from '@/components/logo';
import { MenuButton } from './menu-button';
import styles from './home.module.css';

type HomeProps = {
  showRules: () => void;
  playVsPlayer: () => void;
  playVsCPU: () => void;
};

export const Home = ({ showRules, playVsPlayer, playVsCPU }: HomeProps) => {
  useEffect(() => {
    const bodyClass = 'bg-darker';
    document.body.classList.add(bodyClass);
    return () => document.body.classList.remove(bodyClass);
  }, []);

  return (
    <div className={styles.container}>
      <Logo />
      <div className={styles.buttons}>
        <MenuButton variant="vsCPU" onClick={playVsCPU} />
        <MenuButton variant="vsPlayer" onClick={playVsPlayer} />
        <MenuButton variant="rules" onClick={showRules} />
      </div>
    </div>
  );
};
