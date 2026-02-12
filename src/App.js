// src/App.js
import React, { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Iniciando escucha de Auth...");
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Respuesta de Firebase recibida:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    // Seguridad: Si en 5 segundos no responde, algo anda mal
    const timer = setTimeout(() => {
      if (loading) {
        console.warn("Firebase tardó demasiado. Revisa tu Configuración/Conexión.");
        // Opcional: setLoading(false) para ver si al menos carga el Login
      }
    }, 5000);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, [loading]);

  if (loading) {
    return (
      <div style={{color: 'white', textAlign: 'center', marginTop: '20%'}}>
        <h2>Iniciando Sistema...</h2>
        <p>Esperando respuesta de Firebase...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      {user ? <h1>Bienvenido al Aero Jump</h1> : <div>Formulario de Login Aquí</div>}
    </div>
  );
}
