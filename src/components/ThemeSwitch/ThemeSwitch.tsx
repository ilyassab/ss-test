import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { initialActions } from '../../store/actions';
import styles from './ThemeSwitch.scss';

interface Store {
  initial: {
    darkTheme: boolean,
  }
}

const ThemeSwitch: FC = () => {
  const isDark = useSelector((store: Store) => store.initial.darkTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('darkTheme');
    }
    if (!isDark) {
      document.body.classList.remove('darkTheme');
    }
  }, [isDark]);

  return (
    <button
      type="button"
      onClick={() => dispatch(initialActions.setTheme(!isDark))}
      className={cn(styles.button, { [styles.darkTheme]: isDark })}
    >
      {isDark ? 'dark theme' : 'light theme'}
    </button>
  );
};

export default ThemeSwitch;
