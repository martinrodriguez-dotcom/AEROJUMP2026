import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/layout.css'; // Asegúrate de que la ruta sea correcta

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
