import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ChakraProvider} from '@chakra-ui/react'
import theme from './theme';
import {BrowserRouter}from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './Redux/store';
import { ColorModeScript } from '@chakra-ui/react'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <BrowserRouter>
  <ChakraProvider >
  <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </ChakraProvider>
  </BrowserRouter>
  </Provider>
);

