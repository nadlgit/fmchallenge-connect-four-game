import styles from './menu-button.module.css';
import imgVsCPU from './player-vs-cpu.svg';
import imgVsPlayer from './player-vs-player.svg';

const buttonVariants = {
  vsCPU: { text: 'Play vs CPU', img: imgVsCPU, style: styles.buttonred },
  vsPlayer: { text: 'Play vs Player', img: imgVsPlayer, style: styles.buttonyellow },
  rules: { text: 'Game Rules', img: undefined, style: styles.buttonwhite },
};

type MenuButtonProps = {
  variant: keyof typeof buttonVariants;
  onClick: () => void;
};

export const MenuButton = ({ variant, onClick }: MenuButtonProps) => {
  const buttonText = buttonVariants[variant].text;
  const buttonImg = buttonVariants[variant]?.img;
  const buttonStyle = buttonVariants[variant]?.style;
  const buttonClasses = ['heading-m', styles.button];
  if (buttonStyle) {
    buttonClasses.push(buttonStyle);
  }
  return (
    <button className={buttonClasses.join(' ')} onClick={onClick}>
      <span>{buttonText}</span>
      {buttonImg && <img src={buttonImg} alt="" />}
    </button>
  );
};
