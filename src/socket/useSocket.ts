import { useContext } from 'react';

import { Context } from './Context';

const useSocket = () => useContext(Context);

export default useSocket;
