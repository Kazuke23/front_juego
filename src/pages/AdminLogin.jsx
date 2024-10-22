import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import './styles/AdminLogin.css'; // Estilos específicos para el login de administrador

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el inicio de sesión del administrador
    if (email === 'admin@example.com' && password === 'adminpassword') {
      navigate('/admin/dashboard'); // Navega a la página de administración al iniciar sesión correctamente
    } else {
      alert('Correo o contraseña incorrectos');
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="admin-login-btn" type="submit">
          Iniciar Sesión
        </button>
      </form>
      <div className="admin-register-link">
        <p>No tienes una cuenta?</p>
        <Link to="/admin/register">Registrar Administrador</Link> {/* Link al registro */}
      </div>
    </div>
  );
}

export default AdminLogin;
