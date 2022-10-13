import React, { useState, useEffect } from 'react';
import { initSockets } from '../sockets';
import SocketContext from './context';

const SocketProvider = (props) => {
  const [value, setValue] = useState({
    address: '',
    chain: '',
    msg: '',
    status: '',
    numberOfNewParsedTxs: 0
  });

  useEffect(() => {
    initSockets({ setValue });
  }, [initSockets]);

  return <SocketContext.Provider value={value}>{props.children}</SocketContext.Provider>;
};
export default SocketProvider;
