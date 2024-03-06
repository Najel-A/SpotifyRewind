import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Authorize from './authorization/authorize';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Authorize />
    <App />
  </React.StrictMode>
);

