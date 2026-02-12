import React, { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Dashboard from './components/Dashboard';
import Login from './components/auth/Login';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Intentando conectar con Firebase...");
    
    // El observador de Firebase
    const unsubscribe = onAuthStateChanged(auth, 
      (currentUser) => {
        console.log("Estado de Auth cambiado:", currentUser);
        setUser(currentUser);
        setLoading(false);
      },
      (err) => {
        console.error("Error de Firebase Auth:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    // Timeout de seguridad: Si en 8 segundos no hay respuesta
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn("Firebase no respondió a tiempo.");
        setError("Tiempo de espera agotado. Revisa tu conexión o configuración de Firebase.");
        setLoading(false);
      }
    }, 8000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [loading]);

  // Pantalla de ERROR
  if (error && !user) {
    return (
      <div style={{ backgroundColor: '#1a1a1a', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', textAlign: 'center' }}>
        <h2 style={{ color: '#ff6b00' }}>⚠️ Error de Conexión</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{ marginTop: '20px', padding: '10px 20px', background: '#ff6b00', border: 'none', color: 'white', borderRadius: '5px', cursor: 'pointer' }}
        >
          Reintentar Carga
        </button>
      </div>
    );
  }

  // Pantalla de CARGA
  if (loading) {
    return (
      <div style={{ backgroundColor: '#1a1a1a', color: 'white', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner"></div>
          <p style={{ marginTop: '20px' }}>Iniciando Aero Jump...</p>
        </div>
      </div>
    );
  }

  // Renderizado Condicional Final
  return (
    <div className="app-container">
      {user ? <Dashboard /> : <Login />}
    </div>
  );
}

export default App;
