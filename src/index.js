import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const modalRoot = document.getElementById('root') 
// as HTMLElement
const root = ReactDOM.createRoot(modalRoot);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
