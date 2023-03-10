import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import App from './App';
import { CallContextProvider } from './context/CallContext';
import { QueueContextProvider } from './context/QueueContext';

import './styles.css';

const theme = {
  colors: {
    black: '#040a20',
    blue: '#4285f4',
    darkBlue: '#161d34',
    white: '#ffffff',
    red: '#EB4F6F',
    grey: '#ffffff45',
  },
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <QueueContextProvider>
      <CallContextProvider>
        <App />
      </CallContextProvider>
    </QueueContextProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
