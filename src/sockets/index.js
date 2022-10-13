import socketIO from 'socket.io-client';
import { API_BASE_URL } from '../utils/apiSettings';
import { socketEvents } from './events';

export const socket = socketIO.connect(API_BASE_URL);

export const initSockets = ({ setValue }) => {
  socketEvents({ setValue });
};
