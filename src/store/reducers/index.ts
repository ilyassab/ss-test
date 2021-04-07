import { combineReducers } from 'redux';

import tickers from './tickers';
import initial from './initial';

export default combineReducers({
  tickers,
  initial,
});
