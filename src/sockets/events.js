import { socket } from '.';

export const socketEvents = ({ setValue }) => {
  socket.on('connect', () => {
    console.log('Connected');
  });
  socket.on('events', ({ address, chain, msg, status, numberOfNewParsedTxs }) => {
    setValue((state) => ({ ...state, address, chain, msg, status, numberOfNewParsedTxs }));
  });
  socket.on('exception', (data) => {
    console.log('event', data);
  });
  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
};
