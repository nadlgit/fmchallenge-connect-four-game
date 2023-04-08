import { ComponentPropsWithoutRef } from 'react';
import styles from './logo.module.css';
import imgLogo from './logo.svg';

type LogoProps = Pick<ComponentPropsWithoutRef<'img'>, 'className'>;

export const Logo = ({ className }: LogoProps) => {
  const classes = styles.logo + (className ? ' ' + className : '');
  return <img src={imgLogo} alt="Logo" className={classes} />;
};
