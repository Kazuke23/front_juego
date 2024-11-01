import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import './styles/AdminLogin.css'; // Estilos específicos para el login de administrador

function AdminLogin() {
  const [correo, setCorreo] = useState(''); // Cambiado de email a correo
  const [contraseña, setContraseña] = useState(''); // Cambiado de password a contraseña
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://backend-juego.vercel.app/api/user/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contraseña }) // Cambiado de email y password a correo y contraseña
      });

      const data = await response.json();

      if (response.ok && data.user.role === 'admin') {
        navigate('/admin/dashboard'); // Navega a la página de administración si es admin
      } else if (data.user && data.user.role !== 'admin') {
        setError('No tienes permisos de administrador.');
      } else {
        setError('Credenciales incorrectas.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error en el servidor, intenta más tarde.');
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Login Administrador</h2>
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={correo} // Cambiado de email a correo
            onChange={(e) => setCorreo(e.target.value)} // Cambiado de email a correo
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={contraseña} // Cambiado de password a contraseña
            onChange={(e) => setContraseña(e.target.value)} // Cambiado de password a contraseña
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className="admin-login-btn" type="submit">
          Iniciar Sesión
        </button>
      </form>
      <div className="admin-register-link">
        <p>No tienes una cuenta?</p>
        <Link to="/admin/register">Registrar Administrador</Link>
      </div>
    </div>
  );
}

export default AdminLogin;
