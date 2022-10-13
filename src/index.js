// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
//
import { getChainOptions, WalletProvider } from '@terra-money/wallet-provider';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import SocketProvider from './socket_context';

// ----------------------------------------------------------------------

getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <HelmetProvider>
      <BrowserRouter>
        <SocketProvider>
          <WalletProvider {...chainOptions}>
            <App />
          </WalletProvider>
        </SocketProvider>
      </BrowserRouter>
    </HelmetProvider>,
    document.getElementById('root')
  );
});

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
