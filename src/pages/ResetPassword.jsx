import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/App3.css';

function ResetPassword() {
  const [correo, setCorreo] = useState(''); // Cambiado de email a correo
  const [contraseña, setContraseña] = useState(''); // Cambiado de password a contraseña
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    try {
      const response = await fetch('https://backend-juego.vercel.app/api/user/reset-password', { // Asegúrate de que la URL sea correcta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contraseña }), // Cambiado de email y password a correo y contraseña
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
            name="correo" // Cambiado de email a correo
            value={correo} // Cambiado de email a correo
            onChange={(e) => setCorreo(e.target.value)} // Cambiado de email a correo
            required
          />
        </div>
        <div className="form-group">
          <label>Nueva Contraseña:</label>
          <input
            type="password"
            name="contraseña" // Cambiado de password a contraseña
            value={contraseña} // Cambiado de password a contraseña
            onChange={(e) => setContraseña(e.target.value)} // Cambiado de password a contraseña
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
