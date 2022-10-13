import { createContext } from 'react';

const SocketContext = createContext({
  address: '',
  chain: '',
  msg: '',
  status: '',
  numberOfNewParsedTxs: 0
});

export default SocketContext;
