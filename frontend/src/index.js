import React from 'react';
import ReactDOM from 'react-dom';
import "rsuite/dist/rsuite.min.css";
import './style.css'
import { StoreProvider } from './Store';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

