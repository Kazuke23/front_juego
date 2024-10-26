import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/App3.css';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    try {
      const response = await fetch('https://backend-juego.vercel.app/api/user/reset-password', { // Asegúrate de que la URL sea correcta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Contraseña restablecida con éxito.');
      } else {
        setMessage(data.message || 'Error al restablecer la contraseña.');
      }
    } catch (error) {
      setMessage('Error en la conexión con el servidor.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Restablecer Contraseña</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Nueva Contraseña:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="reset-button">Restablecer Contraseña</button>
      </form>
      <p className="reset-link">
        <Link to="/">Volver al Inicio de Sesión</Link>
      </p>
    </div>
  );
}

export default ResetPassword;
