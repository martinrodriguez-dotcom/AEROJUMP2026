import React, { useState, useEffect } from 'react';
// Importamos directamente desde el archivo de configuración que creamos
import { auth } from './firebaseConfig'; 
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Componentes internos temporales para asegurar que NADA falle por rutas
const LoadingScreen = () => (
  <div style={{height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', background:'#1a1a1a', color:'white', flexDirection:'column'}}>
    <div style={{width:'50px', height:'50px', border:'5px solid #333', borderTopColor:'#ff6b00', borderRadius:'50%', animation:'spin 1s linear infinite'}}></div>
    <p>Iniciando Aero Jump...</p>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Escucha de Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Usuario actual:", currentUser);
      setUser(currentUser);
      setLoading(false);
    }, (err) => {
      console.error("Error de Auth:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Error: Credenciales inválidas o servicio no activado.");
      console.error(err);
    }
  };

  const handleLogout = () => signOut(auth);

  if (loading) return <LoadingScreen />;

  // Si no hay usuario, mostramos el Login aquí mismo (evita errores de importación)
  if (!user) {
    return (
      <div style={{height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', background:'#ecf0f1'}}>
        <form onSubmit={handleLogin} style={{background:'white', padding:'30px', borderRadius:'10px', boxShadow:'0 10px 25px rgba(0,0,0,0.1)', width:'320px'}}>
          <h2 style={{textAlign:'center', color:'#2c3e50', marginBottom:'20px'}}>Aero Jump Login</h2>
          {error && <p style={{color:'red', fontSize:'12px'}}>{error}</p>}
          <input 
            type="email" placeholder="Email" 
            style={{width:'100%', padding:'10px', marginBottom:'10px', boxSizing:'border-box'}}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" placeholder="Contraseña" 
            style={{width:'100%', padding:'10px', marginBottom:'20px', boxSizing:'border-box'}}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" style={{width:'100%', padding:'10px', background:'#ff6b00', color:'white', border:'none', borderRadius:'5px', cursor:'pointer', fontWeight:'bold'}}>
            INGRESAR
          </button>
        </form>
      </div>
    );
  }

  // Si hay usuario, mostramos el Dashboard
  return (
    <div style={{height:'100vh', display:'flex', flexDirection:'column'}}>
      <header style={{background:'#2c3e50', color:'white', padding:'15px 20px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1 style={{margin:0, fontSize:'20px'}}>Aero Jump Pro 2026</h1>
        <button onClick={handleLogout} style={{background:'#e74c3c', color:'white', border:'none', padding:'8px 15px', borderRadius:'4px', cursor:'pointer'}}>Cerrar Sesión</button>
      </header>
      
      <main style={{flex:1, display:'flex', justifyContent:'center', alignItems:'center', background:'#f4f7f6'}}>
        <div style={{textAlign:'center'}}>
          <h2>Bienvenido al Sistema</h2>
          <p>Has iniciado sesión correctamente.</p>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginTop:'30px'}}>
             <div style={cardStyle}>Agenda</div>
             <div style={cardStyle}>Kiosco</div>
             <div style={cardStyle}>Inventario</div>
             <div style={cardStyle}>Finanzas</div>
          </div>
        </div>
      </main>
    </div>
  );
}

const cardStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  cursor: 'pointer',
  fontWeight: 'bold',
  color: '#ff6b00',
  border: '2px solid #ff6b00'
};

export default App;
