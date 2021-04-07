import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tickerActions } from '../../store/actions';
import styles from './TableHead.scss';

interface Store {
  tickers: {
    sort: {
      type: 'asc' | 'desc',
      value: 'name' | 'bid' | 'ask' | 'high' | 'low' | 'last',
    }
  }
}

const TableHead: FC = () => {
  const dispatch = useDispatch();
  const sort = useSelector((store: Store) => store.tickers.sort);
  const onClickHandle = (value: string) => {
    const sortType = sort.value === value ? sort.type === 'desc' ? 'asc' : 'desc' : 'desc';
    dispatch(tickerActions.setSort({ value, type: sortType }));
  };

  const arrowRender = (value: string) => {
    if (value === sort.value) {
      if (sort.type === 'desc') {
        return '\u25b2';
      }
      if (sort.type === 'asc') {
        return '\u25bc';
      }
    }
    return null;
  };

  return (
    <thead>
      <tr className={styles.tableHeadRow}>
        <th onClick={() => onClickHandle('name')} className={styles.tableHeadCell}>Ticker {arrowRender('name')}</th>
        <th onClick={() => onClickHandle('bid')} className={styles.tableHeadCell}>Bid {arrowRender('bid')}</th>
        <th onClick={() => onClickHandle('ask')} className={styles.tableHeadCell}>Ask {arrowRender('ask')}</th>
        <th onClick={() => onClickHandle('high')} className={styles.tableHeadCell}>High {arrowRender('high')}</th>
        <th onClick={() => onClickHandle('low')} className={styles.tableHeadCell}>Low {arrowRender('low')}</th>
        <th onClick={() => onClickHandle('last')} className={styles.tableHeadCell}>Last {arrowRender('last')}</th>
      </tr>
    </thead>
  );
};

export default TableHead;
