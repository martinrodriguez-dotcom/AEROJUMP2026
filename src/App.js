import React, { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [diagnosticMsg, setDiagnosticMsg] = useState('Iniciando comunicación con Firebase...');
  const [criticalError, setCriticalError] = useState(null);

  useEffect(() => {
    // 1. Verificar si el objeto auth existe
    if (!auth) {
      setCriticalError("El objeto 'auth' no está llegando desde firebaseConfig. Revisa las exportaciones.");
      setLoading(false);
      return;
    }

    try {
      setDiagnosticMsg("Escuchando cambios de autenticación...");
      
      const unsubscribe = onAuthStateChanged(auth, 
        (currentUser) => {
          console.log("Auth detectado:", currentUser);
          setUser(currentUser);
          setLoading(false);
        }, 
        (error) => {
          // Error específico de Firebase (ej. dominio no autorizado)
          setCriticalError(`Error de Firebase: ${error.code} - ${error.message}`);
          setLoading(false);
        }
      );

      // 2. Cronómetro de seguridad (Si pasan 6 segundos sin respuesta)
      const timer = setTimeout(() => {
        if (loading) {
          setCriticalError("TIEMPO AGOTADO: Firebase no responde. Posibles causas: \n1. API Key mal configurada en el panel de Netlify. \n2. El dominio no está autorizado en la consola de Firebase. \n3. No tienes internet o hay un Firewall.");
          setLoading(false);
        }
      }, 6000);

      return () => {
        unsubscribe();
        clearTimeout(timer);
      };

    } catch (err) {
      // Error de código (Sintaxis o importación rota)
      setCriticalError(`ERROR DE CÓDIGO: ${err.message}`);
      setLoading(false);
    }
  }, [loading]);

  // PANTALLA DE ERROR CRÍTICO
  if (criticalError) {
    return (
      <div style={{ padding: '40px', background: '#2c3e50', color: 'white', height: '100vh', fontFamily: 'monospace' }}>
        <h1 style={{ color: '#e74c3c' }}>🛑 ERROR DETECTADO</h1>
        <div style={{ background: '#000', padding: '20px', borderRadius: '10px', border: '1px solid #e74c3c', whiteSpace: 'pre-wrap' }}>
          {criticalError}
        </div>
        <button 
          onClick={() => window.location.reload()}
          style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          🔄 Reintentar Cargar App
        </button>
      </div>
    );
  }

  // PANTALLA DE CARGA CON DIAGNÓSTICO
  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#1a1a1a', color: 'white', flexDirection: 'column' }}>
        <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid #333', borderTopColor: '#ff6b00', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ marginTop: '20px' }}>{diagnosticMsg}</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {user ? (
        <h1>✅ Sesión Iniciada: {user.email}</h1>
      ) : (
        <h1>🔑 Esperando Login... (Firebase OK)</h1>
      )}
    </div>
  );
}

export default App;
