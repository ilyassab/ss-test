import React, { FC } from 'react';
import TD from '../TableBodyCell';
import styles from './TableBodyRow.scss';

interface ITicker {
  name: string,
  symbol: string,
  bid: number,
  ask: number,
  high: number,
  low: number,
  last: number,
}

interface Props {
  ticker: ITicker
}

const TableBodyRow: FC<Props> = ({ ticker }) => (
  <tr className={styles.tableBodyRow}>
    <TD>{ticker.name}</TD>
    <TD>{ticker.bid}</TD>
    <TD>{ticker.ask}</TD>
    <TD>{ticker.high}</TD>
    <TD>{ticker.low}</TD>
    <TD>{ticker.last}</TD>
  </tr>
);

export default React.memo(TableBodyRow);
