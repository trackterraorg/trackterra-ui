import socketIO from 'socket.io-client';
import { BASE_URL } from '../utils/apiSettings';
import { socketEvents } from './events';

export const socket = socketIO.connect(BASE_URL);

export const initSockets = ({ setValue }) => {
  socketEvents({ setValue });
};
