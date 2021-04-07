import { createContext } from 'react';
import bitcoinSocket from './socket';

export const Context = createContext(bitcoinSocket);
export const { Provider } = Context;
