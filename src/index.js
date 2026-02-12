import React from 'react';
import ReactDOM from 'react-dom/client';

// Forzamos un renderizado manual sin dependencias de otros archivos
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div style={{background: 'orange', color: 'black', height: '100vh', padding: '50px'}}>
    <h1>PRUEBA DE CONEXIÓN</h1>
    <p>Si ves esto en naranja, el sistema de despliegue funciona.</p>
    <p>Hora actual: {new Date().toLocaleTimeString()}</p>
  </div>
);
