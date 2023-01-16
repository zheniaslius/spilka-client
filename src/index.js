import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import './i18n';

import App from './App';
import { CallContextProvider } from './context/CallContext';
import { QueueContextProvider } from './context/QueueContext';
import { MicrophoneContextProvider } from './context/MicrophoneContext';

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

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ThemeProvider theme={theme}>
    <MicrophoneContextProvider>
      <QueueContextProvider>
        <CallContextProvider>
          <App />
        </CallContextProvider>
      </QueueContextProvider>
    </MicrophoneContextProvider>
  </ThemeProvider>
);
