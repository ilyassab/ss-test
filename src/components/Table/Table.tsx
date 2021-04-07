import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tickerActions } from '../../store/actions';
import TableHead from '../TableHead';
import TableBodyRow from '../TableBodyRow';
import styles from './Table.scss';
import useSocket from '../../socket/useSocket';

interface ISymbol {
  id: string,
  baseCurrency: string,
  quoteCurrency: string,
}

interface ITicker {
  name: string,
  symbol: string,
  bid: number,
  ask: number,
  high: number,
  low: number,
  last: number,
}

interface Store {
  tickers: {
    items: {
      [key: string]: ITicker
    },
    sort: {
      type: 'asc' | 'desc',
      value: 'name' | 'bid' | 'ask' | 'high' | 'low' | 'last',
    }
    itemsCount: string,
  }
}

interface Memo {
  [key: string]: ITicker,
}

interface SymbolData {
  id: 'initialSymbols',
  result: ISymbol[]
}

interface TickerData {
  params: ITicker,
}

const Table: FC = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const tickers = useSelector((store: Store) => store.tickers.items);
  const sort = useSelector((store: Store) => store.tickers.sort);
  const tickersCount = useSelector((store: Store) => store.tickers.itemsCount);

  const tickersValues = useMemo(() => Object.values(tickers)
    .sort((a, b) => b.last - a.last)
    .slice(0, tickersCount === '' ? undefined : Number(tickersCount))
    .sort((a, b) => {
      if (sort.value === 'name') {
        if (sort.type === 'asc') {
          return a[sort.value].localeCompare(b[sort.value]);
        }
        return b[sort.value].localeCompare(a[sort.value]);
      }
      if (sort.type === 'asc') {
        return a[sort.value] - b[sort.value];
      }
      return b[sort.value] - a[sort.value];
    }), [tickersCount, tickers, sort]);

  useEffect(() => {
    const obj = {
      method: 'getSymbols',
      id: 'initialSymbols',
    };
    socket.onopen = () => {
      socket.send(JSON.stringify(obj));
    };

    let memo: Memo = {};
    let symbols: ISymbol[] = [];

    const intervalId = setInterval(() => {
      dispatch(tickerActions.setTickers(memo));
      memo = {};
    }, 360);

    socket.onmessage = (event) => {
      const data: TickerData & SymbolData = JSON.parse(event.data);
      if (data.params && data.params.symbol) {
        const symbol = symbols.find((symbolItem) => symbolItem.id === data.params.symbol);
        if (symbol) {
          data.params.name = `${symbol.baseCurrency} / ${symbol.quoteCurrency}`;
        }
        memo[data.params.symbol] = data.params;
      }
      if (data.id === 'initialSymbols') {
        symbols = data.result;
        symbols.forEach((symbol) => {
          const symbolObj = {
            method: 'subscribeTicker',
            params: {
              symbol: symbol.id,
            },
            id: symbol.id,
          };
          socket.send(JSON.stringify(symbolObj));
        });
      }
    };
    return () => clearInterval(intervalId);
  }, [socket, dispatch]);

  return (
    <table className={styles.table}>
      <TableHead />
      <tbody>
        {tickersValues.map((tickerValue) => (
          <TableBodyRow key={tickerValue.symbol} ticker={tickerValue} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
