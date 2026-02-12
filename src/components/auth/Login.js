import React, { useState } from 'react';
import { loginUser } from '../../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, pass);
    } catch (err) {
      alert("Error: " + err);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto', background: 'white', borderRadius: '10px', marginTop: '100px' }}>
      <h2 style={{ color: '#333' }}>Ingreso Aero Jump</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} style={{ padding: '10px' }} />
        <input type="password" placeholder="Contraseña" onChange={e => setPass(e.target.value)} style={{ padding: '10px' }} />
        <button type="submit" style={{ padding: '10px', background: '#ff6b00', color: 'white', border: 'none', cursor: 'pointer' }}>Entrar</button>
      </form>
    </div>
  );
};

export default Login;
