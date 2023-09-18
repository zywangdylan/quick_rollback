import React from 'react';
import ReactDOM from 'react-dom';
import { hydrateRoot } from 'react-dom/client'
import App from './app';

const domNode = document.getElementById('root');
hydrateRoot(domNode, <App />);
