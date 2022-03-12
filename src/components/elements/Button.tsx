/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { ReactElement } from 'react';
import styles from './Button.module.scss';
import cls from 'classnames';

interface IProps {
  text: string;
  type?: 'color' | 'white';
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<IProps> = ({
  text,
  type = 'white',
  className = '',
  onClick,
}): ReactElement => {
  return (
    <button
      className={cls(className, styles.btn, {
        [styles.btn_color]: type === 'color',
      })}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
