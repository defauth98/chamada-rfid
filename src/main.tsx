import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './App';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { AuthProvider } from './contexts/userContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider>
        <CSSReset />
        <Routes />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
