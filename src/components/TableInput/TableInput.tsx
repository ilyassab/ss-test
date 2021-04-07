import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { tickerActions } from '../../store/actions';
import styles from './TableInput.scss';

const TableInput: FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const onBlurHandler = () => {
    if (!Number.isNaN(Number(value))) {
      dispatch(tickerActions.setItemsCount(value));
    }
  };

  return (
    <input
      className={styles.input}
      type="number"
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlurHandler}
      value={value}
    />
  );
};

export default TableInput;
