import React, { FC } from 'react';
import { Provider } from 'react-redux';
import Table from '../Table';
import TableInput from '../TableInput';
import ThemeSwitch from '../ThemeSwitch';
import store from '../../store/store';
import { bitcoinSocket, SocketProvider } from '../../socket';
import styles from './App.scss';

const App: FC = () => (
  <SocketProvider value={bitcoinSocket}>
    <Provider store={store}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h1>Exchange Quotes</h1>
          <ThemeSwitch />
        </div>
        <TableInput />
        <Table />
      </div>
    </Provider>
  </SocketProvider>
);

export default App;
